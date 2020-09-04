class ActorsSection {
  static renderMovieActors(actors) {
    
    const actorsContainer = document.createElement("div");
    const header = document.createElement("h3");
    header.innerText = "Actors:"
    actorsContainer.className = "actors-container";
    MoviePage.container.appendChild(header);
    for (const actor of actors) {
      // console.log(actor);
      // console.log(actors);
      const singleActor = document.createElement("div");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const small = document.createElement("mark");
      img.src = actor.backdropUrl;
      singleActor.classList = "actor-photo";
      h4.innerText = actor.name;
      small.innerText = "-" + actor.character;

      singleActor.append(img, h4, small);
      actorsContainer.appendChild(singleActor);
      MoviePage.container.appendChild(actorsContainer);

      singleActor.addEventListener("click", () => {
        ActorInfo.run(actor);
      });
    }
    
  }
}