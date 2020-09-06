class HomePage {
  static container = document.getElementById("container");
  static renderMovies(movies) {
    // movie is a single object from the array of objects "movies"
    this.container.innerHTML = ""
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      const movieImage = document.createElement("img");
      movieImage.src = `${movie.backdropUrl}`;
      const movieTitle = document.createElement("h3");
      movieTitle.textContent = `${movie.title ? movie.title : movie.name}`;
      movieImage.addEventListener("click", function () {
        if (movie.title) {
          MoviesInfo.run(movie);
        } else {
          ActorInfo.run(movie)
        }
        setTimeout (function () { 
          window.scrollTo(0,0); 
        }, 400)
      });
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieImage);
      this.container.appendChild(movieDiv);
    });
  }

 
}

