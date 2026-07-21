import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from '../components/Reveal'
import { experience, type Job } from '../data/resume'

function TimelineItem({ item }: { item: Job }) {
  const isCurrent = item.mode === 'Current'
  return (
    <motion.div
      className={`tl-item ${isCurrent ? 'tl-item--current' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="tl-item__marker">
        <span className="tl-item__dot" />
      </div>
      <div className="tl-item__card" data-cursor="hover">
        <div className="tl-item__top">
          <div>
            <h3 className="tl-item__company">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.company}
                </a>
              ) : (
                item.company
              )}
              {isCurrent && <span className="tl-item__badge">Now</span>}
            </h3>
            <p className="tl-item__role">{item.role}</p>
          </div>
          <div className="tl-item__meta">
            <span className="tl-item__period">{item.period}</span>
            <span className="tl-item__mode">{item.mode}</span>
          </div>
        </div>
        <p className="tl-item__summary">{item.summary}</p>
        <ul className="tl-item__points">
          {item.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <section id="work" className="section experience">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Where I’ve <span className="grad-text">shipped.</span>
          </h2>
        </Reveal>

        <div className="timeline" ref={ref}>
          <div className="timeline__line">
            <motion.div className="timeline__line-fill" style={{ scaleY }} />
          </div>
          {experience.map((item) => (
            <TimelineItem key={item.company} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
