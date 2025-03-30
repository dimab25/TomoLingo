import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (userId) => {
  const payload = { sub: userId };

  const options = {
    expiresIn: "1d",
  };


  const secretOrPrivateKey = process.env.JWT_SECRET_KEY
// console.log('process.env.JWT_SECRET_KEY :>> ', process.env.JWT_SECRET_KEY);
  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);
  if (!jwtToken) return null;

  if (jwtToken) return jwtToken;
};
export { generateToken };
