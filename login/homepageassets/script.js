const GOOGLE_API = "AIzaSyCmft7p8_8hbzvw6xJTWq1D2AcR_flHDHc";
const GOOGLE_API_URL = "https://www.googleapis.com/books/v1/volumes?";

const displayMore = document.getElementById("BMfull");
const Bookbutton = document.querySelector(".buttonBooK");
const Moviebutton = document.querySelector(".buttonMovie");
const selectElement = document.getElementById("subjectSelector");

displayMore.style.display = "none";

const close = document.querySelector(".close");
close.addEventListener("click",() =>{

window.location.href="login.html";

})


const refreshlogo= document.getElementById("BM");
refreshlogo.addEventListener("click", () => {
  location.reload();
});

Bookbutton.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  displayMore.style.display = "none";
  selectElement.disabled = false;
  selectElement.selectedIndex = 0;
  document.body.style.backgroundImage = "none";
  searchBM(searchInput);
});

Moviebutton.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.trim();
  displayMore.style.display = "none";
  selectElement.disabled = true;
  document.body.style.backgroundImage = "none";
  searchBMmovie(searchInput);
});

subjectSelector.addEventListener("change", () => {
  const selectedType = document.getElementById("subjectSelector").value;
  document.getElementById("searchInput").value = "";
  displayMore.style.display = "none";
  document.body.style.backgroundImage = "none";
  searchBySubject(selectedType);
});

function searchBySubject(selectedSubject) {
  if (selectedSubject) {
    // Perform a search based on the selected subject
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${selectedSubject}`
    )
      .then((response) => response.json())
      .then((data) => {
        SearchResult(data.items);
      });
  }
}

function searchBM(title) {
  let apiUrl = `${GOOGLE_API_URL}q=${title}&key=${GOOGLE_API}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.items && data.items.length > 0) {
        SearchResult(data.items);
      } else {
        const BMcontainer = document.getElementById("BMContainer");
        BMcontainer.innerHTML = "No results found.";
      }
    });
}

function SearchResult(results) {
  const BMcontainer = document.getElementById("BMContainer");
  BMcontainer.innerHTML = "";

  results.forEach((item) => {
    const self = item.selfLink;
    const selfR = self.replace(/"|"/g, "");
    console.log(selfR);

    fetch(selfR)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const BMcard = document.createElement("div");
          BMcard.classList.add("BM-card");

          const poster = document.createElement("img");
          poster.classList.add("BM-poster");
          poster.src =
            data.Poster !== "N/A"
              ? data.volumeInfo.imageLinks.thumbnail
              : "placeholder.jpg";
          poster.alt = data.volumeInfo.title + " Poster";
          BMcard.appendChild(poster);

          const title = document.createElement("h2");
          title.classList.add("BM-title");
          title.textContent = data.volumeInfo.title;
          BMcard.appendChild(title);

          const author = document.createElement("p");
          author.classList.add("BM-author");
          author.textContent = `Author(s): ${data.volumeInfo.authors.join(
            ", "
          )}`; //*********/
          BMcard.appendChild(author);

          const rating = document.createElement("p");
          rating.classList.add("BM-rating");
          if (data.volumeInfo.averageRating) {
            rating.textContent = `Rating: ${data.volumeInfo.averageRating}/5`;
          } else {
            rating.textContent = `Rating: N/A`;
          }

          BMcard.appendChild(rating);

          const date = document.createElement("p");
          date.classList.add("BM-PublishDate");
          date.textContent = `PublishDate: ${item.volumeInfo.publishedDate}`;
          BMcard.appendChild(date);
          const pageCount = document.createElement("p");
          pageCount.classList.add("BM-pagecount");
          pageCount.textContent = `PageCount: ${data.volumeInfo.pageCount}`;
          BMcard.appendChild(pageCount);
          BMcontainer.appendChild(BMcard);

          BMcard.addEventListener("click", () => {
            displayMore.innerHTML = "";
            displayMore.style.display = "none";
            showDetails(data);
          });
        }
      });
  });
}

