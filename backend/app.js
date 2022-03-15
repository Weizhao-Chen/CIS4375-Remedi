const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index')

const app = express()
// const { models, sequelize } = require('./db/index')

// Setup DB and store models in app
// app.set('db', models)
// app.set('sequelize', sequelize)
// app.set('case sensitive routing', true)

// some middlewares
// if (app.get('env') === 'development') {
//   app.use(logger('dev'))
// }
// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )
// app.use(cors())
// app.use('/', routes)

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// // eslint-disable-next-line
// app.use((err, req, res, next) => {
//   console.log(`\n${  err.message.error  }\n${  err.stack.warn  }\n`)
//   if (req.app.get('env') === 'development') {
//     res.status(err.status || 500).send(err.stack)
//   } else {
//     res.sendStatus(err.status || 500)
//   }
// })

// Body Parser Middleware
app.use(bodyParser.json())
app.use(cors())

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port
  console.log('App now running on port', port)
})

//Initializing connection string
var dbConfig = {
  user: 'javier29',
  password: 'test1234',
  server: 'COT-CIS4375-07.cougarnet.uh.edu',
  database: 'REMEDI',
}

//GET API
app.get('/', function (req, res) {
  getEmployees()
})

function getEmployees() {
  var dbConn = new sql.Connection(dbConfig)
  dbConn
    .connect()
    .then(function () {
      var request = new sql.Request(dbConn)
      request
        .query('select * from Contractor')
        .then(function (resp) {
          console.log(resp)
          dbConn.close()
        })
        .catch(function (err) {
          console.log(err)
          dbConn.close()
        })
    })
    .catch(function (err) {
      console.log(err)
    })
}

module.exports = app
