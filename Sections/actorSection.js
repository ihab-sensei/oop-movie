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
      const mainDiv = document.createElement("div")
      mainDiv.classList.add("d-flex", "justify-content-around", "flex-row", "flex-wrap")
      for (let i = 0; i < participatedMovies.length; i++) {
        const div = document.createElement("div")
        div.className = "clickable"
        const participatedMovieImg = document.createElement("img");
        participatedMovieImg.src = participatedMovies[i].backdropUrl
        participatedMovieImg.className = "participatedMovie";
        const participatedMovieTitle = document.createElement("p");
        participatedMovieTitle.innerText = participatedMovies[i].title;
        participatedMovieTitle.style.maxWidth = "13rem"
        div.append(participatedMovieImg, participatedMovieTitle);
        mainDiv.appendChild(div)
        ActorPage.container.appendChild(mainDiv)
        participatedMovieImg.addEventListener("click", function () {
          MoviesInfo.run(participatedMovies[i]);
          // setTimeout (function () { 
          //   window.scrollTo(0,0); 
          // }, 400)
        });
      }
      
    } else {
      const participatedMovieTitle = document.createElement("p");
      participatedMovieTitle.innerText = `<p>No movies participated!</p>`;
     ActorPage.container.appendChild(participatedMovieTitle);
    }
  }

}