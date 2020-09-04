class ActorPage {
  static container = document.getElementById("container");
  //our new fetch service method
  static renderActorSection(person, participatedMovies) {
    ActorSection.renderActor(person, participatedMovies);
  }
}