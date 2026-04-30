const menuButton = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');
const form = document.querySelector('#reservation-form');
const formMessage = document.querySelector('#form-message');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const date = String(data.get('date') || '').trim();
    const guests = Number(data.get('guests'));

    if (name.length < 2) {
      formMessage.textContent = 'Por favor escribe un nombre válido.';
      return;
    }

    if (!email.includes('@')) {
      formMessage.textContent = 'Ingresa un correo válido.';
      return;
    }

    if (!date) {
      formMessage.textContent = 'Selecciona una fecha para la reserva.';
      return;
    }

    if (!Number.isFinite(guests) || guests < 1) {
      formMessage.textContent = 'El número de personas debe ser mayor a 0.';
      return;
    }

    formMessage.textContent = `¡Gracias ${name}! Tu reserva para ${guests} personas el ${date} fue enviada.`;
    form.reset();
  });
}