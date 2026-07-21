import type { MutableRefObject } from 'react'

export type GameKey = 'runner' | 'orbs' | 'playground'

export interface GameInput {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

export type InputRef = MutableRefObject<GameInput>

export type GameStatus = 'playing' | 'over' | 'win' | 'sandbox'

export interface HudData {
  status?: GameStatus
  score?: number
  best?: number
  collected?: number
  total?: number
  time?: number
}

export type HudSetter = (data: HudData) => void
