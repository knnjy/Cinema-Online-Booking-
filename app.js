document.addEventListener("DOMContentLoaded", () => {
  // Load Header
  fetch("../components/header.html")
  .then(res => res.text())
  .then(html => {
    const headerEl = document.getElementById("header");
    headerEl.outerHTML = html; // REPLACE <header id="header"> completely
    initHeader();
  });


  // Load Footer
  fetch("../components/footer.html")
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
const nowShowingMovies = {
    "Gagamboy": { poster: "../Images/Gagamboy_Movie.jpg", duration: "148 mins", description: "After eating a spider doused in radioactive waste, ordinary ice cream vendor Junie uses his newfound powers to fight his rival, who becomes a mutated monster after he unknowingly ate a cockroach with the same radioactive element." },
    "Wapakman": { poster: "../Images/Wapakman.jpg", duration: "126 mins", description: "A Filipino superhero must decide if saving the world is worth leaving his children behind." },
    "Ang Panday": { poster: "../Images/Ang Panday.jpg", duration: "97 mins", description: "Forging a sword made from a meteor that fell from the sky, Flavio, alongside his dragon partner Bagwis, are soon thrust into a battle against the evil forces of Lizardo." },
    "Bahay na Pula": { poster: "../Images/Bahay na Pula.jpg", duration: "120 mins", description: "A woman and her husband come home to an old ancestral house she inherited from her grandma. As days go by, they realize something evil is living with them in the house." },
    "Kumander Ulupong": { poster: "../Images/Kumander Ulupong.jpg", duration: "134 mins", description: "Historical action film with epic battles." }
  };
  
const comingSoonMovies = {
    "Dilim": { poster: "../Images/Dilim.jpg", duration: "148 mins", description: "" },
    "Everything About Her": { poster: "../Images/Everything About Her.jpg", duration: "126 mins", description: "" },
    "Kahit Butas ng Karayom Papasukin ko": { poster: "../Images/Kahit Butas ng Karayom Papasukin ko.jpg", duration: "97 mins", description: "" },
    "Moron 5": { poster: "../Images/Moron 5.jpg", duration: "120 mins", description: "" },
  };

  function getMovieFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || null;
  }

// MOVIE DETAILS
function renderMovieDetails(movieName) {
  const container = document.getElementById('movieDetails');
  if (!container) return;

  // Look for the movie in both nowShowing and comingSoon
  let movie = nowShowingMovies[movieName] || comingSoonMovies[movieName];

  if (!movie) {
    container.innerHTML = `<h2 class="section-title">Movie Not Found</h2>`;
    return;
  }

  container.innerHTML = `
    <div class="movie-highlight">
      <img src="${movie.poster}" alt="${movieName} poster" />
      <div class="highlight-body">
        <h2>${movieName}</h2>
        <p class="muted">${movie.duration}</p>
        
        <p>${movie.description}</p><br>
        <br>
        <div class="highlight-actions">
          <button class="btn primary" data-movie="${movieName}">Book Tickets Now</button>
        </div>
      </div>
    </div>
  `;
}

// MOVIE PAGE
function renderMoviesGrid(containerId, movies, includeBookButton = false) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      for (const title in movies) {
        const movie = movies[title];
        const card = document.createElement('article');
        card.className = 'card';
        card.setAttribute('data-movie', title);

        card.innerHTML = `
          <img src="${movie.poster}" alt="${title} poster" />
          <div class="card-body">
            <h3>${title}</h3>
            <p>${movie.duration}</p>
            ${includeBookButton ? `<button class="btn primary" data-movie="${title}">Book</button>` : ''}
          </div>
        `;
        container.appendChild(card);
      }
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

      renderMoviesGrid('moviesGrid', nowShowingMovies);
      renderMoviesGrid('comingSoonGrid', comingSoonMovies, true);

      // Card click -> movie details page
      document.getElementById('moviesGrid').addEventListener('click', e => {
        const card = e.target.closest('.card');
        if (!card) return;
        if (e.target.closest('button')) return; // Ignore clicks on button
        const movie = card.getAttribute('data-movie');
        if (movie) window.location.href = `MovieDetailsPage.html?movie=${encodeURIComponent(movie)}`;
      });

      document.getElementById('comingSoonGrid').addEventListener('click', e => {
        const card = e.target.closest('.card');
        if (!card) return;
        if (e.target.closest('button')) return;
        const movie = card.getAttribute('data-movie');
        if (movie) window.location.href = `MovieDetailsPage.html?movie=${encodeURIComponent(movie)}`;
      });

      // Book buttons -> showtime page
      document.querySelectorAll('.btn.primary[data-movie]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const movie = btn.getAttribute('data-movie');
          window.location.href = `showtime.html?movie=${encodeURIComponent(movie)}`;
        });
      });
});



