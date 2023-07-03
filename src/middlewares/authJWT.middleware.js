import jwt from "jsonwebtoken";
import { getUserByEmail } from "../services/users.service.js";
export const verifyToken = (req, res, next) => {
  if (
    req.apiGateway &&
    req.apiGateway.event &&
    req.apiGateway.event.headers &&
    req.apiGateway.event.headers.authorization &&
    req.apiGateway.event.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const decode = jwt.verify(
        req.apiGateway.event.headers.authorization.split(" ")[1],
        process.env.ACCESS_TOKEN_SECRET
      );
      if (!decode) {
        req.user = undefined;
      } else {
        const user = getUserByEmail(decode.email);
        req.user = user;
      }
    } catch (error) {
      req.user = undefined;
    }
    next();
  } else {
    req.user = undefined;
    next();
  }
};
