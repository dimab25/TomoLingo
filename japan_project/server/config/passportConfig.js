import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UsersModel from "../models/usersModel.js";
// import passport from "passport";

const key1=process.env.JWT_SECRET_KEY
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hello",
};

const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
    console.log('jwt_payload :>> ', jwt_payload);
  try {
    const user = await UsersModel.findOne({ _id: jwt_payload.sub });

    if (!user) {
      console.log("create new account");
      return done(null, false);
    }
    if (user) {
      console.log("user found");
      return done(null, user);
    }
  } catch (err) {
    console.log("token invalid");
    return done(err, false);
  }
});

export default passportStrategy;
