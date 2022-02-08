const connection = require("../credentials/dbCon")
const express = require("express")
const route = express.Router();



route.get("/getUserInfo",(req,res) => {   
        connection((err, connection) => {
            let query = "select * from alumnos_visible_view where numero_control = '" + req.user.id + "'"
            connection.query(query, (error, results, fields) => {
                if (error)
                    res.status(404)
                else 
                    res.status(200).send(results[0])
    
                })
        })

        }
    )

    module.exports = route;