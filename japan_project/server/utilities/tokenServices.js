import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = { sub: userId };

  const options = {
    expiresIn: "1d",
  };

  // const key1=process.env.JWT_SECRET_KEY
  const secretOrPrivateKey = "hello"; //REVIEW a stronger key would be adviced.

  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);
  if (!jwtToken) return null;

  if (jwtToken) return jwtToken;
};
export { generateToken };
