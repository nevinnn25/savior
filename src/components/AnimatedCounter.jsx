import { useEffect, useRef, useState } from 'react'

const easeOut = (t) => 1 - (1 - t) ** 3

function AnimatedCounter({ value, duration = 1400, suffix = '', isActive }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isActive) {
      const id = window.setTimeout(() => setDisplay(0), 0)
      return () => window.clearTimeout(id)
    }

    let startTime = null
    const animate = (now) => {
      if (startTime === null) {
        setDisplay(0)
        startTime = now
      }
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOut(progress)
      setDisplay(Math.floor(eased * value))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = null
    }
  }, [duration, isActive, value])

  return (
    <span className="counter-value">
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
