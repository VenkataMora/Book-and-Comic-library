/*select popular card area from html*/
var cardEl = $(".popular");
var cardElBooks = $(".popular-books");


var moviesContentLoaded = false;
  var booksContentLoaded = false;
document.addEventListener('DOMContentLoaded', function () {
  

  // Add click event listener to movie and book nav item
  document.querySelectorAll('.navMenuItem').forEach(function (menuItem) {
      menuItem.addEventListener('click', function () {
          // Get the data-action attribute value
          var action = this.getAttribute('data-action');

          // Toggle content based on the clicked menu item
          switch (action) {
              case 'displayMovies':
                  toggleContent('moviesContent');
                  if (!moviesContentLoaded) {
                    getPopularMovies();
                    moviesContentLoaded = true;
                    booksContentLoaded = false;
                  }
                  break;
              case 'displayBooks':
                toggleContent('booksContent');
                if (!booksContentLoaded) {
                  getPopularBooks();
                  booksContentLoaded = true;
                  moviesContentLoaded = false;
                  break;
          }
        }
      });
  })

  // Set "Books" as the default content
  if (!booksContentLoaded) {
  toggleContent('booksContent');
  booksContentLoaded = true;
  getPopularBooks();
  }
});

// Function to toggle content visibility
function toggleContent(contentId) {
  // Hide all content
  document.querySelectorAll('.content').forEach(function (content) {
    //  content.style.display = 'none';
  // Update search bar placeholder based on selected content
  var placeholderText = contentId === 'booksContent' ? 'Search books' : 'Search movies';
  updateSearchPlaceholder(placeholderText);    
  });

  // Function to update search bar placeholder text
function updateSearchPlaceholder(placeholderText) {
  $("#searchInput").attr("placeholder", placeholderText);
}

  // Show the selected content
  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
      selectedContent.style.display = 'block';
  }

}


/*function to retrieve title from input field*/
function retrieveInput(contentType){
    var contentToFind = $("#searchInput").val();
    
    $("#searchInput").val("");
    
   
    if (contentType === 'movies') {
      var encodedQuery = encodeURIComponent(contentToFind);
      searchMovies(encodedQuery);
    } else if (contentType === 'books') {
      var encodedQuery = contentToFind.replaceAll(' ', '+');
      searchBooks(encodedQuery);
     
    }
}


/* fetch popular movies */
function getPopularMovies(){
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=508802ece2ca30bf4e12404d03d92af6')
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    displayPopularMovies(data);
  });
}   





/* display 20 popular movies dinamically in Boostrap cards */
function displayPopularMovies(data){
      console.log(data);
        var row = $("<div/>").addClass("row");
        cardEl.append(row);
        for (var i = 0 ; i < data.results.length ; i++){
        var card = $("<div/>");
        card.addClass("card");
        card.addClass("card mb-3");
        card.css({"width" : "18rem"});
        card.css({"margin-right" : "1rem", "margin-top" : "1rem"});
        $(".card").css("cursor", "pointer");
        card.attr("data-title", data.results[i].title);
        var image = $("<img/>");
        image.addClass("card-img-top");
        image.attr("src", "https://image.tmdb.org/t/p/original/" + data.results[i].poster_path);
        image.attr("alt", "movie image");
        var cardBody = $("<div/>");
        var title = $("<h5/>");
        title.text(data.results[i].title);
        var release = $("<p/>");
        release.text("Released: " + data.results[i].release_date);
        cardBody.append(title, release);
        card.append(image, cardBody);
        row.append(card);
      }

    }


/* function for searching movies by title using search form in nav menu*/    
function searchMovies(title){
    fetch('https://api.themoviedb.org/3/search/movie?api_key=508802ece2ca30bf4e12404d03d92af6&query=' + title)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      displayMovie(data);
    });
}

/*function to display more details of a movie */
var containerEl = $(".flex-container");
function displayMovie(movie){
    cardEl.empty();
    console.log(movie);
    var image = $("<img/>");
    image.attr("src", "https://image.tmdb.org/t/p/original/" + movie.results[0].poster_path);
    image.attr("alt", "movie image");
    image.css({"width" : "22rem"});
    var details = $("<div/>");
    var title = $("<h3>");
    title.text(movie.results[0].title);
    var description = $("<div/>");
    description.text(movie.results[0].overview);
    var popularity = $("<div/>");
    popularity.text("Popularity: " + movie.results[0].popularity);
    var released = $("<div/>");
    released.text("Released: " + movie.results[0].release_date);
    details.append(title, description, popularity, released);
    containerEl.append(image, details);
}

$("body").on("click", ".popular .card",function(){
    cardEl.empty();
    searchMovies($(this).attr("data-title"));
});

function getPopularBooks(){
  //fetch the good rated books from open library
  fetch('https://openlibrary.org/search.json?q=*&sort=rating&limit=20')
.then(function (response) {
  return response.json();
}).then(function (data) {
 displayPopularBooks(data);
});
}

function  displayPopularBooks(data){
  console.log(data);
  var row = $("<div/>").addClass("row");
  cardElBooks.append(row);
  for (var i = 0 ; i < data.docs.length ; i++){
  var card = $("<div/>");
  card.addClass("card");
  card.addClass("card mb-3");
  card.css({"width" : "18rem"});
  card.css({"margin-right" : "1rem", "margin-top" : "1rem"});
  $(".card").css("cursor", "pointer");
  card.attr("data-title", data.docs[i].title);
  var image = $("<img/>");
  image.addClass("card-img-top");
  image.attr("src", "https://covers.openlibrary.org/b/id/" + data.docs[i].cover_i + "-L.jpg");
  image.attr("alt", "book image");
  var cardBody = $("<div/>");
  var title = $("<h5/>");
  title.text(data.docs[i].title);
  var release = $("<p/>");
  release.text("Published: " + data.docs[i].publish_year);
  cardBody.append(title, release);
  card.append(image, cardBody);
  row.append(card);
}
}

function searchBooks(title){
    
    var apiUrl = "https://openlibrary.org/search.json?q=" + title;
  
    // Fetch data from openlibrary API
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayBook(data);
      });
  }
  


  //display more details of a book
  var containerEl2 = $(".flex-container2");
  function displayBook(data){
    cardElBooks.empty();
    containerEl2.empty();
      var image = $("<img/>");
      image.attr("src", "https://covers.openlibrary.org/b/id/" + data.docs[0].cover_i + "-L.jpg");
      image.attr("alt", "book image");
      image.css({"width" : "22rem"});
      var details = $("<div/>");
      var title = $("<h3>");
      title.text(data.docs[0].title);
      var description = $("<div/>");
      description.text();
      var author = $("<div/>");
      author.text("Author: " + data.docs[0].author_name);
      var averageRating = $("<div/>");
      averageRating.text("Average rating: " + data.docs[0].ratings_average);
      var released = $("<div/>");
      released.text("Published: " + data.docs[0].publish_year);
      details.append(title, description, author, averageRating, released);
      containerEl2.append(image, details);
  }
  

 
$("body").on("click", ".popular-books .card",function(){
  cardElBooks.empty();
  searchBooks($(this).attr("data-title"));
});


