class SimilarMoviesSection {
  static renderSimilarMovies(similarMovies) {
    
    if (similarMovies.length > 0) {
        for (let i = 0; i < similarMovies.length; i++) {
          const similarMovieImg = document.createElement("img");
          similarMovieImg.src = similarMovies[i].backdropUrl;
          similarMovieImg.className = "similarMovie";
          const similarMovieTitle = document.createElement("p");
          similarMovieTitle.innerText = similarMovies[i].title;
          MoviePage.container.append(similarMovieImg, similarMovieTitle);
          similarMovieImg.addEventListener("click", function () {
            MoviesInfo.run(similarMovies[i]);
            setTimeout (function () { 
              window.scrollTo(0,0); 
            }, 400)
          });
          
        }
        
    } else {
      const similarMovieTitle = document.createElement("p");
      similarMovieTitle.innerText = `No similar movies!`;
      MoviePage.container.appendChild(similarMovieTitle);
    }
  }
}