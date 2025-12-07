document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("header.html")
  .then(res => res.text())
  .then(html => {
    const headerEl = document.getElementById("header");
    headerEl.outerHTML = html; // REPLACE <header id="header"> completely
    initHeader();
  });


  // Load Footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      const footerDiv = document.getElementById("footer");
      footerDiv.innerHTML = html;

      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    });

  // Initialize modal after DOM ready
  initBookingModal();
});

// Hamburger toggle
function initHeader() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// Booking modal functionality
function initBookingModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalMovie = document.getElementById('modalMovie');

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-movie]');
    if (!btn) return;
    const movie = btn.getAttribute('data-movie') || 'Movie';
    modalMovie.textContent = movie;
    modal.setAttribute('aria-hidden', 'false');
  });

  modalClose?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  cancelBtn?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const seats = data.get('seats');
    const date = data.get('date');
    const movie = modalMovie.textContent;
    modal.setAttribute('aria-hidden', 'true');
    alert(`Confirmed ${seats} seat(s) for "${movie}" on ${date || 'selected date'}.`);
    bookingForm.reset();
  });
}

 // Navigate to MovieDetailsPage on card click
    document.getElementById('moviesGrid')?.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if (!card) return;

      // Ignore clicks on book buttons
      if (e.target.closest('button')) return;

      const movie = card.getAttribute('data-movie');
      if (movie) {
        window.location.href = `MovieDetailsPage.html?movie=${encodeURIComponent(movie)}`;
      }
    });

    // Optional: Coming Soon cards can also redirect if you want
    document.getElementById('comingSoonGrid')?.addEventListener('click', e => {
      const card = e.target.closest('.card');
      if (!card) return;
      if (e.target.closest('button')) return;

      const movie = card.getAttribute('data-movie');
      if (movie) {
        window.location.href = `MovieDetailsPage.html?movie=${encodeURIComponent(movie)}`;
      }
    });
