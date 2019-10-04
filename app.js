require('dotenv').config();

var pool = require('./db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var tokenUtil = require('./token');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var monitorRouter = require('./routes/monitor');

var http = require('http');
const app = express();

var server = http.createServer(app);
// Pass a http.Server instance to the listen method

server.listen(5000, () => console.log('Server started at port 5000'));
var io = require('socket.io').listen(server);
app.set('socketio', io);


var socketioJwt = require('socketio-jwt');
var monitorHandler = require('./events/monitorHandler');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.dbpool = pool;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(tokenUtil.verifyToken);
app.use('/monitor', monitorRouter);

io.on('connection', socketioJwt.authorize({
    secret: process.env.SECRET_KEY,
    timeout: 15000 // 15 seconds to send the authentication message

  })).on('authenticated', async function(socket) {
  
  //this socket is authenticated, we are good to handle more events from it.
    console.log("Authentication Successful");
    console.log('hello! ' + socket.decoded_token);
    const user = socket.decoded_token.userDetails;
    
    await joinAllDeviceChannelForUser(user['userid'], socket);

    monitorHandler(socket, pool);

});

async function joinAllDeviceChannelForUser(uid, socket) {
  try {
    const { rows } = await pool.query(`SELECT deviceid from device where userid = $1`, [uid]);
    if(rows && rows.length > 0) {
      rows.forEach((row) => {
        console.log(row);
        socket.join(row['deviceid']);
      });
    }
  } catch(ex) {
    console.log(ex);
  }
}

module.exports = app;


