import React from "react";
import { getMovies } from "../api/movies-api";
import PageTemplate from '../components/movieComponents/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../pages/favouriteMoviesPage';





const HomePage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discover', getMovies)

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
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};

export default HomePage;