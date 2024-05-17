# Assignment 2 - Web API.

Name: Abdalhamed Daoud

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)

 + Calls routed through new API
 + Top rated movies added to API​
 + Add Authentication
 + Add Mongose
  
## API Configuration
In movies-api

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
TMDB_KEY=72140a5c6977ef405ffd6e442c007421
SECRET=ilikecake

In REACTaPP
TMDB_KEY=72140a5c6977ef405ffd6e442c007421
FAST_REFRESH=false

## API Design
/api/movies	Gets a list of movies
/api/movies/{movieid}	Get a Movie
/api/tmdb/topRatedMovies	Gets a list of top rated movies
/api/tmdb/upcomingMovies	Gets a list of top rated movies
/api/users	Gets users
/api/users?action=register	Registers a new user

## Integrating with React App
Example of API call


export const getTopRatedMovies = () => {
  return fetch(
      '/api/topRatedMovies', {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  }
  ).then(res => res.json());
};
