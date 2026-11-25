const modal = document.querySelector('#customizer-modal');
const customizerForm = document.querySelector('#customizer-form');
const productInput = document.querySelector('#product-name');
const feedback = document.querySelector('#form-feedback');
const cartCount = document.querySelector('#cart-count');
const toast = document.querySelector('#toast');
let cart = [];
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
document.querySelectorAll('[data-open-customizer]').forEach(button => button.addEventListener('click', () => {
  productInput.value = button.dataset.product || 'Regalo personalizado';
  feedback.textContent = '';
  modal.showModal();
}));
document.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
customizerForm?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(customizerForm);
  const item = {
    producto: data.get('producto'),
    ocasion: data.get('ocasion'),
    tematica: data.get('tematica'),
    dedicatoria: data.get('dedicatoria'),
    complementos: data.getAll('extras')
  };
  cart.push(item);
  cartCount.textContent = cart.length;
  feedback.textContent = '¡Tu solicitud se agregó al carrito!';
  showToast(`${item.producto} agregado al carrito`);
  customizerForm.reset();
  window.setTimeout(() => modal.close(), 900);
});
document.querySelector('.cart-button')?.addEventListener('click', () => {
  if (!cart.length) return showToast('Tu carrito está vacío. ¡Elige un regalo!');
  const summary = cart.map((item, index) => `${index + 1}. ${item.producto} (${item.ocasion})`).join(' · ');
  showToast(`En tu carrito: ${summary}`);
});
