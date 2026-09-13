import { useState } from 'react'
import Reveal from '../components/Reveal'
import { profile, studio } from '../data/resume'

export default function Contact() {
  const [copyState, setCopyState] = useState('Copy email')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyState('Copied!')
    } catch {
      setCopyState('Please select the email to copy')
    }
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <div className="contact__top">
            <p className="eyebrow">04 / SAY HELLO</p>
            <p>
              Have a good idea?
              <br />
              I’d love to hear it.
            </p>
          </div>
          <a className="contact__headline" href={'mailto:' + profile.email}>
            Let’s make
            <br />
            <em>something matter.</em>
            <span aria-hidden="true">↗</span>
          </a>
          <div className="contact__links">
            <a className="contact__email" href={'mailto:' + profile.email}>
              {profile.email}
            </a>
            <button
              className="copy-email mono"
              onClick={copy}
              aria-live="polite"
            >
              {copyState} <span aria-hidden="true">⧉</span>
            </button>
          </div>
        </Reveal>
        <footer className="footer">
          <a href="#top" className="wordmark">
            {studio.shortName.toLowerCase()}
            <span className="asterisk" aria-hidden="true">
              ✳
            </span>
          </a>
          <span className="mono">
            © {new Date().getFullYear()} {profile.name}. Made with care.
          </span>
          <div>
            {profile.socials
              .filter((social) => social.href.startsWith('https://'))
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label} ↗
                </a>
              ))}
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </section>
  )
}
