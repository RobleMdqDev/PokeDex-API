const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const http = require("http");

const app = express();

app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE, PATCH');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
	next();
});

require('./routes/login')(app);


app.use(function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  if (authHeader === undefined) return res.sendStatus(403);

  jwt.verify(authHeader, "poke_secret", (err, user) => {
     if (err) return res.status(404).send(err);
     req.user = user;
     next();
  });
});

require('./routes')(app);

const server = http.createServer(app);
const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
server.listen(port);
console.log(`Server run in port: ${port}`);

module.exports = app;
