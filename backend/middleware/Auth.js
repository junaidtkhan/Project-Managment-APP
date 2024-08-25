require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

console.log("auth middleware");
  const token = req.header('Authorization').split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send(err.message);
    }
  }
};

module.exports = auth;
