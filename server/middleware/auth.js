const jwt = require("jsonwebtoken");

const SECRET = "secretkey";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No auth header" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, SECRET);

    console.log("DECODED USER:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT VERIFY ERROR:", err.message);

    return res.status(401).json({
      message: "Token invalid",
      error: err.message,
    });
  }
};