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
    "Kumander Ulupong": { poster: "../Images/Kumander Ulupong.jpg", duration: "134 mins", description: "Historical action film with epic battles." },
    "Meet, Greet & Bye": { poster: "../Images/Meet-greet-bye.jpg", duration: "106 mins", description: "A mom who loves K-dramas quits chemo, having lost hope. Her last wish is meeting her favorite K-drama star visiting Manila. Her four kids promise to help if she returns to treatment afterward." },
    "Crazy Beautiful You": { poster: "../Images/Crazy_Beautiful_You,_Movie_Poster.jpg", duration: "114 mins", description: "A spoiled young girl is forced to tag along with her mom on a medical mission in Tarlac. There she meets a young man from a different world who shows her another side of life." },
    "I'm drunk, I love you": {poster: "../Images/IDILYposter.jpg", duration: "140 mins", description: "Days before graduation, two college best friends go on one last road trip where they settle how they really feel for each other. But to put it upfront, this is not a love story."},
    "Instant daddy": {poster: "../Images/Instant_daddy.jpeg", duration: "112 mins", description: "Valentin Roxas was raised by his Tatay Lito alone, when his mother left them to work abroad when he was seven. To maintain a sense of normalcy, Lito wrote young Val letters supposedly from his mother promising that she would come back."},
    "Everything About Her": { poster: "../Images/Everything About Her.jpg", duration: "127 mins", description: "When powerful businesswoman Vilma Santos falls seriously ill, she navigates her complicated relationship with her caregiver, Angel Locsin, and her estranged son Xian Lim in this story about acceptance, love, and forgiveness." },
    "Kahit Butas ng Karayom Papasukin ko": { poster: "../Images/Kahit Butas ng Karayom Papasukin ko.jpg", duration: "97 mins", description: "Daniel, a junior military officer, was reassigned in the battlefield of Mindanao after an argument with an influential person in Manila. Daniel's new unit in Zamboanga is composed of misbehaved and corrupt soldiers. The community does not have faith in his men and their impression on him is the same. Daniel starts working out the problem." },
    "Moron 5 and the Crying Lady": { poster: "../Images/Moron 5.jpg", duration: "100 mins", description: "Half-witted longtime friends Albert (Luis Manzano), Isaac (Billy Crawford), Mozart 'Mo' (DJ Durano), Michaelangelo 'Mike' (Martin Escudero), and Aristotle 'Aris' (Marvin Agustin) were used to living moronic, yet pretty normal and hassle-free lives until successful career woman Becky Pamintuan (John Lapus) accuses them of killing her father and ruins everything for them. The Moron 5 are more than sure of their innocence but they can't find a single satisfactory argument on how to prove it, especially when their opponent would do everything to punish them for whim. Spending three miserable years in prison trying different failed comedic attempts to get out, they finally figure out a way to escape. They stalk Becky and try to understand why she's fighting so hard to have them imprisoned when it's clear as day that what happened three years ago was a nonsense frame-up. An opportunity comes when Becky's driver gets fired for having an affair with her maid and Albert volunteers to apply to replace him. He infiltrates the Pamintuan Residence, and together with his four crazily daft friends, they gather information about the curious family, yet little of it makes sense, especially Becky's hatred for the quirky quintet. Why is Becky fighting so hard to have them suffer? The Moron 5 will try their hardest to know and hopefully understand what's going on--but by doing so, everything they hold dear might be at risk." },
    "Sukob": {poster: "../Images/Sukob_Poster.jpg", duration: "110 mins", description: "Sandy and Phil, both Overseas Workers in Dubai, are busy preparing for their wedding. Upon reaching her home, Sandy learns from her mother Daisy what happened to her friend Helen: a short time after Helen's father died, Helen proceeded with her wedding. A few weeks after the wedding, Helen's husband died in a plane crash."},
  };
  
