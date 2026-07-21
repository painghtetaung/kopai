import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Runner from './Runner'
import OrbCollector from './OrbCollector'
import Playground from './Playground'
import type { GameKey, InputRef, HudSetter } from './types'

interface GameCanvasProps {
  game: GameKey
  input: InputRef
  onHud: HudSetter
}

/**
 * Hosts the R3F <Canvas> and mounts the active game. This whole module is
 * lazy-imported by the Arcade section, so three.js + fiber + drei only load
 * once a visitor actually starts a game.
 */
export default function GameCanvas({ game, input, onHud }: GameCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'none' }}
    >
      <Suspense fallback={null}>
        {game === 'runner' && <Runner input={input} onHud={onHud} />}
        {game === 'orbs' && <OrbCollector input={input} onHud={onHud} />}
        {game === 'playground' && <Playground onHud={onHud} />}
      </Suspense>
    </Canvas>
  )
}
