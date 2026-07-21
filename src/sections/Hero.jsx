import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AuroraCanvas from '../components/AuroraCanvas'
import AnimatedText from '../components/AnimatedText'
import Magnetic from '../components/Magnetic'
import { profile } from '../data/resume'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__bg">
        <AuroraCanvas />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      <motion.div className="container hero__content" style={{ y, opacity }}>
        <motion.p
          className="hero__available"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="dot" /> Currently at Rezerv · Open to collaborate
        </motion.p>

        <h1 className="hero__title">
          <AnimatedText text="Paing Htet Aung" delay={0.35} />
        </h1>

        <div className="hero__role">
          <AnimatedText text="Frontend Developer" delay={0.75} stagger={0.05} />
        </div>

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          <Magnetic>
            <a href="#work" className="btn btn--primary" data-cursor="hover">
              View my work
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn--ghost" data-cursor="hover">
              Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <div className="hero__stat">
            <strong>{profile.yearsExperience}</strong>
            <span>Years experience</span>
          </div>
          <div className="hero__stat">
            <strong>5</strong>
            <span>Companies shipped for</span>
          </div>
          <div className="hero__stat">
            <strong>∞</strong>
            <span>Components crafted</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to content"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="hero__scroll-line" />
        Scroll
      </motion.a>
    </section>
  )
}
