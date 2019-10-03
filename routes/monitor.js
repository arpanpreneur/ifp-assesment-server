var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var jwt = require('jsonwebtoken');

router.post('/', async (req,res) => {
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


module.exports = router;
