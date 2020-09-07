class MovieSection {
  static renderMovie(movie, crew) {
// CSS
    // document.body.style.backgroundImage = `
    // linear-gradient(180deg, rgba(68,68,68,0.8729866946778712) 0%, rgba(6,6,8,0.7469362745098039) 0%, rgba(0,0,0,1) 24%),
    // url(${movie.backdropUrl})
    // `
  //linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.49763655462184875) 8%, rgba(0,0,0,0.6713060224089635) 15%, rgba(0,0,0,0.8757878151260504) 25%, rgba(0,0,0,0.9766281512605042) 33%);

  // document.body.style.backgroundSize = "contain"
  // document.body.style.backgroundRepeat = "no-repeat"
  MoviePage.container.className = "container"
    MoviePage.container.innerHTML = `
    <div class = "backgroundImage m-3 shadow-lg">
      <div class="row"> 
        <div class="col-md-4">
          <img id="movie-backdrop" class="ml-3 mt-3" src=${movie.posterUrl}> 
        </div>
        <div class="col-md-7 ml-2">
          <h1 id="movie-title" class="display-5">${movie.title}</h1>
          <p id="genres-names">
          </p>
          <p id="movie-release-date">${movie.releaseDate}</p>
          <p id="movie-release-date">${movie.language}</p>
          <p id="movie-runtime">${movie.runtime}</p>
          <p id="movie-rating">Rating: ${movie.rating}</p>
          <p id="movie-votecount">Votes received: ${movie.voteCount}</p>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
    </div>
    <div class="embed-responsive w-auto embed-responsive-16by9 m-3">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie.trailerKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <div>
    `;
    const backgroundImage = document.querySelector(".backgroundImage")
    backgroundImage.style.backgroundImage = `
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7973564425770308) 63%, rgba(0,0,0,1) 84%),
    url(${movie.backdropUrl})
    `
    backgroundImage.style.backgroundSize = "cover"
    backgroundImage.style.backgroundRepeat = "no-repeat"
    const genres = document.querySelector("#genres-names")
    for (const genre of movie.genresStrings) {
      const badge = document.createElement("span")
        badge.classList.add(
        "badge",
        "badge-pill",
        "badge-warning"
      );
      badge.innerText = genre
      genres.appendChild(badge)
    }
    for (const crewMember of crew) {
      if (crewMember.directorName) {
        const voteCount = document.querySelector("#movie-votecount")
        console.log(voteCount);
        const div = document.createElement("div")
        //const directorImg = document.createElement("img");
        //directorImg.src = crewMember.backdropUrl;
        //directorImg.className = "directorPic";
        const directorName = document.createElement("p");
        directorName.innerText = crewMember.directorName;
        div.append(directorName);
      //voteCount.insertAdjacentHTML("afterend", <p>Director: ${crewMember.directorName}</p>)
        //MoviePage.container.appendChild(div);
        
        break;
      }
    }
    const mainDiv = document.createElement("div")
    for (let i = 0; i < movie.companyName.length; i++) {
      const div = document.createElement("div");
      const h5 = document.createElement("h5");
      const img = document.createElement("img");
      mainDiv.classList.add("d-flex", "justify-content-around", "flex-row", "flex-wrap")
      h5.innerText = movie.companyName[i];
      img.classList = "smol";
      img.src = movie.companyLogo[i];
      div.append(h5, img);
      mainDiv.appendChild(div)
      MoviePage.container.appendChild(mainDiv);
    }

    
  }
}
