import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser, getUserByEmail } from "../services/users.service.js";
import { createResponseError, createUUID } from "../utils/index.js";
import {
  MESSAGE,
  SIGN_IN_ERROR_MESSAGE,
  STATUS_CODE,
} from "../constant/index.js";

export const signUp = async (req, res, next) => {
  try {
    const newUser = {
      id: createUUID(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      userType: 1,
    };
    const [result, errorMessage] = await addUser(newUser);
    if (!result) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(createResponseError(STATUS_CODE.BAD_REQUEST, errorMessage));
    }

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send(SIGN_IN_ERROR_MESSAGE);
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send(SIGN_IN_ERROR_MESSAGE);
    }
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );
    return res.json({
      message: MESSAGE.LOGIN_SUCESS,
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
