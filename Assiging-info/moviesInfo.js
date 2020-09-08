class MoviesInfo {
  static async run(movie) {
    const movieData = await APIService.fetchMovie(movie.id);
    const actorData = await APIService.fetchActors(movie.id);
    const crewData = await APIService.fetchCrew(movie.id);
    const similarMoviesData = await APIService.fetchSimilarMovies(movie.id);
    MoviePage.renderMovieSection(
      movieData,
      actorData,
      crewData,
      similarMoviesData
    );
    window.scrollTo(0, 0)
  }
}