document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.step-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track')
    const slides = [...track.children]
    const prev = carousel.querySelector('.carousel-prev')
    const next = carousel.querySelector('.carousel-next')
    const count = carousel.querySelector('.carousel-count')

    const current = () => Math.round(track.scrollLeft / track.clientWidth)
    const go = i => {
      const n = (i + slides.length) % slides.length
      track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' })
    }
    const update = () => {
      count.textContent = 'Course ' + (current() + 1) + ' of ' + slides.length
    }

    prev.addEventListener('click', () => go(current() - 1))
    next.addEventListener('click', () => go(current() + 1))
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  })
})
