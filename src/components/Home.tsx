import { useState } from 'react'
import { SectionId } from '../types'
import ParticleCanvas from './ParticleCanvas'
import CustomCursor from './CustomCursor'
import Navigation from './Navigation'
import Hero from './Hero'
import Projects from './Projects'
// import Skills from './Skills'
import Contact from './Contact'

const Home = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')

  return (
    <>
      <ParticleCanvas />
      <CustomCursor />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="container">
        <Hero />
        <Projects />
        {/* <Skills /> */}
        <Contact />
      </div>
    </> 
  )
}

export default Home