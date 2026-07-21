import { useEffect, useRef } from 'react'

/**
 * Shared directional input. Returns a ref whose `.current` holds
 * { left, right, up, down } booleans. Both the keyboard (attached here) and
 * on-screen touch buttons (which mutate the same ref) feed into it, so games
 * only ever read one source of truth.
 *
 * `active` gates the keyboard listeners so the game only captures keys while
 * it is open, and prevents the page from scrolling on arrow keys during play.
 */
export default function useGameInput(active) {
  const input = useRef({ left: false, right: false, up: false, down: false })

  useEffect(() => {
    if (!active) {
      // reset when leaving a game
      input.current = { left: false, right: false, up: false, down: false }
      return
    }

    const map = (code) => {
      switch (code) {
        case 'ArrowLeft':
        case 'KeyA':
          return 'left'
        case 'ArrowRight':
        case 'KeyD':
          return 'right'
        case 'ArrowUp':
        case 'KeyW':
          return 'up'
        case 'ArrowDown':
        case 'KeyS':
          return 'down'
        default:
          return null
      }
    }

    const down = (e) => {
      const dir = map(e.code)
      if (dir) {
        input.current[dir] = true
        e.preventDefault()
      }
    }
    const up = (e) => {
      const dir = map(e.code)
      if (dir) {
        input.current[dir] = false
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [active])

  return input
}
