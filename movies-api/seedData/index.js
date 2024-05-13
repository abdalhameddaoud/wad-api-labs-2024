import userModel from '../api/users/userModel';
import genresModel from '../api/genres/genresModel';
import users from './users';
import genres from './genres';
import dotenv from 'dotenv';
import movieModel from '../api/movies/movieModel';
import movies from './movies.js';
import { upcomingMovies } from './upcomingMovies';
import upcomingMovieModel from '../api/upcomingMovies/upcomingMovieModel';
import topRatedMovieModel from '../api/topRatedMovies/topRatedMovieModel';
import { topRatedMovies } from './topRatedMovies';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
};

async function loadGenres() {
  console.log('load genre Data');
  try {
    await genresModel.deleteMany();
    await genresModel.collection.insertMany(genres);
    console.info(`${genres.length} genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genre Data: ${err}`);
  }
};

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load seed data');
  console.log(movies.length);
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
};

export async function loadUpcomingMovies() {
  console.log('load upcoming movies seed data');
  console.log(upcomingMovies.length);
  try {
    await upcomingMovieModel.deleteMany();
    await upcomingMovieModel.collection.insertMany(upcomingMovies);
    console.info(`${upcomingMovies.length} Upcoming Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load Upcoming Movies Data: ${err}`);
  }
};

export async function loadTopRatedMovies() {
  console.log('load top rated movies seed data');
  console.log(topRatedMovies.length);
  try {
    await topRatedMovieModel.deleteMany();
    await topRatedMovieModel.collection.insertMany(topRatedMovies);
    console.info(`${topRatedMovies.length} Top Rated Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load Top Rated Movies Data: ${err}`);
  }
};

if (process.env.SEED_DB) {
  loadUsers();
  loadGenres();
  loadMovies();
  loadUpcomingMovies();
  loadTopRatedMovies();
}