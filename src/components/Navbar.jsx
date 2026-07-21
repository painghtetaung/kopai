import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Magnetic from './Magnetic'
import { profile } from '../data/resume'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="container nav__inner">
          <a href="#top" className="nav__logo" data-cursor="hover">
            PHA<span>.</span>
          </a>
          <nav className="nav__links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav__link" data-cursor="hover">
                {l.label}
              </a>
            ))}
          </nav>
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="nav__cta" data-cursor="hover">
              Let’s talk
            </a>
          </Magnetic>
        </div>
      </motion.header>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    </>
  )
}
