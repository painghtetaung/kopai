import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import type { HudSetter } from './types'

const G = 20 // gravity
const WALL_X = 6.2
const WALL_Z = 4.2
const REST = 0.6 // bounciness
const FRICTION = 0.86 // floor friction on bounce

const COLORS = ['#7c6cff', '#4fc3ff', '#3ddc97', '#ff7a59', '#ffd166']
const TYPES = ['box', 'sphere', 'ico', 'torus', 'cone'] as const
type BodyType = (typeof TYPES)[number]

interface Body {
  pos: THREE.Vector3
  vel: THREE.Vector3
  angVel: THREE.Vector3
  radius: number
  type: BodyType
  color: string
}

function makeBodies(): Body[] {
  return Array.from({ length: 14 }, (_, i) => {
    const radius = 0.55 + Math.random() * 0.35
    return {
      pos: new THREE.Vector3(
        (Math.random() * 2 - 1) * WALL_X * 0.7,
        3 + Math.random() * 4,
        (Math.random() * 2 - 1) * WALL_Z * 0.7
      ),
      vel: new THREE.Vector3(0, 0, 0),
      angVel: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(2),
      radius,
      type: TYPES[i % TYPES.length],
      color: COLORS[i % COLORS.length],
    }
  })
}

function Geometry({ type, radius }: { type: BodyType; radius: number }) {
  switch (type) {
    case 'sphere':
      return <sphereGeometry args={[radius, 24, 24]} />
    case 'ico':
      return <icosahedronGeometry args={[radius, 0]} />
    case 'torus':
      return <torusGeometry args={[radius * 0.7, radius * 0.3, 16, 32]} />
    case 'cone':
      return <coneGeometry args={[radius, radius * 1.8, 6]} />
    default:
      return <boxGeometry args={[radius * 1.5, radius * 1.5, radius * 1.5]} />
  }
}

interface DragState {
  id: number | null
  last: THREE.Vector3
  lastT: number
  vel: THREE.Vector3
}

export default function Playground({ onHud }: { onHud: HudSetter }) {
  const bodies = useMemo(makeBodies, [])
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const planeRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  const drag = useRef<DragState>({
    id: null,
    last: new THREE.Vector3(),
    lastT: 0,
    vel: new THREE.Vector3(),
  })

  useEffect(() => {
    onHud({ status: 'sandbox' })
    const up = () => {
      const d = drag.current
      if (d.id != null) {
        bodies[d.id].vel.copy(d.vel.clampLength(0, 24))
        d.id = null
      }
    }
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [bodies, onHud])

  const onGrab = (i: number) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    const d = drag.current
    d.id = i
    d.last.copy(bodies[i].pos)
    d.lastT = performance.now()
    d.vel.set(0, 0, 0)
    bodies[i].vel.set(0, 0, 0)
  }

  const onDragMove = (e: ThreeEvent<PointerEvent>) => {
    const d = drag.current
    if (d.id == null) return
    const p = e.point
    const now = performance.now()
    const dt = Math.max((now - d.lastT) / 1000, 1 / 120)
    d.vel.set((p.x - d.last.x) / dt, (p.y - d.last.y) / dt, (p.z - d.last.z) / dt)
    bodies[d.id].pos.copy(p)
    d.last.copy(p)
    d.lastT = now
  }

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.04)

    // keep the invisible drag-plane facing the camera, at the grabbed body's depth
    if (planeRef.current) {
      const d = drag.current
      if (d.id != null) {
        planeRef.current.visible = true
        planeRef.current.position.copy(bodies[d.id].pos)
        planeRef.current.quaternion.copy(camera.quaternion)
      } else {
        planeRef.current.visible = false
      }
    }

    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i]
      const held = drag.current.id === i

      if (!held) {
        b.vel.y -= G * dt
        b.pos.addScaledVector(b.vel, dt)

        // floor
        if (b.pos.y < b.radius) {
          b.pos.y = b.radius
          if (Math.abs(b.vel.y) < 1.2) b.vel.y = 0
          else b.vel.y = -b.vel.y * REST
          b.vel.x *= FRICTION
          b.vel.z *= FRICTION
        }
        // walls
        if (b.pos.x < -WALL_X + b.radius) {
          b.pos.x = -WALL_X + b.radius
          b.vel.x = Math.abs(b.vel.x) * REST
        } else if (b.pos.x > WALL_X - b.radius) {
          b.pos.x = WALL_X - b.radius
          b.vel.x = -Math.abs(b.vel.x) * REST
        }
        if (b.pos.z < -WALL_Z + b.radius) {
          b.pos.z = -WALL_Z + b.radius
          b.vel.z = Math.abs(b.vel.z) * REST
        } else if (b.pos.z > WALL_Z - b.radius) {
          b.pos.z = WALL_Z - b.radius
          b.vel.z = -Math.abs(b.vel.z) * REST
        }
        // gentle air damping
        b.vel.multiplyScalar(0.998)
      }

      const m = meshRefs.current[i]
      if (m) {
        m.position.copy(b.pos)
        if (!held) {
          m.rotation.x += b.angVel.x * dt * (b.vel.length() * 0.15 + 0.3)
          m.rotation.y += b.angVel.y * dt * (b.vel.length() * 0.15 + 0.3)
        }
      }
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4.5, 13]} fov={55} rotation={[-0.25, 0, 0]} />
      <color attach="background" args={['#06060f']} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 12, 8]} intensity={1.4} color="#b7acff" />
      <pointLight position={[0, 6, 4]} intensity={30} color="#7c6cff" distance={30} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[WALL_X * 2 + 1, WALL_Z * 2 + 1]} />
        <meshStandardMaterial color="#0c0c1c" metalness={0.5} roughness={0.5} />
      </mesh>
      <gridHelper args={[WALL_X * 2, 16, '#2a2a55', '#15152f']} position={[0, 0.01, 0]} />

      {/* Neon wall rails */}
      {(
        [
          [0, -WALL_Z, WALL_X * 2, 0.1],
          [0, WALL_Z, WALL_X * 2, 0.1],
          [-WALL_X, 0, 0.1, WALL_Z * 2],
          [WALL_X, 0, 0.1, WALL_Z * 2],
        ] as const
      ).map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, 0.25, z]}>
          <boxGeometry args={[w, 0.5, d]} />
          <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      ))}

      {/* Bodies */}
      {bodies.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el }}
          position={b.pos}
          onPointerDown={onGrab(i)}
          castShadow
        >
          <Geometry type={b.type} radius={b.radius} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.65}
            metalness={0.4}
            roughness={0.25}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Invisible drag plane (only active while a body is grabbed) */}
      <mesh ref={planeRef} visible={false} onPointerMove={onDragMove}>
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}
