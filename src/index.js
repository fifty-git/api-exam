import express from "express";
import ServerlessHttp from "serverless-http";
import bodyParser from "body-parser";
import { validate } from "./middlewares/validate.middleware.js";
import itemsRouter from "./routes/items.routes.js";
import { signIn, signUp } from "./controllers/auth.controller.js";
import { signInSchema, signUpSchema } from "./schemas/index.js";
import { verifyToken } from "./middlewares/authJWT.middleware.js";
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use("/items", verifyToken, itemsRouter);
app.post("/sign-up", validate(signUpSchema), signUp);
app.post("/sign-in", validate(signInSchema), signIn);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error("err", err.message, err.stack);
  res
    .status(statusCode)
    .json({ message: err.message || "Something went wrong" });
  return;
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = ServerlessHttp(app);
