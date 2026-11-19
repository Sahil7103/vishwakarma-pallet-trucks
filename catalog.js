const menu=document.querySelector('.menu'),nav=document.querySelector('header nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button)});
  for (const card of document.querySelectorAll('[data-category]')) {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  }
}));
