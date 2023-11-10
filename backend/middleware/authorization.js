const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    // Check if the "Authorization" header exists
    if (!req.headers.authorization) {
      return res.status(403).send({ msg: "Token does not exist." });
    }

    let receivedToken = req.headers.authorization.split(" ")[1];
    
    // Check if the token exists after splitting
    if (!receivedToken) {
      return res.status(403).send({ msg: "Token does not exist." });
    }

    let verifiedToken = jwt.verify(receivedToken, process.env.TOKEN_KEY);
    
    // Check if the token is verified
    if (!verifiedToken) {
      return res.status(401).send({ msg: "Not authorized." });
    }

    // Attach the user information to the request object
    req.user = verifiedToken;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal server error from auth." });
  }
};

module.exports = verifyToken;
