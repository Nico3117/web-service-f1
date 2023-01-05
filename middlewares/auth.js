const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
  
    if (!token) {
      return res.status(401).json({message: 'Token is required'});
    }
  
    jwt.verify(token, 'RANDOM_TOKEN_SECRET', (err, decoded) => {

        if (err) {
            return res.status(401).json({message: 'Token is invalid'});
        }

        req.user = decoded;
        next();
    });
  }