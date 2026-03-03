import { useEffect, useRef } from 'react'
import './ParticleCanvas.css'

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

class ParticleClass implements Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2
  }

  update(): void {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1
    if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 255, 204, 0.5)'
    ctx.fill()
  }
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: ParticleClass[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push(new ParticleClass(canvas.width, canvas.height))
    }

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle: ParticleClass) => {
        particle.update()
        particle.draw(ctx)
      })

      // Draw connections
      particles.forEach((p1: ParticleClass, i: number) => {
        particles.slice(i + 1).forEach((p2: ParticleClass) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 255, 204, ${1 - distance / 150})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = (): void => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} id="particleCanvas" />
}

export default ParticleCanvas
