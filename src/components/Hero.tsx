import { useState, useEffect } from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState<string>('')
  const fullText = 'Volpato Enzo'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 150)

    return () => clearInterval(timer)
  }, [])

  const handleContactClick = (): void => {
    const section = document.getElementById('contact')
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="terminal-window floating">
        <div className="terminal-header">
          <div className="terminal-dot dot-red"></div>
          <div className="terminal-dot dot-yellow"></div>
          <div className="terminal-dot dot-green"></div>
        </div>
        <div className="typing-text">
          <span className="accent">const</span> developer = <span className="accent">{'{'}</span>
        </div>
        <h1 className="hero-title">{displayedText}</h1>
        <p className="subtitle">Développeur Full-Stack</p>
        <button className="cta-button" onClick={handleContactClick}>
          npm run contact
        </button>
      </div>
    </section>
  )
}

export default Hero
