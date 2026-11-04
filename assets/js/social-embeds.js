// Load each embed only as it nears the screen, so the page opens fast.
(function () {
  var els = document.querySelectorAll('.social-embed')
  function load(el) {
    var t = el.querySelector('template')
    if (!t) return
    el.appendChild(t.content.cloneNode(true))
    t.remove()
    // Keep the placeholder height until the real post has drawn, so the
    // layout doesn't collapse and pull every other post into view at once.
    var done = function () { clearInterval(iv); el.classList.add('loaded') }
    var iv = setInterval(function () {
      var f = el.querySelector('iframe')
      if (f && f.getBoundingClientRect().height > 250) done()
    }, 300)
    setTimeout(done, 12000)
    if (window.instgrm) window.instgrm.Embeds.process()
    if (window.FB && window.FB.XFBML) window.FB.XFBML.parse(el)
    if (el.querySelector('.tiktok-embed')) {
      // TikTok only scans the page when its script loads, so load it again for this post.
      var s = document.createElement('script')
      s.async = true
      s.src = 'https://www.tiktok.com/embed.js'
      document.body.appendChild(s)
    }
  }
  // Load any post within 300px of the screen. Runs on load, scroll and resize.
  var queued = false
  function check() {
    queued = false
    els.forEach(function (el) {
      if (!el.querySelector('template')) return
      var r = el.getBoundingClientRect()
      if (r.top < window.innerHeight + 300 && r.bottom > -300) load(el)
    })
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(check) } }
  window.addEventListener('scroll', queue, { passive: true })
  window.addEventListener('resize', queue)
  setInterval(check, 1000)
  check()
})()
