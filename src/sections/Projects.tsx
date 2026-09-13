import { useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import ProjectPreview from '../components/ProjectPreview'
import { projects, experience, type Project } from '../data/resume'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const open = (project: Project) => {
    setSelected(project)
    dialog.current?.showModal()
  }
  const job = experience.find((item) => item.company === selected?.company)
  return (
    <section id="projects" className="section projects container">
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>
              Made with <em>intention.</em>
            </h2>
          </div>
          <p>
            A few things I’ve helped bring to life.
            <br />
            From the first pixel to the final interaction.
          </p>
        </div>
      </Reveal>
      <div className="projects__grid">
        {projects.slice(0, 2).map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <button
              className="project-card"
              onClick={() => open(project)}
              aria-label={'View ' + project.title}
            >
              <ProjectPreview variant={index === 0 ? 'booking' : 'wallet'} />
              <div className="project-card__meta">
                <span className="mono">{project.category}</span>
                <span className="mono">{project.tag}</span>
              </div>
              <div className="project-card__title">
                <h3>{project.title}</h3>
                <span className="circle-arrow" aria-hidden="true">
                  <span>↗</span>
                </span>
              </div>
              <p>{project.description}</p>
            </button>
          </Reveal>
        ))}
      </div>
      <div className="project-list">
        {projects.slice(2).map((project, index) => (
          <button
            key={project.title}
            onClick={() => open(project)}
            className="project-row"
          >
            <span className="project-row__number mono">0{index + 3}</span>
            <h3>{project.title}</h3>
            <span className="mono project-row__tag">{project.category}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        <div className="project-dialog__inner">
          <button
            className="dialog-close"
            onClick={() => dialog.current?.close()}
            aria-label="Close project details"
          >
            ×
          </button>
          {selected && (
            <>
              <p className="eyebrow">
                {selected.category} / {selected.company}
              </p>
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p className="project-dialog__description">
                {selected.description}
              </p>
              <span className="mono">{selected.tag}</span>
              {job && (
                <>
                  <h3>My contribution at {job.company}</h3>
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="project-dialog__note">
                    {job.role} · {job.period}
                  </p>
                </>
              )}
              <a
                className="text-link"
                href="#contact"
                onClick={() => dialog.current?.close()}
              >
                Let’s talk about the details <span>↗</span>
              </a>
            </>
          )}
        </div>
      </dialog>
    </section>
  )
}
