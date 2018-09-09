const Movie = require('../models/Movie');
const Rating = require('../models/Rating')

module.exports.controller = (app) => {
  // fetch all movies
  app.get('/movies', (request, response) => {
    Movie.find({}, 'name description release_year genre', (error, movies) => {
      if (error) { console.log(error); }
      response.send({
        movies,
      });
    });
  });
  // fetch a single movie
  app.get('/movies/:id', (request, response) => {
    Movie.findById(request.params.id, (error, movie) => {
      if (error) { console.log(error); }
      response.send(movie);
    });
  });
  // Rate a move
  app.post('/movies/rate/:id', (request, response) => {
    const rating = new Rating({
      movie_id: request.params.id,
      user_id: req.body.user_id,
      rate: req.body.rate
    });

    rating.save(function (error, rating) {
      if (error) { console.log(error); }
      res.send({
        movie_id: rating.movie_id,
        user_id: rating.user_id,
        rate: rating.rate
      });
    });
  });
  // Add A movie
  app.post('/movies/add', (request, response) => {
    const newMovie = new Movie({
      name: request.body.name,
      description: request.body.description,
      release_year: request.body.release_year,
      genre: request.body.genre,
    });
    newMovie.save((error, movie) => {
      if (error) {console.log(error)}
      response.send(movie);
    });
  });
};