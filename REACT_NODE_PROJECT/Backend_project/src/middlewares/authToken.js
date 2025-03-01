const jwt = require("jsonwebtoken");
const authToken = (req, res, next) => {
  try {
      console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
  
    
    const userData = jwt.verify(token, "privateKey");
    req.user = userData;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "token verification faild",
    });
  }
};

module.exports = authToken;
