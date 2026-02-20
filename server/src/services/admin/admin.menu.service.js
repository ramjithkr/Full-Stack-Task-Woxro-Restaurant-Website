import Menu from "../../modules/menu/menu.model.js";

export const getAllMenuItems = async () => {
  return await Menu.find();
};

export const getMenuById = async (id) => {
  return await Menu.findById(id);
};

//admin
export const createMenuItem = async (data) => {
  return await Menu.create(data);
};

export const updateMenuItem = async (id, data) => {
  return await Menu.findByIdAndUpdate(id, data, { new: true });
};

export const deleteMenuItem = async (id) => {
  return await Menu.findByIdAndDelete(id);
};
