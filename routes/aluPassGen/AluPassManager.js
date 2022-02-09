const mailer = require("./passwordMailer")
const dbCon = require("../../credentials/dbCon")
const cry = require("../encrypter")

module.exports = {

generateAluPass(alumno){

    let generatePassword =()=>Math.random().toString(36).slice(-8);
    try {
        let decryptedPass = generatePassword();
        let password = cry.encrypt(decryptedPass) 
        console.log(decryptedPass,password)
        mailer(alumno,decryptedPass)
        return [alumno.numero_control,password]

      } catch (error) {
        console.error(error);
      }

      
    
},
storeAlumnos (alumnos){
    dbCon((error,connection) =>{
        let query = 'insert into webUsers (??) VALUES ?'

        const insert_columns =["numero_control","password"];

        connection.query(query,[insert_columns, alumnos],(error,results,fields) => {
        })
    })
},
forceStoreAlumnos (alumnos){

    this.storeAlumnos(alumnos);
}

}

function del(){
        
    dbCon((error,connection) =>{
        let query = 'delete from webUsers (??) where ?'

        const insert_columns =["numero_control","password"];

        connection.query(query,[insert_columns, alumnos],(error,results,fields) => {
        })
    })

}