function showDetails(data) {
  displayMore.style.display = "inherit";

  const cat = data.volumeInfo.categories;
  if (cat && cat.length > 0) {
    displayMore.innerHTML = `
    <button class="cross-button con">
    <i class="fas fa-times"></i>
  </button>
  <div class="row">
    <div class="col-md-4">
      <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="${
      data.volumeInfo.title
    } Poster" class="BM-poster">
    </div>
    <div class="col-md-8">
      <h2>${data.volumeInfo.title}</h2>
      <p><strong>Plot:</strong> ${data.volumeInfo.description}</p>
      <p><strong>Publisher:</strong> ${data.volumeInfo.publisher}</p>
      <p><strong>Author(s):</strong> ${data.volumeInfo.authors.join(", ")}</p>
      <p><strong>Categories:</strong> ${data.volumeInfo.categories[0]}</p>
      <p><strong>Language:</strong> ${data.volumeInfo.language}</p>
    </div>
  </div>
`;
  } else {
    displayMore.innerHTML = `
    <button class="cross-button con">
    <i class="fas fa-times"></i>
  </button>
    <div class="row">
      <div class="col-md-4">
        <img src="${data.volumeInfo.imageLinks.thumbnail}" alt="${
      data.volumeInfo.title
    } Poster" class="BM-poster">
      </div>
      <div class="col-md-8">
        <h2>${data.volumeInfo.title}</h2>
        <p><strong>Plot:</strong> ${data.volumeInfo.description}</p>
        <p><strong>Publisher:</strong> ${data.volumeInfo.publisher}</p>
        <p><strong>Author(s):</strong> ${data.volumeInfo.authors.join(", ")}</p>
        <p><strong>Categories:</strong> N/A </p>
        <p><strong>Language:</strong> ${data.volumeInfo.language}</p>
      </div>
    </div>
  
  `;
  
  }
  document.querySelector(".cross-button").addEventListener('click', () => {
    displayMore.style.display = "none";
  });
}

document.getElementById("toggle").addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

document.getElementById("toggle").addEventListener("change", function () {

  const toggleOff = document.querySelector(".off");
  const toggleOn = document.querySelector(".on");

  if (this.checked) {
    document.body.style.backgroundImage = "none";
    toggleOn.classList.add("on");
    toggleOff.classList.add("on");
  } else {
    toggleOff.classList.remove("on");
    toggleOn.classList.remove("on");
  }
});

function searchBMmovie(searchInput) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzM4MmMzYzA4NDdlNDE1NGVjYjgwMTlhZWE5YTdlZCIsInN1YiI6IjY1NzMyMTZjMDA2YjAxMDBlMWE5Njk1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aMC7gkYtOgWYnbCxLMOHVpVSGVdX6kaFTIjFpDwUASo",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results) {
        SearchResult(data.results);
      } else {
        const MContainer = document.getElementById("BMContainer");
        MContainer.innerHTML = "No results.";
      }
    });

  function SearchResult(results) {
    const MContainer = document.getElementById("BMContainer");
    MContainer.innerHTML = "";

    results.forEach((movie) => {
      const BMcard = document.createElement("div");
      BMcard.classList.add("BM-card");

      const poster = document.createElement("img");
      poster.classList.add("BM-poster");
      if (movie.poster_path && movie.poster_path !== "N/A") {
        poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      }
      poster.alt = movie.title + " Poster";
      BMcard.appendChild(poster);

      const title = document.createElement("h2");
      title.classList.add("BM-title");
      title.textContent = movie.title;
      BMcard.appendChild(title);

      const date = document.createElement("p");
      date.classList.add("BM-PublishDate");
      date.textContent = `Release Date: ${movie.release_date}`;
      BMcard.appendChild(date);

      BMcard.addEventListener("click", () => {
        displayMore.innerHTML = "";
        displayMore.style.display = "none";
        showMovieDetails(movie);
      });

      MContainer.append(BMcard);
    });
  }
}

function showMovieDetails(data) {

  displayMore.style.display = "inherit";

  if (data) {
    displayMore.innerHTML = `
    <button class="cross-button con">
  <i class="fas fa-times"></i>
</button>
      <div class="row">
        <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title} Poster" class="BM-poster">
        </div>
        <div class="col-md-8">
          <h2>${data.title}</h2> 
          <p><strong>Plot:</strong> ${data.overview}</p>
          <p><strong>Release_date:</strong> ${data.release_date}</p>
          <p><strong>Rating:</strong> ${data.vote_average}/10</p>
          <p><strong>Adult:</strong> ${data.adult}</p>
          <p><strong>Language:</strong> ${data.original_language}</p>
          
          <p><strong>Popularity:</strong>${data.popularity}/300</p>
        </div>
      </div>
    `;

    document.querySelector(".cross-button").addEventListener('click', () => {
      displayMore.style.display = "none";
    });
  }
}


