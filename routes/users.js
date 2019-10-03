var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/', async (req, res) => {
  const pool = req.dbpool;

  const data = req.body;
  if(!(data && data['username'] && data['password'])) {
    return res.json({"error": true , "message" : "I know there's no docs but I guess you have common sense"});
  }
  try {
    let hashed = sha1('NikhilCantHaveSex' + data['password']);
    const { rows } = await pool.query(`INSERT INTO users (username, password) Values($1, $2) RETURNING userID`, [data['username'], hashed]);

    let uid = rows[0]['userid'];
    return res.json({"error": false, "userID": uid});

  } catch(ex) {
    
    console.log(ex);
    return res.json({"error": true, "msg": "Something went wrong!"});
  }
})


module.exports = router;
