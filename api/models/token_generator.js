const JWT = require("jsonwebtoken");

// Expiry for JWT token (10 minutes)
const options = {expiresIn: "10m"};

// Secret used for JWT accessed from .env file
const secret = process.env.JWT_SECRET;

// Class with static method to generate (sign) JWT when passed user_id as argument
class TokenGenerator {
  static jsonwebtoken(user_id) {
    return JWT.sign({user_id: user_id, iat: Date.now()}, secret, options);
  }
}

module.exports = TokenGenerator;
