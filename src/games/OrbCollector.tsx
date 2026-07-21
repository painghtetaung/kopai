import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import type { InputRef, HudSetter } from './types'

const FIELD = 9 // half-size of the play field
const ORB_COUNT = 8
const PLAYER_SPEED = 8

type Vec3 = [number, number, number]

interface Orb {
  pos: Vec3
  taken: boolean
}
interface OrbState {
  x: number
  z: number
  collected: number
  time: number
  best: number
  done: boolean
  hudAcc: number
}

function randPos(): Vec3 {
  return [(Math.random() * 2 - 1) * FIELD, 0.5, (Math.random() * 2 - 1) * FIELD]
}

export default function OrbCollector({ input, onHud }: { input: InputRef; onHud: HudSetter }) {
  const playerRef = useRef<THREE.Group>(null)
  const camRef = useRef<THREE.PerspectiveCamera>(null)
  const orbRefs = useRef<(THREE.Mesh | null)[]>([])

  const orbs = useMemo<Orb[]>(
    () => Array.from({ length: ORB_COUNT }, () => ({ pos: randPos(), taken: false })),
    []
  )

  const state = useRef<OrbState>({
    x: 0,
    z: 0,
    collected: 0,
    time: 0,
    best: Number(localStorage.getItem('orbs-best') || 0),
    done: false,
    hudAcc: 0,
  })

  useFrame((_, rawDt) => {
    const s = state.current
    const dt = Math.min(rawDt, 0.05)
    if (s.done) return

    s.time += dt

    // movement (up = away from camera = -z)
    const dx = (input.current.right ? 1 : 0) - (input.current.left ? 1 : 0)
    const dz = (input.current.down ? 1 : 0) - (input.current.up ? 1 : 0)
    const len = Math.hypot(dx, dz) || 1
    s.x = THREE.MathUtils.clamp(s.x + (dx / len) * PLAYER_SPEED * dt, -FIELD, FIELD)
    s.z = THREE.MathUtils.clamp(s.z + (dz / len) * PLAYER_SPEED * dt, -FIELD, FIELD)

    const p = playerRef.current
    if (p) {
      p.position.x = s.x
      p.position.z = s.z
      p.position.y = 0.5 + Math.sin(performance.now() * 0.006) * 0.08
      p.rotation.y += dt * 2
    }
    if (camRef.current) {
      camRef.current.position.x = THREE.MathUtils.lerp(camRef.current.position.x, s.x, 0.08)
      camRef.current.position.z = THREE.MathUtils.lerp(camRef.current.position.z, s.z + 11, 0.08)
      camRef.current.lookAt(s.x, 0.5, s.z)
    }

    // collect
    for (let i = 0; i < orbs.length; i++) {
      const o = orbs[i]
      if (o.taken) continue
      const m = orbRefs.current[i]
      if (m) {
        m.position.y = 0.6 + Math.sin(performance.now() * 0.004 + i) * 0.15
        m.rotation.y += dt * 1.5
      }
      const d = Math.hypot(o.pos[0] - s.x, o.pos[2] - s.z)
      if (d < 0.9) {
        o.taken = true
        if (m) m.visible = false
        s.collected += 1
        if (s.collected >= ORB_COUNT) {
          s.done = true
          const t = Math.floor(s.time * 10) / 10
          const prev = s.best
          if (prev === 0 || t < prev) {
            s.best = t
            localStorage.setItem('orbs-best', String(t))
          }
          onHud({ status: 'win', collected: s.collected, total: ORB_COUNT, time: t, best: s.best })
          return
        }
      }
    }

    s.hudAcc += dt
    if (s.hudAcc > 0.1) {
      s.hudAcc = 0
      onHud({
        status: 'playing',
        collected: s.collected,
        total: ORB_COUNT,
        time: Math.floor(s.time * 10) / 10,
        best: s.best,
      })
    }
  })

  return (
    <>
      <PerspectiveCamera ref={camRef} makeDefault position={[0, 8, 11]} fov={55} />
      <color attach="background" args={['#06060f']} />
      <fog attach="fog" args={['#06060f', 20, 45]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 12, 6]} intensity={1.2} color="#9a8cff" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[FIELD * 2 + 2, FIELD * 2 + 2]} />
        <meshStandardMaterial color="#0c0c1c" metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Grid overlay */}
      <gridHelper args={[FIELD * 2 + 2, 22, '#2a2a55', '#161636']} position={[0, 0.01, 0]} />

      {/* Boundary rails */}
      {(
        [
          [0, -FIELD - 1, FIELD * 2 + 2, 0.12],
          [0, FIELD + 1, FIELD * 2 + 2, 0.12],
          [-FIELD - 1, 0, 0.12, FIELD * 2 + 2],
          [FIELD + 1, 0, 0.12, FIELD * 2 + 2],
        ] as const
      ).map(([x, z, w, d], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <boxGeometry args={[w, 0.4, d]} />
          <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      ))}

      {/* Orbs */}
      {orbs.map((o, i) => (
        <mesh key={i} ref={(el) => { orbRefs.current[i] = el }} position={o.pos}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#3ddc97" emissive="#3ddc97" emissiveIntensity={2} toneMapped={false} />
          <pointLight intensity={3} color="#3ddc97" distance={4} />
        </mesh>
      ))}

      {/* Player */}
      <group ref={playerRef} position={[0, 0.5, 0]}>
        <mesh>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#4fc3ff"
            emissiveIntensity={1.4}
            metalness={0.6}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
        <pointLight intensity={6} color="#4fc3ff" distance={6} />
      </group>
    </>
  )
}
