function Navigation({
  currentIndex,
  total,
  onPrev,
  onNext,
  onGoTo,
  canGoPrev,
  canGoNext,
}) {
  return (
    <>
      <div className="nav-hud glass-panel">
        <button
          type="button"
          className="nav-arrow"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Previous slide"
        >
          &#8592;
        </button>
        <span className="slide-index">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          className="nav-arrow"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Next slide"
        >
          &#8594;
        </button>
      </div>

      <div className="dot-nav glass-panel" aria-label="Slide navigation">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => onGoTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </>
  )
}

export default Navigation
