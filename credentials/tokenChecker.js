let jwt = require("jsonwebtoken")
let secret = require("../credentials/jwtSecret");

module.exports = function checkToken(req){
    token = req.headers["x-acces-token"]
    console.log(token)
    let decooded = jwt.verify(token,secret)

    return decooded.id;

}