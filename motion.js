const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scenes = [...document.querySelectorAll('.scene')];
const controls = document.querySelector('.scene-controls');
if (controls && scenes.length > 1) {
  let current = 0;
  let timer;
  let paused = reduceMotion.matches;
  let animation;
  let outgoing;
  const toggle = document.createElement('button');
  controls.prepend(toggle);
  controls.hidden = false;
  const status = controls.querySelector('output');
  function schedule() {
    clearTimeout(timer);
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    status.setAttribute('aria-live', paused ? 'polite' : 'off');
    if (!paused && !document.hidden) timer = setTimeout(() => show(1), 5000);
  }
  function show(step) {
    if (animation) animation.cancel();
    if (outgoing) outgoing.hidden = true;
    outgoing = scenes[current];
    outgoing.inert = true;
    current = (current + step + scenes.length) % scenes.length;
    const incoming = scenes[current];
    incoming.hidden = false;
    incoming.inert = false;
    incoming.style.zIndex = '1';
    outgoing.style.zIndex = '0';
    if (reduceMotion.matches) outgoing.hidden = true;
    else {
      const previous = outgoing;
      animation = incoming.animate([{transform: 'translateX(' + step * 100 + '%)'}, {transform: 'translateX(0)'}], {duration: 480, easing: 'ease-out'});
      animation.onfinish = () => { previous.hidden = true; };
    }
    status.textContent = (current + 1) + ' / ' + scenes.length;
    schedule();
  }
  toggle.addEventListener('click', () => { paused = !paused; schedule(); });
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-step]');
    if (button) show(Number(button.dataset.step));
  });
  controls.parentElement.addEventListener('focusin', event => {
    if (scenes.some(scene => scene.contains(event.target))) { paused = true; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  reduceMotion.addEventListener('change', () => { paused = reduceMotion.matches; schedule(); });
  schedule();
}
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (reduceMotion.matches) continue;
      entry.target.animate(
        [{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'none'}],
        {duration: 520, delay: Number(entry.target.dataset.delay || 0), easing: 'ease-out', fill: 'backwards'}
      );
    }
  }, {threshold: 0.08});
  document.querySelectorAll('.specs div, .detail-photo, .catalog-list .product-card, .contact-details > div, .detail-bottom, .automatic-enquiry').forEach(element => {
    const siblings = [...element.parentElement.children];
    element.dataset.delay = Math.min(siblings.indexOf(element), 4) * 65;
    observer.observe(element);
  });
}
