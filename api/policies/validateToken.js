const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const authorization = req.headers.authorization?.split(' ') || [];
  if (authorization[0] !== 'JWT') {
    return res.status(401).json({message: '401 Unauthorized'});
  }

  jwt.verify(authorization[1], process.env.SECRET_KEY, function (err, decode) {
    if (err) {
      return res.status(401).json({message: '401 Unauthorized'});
    } else {
      next();
    }
  });
}
