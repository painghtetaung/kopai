import { motion } from 'framer-motion'
import type { ComponentType, ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'span' | 'p'
  className?: string
}

/**
 * Fade + slide reveal that triggers once when scrolled into view.
 */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', ...rest }: RevealProps) {
  const MotionTag = motion[as] as ComponentType<Record<string, unknown>>
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
