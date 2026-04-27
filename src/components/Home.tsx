import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SectionId } from '../types'
import ParticleCanvas from './ParticleCanvas'
import CustomCursor from './CustomCursor'
import Navigation from './Navigation'
import Hero from './Hero'
import Projects from './Projects'
import Contact from './Contact'
import Timeline from './timelines/Timeline'
import SkillsSection from './SkillSection'
import About from './About'

const SECTION_IDS: SectionId[] = [
  "hero",
  "timeline",
  "projects",
  "skills",
  "about",
  "contact",
];

const Home = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: SectionId } | null)?.scrollTo;
    if (!scrollTo) {
      return;
    }
    const section = document.getElementById(scrollTo);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(scrollTo);
    }
    window.history.replaceState({}, '');
  }, [location.state]);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id as SectionId);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ParticleCanvas />
      <CustomCursor />
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="container">
        <Hero />
         <Timeline />
        <Projects />
        <SkillsSection />
        <About />
        <Contact />
      </div>
    </> 
  )
}

export default Home