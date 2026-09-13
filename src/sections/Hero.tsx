import { motion, useReducedMotion } from 'framer-motion'
import Shape from '../components/Shape'
import Magnetic from '../components/Magnetic'
import { experience, profile, studio } from '../data/resume'

export default function Hero() {
  const reduce = useReducedMotion()
  const current = experience.find((job) => job.mode === 'Current')
  return (
    <section id="top" className="hero container">
      <motion.div
        className="hero__eyebrow mono"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.1 }}
      >
        <span className="status-dot" /> {profile.role}{' '}
        <span className="hero__slash">/</span> A thoughtful corner of the
        internet
      </motion.div>
      <div className="hero__main">
        <div className="hero__copy">
          <h1 aria-label="A little code. A lot of feeling.">
            <span className="hero__line" aria-hidden="true">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: reduce ? 0 : 0.12 }}
              >
                A little code.
              </motion.span>
            </span>
            <span className="hero__line" aria-hidden="true">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: reduce ? 0 : 0.26 }}
              >
                A lot of <em>feeling.</em>
              </motion.span>
            </span>
          </h1>
          <motion.div
            className="hero__intro"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.45 }}
          >
            <span className="hero__hello">
              Hey, I’m {studio.shortName}. <span aria-hidden="true">↗</span>
            </span>
            <p>{studio.intro}</p>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.55 }}
          >
            <Magnetic>
              <a className="pill-link" href="#projects">
                Explore my work <span aria-hidden="true">↘</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
        <Shape />
      </div>
      <motion.div
        className="hero__footer mono"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: reduce ? 0 : 0.7 }}
      >
        <span>{profile.yearsExperience} YEARS OF MAKING THINGS FEEL RIGHT</span>
        {current && (
          <span className="hero__current">
            <span className="status-dot" /> CURRENTLY BUILDING AT{' '}
            <a href={current.url} target="_blank" rel="noreferrer">
              {current.company.toUpperCase()} ↗
            </a>
          </span>
        )}
        <a href="#projects" className="hero__scroll">
          SCROLL A LITTLE <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
    </section>
  )
}
