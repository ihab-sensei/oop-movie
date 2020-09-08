class SimilarMoviesSection {
  static renderSimilarMovies(similarMovies) {
    
    if (similarMovies.length > 0) {
      const mainDiv = document.createElement("div")
      mainDiv.classList.add("d-flex", "justify-content-around", "flex-row", "flex-wrap")
        for (let i = 0; i < similarMovies.length; i++) {
          const div = document.createElement("div")
          div.className = "clickable"
          const similarMovieImg = document.createElement("img");
          similarMovieImg.src = similarMovies[i].backdropUrl;
          similarMovieImg.className = "similarMovie";
          const similarMovieTitle = document.createElement("p");
          similarMovieTitle.innerText = similarMovies[i].title;
          div.append(similarMovieImg, similarMovieTitle);
          mainDiv.appendChild(div)
          MoviePage.container.appendChild(mainDiv)
          ScrollReveal().reveal(div, {
            delay: 100,
            distance: "150%",
            origin: "bottom",
            opacity: null,
          });
          similarMovieImg.addEventListener("click", function () {
            MoviesInfo.run(similarMovies[i]);
            // setTimeout (function () { 
            //   window.scrollTo(0,0); 
            // }, 400)
          });
          
        }
        
    } else {
      const similarMovieTitle = document.createElement("h5");
      similarMovieTitle.innerText = `No similar movies!`;
      MoviePage.container.appendChild(similarMovieTitle);
    }
  }
}