var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.json({"message": "Server working!!"});
});

router.post('/login', async function(req, res, next) {
  const pool = req.dbpool;

  const data = req.body;
  if(!(data && data['username'] && data['password'])) {
    return res.json("I know there's no docs but I guess you have common sense");
  }

  let hashed = sha1('NikhilCantHaveSex' + data['password']);
  try {
    const { rows } = await pool.query(`SELECT userID, username, password from users where username = $1 AND password = $2`, [data['username'], hashed]);

    if(rows && rows.length == 1) {
      // Password already matched by database and it is hashed so there's not much chance of SQL injection
      const userDetails = rows[0];
      
      jwt.sign({userDetails}, process.env.SECRET_KEY, {expiresIn: '30m'}, (err, token) => {

        if(err) return res.json({"error": true, "message": "Signing Error"});

        return res.json({
          "error": false,
          "token": token,
          
        });
      });
    } else {
      return res.json({"error": true, "message": "User/Password combination invalid"});
    }

  } catch(ex) {
    console.log(ex);
    return res.json({"error": true, "msg": "Something went wrong!!"});
  }
});

router.post('/monitor', async (req,res) => {
  let monitor = req.body;
  const io = req.app.get('socketio');

  if(!(monitor['deviceId'] && monitor['status'] && monitor['time'] && monitor['load'])) {
    return res.json({
      "error": true,
      "message": "Data not valid"
    });
  }

  try {
    const pool = req.dbpool;
    const { rows } = await pool.query(`INSERT INTO monitor (deviceid, status, load, time) Values($1, $2, $3, $4) RETURNING id`, [monitor['deviceId'], monitor['status'], monitor['load'], monitor['time']]);

    if(rows.length > 0) {
      io.to(monitor['deviceId']).emit("new_monitor_data", monitor);

      res.json({
        "error": false,
        "message": "Data Inserted Successfully"
      });
    }
    
  } catch(ex) {
      console.log(ex);

      res.json({
        "error": true,
        "message": "Database Query Failure"
      })
  }
});

router.get('/testEmit', (req, res) => {
  try{
    const io = req.app.get('socketio');

    console.log(req.query.deviceID);
    io.to(req.query.deviceID).emit("testEmit", {"message": "Test Emit"});
    

    return res.json("Sent")
  } catch(ex) {
    console.log(ex);
    return res.json("Not Sent");
  }
  
});

module.exports = router;
