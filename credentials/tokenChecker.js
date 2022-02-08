let jwt = require("jsonwebtoken")

module.exports = function checkToken(req){
    token = req.headers["x-acces-token"]
    console.log(token)
    let decooded = jwt.verify(token,secret)

    return decooded.id;

}