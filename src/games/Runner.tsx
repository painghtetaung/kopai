import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import type { InputRef, HudSetter } from './types'

const TRACK = 4.6 // half-width the ship can travel
const SHIP_Z = 3.4 // ship sits here; obstacles travel toward +z (camera)
const POOL = 22 // number of recycled obstacles
const DEPTH = 90 // how far ahead obstacles are recycled

const COLORS = ['#7c6cff', '#4fc3ff', '#3ddc97', '#ff7a59']

interface Obstacle {
  x: number
  z: number
  c: string
}
interface RunnerState {
  x: number
  speed: number
  score: number
  best: number
  dead: boolean
  hudAcc: number
}

export default function Runner({ input, onHud }: { input: InputRef; onHud: HudSetter }) {
  const shipRef = useRef<THREE.Group>(null)
  const shipLight = useRef<THREE.PointLight>(null)
  const obstacleRefs = useRef<(THREE.Mesh | null)[]>([])
  const barRefs = useRef<(THREE.Mesh | null)[]>([])

  const state = useRef<RunnerState>({
    x: 0,
    speed: 14,
    score: 0,
    best: Number(localStorage.getItem('runner-best') || 0),
    dead: false,
    hudAcc: 0,
  })

  const obstacles = useMemo<Obstacle[]>(
    () =>
      Array.from({ length: POOL }, (_, i) => ({
        x: (Math.random() * 2 - 1) * TRACK,
        z: -(i / POOL) * DEPTH - 8,
        c: COLORS[i % COLORS.length],
      })),
    []
  )

  const bars = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ z: -(i / 26) * DEPTH })),
    []
  )

  useFrame((_, rawDt) => {
    const s = state.current
    const dt = Math.min(rawDt, 0.05)
    if (s.dead) return

    // difficulty ramp
    s.speed += dt * 1.1
    s.score += s.speed * dt

    // steer
    const dir = (input.current.right ? 1 : 0) - (input.current.left ? 1 : 0)
    s.x = THREE.MathUtils.clamp(s.x + dir * dt * 11, -TRACK, TRACK)

    if (shipRef.current) {
      shipRef.current.position.x = s.x
      shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, -dir * 0.5, 0.15)
      shipRef.current.position.y = 0.35 + Math.sin(performance.now() * 0.005) * 0.06
    }
    if (shipLight.current) shipLight.current.position.x = s.x

    // advance obstacles toward camera + collision
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i]
      o.z += s.speed * dt
      if (o.z > 9) {
        o.z -= DEPTH
        o.x = (Math.random() * 2 - 1) * TRACK
      }
      const m = obstacleRefs.current[i]
      if (m) {
        m.position.set(o.x, 0.45, o.z)
        m.rotation.y += dt * 1.5
      }
      if (Math.abs(o.z - SHIP_Z) < 0.8 && Math.abs(o.x - s.x) < 0.95) {
        s.dead = true
        s.best = Math.max(s.best, Math.floor(s.score))
        localStorage.setItem('runner-best', String(s.best))
        onHud({ status: 'over', score: Math.floor(s.score), best: s.best })
        return
      }
    }

    // scroll ground bars
    for (let i = 0; i < bars.length; i++) {
      const b = bars[i]
      b.z += s.speed * dt
      if (b.z > 10) b.z -= DEPTH
      const m = barRefs.current[i]
      if (m) m.position.z = b.z
    }

    // throttled HUD update (~12/sec)
    s.hudAcc += dt
    if (s.hudAcc > 0.08) {
      s.hudAcc = 0
      onHud({ status: 'playing', score: Math.floor(s.score), best: s.best })
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3.4, 9.5]} fov={60} rotation={[-0.28, 0, 0]} />
      <color attach="background" args={['#05050b']} />
      <fog attach="fog" args={['#05050b', 18, 60]} />

      <ambientLight intensity={0.25} />
      <pointLight ref={shipLight} position={[0, 3, 4]} intensity={40} color="#7c6cff" distance={18} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -20]} receiveShadow>
        <planeGeometry args={[40, DEPTH + 40]} />
        <meshStandardMaterial color="#0a0a16" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Neon edge rails */}
      {[-TRACK - 0.8, TRACK + 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.15, -20]}>
          <boxGeometry args={[0.12, 0.3, DEPTH + 40]} />
          <meshStandardMaterial color="#7c6cff" emissive="#7c6cff" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      ))}

      {/* Moving ground bars */}
      {bars.map((b, i) => (
        <mesh key={i} ref={(el) => { barRefs.current[i] = el }} position={[0, 0.02, b.z]}>
          <boxGeometry args={[TRACK * 2 + 1.4, 0.02, 0.08]} />
          <meshStandardMaterial color="#20204a" emissive="#20204a" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Obstacles */}
      {obstacles.map((o, i) => (
        <mesh key={i} ref={(el) => { obstacleRefs.current[i] = el }} position={[o.x, 0.45, o.z]}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color={o.c}
            emissive={o.c}
            emissiveIntensity={1.6}
            metalness={0.3}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Ship */}
      <group ref={shipRef} position={[0, 0.35, SHIP_Z]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.5, 1.2, 4]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#7c6cff"
            emissiveIntensity={1.4}
            metalness={0.7}
            roughness={0.2}
            toneMapped={false}
          />
        </mesh>
        <pointLight position={[0, 0.4, 0]} intensity={6} color="#4fc3ff" distance={5} />
      </group>
    </>
  )
}
