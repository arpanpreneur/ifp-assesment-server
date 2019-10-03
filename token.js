var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    // if(typeof bearerHeader !== 'undefined') {
    if(bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
  
      jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
  
          req.authData = authData;
          next();
        }
      });
      
    } else {
  
      res.sendStatus(401);
    }
}

module.exports = { verifyToken }