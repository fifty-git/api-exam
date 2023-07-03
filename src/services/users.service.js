import fs from "fs/promises";

export const addUser = async (newUser) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  const users = jsonData.users;
  if (users.find((user) => user.email === newUser.email)) {
    return [false, "Email already exist"];
  }
  jsonData.users.push(newUser);
  await fs.writeFile("./data/db.json", JSON.stringify(jsonData));
  return [newUser];
};

export const getUserByEmail = async (email) => {
  const jsonData = JSON.parse(
    await fs.readFile("./data/db.json", { encoding: "utf-8" })
  );
  const users = jsonData.users;
  return users.find((user) => user.email === email);
};
