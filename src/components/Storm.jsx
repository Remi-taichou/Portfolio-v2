import { useEffect, useRef } from 'react'
import './Storm.css'

// Draws a jagged line between two points by repeatedly bending the midpoint
function jag(x1, y1, x2, y2, offset, out) {
  if (offset < 4) {
    out.push([x1, y1, x2, y2])
    return
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * offset
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * offset * 0.3
  jag(x1, y1, mx, my, offset / 2, out)
  jag(mx, my, x2, y2, offset / 2, out)
}

const WIND = 2 // sideways pixels per frame; raise for slanted rain

function Storm() {
  const canvasRef = useRef(null)
  const flashRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const flash = flashRef.current
    const ctx = canvas.getContext('2d')
    let bolt = null
    let drops = []
    let frameId
    let timerId

    function makeDrops() {
      const count = Math.floor(canvas.width / 6)
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * (canvas.width + 100) - 50,
        y: Math.random() * canvas.height,
        len: 10 + Math.random() * 14,
        speed: 14 + Math.random() * 10,
      }))
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      makeDrops()
    }

    function strike() {
      const w = canvas.width
      const h = canvas.height
      const x = w * (0.15 + Math.random() * 0.7)
      const main = []
      jag(x, 0, x + (Math.random() - 0.5) * w * 0.2, h * (0.6 + Math.random() * 0.3), 120, main)

      const branches = []
      main.forEach(([, , x2, y2], i) => {
        if (i % 5 === 0 && Math.random() < 0.6) {
          jag(x2, y2, x2 + (Math.random() - 0.5) * 260, y2 + 80 + Math.random() * 140, 50, branches)
        }
      })

      bolt = { main, branches, life: 1 }
      timerId = setTimeout(strike, 5000 + Math.random() * 7000)
    }

    function drawSegments(segments, width) {
      ctx.lineWidth = width
      ctx.beginPath()
      segments.forEach(([x1, y1, x2, y2]) => {
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
      })
      ctx.stroke()
    }

    function drawRain() {
      ctx.save()
      ctx.strokeStyle = 'rgba(170, 195, 235, 0.30)'
      ctx.lineWidth = 1
      ctx.beginPath()
      drops.forEach((d) => {
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.len * (WIND / d.speed), d.y + d.len)
        d.x += WIND
        d.y += d.speed
        if (d.y > canvas.height) {
          d.y = -d.len
          d.x = Math.random() * (canvas.width + 100) - 50
        }
      })
      ctx.stroke()
      ctx.restore()
    }

    function drawBolt() {
      ctx.save()
      ctx.globalAlpha = bolt.life
      ctx.strokeStyle = '#eaf2ff'
      ctx.shadowColor = '#7aa2ff'
      ctx.shadowBlur = 24
      ctx.lineCap = 'round'
      drawSegments(bolt.main, 2.5)
      drawSegments(bolt.branches, 1.2)
      ctx.restore()

      flash.style.opacity = bolt.life * 0.5
      bolt.life -= 0.03
      if (bolt.life <= 0) {
        bolt = null
        flash.style.opacity = 0
      }
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawRain()
      if (bolt) drawBolt()
      frameId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    timerId = setTimeout(strike, 1500)
    frame()

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timerId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="storm" aria-hidden="true">
      <div className="storm-flash" ref={flashRef} />
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Storm