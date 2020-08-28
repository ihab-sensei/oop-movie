//the API documentation site https://developers.themoviedb.org/3/

class App {
  static async run() {
    const movies = await APIService.fetchMovies();
    HomePage.renderMovies(movies);
  }
}

class APIService {
  static TMDB_BASE_URL = "https://api.themoviedb.org/3"; //ask about static
  static async fetchMovies() {
    const url = APIService._constructUrl(`movie/now_playing`);
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((movie) => new Movie(movie));
  }
  static async fetchMovie(movieId) {
    //   console.log(movieId)
    const url = APIService._constructUrl(`movie/${movieId}`);
    const response = await fetch(url);
    const data = await response.json();
    return new Movie(data);
  }

  static async fetchActors(movieId) {
    //   console.log(movieId)
    const url = APIService._constructUrl(`movie/${movieId.id}/credits`); //why just movieId doesn't work here?
    const response = await fetch(url);
    // console.log(response)
    const data = await response.json();
     console.log(data)
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
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      const movieImage = document.createElement("img");
      movieImage.src = `${movie.backdropUrl}`; //ask about template literals
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
    MoviePage.renderMovieSection(movieData);
    APIService.fetchActors(movieData);
  }
}

class MoviePage {
  static container = document.getElementById("container");
  static renderMovieSection(movie) {
    MovieSection.renderMovie(movie);
  }
}

class MovieSection {
  static renderMovie(movie) {
    MoviePage.container.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img id="movie-backdrop" src=${movie.backdropUrl}> 
        </div>
        <div class="col-md-8">
          <h2 id="movie-title">${movie.title}</h2>
          <p id="genres">${movie.genres}</p>
          <p id="movie-release-date">${movie.releaseDate}</p>
          <p id="movie-runtime">${movie.runtime}</p>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
      <h3>Actors:</h3>
      <img src=${Actor.profilePath}>
    `;
  }
}

class Movie {
  static BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.releaseDate = json.release_date;
    this.runtime = json.runtime + " minutes";
    this.overview = json.overview;
    this.backdropPath = json.backdrop_path;
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
    this.birthday = json.birthday;
    this.deathday = json.deathday;
    this.actorBiography = json.biography;
  }
  get profilePath() {
    return this.picOfActor ? Actor.BACKDROP_BASE_URL + this.picOfActor : "";
  }
}

class Actors {
    
}

document.addEventListener("DOMContentLoaded", App.run);

//fetch list of movies actor participated in from https://api.themoviedb.org/3/person/1117313/movie_credits?api_key=542003918769df50083a13c415bbc602&language=en-US
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
//