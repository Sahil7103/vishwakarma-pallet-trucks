const enquiry = document.querySelector('#enquiry');
const inputs = [...enquiry.querySelectorAll('input:not([type="hidden"])')];
function validate(input) {
  const value = input.value.trim();
  let message = '';
  if (input.required && !value) message = 'Please complete this field.';
  else if (input.type === 'email' && (input.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) message = 'Enter an email such as buyer@company.com.';
  else if (input.type === 'tel' && value && (!/^\+?[\d ().-]+$/.test(value) || !/^\d{7,15}$/.test(value.replace(/\D/g,'')))) message = 'Enter 7 to 15 digits, with the country code if needed.';
  document.getElementById('error-' + input.name).textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message)));
  return message;
}
for (const input of inputs) {
  const hint = document.createElement('span');
  hint.id = 'error-' + input.name;
  hint.className = 'quote-error';
  hint.setAttribute('aria-live','polite');
  input.after(hint);
  input.setAttribute('aria-describedby',hint.id);
  input.addEventListener('blur', () => validate(input));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validate(input);
  });
}
enquiry.addEventListener('submit', event => {
  inputs.forEach(input => { input.value = input.value.trim(); });
  const invalid = inputs.filter(validate);
  if (invalid.length) {
    event.preventDefault();
    invalid[0].focus();
  }
});
enquiry.noValidate = true;
