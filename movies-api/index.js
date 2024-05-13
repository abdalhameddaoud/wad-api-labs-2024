import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genres';
import upcomingMoviesRouter from './api/upcomingMovies';
import topRatedMoviesRouter from './api/topRatedMovies';
import actorsRouter from './api/actors';
import './seedData';
import './db';
import usersRouter from './api/users';
import session from 'express-session';
import passport from './authenticate';

dotenv.config();

const errHandler = (err, req, res) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT;

app.use(passport.initialize());

app.use(express.json());

app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);

app.use('/api/actors', passport.authenticate('jwt', { session: false }), actorsRouter);

app.use('/api/upcomingMovies', passport.authenticate('jwt', { session: false }), upcomingMoviesRouter);

app.use('/api/topRatedMovies', passport.authenticate('jwt', { session: false }), topRatedMoviesRouter);

app.use('/api/genres', genresRouter);

app.use('/api/users', usersRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});