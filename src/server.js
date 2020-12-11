const express = require('express')
const app = express()
const session = require('express-session')
var router = express.Router()
require('dotenv').config()

// Módulos adicionais para facilidade
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const helmet = require('helmet');

// Banco de dados mongodb
const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(process.env.DB_HOST, { useUnifiedTopology: true }, (err, client) => {
    db = client.db(process.env.DB_NAME)
    app.listen(port, () => {
        console.log(`Link do servidor: http://localhost:${port}`)
    })
  })
  
// Configurações do express e EJS
app.use(helmet())
app.use(express.static(__dirname + '/../static'));
app.use(expressLayouts)     
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


// Rotas modulares
const register = require('../routes/register')
const login = require('../routes/login')
const home = require('../routes/home')
app.use('/register', register)
app.use('/login', login)
app.use('/', home)

