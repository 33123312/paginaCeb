const express = require("express")
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express()
let cors = require('cors');
app.use(cors({origin: 'http://localhost:5000'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

require("./auth")

app.use(require("./routes/login"))
app.use(require("./routes/boletaManager"))
app.use(require("./routes/aluPassGen"))
app.use(passport.authenticate('jwt', { session: false }),require("./routes/safeRoutes"))



app.listen(3001,() => console.log("puerto 3001"))




