const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

if ( !SECRET_KEY || SECRET_KEY.length !== 64 || !REFRESH_SECRET_KEY || REFRESH_SECRET_KEY.length !== 64)
  throw new Error("Invalid SECRET_KEY. It must be a 64-character hex string.");

// Create a data object for the user
// ============================================================================

const data = (user) => {
  return {
    id: user._id,
    email: user.email,
    nonce: crypto.randomBytes(16).toString("hex"),
  };
};

// Create an access token for the user
// ============================================================================

const createAccessToken = (user) => {
  return jwt.sign(data(user), SECRET_KEY, { expiresIn: "1h" });
};

// Create a refresh token for the user
// ============================================================================

const createRefreshToken = (user) => {
  return jwt.sign(data(user), REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

// Generate tokens for the user
// ============================================================================

module.exports.generateTokens = (user) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  return { accessToken, refreshToken };
};