const comingSoonMovies = {
    "Must be love": { poster: "../Images/Must be Love.jpg", duration: "100 mins", description: "Patricia falls in love with her childhood best friend Ivan, but he is in love with his cousin Angel. Will they ever be together?" },
    "Balota": { poster: "../Images/Balota_film_poster.jpeg", duration: "102 mins", description: "A teacher pays an increasingly steep price for defending the democratic process of the election." },
    "Si Agimat at si Enteng Kabisote": {poster: "../Images/Si_Agimat_at_si_Enteng_Kabisote.jpg", duration: "110 mins", description: "With the world of Amuleto and the kingdom of Engkantasya at risk, it is up to Enteng Kabistoe and Agimat to work together to save their worlds from the combined forces of Satana and Abugan."},
    "Ang tanging ina mo: Last na to!": {poster: "../Images/tanging-ina-mo_last-na-to.jpg", duration: "105 mins", description: "A dedicated mother is told that she only has a few months to live. She is determined to spend her remaining days with her family, but she takes that idea to a ridiculous extreme."},
    };

const popularMovies = {
    "Penduko": { poster: "../Images/Penduko.png", duration: "109 mins", description: "Hoping to profit from his occult gifts, a mystic joins a shadowy society and must confront his own darkness as he finds his place in the underworld." },
    "Petrang Kabayo": { poster: "../Images/Petrang Kabayo.jpg", duration: "118 mins", description: "Peter Kasimsiman was once a submissive son to his parents. But losing his mother at a tender age, left him with an abusive father who only knew of tending to his carriage horse, Brown Beauty."},
    "Sukob": {poster: "../Images/Sukob_Poster.jpg", duration: "110 mins", description: "Sandy and Phil, both Overseas Workers in Dubai, are busy preparing for their wedding. Upon reaching her home, Sandy learns from her mother Daisy what happened to her friend Helen: a short time after Helen's father died, Helen proceeded with her wedding. A few weeks after the wedding, Helen's husband died in a plane crash."},
  }

const heroMovies = {
    "Trip ubusan: The Lolas vs Zombies": {poster: "Images/Trip-Ubusan-The-Lolas-Vs-Zombies-Poster.jpeg", duration: "108 mins", description: "Lola Nidora, Lola Tinidora, and Lola Tidora of Kalyeserye, with their little niece Charmaine, attempt to survive a zombie outbreak."},
    "Woke up like this": {poster: "Images/wokeuplikethis.jpg", duration: "118 mins", description: "A story about Nando who's a dutiful son and breadwinner to his family and Sabrina a rich kid and one of the top models in the country. While both prepare for their biggest breaks, these two strangers wake up one day in an extraordinary circumstance switching bodies with each other."},
    "Must be love": { poster: "Images/Must be Love.jpg", duration: "100 mins", description: "Patricia falls in love with her childhood best friend Ivan, but he is in love with his cousin Angel. Will they ever be together?" },
    "Penduko": { poster: "Images/Penduko.png", duration: "109 mins", description: "Hoping to profit from his occult gifts, a mystic joins a shadowy society and must confront his own darkness as he finds his place in the underworld." },
    }

  function getMovieFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie') || null;
  }

// MOVIE DETAILS
function renderMovieDetails(movieName) {
  const container = document.getElementById('movieDetails');
  if (!container) return;

  var allMovies = Object.assign({}, popularMovies, nowShowingMovies, comingSoonMovies, heroMovies);

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
        <h3>₱ 250</h3>
        <p>Overview: </p>
        <p>${movie.description}</p><br>
        <br>
        <div class="highlight-actions">
          <button class="btn primary" data-movie="${movieName}">Book Tickets Now</button>
        </div>
      </div>
    </div>
  `;
}

document.getElementById('heroMovies')?.addEventListener('click', (e) => {
  const card = e.target.closest('.hero-movie-card');
  if (!card) return;

  const movie = card.getAttribute('data-movie');
  if (movie) {
    window.location.href = `pages/MovieDetailsPage.html?movie=${encodeURIComponent(movie)}`;
  }
});


// MOVIE PAGE
function renderMoviesGrid(containerId, movies, includeBookButton = false, cardClass = 'card') {
  const container = document.getElementById(containerId);
  if (!container) return; // nothing to render
  container.innerHTML = '';
  
  for (const title in movies) {
    const movie = movies[title];
    const card = document.createElement('article');
    card.className = cardClass;           // <-- use custom class
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
  } 
  // else {
  //   initBookingModal(); // Only init modal on main page
  // }

      renderMoviesGrid('moviesGrid', nowShowingMovies, true);
      renderMoviesGrid('comingSoonGrid', comingSoonMovies, true);
      renderMoviesGrid('popularGrid', popularMovies)
      renderMoviesGrid('heroMovies', heroMovies, false, 'hero-movie-card');

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



