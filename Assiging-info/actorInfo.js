class ActorInfo {
  static async run(person) {
    const actorData = await APIService.fetchActor(person.id);
    const moviesParticipatedInData = await APIService.fetchMoviesActorParticipated(person.id);
    ActorPage.renderActorSection(actorData, moviesParticipatedInData);
  }
}
