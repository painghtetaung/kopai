import Reveal from '../components/Reveal'
import { profile, studio } from '../data/resume'

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__grid">
        <Reveal>
          <p className="eyebrow">02 / THE PERSON BEHIND THE PIXELS</p>
          <div className="about__signature" aria-hidden="true">
            p<span>✳</span>
          </div>
          <p className="mono about__caption">
            {profile.name}
            <br />
            {profile.location}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>{studio.about}</h2>
          <p className="about__summary">{profile.summary}</p>
          <p className="about__note">{studio.note}</p>
          <div className="about__principles">
            {studio.principles.map((principle, index) => (
              <span key={principle}>
                <i className="mono">0{index + 1}</i>
                {principle}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
