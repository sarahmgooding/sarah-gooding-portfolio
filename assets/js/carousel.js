document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.step-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track')
    const slides = [...track.children]
    const prev = carousel.querySelector('.carousel-prev')
    const next = carousel.querySelector('.carousel-next')
    const count = carousel.querySelector('.carousel-count')

    const current = () => Math.round(track.scrollLeft / track.clientWidth)
    const go = i => {
      const n = Math.min(Math.max(i, 0), slides.length - 1)
      track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' })
    }
    const update = () => {
      const i = current()
      if (count) count.textContent = (carousel.dataset.label || 'Slide') + ' ' + (i + 1) + ' of ' + slides.length
      // No wrap-around: stop at the first and last slide
      prev.hidden = i <= 0
      next.hidden = i >= slides.length - 1
    }

    prev.addEventListener('click', () => go(current() - 1))
    next.addEventListener('click', () => go(current() + 1))
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  })
})
