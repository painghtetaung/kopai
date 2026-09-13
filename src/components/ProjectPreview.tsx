import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

export default function ProjectPreview({
  variant,
}: {
  variant: 'booking' | 'wallet'
}) {
  const frame = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [18, -18])

  if (variant === 'booking')
    return (
      <div
        ref={frame}
        className="project-art project-art--booking"
        aria-hidden="true"
      >
        <motion.div
          className="project-art__scene"
          style={{ y: reduce ? 0 : y }}
        >
          <div className="booking-window">
            <div className="mini-nav">
              <b>
                rezerv<span>®</span>
              </b>
              <span>
                Discover your next ritual <i>↗</i>
              </span>
            </div>
            <div className="booking-body">
              <div className="booking-copy">
                <span className="mini-label">A LITTLE TIME FOR YOU</span>
                <h4>
                  Find your
                  <br />
                  <em>balance.</em>
                </h4>
                <p>Move. Breathe. Begin again.</p>
                <span className="mini-button">
                  Explore classes <b>↗</b>
                </span>
              </div>
              <div className="booking-poster">
                <div className="poster-ring" />
                <div className="poster-circle" />
                <div className="poster-arch" />
                <span>
                  THE
                  <br />
                  DAILY
                  <br />
                  <i>PRACTICE.</i>
                </span>
              </div>
            </div>
            <div className="booking-bottom">
              <span>Good for the body. Better for the mind.</span>
              <span>YOGA &nbsp; / &nbsp; PILATES &nbsp; / &nbsp; WELLNESS</span>
            </div>
          </div>
        </motion.div>
        <span className="art-caption mono">01 — BOOKING INTERFACE STUDY</span>
      </div>
    )
  return (
    <div
      ref={frame}
      className="project-art project-art--wallet"
      aria-hidden="true"
    >
      <motion.div className="project-art__scene" style={{ y: reduce ? 0 : y }}>
        <div className="wallet-orbit" />
        <div className="wallet-window">
          <div className="wallet-sidebar">
            <span>◈</span>
            <i>▦</i>
            <i>↗</i>
            <i>◎</i>
            <i>≡</i>
          </div>
          <div className="wallet-main">
            <div className="wallet-top">
              <b>Overview</b>
              <span>↗ &nbsp; ◉</span>
            </div>
            <span className="mini-label">TOTAL BALANCE</span>
            <h4>
              $24,680<span>.00</span>
            </h4>
            <span className="wallet-growth">
              ↗ 12.8% <i>this month</i>
            </span>
            <svg viewBox="0 0 300 95" className="wallet-chart" fill="none">
              <path
                d="M0 79H300M0 44H300M0 9H300"
                stroke="#eae7df"
                strokeDasharray="3 4"
              />
              <path
                d="M0 83L23 69L44 74L67 54L90 63L110 46L136 51L159 26L182 38L205 18L226 27L251 7L274 12L300 0V95H0Z"
                fill="#e8ecda"
              />
              <path
                d="M0 83L23 69L44 74L67 54L90 63L110 46L136 51L159 26L182 38L205 18L226 27L251 7L274 12L300 0"
                stroke="#587142"
                strokeWidth="2.5"
              />
            </svg>
            <div className="wallet-transactions">
              <b>Recent activity</b>
              <div>
                <span>↙ &nbsp; Wallet transfer</span>
                <span>+$240.00</span>
              </div>
              <div>
                <span>↗ &nbsp; Online payment</span>
                <span>−$85.00</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <span className="art-caption mono">
        02 — DASHBOARD INTERFACE STUDY · SAMPLE DATA
      </span>
    </div>
  )
}
