import useLenis from './hooks/useLenis'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Arcade from './sections/Arcade'
import Contact from './sections/Contact'
import './components/Cursor.css'
import './styles/app.css'

export default function App() {
  useLenis()

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Arcade />
        <Contact />
      </main>
    </>
  )
}
