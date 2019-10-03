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

module.exports = router;
