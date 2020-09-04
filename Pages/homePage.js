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
      movieTitle.textContent = `${movie.title}`;
      movieImage.addEventListener("click", function () {
        MoviesInfo.run(movie);
      });
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieImage);
      this.container.appendChild(movieDiv);
    });
  }
  // static renderMoviesPopular(movies) {
  //   // movie is a single object from the array of objects "movies"
  //   movies.forEach((movie) => {
  //     const movieDiv = document.createElement("div");
  //     const movieImage = document.createElement("img");
  //     movieImage.src = `${movie.backdropUrl}`;
  //     const movieTitle = document.createElement("h3");
  //     movieTitle.textContent = `${movie.title}`;
  //     movieImage.addEventListener("click", function () {
  //       MoviesInfo.run(movie);
  //     });
  //     movieDiv.appendChild(movieTitle);
  //     movieDiv.appendChild(movieImage);
  //     this.container.appendChild(movieDiv);
  //   });
  // }
}

