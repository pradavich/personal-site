document.getElementById('year').textContent = new Date().getFullYear();

// Assemble the address in the browser to keep it away from simple scrapers.
const addr = ['hello', 'radavich.com'].join('@');
document.querySelectorAll('#email, .email-link').forEach((link) => {
  link.href = 'mailto:' + addr;
  link.textContent = addr;
});
