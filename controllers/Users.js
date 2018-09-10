const User = require('../models/User');

module.exports.controller = (app) => {
  // register a user
  app.post('/users/register', (request, response) => {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password
    const newUser = new User({
      name,
      email,
      password
    });
    User.createUser(newUser, (error, user) => {
      if (error) {
        resizeBy.status(442).json({
          message: 'Something went wrong. Please try again after some time!'
        })
      }
      response.send({ user });
    });
  });
}