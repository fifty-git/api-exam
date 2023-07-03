import fs from "fs/promises";

export const getItems = async () => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  return jsonData.items;
};

export const getItemDetails = async (id) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  const items = jsonData.items;
  const itemDetails = items.find((item) => item.id == id);
  if (!itemDetails) {
    return [false, "Item not found"];
  }
  return [itemDetails];
};

export const createItem = async (newItem) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  jsonData.items.push(newItem);
  await fs.writeFile("./data/db.json", JSON.stringify(jsonData));
  return newItem;
};

export const updateItem = async (updateItem) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  const items = jsonData.items;
  const itemIndex = items.findIndex((item) => item.id == updateItem.id);
  if (itemIndex === -1) {
    return [false, "Item does not exist"];
  }
  items[itemIndex] = updateItem;
  await fs.writeFile("./data/db.json", JSON.stringify(jsonData));
  return [updateItem];
};

export const deleteItem = async (id) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  const items = jsonData.items;
  const itemIndex = items.findIndex((item) => item.id == id);
  if (itemIndex === -1) {
    return [false, "Item does not exist"];
  } else {
    items.splice(itemIndex, 1);
    await fs.writeFile("./data/db.json", JSON.stringify(jsonData));
    return [id];
  }
};
