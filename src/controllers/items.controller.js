import { MESSAGE, STATUS_CODE } from "../constant/index.js";
import * as itemsService from "../services/items.service.js";
import {
  createResponseError,
  createResponseSuccess,
  createUUID,
} from "../utils/index.js";

export const getItemsController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          createResponseError(STATUS_CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED)
        );
    }
    const result = await itemsService.getItems();
    return res.json(createResponseSuccess(STATUS_CODE.OK, result));
  } catch (err) {
    next(err);
  }
};

export const getItemDetailsController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          createResponseError(STATUS_CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED)
        );
    }
    const itemId = req.params.id;
    const [result, errorMessage] = await itemsService.getItemDetails(itemId);
    if (!result) {
      return res.json(
        createResponseError(STATUS_CODE.NO_CONTENT, errorMessage)
      );
    }
    return res.json(createResponseSuccess(STATUS_CODE.OK, result));
  } catch (err) {
    next(err);
  }
};

export async function createItemController(req, res, next) {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          createResponseError(STATUS_CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED)
        );
    }
    const newItem = {
      id: createUUID(),
      description: req.body.description,
      itemCategoryId: req.body.itemCategoryId,
      cost: req.body.cost,
    };
    const result = await itemsService.createItem(newItem);
    return res.json(createResponseSuccess(STATUS_CODE.CREATED, result));
  } catch (err) {
    next(err);
  }
}

export const updateItemController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          createResponseError(STATUS_CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED)
        );
    }
    const item = {
      id: req.params.id,
      description: req.body.description,
      itemCategoryId: req.body.itemCategoryId,
      cost: req.body.cost,
    };
    const [result, errorMessage] = await itemsService.updateItem(item);
    if (!result) {
      return res.json({
        statusCode: 204,
        body: { error: errorMessage },
      });
    }
    return res.json(createResponseSuccess(STATUS_CODE.OK, result));
  } catch (err) {
    next(err);
  }
};

export const deleteItemController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          createResponseError(STATUS_CODE.UNAUTHORIZED, MESSAGE.UNAUTHORIZED)
        );
    }

    const itemId = req.params.id;
    const [result, errorMessage] = await itemsService.deleteItem(itemId);
    if (!result) {
      return res.json(
        createResponseError(STATUS_CODE.NO_CONTENT, errorMessage)
      );
    }
    return res.json(
      createResponseSuccess(STATUS_CODE.OK, `Delete item successfully`)
    );
  } catch (err) {
    next(err);
  }
};
