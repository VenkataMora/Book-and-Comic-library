
getPopularMovies();
/* fetch popular movies */
function getPopularMovies(){
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=508802ece2ca30bf4e12404d03d92af6')
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    displayPopularMovies(data);
  });
}   



/*select popular card area from html*/
var cardEl = $(".popular");

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
function searchMovies(){
    var movieToFind = $("#searchInput").val();
    var encodedQuery = encodeURIComponent(movieToFind);
    $("#searchInput").val("");
    cardEl.empty();
    fetch('https://api.themoviedb.org/3/search/movie?api_key=508802ece2ca30bf4e12404d03d92af6&query=' + encodedQuery)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      displayMovie(data);
    });
}

function displayMovie(movie){
    console.log(movie);
}