require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

console.log("auth middleware");
  const token = req.header('Authorization').split(' ')[1];
  if (token) {
    // console.log(token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).send(err.message);
    }


    //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(401).send(err.message);
    //     }
    //     req.user = decoded;
    //     next();
    //   });
  }
};

module.exports = auth;
