const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.onclick=()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)};nav.querySelectorAll('a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')});document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>{document.getElementById('product').value=b.dataset.product;document.getElementById('contact').scrollIntoView({behavior:reduced?'instant':'smooth'})});
const requestedTruck = new URLSearchParams(location.search).get('truck');
const truckOptions = {manual: 'Manual pallet truck', automatic: 'Automatic pallet truck'};
if (Object.hasOwn(truckOptions, requestedTruck)) {
  document.getElementById('product').value = truckOptions[requestedTruck];
}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.product-card,.why-list article,.industry-grid article').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

const models = {"manual-pallet-truck": "Classic Yellow", "warehouse-pallet-truck": "Warehouse Handler", "loading-bay-pallet-truck": "Dock Runner", 'automatic-pallet-truck': 'Jungheinrich EJE 230', 'toyota-bt-levio': 'Toyota BT Levio LWE160', 'still-exh-16': 'STILL EXH 16 Li-Ion'};
const model = new URLSearchParams(location.search).get('model');
if (Object.hasOwn(models, model)) document.querySelector('[name=requirements]').value = 'Please quote for ' + models[model] + ' or an equivalent model.';
