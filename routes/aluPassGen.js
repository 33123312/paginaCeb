const express = require("express")
const route = express.Router()
const dbCon = require("../credentials/dbCon")
const passManager = require("./aluPassGen/AluPassManager")


route.get("/genAluPass",(req,res) => {
    setAllAlumnos(res)
})

route.get("/genAluPass/:id",(req,res) => {
    setAlumno(res,req.params.id)
})

function setAllAlumnos(res){
    dbCon((error,connection)=>{
        let query ="SELECT * FROM cebdatabase.alumnos_sin_pass;"
        connection.query(query,(error,results,fields) => {
            if(error )
                res.sendStatus(400)
            else{
                
                if(results)
                    generatePasswords(results)

                res.sendStatus(200)
            }
        })
    })
}

function setAlumno(res,id){

    dbCon((error,connection)=>{
        let query ="SELECT * FROM cebdatabase.alumnos where numero_control = '" + id + "'"
        console.log(query)
        connection.query(query,(error,results,fields) => {
            if(error)
                res.sendStatus(400)
            else{
                
                if(results)
                    generatePassword(results)

                res.sendStatus(200)
            }
        })
    })
}

async function generatePassword(alumnoObj){
    let alumno = passManager.generateAluPass(alumnoObj[0]);
    passManager.forceStoreAlumnos([alumno]);
}

async function generatePasswords(alumnos){

    let webUserstoAdd = []

    alumnos.forEach(alumno => {
        webUserstoAdd.push(passManager.generateAluPass(alumno))

    });

    passManager.storeAlumnos(webUserstoAdd);

}



module.exports = route;