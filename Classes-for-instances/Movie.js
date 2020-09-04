class Movie {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.language = json.original_language;
    this.genres = json.genres;
    this.releaseDate = json.release_date;
    this.runtime = json.runtime + " minutes";
    this.overview = json.overview;
    this.backdropPath = json.backdrop_path;
    this.productionCompany = json.production_companies;
    this.rating = json.vote_average;
    this.voteCount = json.vote_count;
  }

  get grabGenres() {
    let genres = "";
    for (const genre of this.genres) {
      genres += genre.name + " ";
    }
    return genres;
  }
  get companyLogo() {
    let logoPic = [];
    for (const logo of this.productionCompany) {
      if (logo.logo_path !== null) {
        logoPic.push(Movie.BACKDROP_BASE_URL + logo.logo_path);
      } else {
        logoPic.push("");
      }
    }
    return logoPic;
  }

  get companyName() {
    let companyNames = [];
    for (const company of this.productionCompany) {
      companyNames.push(company.name);
    }
    return companyNames;
  }
  get backdropUrl() {
    return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";
  }
}