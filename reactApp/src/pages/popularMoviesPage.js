import React from "react";
// import { getTopRatedMovies } from "../api/movie-api";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/movieComponents/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcon/addToFavourites';






const PopularMoviesPage = (props) => {

  const { data, error, isLoading, isError } = useQuery('popular', getPopularMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};

export default PopularMoviesPage;