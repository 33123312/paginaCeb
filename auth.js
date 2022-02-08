const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const connection = require("./credentials/dbCon")
const cry = require("./routes/encrypter")
require('mysql2');

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'numero_control',
        passwordField: 'password'
      },
      async (numero_control, password, done) => {
        connection((err, connection) => {
            if (err) throw err; // not connected!
            
            let query = "select * from webUsers where numero_control = '" + numero_control +"'"
    
            connection.query(query, (error, results, fields) => {
                console.log(password,results[0].password,cry.compare(results[0].password,password))
                if(!error && results.length > 0 && cry.compare(password,results[0].password))
                    return done(null, {id:numero_control},"ok");
                else
                    return done(null,false,"Usuario o contraseña incorrectos")
    
            }
            )
        })  
        
      }
    ))
    
    const JWTstrategy = require('passport-jwt').Strategy;
    const ExtractJWT = require('passport-jwt').ExtractJwt;
    
    passport.use(
      new JWTstrategy(
        {
          secretOrKey: 'hAm0c02',
          jwtFromRequest: ExtractJWT.fromHeader('x-acces-token')
        },
        async (token, done) => {

          try {
            return done(null, token);
          } catch (error) {
            done(error);
          }
        }
      )
    );

