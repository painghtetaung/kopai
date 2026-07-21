import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import { projects, type Project } from '../data/resume'

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, ${project.accent}33, transparent 55%)`
  )

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <Reveal delay={0.06 * index}>
      <motion.article
        ref={ref}
        className="project-card"
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
      >
        <motion.div className="project-card__glare" style={{ background: glare }} />
        <div className="project-card__num" style={{ color: project.accent }}>
          0{index + 1}
        </div>
        <div className="project-card__body">
          <span className="project-card__tag" style={{ color: project.accent }}>
            {project.tag}
          </span>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>
        </div>
        <div
          className="project-card__bar"
          style={{ background: project.accent }}
          aria-hidden="true"
        />
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Selected Work</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            Things I’ve <span className="grad-text">built.</span>
          </h2>
        </Reveal>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
