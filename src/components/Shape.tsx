import { useState, type PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

const shapes = [
  { rx: 150, ry: 63, count: 32, name: 'A little curiosity' },
  { rx: 148, ry: 105, count: 27, name: 'A different perspective' },
  { rx: 145, ry: 33, count: 38, name: 'Room for a little play' },
  { rx: 147, ry: 83, count: 20, name: 'Something unexpected' },
]

export default function Shape() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const shape = shapes[index % shapes.length]
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 130, damping: 16 })
  const springY = useSpring(y, { stiffness: 130, damping: 16 })
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 20)
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 20)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="shape"
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: reduce ? 0 : 0.25 }}
    >
      <div
        className="shape__frame"
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerCancel={reset}
      >
        <span className="shape__cross shape__cross--top" aria-hidden="true">
          +
        </span>
        <span className="shape__cross shape__cross--bottom" aria-hidden="true">
          +
        </span>
        <motion.div
          className="shape__follow"
          style={{ x: reduce ? 0 : springX, y: reduce ? 0 : springY }}
        >
          <motion.svg
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
            className="shape__drawing"
            animate={{ rotate: index * 33 }}
            transition={{
              duration: reduce ? 0 : 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {Array.from({ length: 38 }, (_, i) => (
              <motion.ellipse
                key={i}
                cx="200"
                cy="200"
                stroke="currentColor"
                strokeWidth="0.8"
                initial={
                  reduce
                    ? false
                    : {
                        pathLength: 0,
                        opacity: 0,
                        rx: shape.rx,
                        ry: shape.ry,
                        rotate: (i * 180) / shape.count,
                      }
                }
                animate={{
                  pathLength: 1,
                  rx: shape.rx,
                  ry: shape.ry,
                  rotate: (i * 180) / shape.count,
                  opacity: i < shape.count ? 0.8 : 0,
                }}
                transition={{
                  duration: reduce ? 0 : 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  pathLength: {
                    duration: reduce ? 0 : 1.1,
                    delay: reduce ? 0 : 0.25 + i * 0.008,
                  },
                }}
                style={{ transformOrigin: '200px 200px' }}
              />
            ))}
          </motion.svg>
        </motion.div>
        <span className="shape__edition mono">
          FIG. 0{(index % shapes.length) + 1} / ALWAYS EXPLORING
        </span>
      </div>
      <button
        className="shape__button mono"
        onClick={() => setIndex((value) => value + 1)}
        aria-label="Reshape the interactive sculpture"
      >
        <span aria-hidden="true">↻</span> A little different, every time
      </button>
      <span className="sr-only" role="status">
        {shape.name}
      </span>
    </motion.div>
  )
}
