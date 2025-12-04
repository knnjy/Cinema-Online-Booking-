// Minimal interactivity: hamburger, modal booking, year
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger toggle for small screens
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Booking modal
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalMovie = document.getElementById('modalMovie');

  // Open modal when any booking button is clicked
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-movie]');
    if (!btn) return;
    const movie = btn.getAttribute('data-movie') || 'Movie';
    modalMovie.textContent = movie;
    modal.setAttribute('aria-hidden', 'false');
  });

  // Close handlers
  modalClose?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  cancelBtn?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  // Fake submit
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const seats = data.get('seats');
    const date = data.get('date');
    const movie = modalMovie.textContent;
    modal.setAttribute('aria-hidden', 'true');

    // Simple confirmation — replace with real flow
    alert(`Confirmed ${seats} seat(s) for "${movie}" on ${date || 'selected date'}.`);
    bookingForm.reset();
  });
});
