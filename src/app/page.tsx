'use client'

import { useEffect, useRef } from 'react'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.1

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(200, 200, 200, 0.8)'
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animateParticles() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(200, 200, 200, ${1 - distance / 100})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.closePath()
          }
        }

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animateParticles)
    }

    createParticles()
    animateParticles()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      <main className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-2">
          Coming Soon
        </h1>
        <p className="text-xl md:text-2xl mt-2 mb-8 text-gray-300">
          My developer portfolio is under construction.
        </p>
        
        <div className="flex justify-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-200">
            <Github size={24} className="hover:scale-110 transform transition-transform duration-200" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-200">
            <Twitter size={24} className="hover:scale-110 transform transition-transform duration-200" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-200">
            <Linkedin size={24} className="hover:scale-110 transform transition-transform duration-200" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:your.email@example.com" className="hover:text-gray-300 transition-colors duration-200">
            <Mail size={24} className="hover:scale-110 transform transition-transform duration-200" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </main>
    </div>
  )
}