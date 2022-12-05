const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, "1234");
};

const authorization = (req, res, next) => {
  console.log("hi i am authorization");
  try {
    const bearerToken = req?.headers?.authorization;
    console.log(bearerToken);
    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Login again Session Expired", status: "Failed" });
    }

    const token = bearerToken.split(" ")[1];

    let user;
    try {
      user = verifyToken(token);
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Login again Session Expired", status: "Failed" })
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, Login again", status: "Failed" });
    }

    req.user = user.user;

    return next();
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
};

module.exports = authorization;
