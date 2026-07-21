import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import { skills } from '../data/resume'

const marquee = [
  'React',
  'Next.js',
  'TypeScript',
  'Vue.js',
  'Redux',
  'Tailwind CSS',
  'Framer Motion',
  'GSAP',
  'Material UI',
  'Node',
  'P5.js',
  'Blockly',
]

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      {/* Infinite marquee band */}
      <div className="skills__marquee" aria-hidden="true">
        <motion.div
          className="skills__marquee-track"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        >
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="skills__marquee-item">
              {m} <span className="skills__marquee-dot">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="container">
        <Reveal>
          <p className="eyebrow">Skills & Tools</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-title">
            The toolkit behind <span className="grad-text">the pixels.</span>
          </h2>
        </Reveal>

        <div className="skills__grid">
          {skills.map((cat, ci) => (
            <Reveal className="skill-card" key={cat.group} delay={0.08 + ci * 0.06}>
              <div className="skill-card__inner" data-cursor="hover">
                <div className="skill-card__header">
                  <span className="skill-card__index">0{ci + 1}</span>
                  <h3>{cat.group}</h3>
                </div>
                <div className="skill-card__chips">
                  {cat.items.map((it) => (
                    <span className="chip" key={it}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
