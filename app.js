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

    // Movie data
    const movies = {
      "Gagamboy": { poster: "Images/Gagamboy_Movie.jpg", duration: "148 mins", description: "Action-packed superhero adventure." },
      "Wapakman": { poster: "Images/Wapakman.jpg", duration: "126 mins", description: "Comedy superhero with heartwarming moments." },
      "Ang Panday": { poster: "Images/Ang Panday.jpg", duration: "97 mins", description: "Classic Filipino fantasy adventure." },
      "Bahay na Pula": { poster: "Images/Bahay na Pula.jpg", duration: "120 mins", description: "Horror thriller set in a haunted mansion." },
      "Kumander Ulupong": { poster: "Images/Kumander Ulupong.jpg", duration: "134 mins", description: "Historical action film with epic battles." }
    };

    function getMovieFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('movie') || null;
    }

    function renderMovieDetails(movieName) {
      const container = document.getElementById('movieDetails');
      if (!movieName || !movies[movieName]) {
        container.innerHTML = `<h2 class="section-title">Movie Not Found</h2>`;
        return;
      }

      const movie = movies[movieName];

      container.innerHTML = `
        <div class="movie-highlight">
          <img src="${movie.poster}" alt="${movieName} poster" />
          <div class="highlight-body">
            <h2>${movieName}</h2>
            <p class="muted">${movie.duration}</p>
            <p>${movie.description}</p>
            <div class="highlight-actions">
              <button class="btn primary" data-movie="${movieName}">Book Tickets Now</button>
            </div>
          </div>
        </div>
      `;
    }

  document.addEventListener("DOMContentLoaded", () => {
  const movieName = getMovieFromURL();
  renderMovieDetails(movieName);

  const movieDetailsContainer = document.getElementById('movieDetails');
  if (movieDetailsContainer) {
    // Redirect to showtime page instead of modal
    movieDetailsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-movie]');
      if (!btn) return;

      const movie = btn.getAttribute('data-movie');
      window.location.href = `showtime.html?movie=${encodeURIComponent(movie)}`;
    });
  } else {
    initBookingModal(); // Only init modal on main page
  }
});



