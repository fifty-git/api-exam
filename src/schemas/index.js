import yup from "yup";
export const signUpSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const signInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const createItemSchema = yup.object({
  description: yup.string().optional(),
  itemCategoryId: yup.number().required(),
  cost: yup.number().required(),
});

export const updateItemSchema = yup.object({
  description: yup.string().optional(),
  itemCategoryId: yup.number().required(),
  cost: yup.number().required(),
});
