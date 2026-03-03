import { useEffect, useState } from 'react'
import type { Position } from '../types'

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (): void => setIsHovering(true)
    const handleMouseLeave = (): void => setIsHovering(false)

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .nav-item')

    document.addEventListener('mousemove', handleMouseMove)
    
    interactiveElements.forEach((el: Element) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach((el: Element) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isHovering 
            ? 'translate(-50%, -50%) scale(1.5)' 
            : 'translate(-50%, -50%) scale(1)',
          background: isHovering ? 'rgba(0, 255, 204, 0.1)' : 'transparent'
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  )
}

export default CustomCursor
