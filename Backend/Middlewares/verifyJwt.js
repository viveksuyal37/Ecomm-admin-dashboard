const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            msg: "Invalid or expired session please re-login",
          });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else {
      res.json({ success: false, msg: "token needed with auth header" });
    }
  } catch (error) {
    res.statusStatus(500);
  }
};

module.exports = verifyToken;
