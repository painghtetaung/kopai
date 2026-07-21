import { motion } from 'framer-motion'

/**
 * Splits a string into words and reveals each one with a mask-up motion.
 * Uses a stagger so the line "unfolds" line-by-line, word-by-word.
 */
export default function AnimatedText({ text, className, delay = 0, stagger = 0.045 }) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  const word = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.28em' }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.05em' }}
        >
          <motion.span variants={word} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
