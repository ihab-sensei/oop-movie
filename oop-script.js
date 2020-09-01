//the API documentation site https://developers.themoviedb.org/3/

class App {
  static async run() {
    const movies = await APIService.fetchMovies();
    // console.log(movies);
    // the var movies is an array of objects, each object has general info about a specific movie
    HomePage.renderMovies(movies);
  }
}

// This class has methods that are resposible for fetching JSONs from the API.
// fetchMovies() => returns an array of new instances of the class Movie (non-specific).
// fetchMovie(movieId) => returns new instance of the class Movie (specific).
// fetchActors(movieId) => returns and array of 5 new instances of the class Actors.
class APIService {
  static TMDB_BASE_URL = "https://api.themoviedb.org/3";
  static async fetchMovies() {
    const url = APIService._constructUrl(`movie/now_playing`);
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((movie) => new Movie(movie));
  }
  static async fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`);
    const response = await fetch(url);
    const data = await response.json();
    return new Movie(data);
  }
  static async fetchActors(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`);
    const response = await fetch(url);
    const data = await response.json();
    const arrWithActorInfo = [];
    for (let i = 0; i < 5; i++) {
      arrWithActorInfo.push(new Actors(data.cast[i]));
    }
    return arrWithActorInfo;
  }
  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  }
  static async fetchCrew(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/credits`);
    const response = await fetch(url);
    const data = await response.json();
    return data.crew.map((crewMember) => new Crew(crewMember));
  }
  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  }
  static async fetchSimilarMovies(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}/similar`);
    const response = await fetch(url);
    const data = await response.json();
    const arrWithSimilarMovies = [];
    for (let i = 0; i < 5; i++) {
      if (data.results.length > 0) {
        arrWithSimilarMovies.push(new SimilarMovies(data.results[i]));
      } else {
        return arrWithSimilarMovies;
      }
    }
    return arrWithSimilarMovies;
  }
  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  }
  static async fetchActor(personId) {
    const url = APIService._constructUrl(`person/${personId}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return new Actor(data);
  }
  static _constructUrl(path) {
    return `${this.TMDB_BASE_URL}/${path}?api_key=${atob(
      "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
    )}`;
  }
}

class HomePage {
  static container = document.getElementById("container");
  static renderMovies(movies) {
    // movie is a single object from the array of objects "movies"
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      const movieImage = document.createElement("img");
      movieImage.src = `${movie.backdropUrl}`;
      const movieTitle = document.createElement("h3");
      movieTitle.textContent = `${movie.title}`;
      movieImage.addEventListener("click", function () {
        Movies.run(movie);
      });
      movieDiv.appendChild(movieTitle);
      movieDiv.appendChild(movieImage);
      this.container.appendChild(movieDiv);
    });
  }
}

class Movies {
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
  }
}
class ActorInfo {
  static async run(person) {
    const actorData = await APIService.fetchActor(person.id);
    console.log(actorData)
    ActorPage.renderMovieSection(actorData);
  }
}
class ActorPage {
  static container = document.getElementById("container");
  //our new fetch service method
  static renderActorSection(person) {
    ActorSection.renderActor(person);
  }
}

class ActorSection {
  static renderActor(person) {
    ActorPage.container.innerHTML = `<h1>Hello we are in the actor page</h1>`;
  }
}

class MoviePage {
  static container = document.getElementById("container");
  static renderMovieSection(movie, actors, crew, similarMovies) {
    MovieSection.renderMovie(movie, crew);
    ActorsSection.renderMovieActors(actors);
    SimilarMoviesSection.renderSimilarMovies(similarMovies);
  }
}

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
          MoviePage.container.innerHTML += `<img src=${crewMember.backdropUrl} class="directorPic">`;
          MoviePage.container.innerHTML += `<p>${crewMember.directorName}</p>`;
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

class ActorsSection {
  static renderMovieActors(actors) {
    const actorsContainer = document.createElement("div");
    const header = document.createElement("h3");
    actorsContainer.className = "actors-container";
    for (const actor of actors) {
      // console.log(actor);
      // console.log(actors);
      const singleActor = document.createElement("div");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const small = document.createElement("mark");
      
      img.src = actor.backdropUrl;
      img.classList = "actor-photo";
      h4.innerText = actor.name;
      small.innerText = "-" + actor.character;
      
      img.addEventListener("click", () => {
        console.log("hello");
        //ActorInfo.run(actor)
      })
      singleActor.append(img, h4, small);
      actorsContainer.appendChild(singleActor);
      MoviePage.container.appendChild(actorsContainer);
    }
  }
}

class SimilarMoviesSection {
  static renderSimilarMovies(similarMovies) {
    if (similarMovies.length > 0) {
      for (const similarMovie of similarMovies) {
        MoviePage.container.innerHTML += `<img src=${similarMovie.backdropUrl} class="directorPic">`;
        MoviePage.container.innerHTML += `<p>${similarMovie.title}</p>`;
      }
    } else {
      MoviePage.container.innerHTML += `<p>No similar movies!</p>`;
    }
  }
}

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
    // console.log(this.productionCompany);
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
    // console.log(this.productionCompany)
    let companyNames = [];
    for (const company of this.productionCompany) {
      companyNames.push(company.name);
    }
    return companyNames;
  }
  get backdropUrl() {
    return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
  }
}

class Actor {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.name = json.name;
    this.gender = json.gender;
    this.birthday = json.birthday;
    this.picOfActor = json.profile_path;
    this.actorPopularity = json.popularity;
    this.deathday = json.deathday;
    this.actorBiography = json.biography;
  }
  get profilePath() {
    return this.picOfActor ? Actor.BACKDROP_BASE_URL + this.picOfActor : "";
  }
}

class Actors {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    console.log(this.id);
    this.name = json.name;
    this.backdropPath = json.profile_path;
    this.character = json.character;
  }

  get backdropUrl() {
    return this.backdropPath
      ? Actors.BACKDROP_BASE_URL + this.backdropPath
      : "";
  }
}

class Crew {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.name = json.name;
    this.job = json.job;
    this.backdropPath = json.profile_path;
  }

  get directorName() {
    let name;
    if (this.job === "Director") {
      name = this.name;
    }
    return name;
  }

  get backdropUrl() {
    return this.backdropPath ? Crew.BACKDROP_BASE_URL + this.backdropPath : "";
  }
}

class SimilarMovies {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.title = json.title;
    this.backdropPath = json.poster_path;
  }
  get backdropUrl() {
    return this.backdropPath ? Crew.BACKDROP_BASE_URL + this.backdropPath : "";
  }
}

document.addEventListener("DOMContentLoaded", App.run);

// http://image.tmdb.org/t/p/w780/27C77ni5XmlgkJVbomXPC4tHWVd.jpg

//https://api.themoviedb.org/3/movie/577922/credits?api_key=542003918769df50083a13c415bbc602

//fetch list of movies actor participated in from https://api.themoviedb.org/3/person/${movie.id}/movie_credits?api_key=542003918769df50083a13c415bbc602&language=en-US
//create a new class for it, because we will use it several times

//for Sunday, Aug, 30
//
// create a class called Actors
// inside this class we want to give a constructor with a property of this.actors
//and give this property a value
// this is value is json.cast.map(ele => ele.name)
// now we have an array of names
// then in the dom we can some how use some kind of loop to display theese names inside the inner html
//same steps for actors pictures...

//Thoughts and ideas on how to solve stuff

// In our code we have some important variables that we have to know:

//  1- movies => it's an array of objects/instances created
//     by the method APIService.fetchMovies() and it contains the fetched
//     JSON from https://api.themoviedb.org/3/movie/now_playing?api_key=542003918769df50083a13c415bbc602
//
//  2- movie => is a single object/instance of movies
//
//  3- movieData => is a single object/instance created by the method
//     APIService.fetchMovie(movie.id) and it contains detailed info
//     about a movie from fetching https://api.themoviedb.org/3/movie/${movieId}?api_key=542003918769df50083a13c415bbc602
