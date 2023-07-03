import { MESSAGE, STATUS_CODE } from "../constant/index.js";

export const validate = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    if (!schema) {
      return res
        .status(STATUS_CODE.INTERNAL_SERVER)
        .json({ message: MESSAGE.REQUIRED_SCHEMA });
    }
    await schema.validate(body);
    return next();
  } catch (err) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      type: err.name,
      message: err.message || MESSAGE.SOMETHING_WENT_WRONG,
    });
  }
};
