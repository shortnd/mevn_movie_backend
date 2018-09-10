const User = require('../models/User');

const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJWT = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

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

  // Login a user
  app.post('/users/login', (request, response) => {
    if (request.body.email && request.body.password) {
      const email = request.body.email;
      const password = request.body.password;
      User.getUserByEmail(email, (error, user) => {
        if (!user) {
          response.status(404).json({ message: 'The user does not exist!' });
        } else {
          User.comparePassword(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              const payload = { id: user.id };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              response.json({ message: 'ok', token});
            } else {
              response.status(401).json({ message: 'The password is incorrect' });
            }
          });
        }
      });
    }
  });
};