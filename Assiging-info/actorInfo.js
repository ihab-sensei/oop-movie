class ActorInfo {
  static async run(person) {
    const actorData = await APIService.fetchActor(person.id);
    const moviesParticipatedInData = await APIService.fetchMoviesActorParticipated(person.id);
    ActorPage.renderActorSection(actorData, moviesParticipatedInData);
    window.scrollTo(0, 0)
  }
  static async runPopularActors(person) {
    const actorsData = await APIService.popularActors(person);
    ActorsPages.renderActorsSection(actorsData);
    window.scrollTo(0, 0)
  }
}
