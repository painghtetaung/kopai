import { Suspense, lazy, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import useGameInput from '../games/useGameInput'
import type { GameInput, GameKey, HudData } from '../games/types'

const GameCanvas = lazy(() => import('../games/GameCanvas'))

type DPadType = 'lr' | 'full' | 'none'

interface GameMeta {
  key: GameKey
  name: string
  tag: string
  accent: string
  icon: string
  desc: string
  controls: string
  dpad: DPadType
}

const GAMES: GameMeta[] = [
  {
    key: 'runner',
    name: 'Neon Runner',
    tag: 'Endless dodge',
    accent: '#7c6cff',
    icon: '▲',
    desc: 'Steer the ship and dodge the blocks. It only gets faster.',
    controls: '← →  /  A D',
    dpad: 'lr',
  },
  {
    key: 'orbs',
    name: 'Orb Collector',
    tag: 'Collect · timed',
    accent: '#3ddc97',
    icon: '✦',
    desc: 'Roam the grid and grab all 8 orbs as fast as you can.',
    controls: 'WASD  /  arrows',
    dpad: 'full',
  },
  {
    key: 'playground',
    name: 'Physics Toybox',
    tag: 'Sandbox',
    accent: '#ff7a59',
    icon: '◆',
    desc: 'Grab, drag and fling glowing shapes. Pure play.',
    controls: 'drag with mouse / finger',
    dpad: 'none',
  },
]

type PressFn = (dir: keyof GameInput, val: boolean) => void

function Hud({ game, hud }: { game: GameKey; hud: HudData }) {
  if (game === 'runner') {
    return (
      <div className="arcade__hud">
        <span>
          SCORE <b>{hud.score ?? 0}</b>
        </span>
        <span>
          BEST <b>{hud.best ?? 0}</b>
        </span>
      </div>
    )
  }
  if (game === 'orbs') {
    return (
      <div className="arcade__hud">
        <span>
          ORBS{' '}
          <b>
            {hud.collected ?? 0}/{hud.total ?? 8}
          </b>
        </span>
        <span>
          TIME <b>{(hud.time ?? 0).toFixed(1)}s</b>
        </span>
        <span>
          BEST <b>{hud.best ? hud.best + 's' : '—'}</b>
        </span>
      </div>
    )
  }
  return (
    <div className="arcade__hud">
      <span>DRAG · FLING · REPEAT</span>
    </div>
  )
}

function DPad({ type, press }: { type: DPadType; press: PressFn }) {
  if (type === 'none') return null
  const btn = (dir: keyof GameInput, label: string) => (
    <button
      className="dpad__btn"
      aria-label={dir}
      onPointerDown={(e) => {
        e.preventDefault()
        press(dir, true)
      }}
      onPointerUp={() => press(dir, false)}
      onPointerLeave={() => press(dir, false)}
      onPointerCancel={() => press(dir, false)}
    >
      {label}
    </button>
  )
  if (type === 'lr') {
    return (
      <div className="dpad dpad--lr">
        {btn('left', '◀')}
        {btn('right', '▶')}
      </div>
    )
  }
  return (
    <div className="dpad dpad--full">
      <div className="dpad__row">{btn('up', '▲')}</div>
      <div className="dpad__row">
        {btn('left', '◀')}
        {btn('down', '▼')}
        {btn('right', '▶')}
      </div>
    </div>
  )
}

export default function Arcade() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<GameKey | null>(null)
  const [runId, setRunId] = useState(0)
  const [hud, setHud] = useState<HudData>({})
  const input = useGameInput(active)

  const meta = GAMES.find((g) => g.key === active)

  const start = (key: GameKey) => {
    setHud({ status: 'playing' })
    setActive(key)
    setRunId((n) => n + 1)
    dialog.current?.showModal()
  }
  const restart = () => {
    setHud({ status: 'playing' })
    setRunId((n) => n + 1)
  }
  const exit = () => {
    dialog.current?.close()
    setActive(null)
    setHud({})
  }
  const press: PressFn = (dir, val) => {
    input.current[dir] = val
  }

  const status = hud.status
  const isOver = status === 'over' || status === 'win'

  return (
    <section id="play" className="section arcade">
      <div className="container">
        <Reveal>
          <p className="eyebrow">03 / A LITTLE OFF THE CLOCK</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Serious about craft.{' '}
            <span className="grad-text">Not always serious.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="arcade__intro">
            Some things are made just for the joy of making them. Take a little
            break.
          </p>
        </Reveal>

        {/* Picker */}
        <div className="arcade__grid">
          {GAMES.map((g, i) => (
            <Reveal key={g.key} delay={0.08 + i * 0.06}>
              <button
                className="game-card"
                data-cursor="hover"
                onClick={() => start(g.key)}
                style={{ '--accent': g.accent } as CSSProperties}
              >
                <span className="game-card__icon" aria-hidden="true" style={{ color: g.accent }}>
                  {g.icon}
                </span>
                <span className="game-card__tag">
                  {g.tag}
                </span>
                <h3 className="game-card__name">{g.name}</h3>
                <p className="game-card__desc">{g.desc}</p>
                <span className="game-card__controls">{g.controls}</span>
                <span className="game-card__play">Play →</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Play modal */}
      <dialog
        ref={dialog}
        className="arcade__modal"
        aria-label={meta?.name || 'Play a game'}
        onClose={() => {
          setActive(null)
          setHud({})
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) exit()
        }}
      >
        {active && meta && (
          <motion.div
            className="arcade__screen"
            style={{ '--accent': meta.accent } as CSSProperties}
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="arcade__bar">
              <div className="arcade__title">
                <span style={{ color: meta.accent }}>{meta.icon}</span>{' '}
                {meta.name}
              </div>
              <Hud game={active} hud={hud} />
              <div className="arcade__actions">
                <button
                  className="arcade__btn"
                  data-cursor="hover"
                  onClick={restart}
                >
                  ↻ Restart
                </button>
                <button
                  className="arcade__btn arcade__btn--exit"
                  data-cursor="hover"
                  onClick={exit}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="arcade__viewport">
              <Suspense
                fallback={
                  <div className="arcade__loading">Getting things ready…</div>
                }
              >
                <GameCanvas
                  key={runId}
                  game={active}
                  input={input}
                  onHud={setHud}
                />
              </Suspense>

              {/* Touch controls */}
              <DPad type={meta.dpad} press={press} />

              {/* Game over / win overlay */}
              <AnimatePresence>
                {isOver && (
                  <motion.div
                    className="arcade__over"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {status === 'over' && (
                      <>
                        <h4>Game Over</h4>
                        <p>
                          Score <b>{hud.score}</b> · Best <b>{hud.best}</b>
                        </p>
                      </>
                    )}
                    {status === 'win' && (
                      <>
                        <h4>All orbs collected! ✦</h4>
                        <p>
                          Time <b>{hud.time}s</b> · Best <b>{hud.best}s</b>
                        </p>
                      </>
                    )}
                    <div className="arcade__over-actions">
                      <button
                        className="btn btn--primary"
                        data-cursor="hover"
                        onClick={restart}
                      >
                        Play again
                      </button>
                      <button
                        className="btn btn--ghost"
                        data-cursor="hover"
                        onClick={exit}
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="arcade__hint">{meta.controls}</div>
          </motion.div>
        )}
      </dialog>
    </section>
  )
}
