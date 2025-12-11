document.addEventListener("DOMContentLoaded", () => {
  // Determine path to components folder depending on current page location.
  // When on /pages/* we need '../components/', but on root pages we need './components/'
  const componentsPath = window.location.pathname.includes('/pages/') ? '../components/' : './components/';

  // Load Header
  fetch(componentsPath + "header.html")
    .then(res => res.text())
    .then(html => {
      const headerEl = document.getElementById("header");
      if (headerEl) headerEl.outerHTML = html; // REPLACE header placeholder
      initHeader();
    })
    .catch(err => console.warn('Failed to load header:', err));

  // Load Footer
  fetch(componentsPath + "footer.html")
    .then(res => res.text())
    .then(html => {
      const footerDiv = document.getElementById("footer");
      if (footerDiv) footerDiv.innerHTML = html;

      const yearEl = document.getElementById("year");
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    })
    .catch(err => console.warn('Failed to load footer:', err));

  // Initialize modal after DOM ready
  initBookingModal();
});

// Hamburger toggle
function initHeader() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      if (nav) nav.classList.toggle('open');
    });
  }
}

// Booking modal functionality
function initBookingModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalMovie = document.getElementById('modalMovie');

  // Global click handler: open booking modal when any element with [data-movie] is clicked
  document.body.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-movie]') : null;
    if (!btn) return;
    var movie = btn.getAttribute('data-movie') || 'Movie';
    if (modalMovie) modalMovie.textContent = movie;
    if (modal) modal.setAttribute('aria-hidden', 'false');
  });

  if (modalClose) {
    modalClose.addEventListener('click', function () { if (modal) modal.setAttribute('aria-hidden', 'true'); });
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function () { if (modal) modal.setAttribute('aria-hidden', 'true'); });
  }
  if (modal) {
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(bookingForm);
      var seats = data.get('seats');
      var date = data.get('date');
      var movie = modalMovie ? modalMovie.textContent : 'Movie';
      if (modal) modal.setAttribute('aria-hidden', 'true');
      alert('Confirmed ' + seats + ' seat(s) for "' + movie + '" on ' + (date || 'selected date') + '.');
      bookingForm.reset();
    });
  }
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
    "Everything About Her": { poster: "../Images/Everything About Her.jpg", duration: "127 mins", description: "When powerful businesswoman Vilma Santos falls seriously ill, she navigates her complicated relationship with her caregiver, Angel Locsin, and her estranged son Xian Lim in this story about acceptance, love, and forgiveness." },
    "Kahit Butas ng Karayom Papasukin ko": { poster: "../Images/Kahit Butas ng Karayom Papasukin ko.jpg", duration: "97 mins", description: "Daniel, a junior military officer, was reassigned in the battlefield of Mindanao after an argument with an influential person in Manila. Daniel's new unit in Zamboanga is composed of misbehaved and corrupt soldiers. The community does not have faith in his men and their impression on him is the same. Daniel starts working out the problem." },
    "Moron 5 and the Crying Lady": { poster: "../Images/Moron 5.jpg", duration: "100 mins", description: "Half-witted longtime friends Albert (Luis Manzano), Isaac (Billy Crawford), Mozart 'Mo' (DJ Durano), Michaelangelo 'Mike' (Martin Escudero), and Aristotle 'Aris' (Marvin Agustin) were used to living moronic, yet pretty normal and hassle-free lives until successful career woman Becky Pamintuan (John Lapus) accuses them of killing her father and ruins everything for them. The Moron 5 are more than sure of their innocence but they can't find a single satisfactory argument on how to prove it, especially when their opponent would do everything to punish them for whim. Spending three miserable years in prison trying different failed comedic attempts to get out, they finally figure out a way to escape. They stalk Becky and try to understand why she's fighting so hard to have them imprisoned when it's clear as day that what happened three years ago was a nonsense frame-up. An opportunity comes when Becky's driver gets fired for having an affair with her maid and Albert volunteers to apply to replace him. He infiltrates the Pamintuan Residence, and together with his four crazily daft friends, they gather information about the curious family, yet little of it makes sense, especially Becky's hatred for the quirky quintet. Why is Becky fighting so hard to have them suffer? The Moron 5 will try their hardest to know and hopefully understand what's going on--but by doing so, everything they hold dear might be at risk." },
  };

