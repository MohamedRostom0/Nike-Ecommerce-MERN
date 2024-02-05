import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

export const setupPassport = ({ jwtHandler }) => {
  const secret = process.env.JWT_SECRET;
  const jwt = ExtractJwt.fromAuthHeaderAsBearerToken("JWT");

  const strategy = new JWTStrategy(
    { secretOrKey: secret, jwtFromRequest: jwt },
    jwtHandler
  );

  passport.use(strategy);
};
