import Reveal from '../components/Reveal'
import { profile } from '../data/resume'

const highlights = [
  'Clean architecture & reusable components',
  'Motion design & micro-interactions',
  'Performance & accessibility',
  'Design-to-code fidelity',
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal>
          <p className="eyebrow">About</p>
        </Reveal>

        <div className="about__grid">
          <div className="about__lead">
            <Reveal delay={0.05}>
              <h2 className="about__headline">
                I turn interfaces into experiences that feel{' '}
                <span className="grad-text">fast, fluid and alive.</span>
              </h2>
            </Reveal>
          </div>

          <div className="about__body">
            <Reveal delay={0.1}>
              <p>{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Across fintech, edtech and AI startups I’ve shipped dashboards, payment flows,
                real-time video and gamified learning tools — always with an eye on the details that
                make an interface feel considered.
              </p>
            </Reveal>

            <ul className="about__highlights">
              {highlights.map((h, i) => (
                <Reveal as="li" key={h} delay={0.24 + i * 0.06}>
                  <span className="tick">→</span> {h}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
