const express = require("express")
require('mysql2');

const passport = require('passport');
const jwt = require("jsonwebtoken")
const secret = require("../credentials/jwtSecret");
const route = express.Router();

route.post(
    '/logIn',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {

          try {
            if (err || !user) 
              return next(err);
            
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);

                const token = generateToken(user.id)
  
                return res.json({ token });
              }
            );

          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );


function generateToken(aluId){
    return jwt.sign({ id: aluId }, secret, { expiresIn: 60*60*24});
}

module.exports = route;