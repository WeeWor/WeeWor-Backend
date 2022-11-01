/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  register: async function (req, res, next) {
    if (req.headers.weewor !== 'user' && req.headers.weewor !== 'unit') {
      return res.status(400).json({
        message: '400 Bad Request'
      });
    }

    if (!('username' in req.body && 'password' in req.body && 'email' in req.body)) {
      return res.status(400).json({
        message: 'Missing body'
      });
    }

    let user;
    try {
      // Insert new user to database.
      user = await sails.models.user.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        role: req.headers.weewor
      }).fetch();
    } catch (e) {
      let message = '';
      if (e.code === 'E_UNIQUE') {
        message = 'Username or email already existed.';
      } else if (e.code === 'E_INVALID_NEW_RECORD') {
        message = 'Validate error.';
      }

      return res.status(400).json({
        message
      });
    }

    // Generate JWT Token after validated inputs and user created.
    let token = jwt.sign({
      id: user.id
    }, process.env.SECRET_KEY);

    return res.json({
      token
    });
  },

  login: async function (req, res, next) {
    if (req.headers.weewor !== 'user' && req.headers.weewor !== 'unit') {
      return res.status(400).json({
        message: '400 Bad Request'
      });
    }

    let user = await sails.models.user.findOne({username: req.body.username});

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        message: 'Invalid username or password'
      });
    }

    let token = jwt.sign({
      id: user.id
    }, process.env.SECRET_KEY);

    return res.json({
      token
    });
  },

  user: async function (req, res, next) {
    // Token validation already done in middleware (policy).
    const authorization = req.headers.authorization?.split(' ');
    const userId = jwt.verify(authorization[1], process.env.SECRET_KEY);
    const user = await sails.models.user.findOne({id: userId.id});

    return res.json({
      username: user.username,
      email: user.email
    })
  }
};

