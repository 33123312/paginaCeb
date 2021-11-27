const express = require("express")

const app = express()

let cors = require('cors')
app.use(cors({origin: 'http://localhost:5000'}));

app.use(express.json())
app.use(require("./routes/login"))
app.use(require("./routes/boletaManager"))
app.use(require("./routes/aluPassGen"))



app.listen(3001,() => console.log("puerto 3001"))







