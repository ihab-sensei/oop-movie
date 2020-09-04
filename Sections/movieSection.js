class MovieSection {
  static renderMovie(movie, crew) {
    // console.log(crew);
    // console.log(similarMovies);
    MoviePage.container.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img id="movie-backdrop" src=${movie.backdropUrl}> 
        </div>
        <div class="col-md-8">
          <h2 id="movie-title">${movie.title}</h2>
          <p id="genres">${movie.grabGenres}</p>
          <p id="movie-release-date">${movie.releaseDate}</p>
          <p id="movie-release-date">${movie.language}</p>
          <p id="movie-runtime">${movie.runtime}</p>
          <p id="movie-rating">Rating: ${movie.rating}</p>
          <p id="movie-votecount">Votes received: ${movie.voteCount}</p>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
    `;
    for (const crewMember of crew) {
      if (crewMember.directorName) {
        if (crewMember.backdropUrl) {
          const div = document.createElement("div")
          const directorImg = document.createElement("img");
          directorImg.src = crewMember.backdropUrl;
          directorImg.className = "directorPic";
          const directorName = document.createElement("p");
          directorName.innerText = crewMember.directorName;
          div.append(directorImg, directorName);
          MoviePage.container.appendChild(div);
        }
        break;
      }
    }
    for (let i = 0; i < movie.companyName.length; i++) {
      const div = document.createElement("div");
      const h5 = document.createElement("h5");
      const img = document.createElement("img");

      h5.innerText = movie.companyName[i];
      img.classList = "smol";
      img.src = movie.companyLogo[i];

      div.append(h5, img);
      MoviePage.container.appendChild(div);
    }

    
  }
}
