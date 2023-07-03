import express from "express";
import * as itemsController from "../controllers/items.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createItemSchema, updateItemSchema } from "../schemas/index.js";
const itemsRouter = express.Router();

itemsRouter.get("/", itemsController.getItemsController);

itemsRouter.get("/:id", itemsController.getItemDetailsController);

itemsRouter.post(
  "/",
  validate(createItemSchema),
  itemsController.createItemController
);

itemsRouter.put(
  "/:id",
  validate(updateItemSchema),
  itemsController.updateItemController
);

itemsRouter.delete("/:id", itemsController.deleteItemController);
export default itemsRouter;
