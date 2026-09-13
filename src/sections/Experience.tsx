import Reveal from '../components/Reveal'
import { experience, education } from '../data/resume'

export default function Experience() {
  return (
    <section id="work" className="experience container section">
      <div className="experience__heading">
        <p className="eyebrow">THE JOURNEY</p>
        <h2>
          Always <em>building.</em>
          <br />
          Always learning.
        </h2>
        <p>
          Good people. Interesting problems.
          <br />A little better with every project.
        </p>
      </div>
      <div className="experience__list">
        {experience.map((job, index) => (
          <Reveal key={job.company} delay={index * 0.04}>
            <details className="job">
              <summary>
                <span className="job__company">
                  {job.company}
                  {job.mode === 'Current' && (
                    <span className="job__now mono">NOW</span>
                  )}
                  <small>{job.role}</small>
                </span>
                <span className="job__period mono">{job.period}</span>
                <span className="job__toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="job__details">
                <p>{job.summary}</p>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </details>
          </Reveal>
        ))}
        <details className="education">
          <summary className="mono">
            BEFORE THAT / EDUCATION <span>+</span>
          </summary>
          {education.map((item) => (
            <div key={item.school}>
              <h3>{item.school}</h3>
              <p>{item.detail}</p>
              <span className="mono">{item.period}</span>
            </div>
          ))}
        </details>
      </div>
    </section>
  )
}
