const express = require("express")
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express()
let cors = require('cors');
app.use(cors({origin: process.env.WEB_URL}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

require("./auth")

app.use(require("./routes/login"))
app.use(passport.authenticate('jwt', { session: false }),require("./routes/safeRoutes"))
app.use(require("./routes/boletaManager"))

app.listen(process.env.APP_PORT,() => console.log("puerto 3005"))




