document.addEventListener('DOMContentLoaded', () => {
  const images = [...document.querySelectorAll('.case-gallery img, .case-media img, .case-text-images img, .step-carousel img')]
  if (!images.length) return

  const overlay = document.createElement('div')
  overlay.className = 'lightbox-overlay'
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>' +
    '<button class="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>' +
    '<img class="lightbox-img" alt="">'
  document.body.appendChild(overlay)

  const overlayImg = overlay.querySelector('.lightbox-img')
  const closeBtn = overlay.querySelector('.lightbox-close')
  const prevBtn = overlay.querySelector('.lightbox-prev')
  const nextBtn = overlay.querySelector('.lightbox-next')
  let index = 0

  if (images.length < 2) {
    prevBtn.hidden = true
    nextBtn.hidden = true
  }

  const show = i => {
    index = (i + images.length) % images.length
    overlayImg.src = images[index].src
    overlayImg.alt = images[index].alt || ''
    overlay.scrollTop = 0
  }

  const open = i => {
    show(i)
    overlay.classList.add('open')
    document.body.classList.add('lightbox-lock')
  }

  const close = () => {
    overlay.classList.remove('open')
    document.body.classList.remove('lightbox-lock')
    overlayImg.src = ''
  }

  images.forEach((img, i) => {
    img.classList.add('lightbox-trigger')
    img.addEventListener('click', () => open(i))
  })

  overlay.addEventListener('click', e => {
    if (e.target === overlayImg || e.target === prevBtn || e.target === nextBtn) return
    close()
  })

  closeBtn.addEventListener('click', close)
  prevBtn.addEventListener('click', () => show(index - 1))
  nextBtn.addEventListener('click', () => show(index + 1))

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') show(index - 1)
    if (e.key === 'ArrowRight') show(index + 1)
  })
})
