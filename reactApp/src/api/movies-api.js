export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=72140a5c6977ef405ffd6e442c007421&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };