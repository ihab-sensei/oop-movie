class HomePage {
  static container = document.getElementById("container");
  static renderMovies(movies) {
    container.classList.add(
      "d-flex",
      "justify-content-around",
      "flex-row",
      "flex-wrap"
    );
    // movie is a single object from the array of objects "movies"
    this.container.innerHTML = "";
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add(
        "m-4",
        "w-25",
        "clickable",
        "reveal",
        "movie-card"
      );
      const movieImage = document.createElement("img");
      movieImage.src = `${movie.posterUrl}`;
      movieImage.style.width = "18rem";
      const movieTitle = document.createElement("h4");
      movieTitle.textContent = `${movie.title ? movie.title : movie.name}`;
      movieImage.addEventListener("click", function () {
        if (movie.title) {
          MoviesInfo.run(movie);
        } else {
          ActorInfo.run(movie);
        }
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 400);
      });
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieImage);
      this.container.appendChild(movieDiv);
      ScrollReveal().reveal(".reveal", {
        delay: 100,
        distance: "150%",
        origin: "bottom",
        opacity: null,
      });
    });
  }
}
