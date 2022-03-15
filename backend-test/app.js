const express = require("express");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
var sql = require("mssql");
require("msnodesqlv8");

// const routes = require("./routes/index");

const app = express();

const port = 3000;

// Body Parser Middleware
app.use(bodyParser.json());
app.use(cors());

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

//Initializing connection string

var dbConfig = {
  user: "javier29",
  password: "test1234",
  server: "COT-CIS4375-07.cougarnet.uh.edu",
  database: "REMEDI",
  driver: "msnodesqlv8",
  options: {
    // trustedConnection: true,
    trustServerCertificate: true,
  },
};

//GET API
app.get("/", function (req, res) {
  getContractors();
});

function getContractors() {
  var dbConn = new sql.ConnectionPool(dbConfig);
  dbConn
    .connect()
    .then(function () {
      var request = new sql.Request(dbConn);
      request
        .query("select * from contractor")
        .then(function (resp) {
          console.log(resp);
          dbConn.close();
        })
        .catch(function (err) {
          console.log(err);
          dbConn.close();
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

module.exports = app;
