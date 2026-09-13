import { skills, studio } from '../data/resume'

export default function Skills() {
  return (
    <section id="skills" className="skills container">
      <div className="skills__line">
        <p className="mono">A FEW TOOLS I FEEL AT HOME WITH</p>
        <div>
          {studio.toolkit.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </div>
      <details className="toolkit">
        <summary className="mono">
          THE FULL TOOLKIT <span>+</span>
        </summary>
        <div className="toolkit__grid">
          {skills.map((group) => (
            <div key={group.group}>
              <h3>{group.group}</h3>
              <p>{group.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </details>
    </section>
  )
}
