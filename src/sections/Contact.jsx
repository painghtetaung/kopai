import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import { profile, education } from '../data/resume'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        {/* Education */}
        <div className="education">
          <Reveal>
            <p className="eyebrow">Education</p>
          </Reveal>
          <div className="education__list">
            {education.map((e, i) => (
              <Reveal className="education__item" key={e.school} delay={0.05 + i * 0.08}>
                <div>
                  <h3>{e.school}</h3>
                  <p>{e.detail}</p>
                </div>
                <span className="education__period">{e.period}</span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="contact__cta">
          <Reveal>
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="contact__headline">
              Let’s build something <span className="grad-text">worth interacting with.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic strength={0.25}>
              <a href={`mailto:${profile.email}`} className="contact__email" data-cursor="hover">
                {profile.email}
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="contact__socials">
              {profile.socials.map((s) => (
                <Magnetic key={s.label}>
                  <a
                    className="contact__social"
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    data-cursor="hover"
                  >
                    {s.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="footer__built">
            Built with React & Framer Motion
          </span>
          <motion.a
            href="#top"
            className="footer__top"
            data-cursor="hover"
            whileHover={{ y: -4 }}
          >
            Back to top ↑
          </motion.a>
        </div>
      </footer>
    </section>
  )
}