const popularMovies = {
    "Petrang Kabayo": { poster: "../Images/Petrang Kabayo.jpg", duration: "118 mins", description: "Peter Kasimsiman was once a submissive son to his parents. But losing his mother at a tender age, left him with an abusive father who only knew of tending to his carriage horse, Brown Beauty. Peter is eager to win the love and attention of his indifferent Tatay. But an unfortunate incident forces him to run away from home. His horrible life starts to change its course when he meets the nurturing haciendera Helena who provides him shelter and unconditional affection he knew his father would never be able to give. Helena teaches Peter love and kindness, grooming him as the sole heir to the hacienda in the event of her death. Albeit fueled with the guidance of the good-natured foster mother, who's known for her passionate concern for her employees, Peter has an intolerable bad temper especially towards her mother's loyal servant, Maita and the latter's beautiful and gifted daughter, Samantha. Peter's almost perfect life is threatened as people from the hacienda adore the beauty and goodwill of Samantha. These include the estate's striking horse trainer, Erickson, the good-looking veterinarian, Dickson and even the trusted estate horse, Sylvester. Add the unwanted presence of his long-lost sister, Peter's life seemed like an everyday living hell. Little did Peter know that Diobayo, the Goddess of Horses, watches every move he makes as he grows oblivious to other people and the surrounding horses' needs. To teach Peter a painful lesson, Diobayo cursed him transforming him into the horse, Petra, whenever he acts surly and proud. Will Peter choose to continue his grumpy personality? Or will he be able to use his 'horse instinct' to change for the better?" },
    "Must be love": { poster: "../Images/Must be Love.jpg", duration: "100 mins", description: "Patricia falls in love with her childhood best friend Ivan, but he is in love with his cousin Angel. Will they ever be together?" },
    "Penduko": { poster: "../Images/Penduko.png", duration: "109 mins", description: "Hoping to profit from his occult gifts, a mystic joins a shadowy society and must confront his own darkness as he finds his place in the underworld." },
}

  function getMovieFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || null;
  }

// MOVIE DETAILS
function renderMovieDetails(movieName) {
  const container = document.getElementById('movieDetails');
  if (!container) return;

  var allMovies = Object.assign({}, popularMovies, nowShowingMovies, comingSoonMovies);

  if (!movieName || !allMovies[movieName]) {
    container.innerHTML = `<h2 class="section-title">Movie Not Found</h2>`;
    return;
  }

  const movie = allMovies[movieName];

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
  if (!container) return; // nothing to render on this page
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

      renderMoviesGrid('moviesGrid', nowShowingMovies, true);
      renderMoviesGrid('comingSoonGrid', comingSoonMovies, true);
      renderMoviesGrid('popularGrid', popularMovies)

      // Card click -> movie details page (only attach if grids exist)
      var moviesGridEl = document.getElementById('moviesGrid');
      if (moviesGridEl) {
        moviesGridEl.addEventListener('click', function (e) {
          var card = e.target.closest ? e.target.closest('.card') : null;
          if (!card) return;
          if (e.target.closest && e.target.closest('button')) return; // Ignore clicks on button
          var movie = card.getAttribute('data-movie');
          if (movie) window.location.href = 'MovieDetailsPage.html?movie=' + encodeURIComponent(movie);
        });
      }

      var comingSoonGridEl = document.getElementById('comingSoonGrid');
      if (comingSoonGridEl) {
        comingSoonGridEl.addEventListener('click', function (e) {
          var card = e.target.closest ? e.target.closest('.card') : null;
          if (!card) return;
          if (e.target.closest && e.target.closest('button')) return;
          var movie = card.getAttribute('data-movie');
          if (movie) window.location.href = 'MovieDetailsPage.html?movie=' + encodeURIComponent(movie);
        });
      }

      var popularGridEl = document.getElementById('popularGrid');
      if (popularGridEl) {
        popularGridEl.addEventListener('click', function (e) {
          var card = e.target.closest ? e.target.closest('.card') : null;
          if (!card) return;
          if (e.target.closest && e.target.closest('button')) return;
          var movie = card.getAttribute('data-movie');
          if (movie) {
            window.location.href = 'pages/MovieDetailsPage.html?movie=' + encodeURIComponent(movie);
          }
        });
      }

      // Book buttons -> showtime page (compatible iteration)
      var bookBtns = document.querySelectorAll('.btn.primary[data-movie]');
      for (var i = 0; i < bookBtns.length; i++) {
        (function (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var movie = btn.getAttribute('data-movie');
            window.location.href = 'showtime.html?movie=' + encodeURIComponent(movie);
          });
        })(bookBtns[i]);
      }
});



