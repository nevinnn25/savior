import { useCallback, useEffect, useRef, useState } from 'react'
import Navigation from './Navigation'
import { slides } from './Slides'

const SCROLL_COOLDOWN_MS = 700
const SCROLL_THRESHOLD = 45

function getInitialSlideIndex() {
  const params = new URLSearchParams(window.location.search)
  const slideParam = Number.parseInt(params.get('slide') || '', 10)
  if (Number.isNaN(slideParam)) return 0
  return Math.max(0, Math.min(slideParam - 1, slides.length - 1))
}

function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(() => getInitialSlideIndex())
  const lastScrollAtRef = useRef(0)
  const shellRef = useRef(null)
  const trailRef = useRef(null)

  const goTo = useCallback((index) => {
    setCurrentIndex((prev) => {
      const clamped = Math.max(0, Math.min(index, slides.length - 1))
      return clamped === prev ? prev : clamped
    })
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        goNext()
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        goPrev()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    const onWheel = (event) => {
      event.preventDefault()

      if (Math.abs(event.deltaY) < SCROLL_THRESHOLD) {
        return
      }

      const now = Date.now()
      if (now - lastScrollAtRef.current < SCROLL_COOLDOWN_MS) {
        return
      }

      lastScrollAtRef.current = now
      if (event.deltaY > 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goNext, goPrev])

  useEffect(() => {
    const shellEl = shellRef.current
    const trailEl = trailRef.current
    if (!shellEl || !trailEl) return

    let rafId = 0
    let targetX = window.innerWidth * 0.5
    let targetY = window.innerHeight * 0.5
    let currentX = targetX
    let currentY = targetY
    let isPointerInside = false

    const animateTrail = () => {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15
      trailEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      rafId = window.requestAnimationFrame(animateTrail)
    }

    const onMouseMove = (event) => {
      const rect = shellEl.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      targetX = x
      targetY = y
      if (!isPointerInside) {
        isPointerInside = true
        trailEl.style.opacity = '1'
      }

      const nx = x / rect.width - 0.5
      const ny = y / rect.height - 0.5
      shellEl.style.setProperty('--mx', `${nx}`)
      shellEl.style.setProperty('--my', `${ny}`)
    }

    const onMouseLeave = () => {
      isPointerInside = false
      trailEl.style.opacity = '0'
      shellEl.style.setProperty('--mx', '0')
      shellEl.style.setProperty('--my', '0')
    }

    window.addEventListener('mousemove', onMouseMove)
    shellEl.addEventListener('mouseleave', onMouseLeave)
    rafId = window.requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      shellEl.removeEventListener('mouseleave', onMouseLeave)
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <main className="presentation-shell" ref={shellRef}>
      <div className="tech-grid" aria-hidden></div>
      <div className="vignette" aria-hidden></div>
      <div className="scanline-layer" aria-hidden></div>
      <div className="cursor-trail" ref={trailRef} aria-hidden></div>
      <div className="ambient a1"></div>
      <div className="ambient a2"></div>
      <div className="ambient a3"></div>

      {slides.map((Slide, index) => {
        const isActive = index === currentIndex
        return (
          <section
            key={index}
            className={`slide ${isActive ? 'active' : ''}`}
            aria-hidden={!isActive}
          >
            <Slide isActive={isActive} />
          </section>
        )
      })}

      <Navigation
        currentIndex={currentIndex}
        total={slides.length}
        canGoPrev={currentIndex > 0}
        canGoNext={currentIndex < slides.length - 1}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={goTo}
      />
    </main>
  )
}

export default Presentation
