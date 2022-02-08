const express = require("express")
const checkToken = require("../credentials/tokenChecker")
require('mysql2');

let connection = require("../credentials/dbCon")

const route = express.Router();

route.get("/getBoleta",(req,res) => {
    let id = checkToken(req)

    getCurrentPeriodo()
        .then(periodo => buildResponse(id,periodo).then(calif => res.status(200).send(calif)))
        .catch(error => res.sendStatus(400))


    }
)

route.get("/getEvaluaciones",(req,res) => {
    getEvas().then(calif => res.status(200).send(calif)).catch(() => res.sendStatus(400))

    }
)

async function buildResponse(id,periodo){
    let parCalif = getParCalif(id,periodo);
    let semCalif = getSemCalifas(id,periodo)

    

    let res = {
        parciales: await parCalif,
        semestrales: await semCalif,
    }

    return res;
}

async function getParCalif(id,periodo){
    let parNumCal = getParCalifas(id,"alumno_num_califa_charge_view",periodo)
    let parBolCal = getParCalifas(id,"alumno_bol_califa_charge_view",periodo)


    let boleta = {
        num: await parNumCal,
        bol: await parBolCal

    }

    return boleta
}

async function getSemCalifas(id,periodo){
    let colsToGet = ["nombre_abr","calificacion","orden"]
    return getCalifas(id,"alumno_sem_califa_charge_view",colsToGet,periodo)

}

function getParCalifas(id,view,periodo){
    let colsToGet = ["nombre_abr","evaluacion","calificacion","faltas"]
    return getCalifas(id,view,colsToGet,periodo)
}

function getCalifas(id,view,colsToGet,periodo){
    return new Promise((resolver,reject) => { 

        connection((err, connection) => {
            let query = 
                "select " + colsToGet + " from " + view + " where numero_control = '" + id + "' and periodo = '" + periodo + "'";
            connection.query(query, (error, results, fields) => {
                if (error)
                    return reject
                else
                    return resolver(results)
                
                }
            )
        })
     })
}

function getCurrentPeriodo(){
    return new Promise((resolver,reject) => { 

        connection((err, connection) => {
            let query = "select * from currentperiodo";
            connection.query(query, (error, results, fields) => {
                if (error || results.length != 1)
                    return reject
                else
                    return resolver(results[0].periodo)
                
                }
            )
        })
     })

}

function getEvas(){
    return new Promise((resolver,reject) => { 

        connection((err, connection) => {
            let query = "select * from evaluaciones";
            connection.query(query, (error, results, fields) => {
                if (error)
                    return reject
                else
                    return resolver(results)
                
                }
            )
        })
     })

}

module.exports = route;