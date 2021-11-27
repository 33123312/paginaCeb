const express = require("express")
const route = express.Router()
const dbCon = require("../credentials/dbCon")
const cry = require("./encypter")

route.get("/genAluPass",(req,res) => {
    dbCon((error,connection)=>{
        let query ="SELECT * FROM cebdatabase.alumnos_sin_pass;"
        connection.query(query,(error,results,fields) => {
            if(error)
                res.sendStatus(400)
            else{
                generatePasswords(results)
            
                res.sendStatus(200)
            }
        })
    })
})

function generatePasswords(alumnos){
    alumnos.forEach(element => {
        //cry.encrypt()
        element.password = generatePassword()
    });

    dbCon((error,connection) =>{
        let query = 'insert into webUsers (??) VALUES ?'

        const insert_columns = Object.keys(alumnos[0]);


        const insert_data = alumnos.reduce((a, i) => [...a, Object.values(i)], []);

        connection.query(query,[insert_columns, insert_data],(error,results,fields) => {
        })
    })

}
function generatePassword(){
    return Math.random().toString(36).slice(-8);
}

route.get("/getPass/:grupo",(req,res) => {
    dbCon((error,connection)=>{
        

        let query ="SELECT `password` FROM cebdatabase.webUsers_view where grupo = '" + req.params.grupo + "'"
        console.log(query)
        connection.query(query,(error,results,fields) => {
            if(error)
                res.sendStatus(400)
            else{
                res.status(200).send(desEncrypt(results))
            }
        })
    })
})

function desEncrypt(passWords){
    let passList = []
    passWords.forEach(pass => {
        passList.push(cry.compare(pass.password))
       
    })

    return passList
}

module.exports = route;