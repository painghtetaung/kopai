import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile, studio } from '../data/resume'

export default function Navbar() {
  const reduce = useReducedMotion()
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Bangkok',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    update()
    const timer = window.setInterval(update, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="nav">
      <motion.div
        className="container nav__inner"
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <a
          href="#top"
          className="wordmark"
          aria-label={profile.name + ', back to top'}
        >
          {studio.shortName.toLowerCase()}
          <span className="asterisk" aria-hidden="true">
            ✳
          </span>
        </a>
        <span className="nav__location mono">
          {profile.location} <span className="nav__time">{time}</span>
        </span>
        <nav className="nav__links" aria-label="Main navigation">
          <a href="#projects">
            Work<span>01</span>
          </a>
          <a href="#about">
            About<span>02</span>
          </a>
          <a href="#play">
            Play<span>03</span>
          </a>
          <a href="#contact" className="nav__contact">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </motion.div>
    </header>
  )
}
