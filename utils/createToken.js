import jwt from "jsonwebtoken"

const createToken = {
  activation: (payload) => {
    // * payload is the user {name,email,role,...} 
    // * so i think that will return {user,token}
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN, { expiresIn: "5m" });
  },
  
  refresh: (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "24h" });
  },
  access: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
  },
};
module.exports = createToken;