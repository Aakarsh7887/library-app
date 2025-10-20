const { verify_token } = require("../jwt");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.substring(7);
  const { status, payload } = verify_token(token);
  if (status) {
    const { _id } = payload;
    const user = await User.findOne({ _id });
    if (!user) {
      return res
        .status(403)
        .send({ message: "Invalid token. please authenticate" });
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  } else {
    return res
      .status(403)
      .send({ message: "Invalid token. please authenticate" });
  }
};

module.exports = { authMiddleware };
