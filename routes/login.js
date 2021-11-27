const express = require("express")
require('mysql2');

const connection = require("../credentials/dbCon")
//const cry = require("./encypter")
const jwt = require("jsonwebtoken")
const checkToken = require("../credentials/tokenChecker")
const secret = require("../credentials/jwtSecret");

const route = express.Router();

route.post("/logIn",(req,res) => {
    connection((err, connection) => {
        if (err) throw err; // not connected!
       
        let id = req.body
        let query = "select * from webUsers where numero_control = '" + id.numero_control +"'"

        connection.query(query, (error, results, fields) => {
            //cry.compare()
            if(!error && results.length > 0 && id.password,results[0] === password){
                let token = generateToken(id.numero_control)
                res.status(200).send(token)
            }else
                res.status(404).send("Usuario o contraseña incorrectos")

        }
      )
    })
})

route.get("/getUserInfo",(req,res) => {
    let id = checkToken(req)

    if(id){
        
        connection((err, connection) => {
            let query = "select * from alumnos_visible_view where numero_control = '" + id + "'"
            connection.query(query, (error, results, fields) => {
                if (error)
                    res.status(404)
                else 
                    res.status(200).send(results[0])
    
                })
        })

        }
    }
)

function generateToken(aluId){
    return jwt.sign({ id: aluId }, secret, { expiresIn: 60*60*24});
}

module.exports = route;