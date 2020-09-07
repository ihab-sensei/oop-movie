//the API documentation site https://developers.themoviedb.org/3/

class App {
  static async run(arg = "now_playing") {
    const movies = await APIService.fetchMovies(arg);
    // const moviesPopular = await APIService.fetchMoviesPopular();
    // console.log(movies);

    HomePage.renderMovies(movies);
  }

  // static async runPopular(){
  //   const moviesPopular = await APIService.fetchMoviesPopular();
  //   HomePage.renderMovies(moviesPopular);
  // }
}

const popular = document.querySelector("#popular");
popular.addEventListener("click", (e) => {
  // console.log("hello");
  App.run("popular");
});
document.addEventListener("DOMContentLoaded", (e) => App.run("now_playing"));
//document.addEventListener("DOMContentLoaded", App.runPopular);

// http://image.tmdb.org/t/p/w780/27C77ni5XmlgkJVbomXPC4tHWVd.jpg

//https://api.themoviedb.org/3/movie/577922/credits?api_key=542003918769df50083a13c415bbc602

//fetch list of movies actor participated in from https://api.themoviedb.org/3/person/${movie.id}/movie_credits?api_key=542003918769df50083a13c415bbc602&language=en-US
