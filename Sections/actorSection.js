class ActorSection {
  static renderActor(person, participatedMovies) {
    ActorPage.container.innerHTML = `
    <img src="${person.profilePath}" class="singleActorPic">
    <br>
    <h1>${person.name}</h1>
    <p>Gender: ${person.actorGender}</p>
    <p class= "b-day">Born: ${person.birthday}</p>
    <p>Popularity: ${person.actorPopularity}</p>
    <h5>Biography</h5>
    <p>${person.biography}</p>
    `;
    if (person.deathDay) {
      console.log("hello");
      const birthday = document.querySelector(".b-day")
      birthday.insertAdjacentHTML('afterend', `<p>Died: ${person.deathDay}</p>`)
    }
    
    //element.insertAdjacentHTML('afterend', text)
    
    if (participatedMovies.length > 0) {
      for (let i = 0; i < participatedMovies.length; i++) {
        const participatedMovieImg = document.createElement("img");
        participatedMovieImg.src = participatedMovies[i].backdropUrl
        participatedMovieImg.className = "participatedMovie";
        const participatedMovieTitle = document.createElement("p");
        participatedMovieTitle.innerText = participatedMovies[i].title;
        ActorPage.container.append(participatedMovieImg, participatedMovieTitle);
        participatedMovieImg.addEventListener("click", function () {
          MoviesInfo.run(participatedMovies[i]);
        });
      }
      
    } else {
      const participatedMovieTitle = document.createElement("p");
      participatedMovieTitle.innerText = `<p>No movies participated!</p>`;
     ActorPage.container.appendChild(participatedMovieTitle);
    }
  }

}