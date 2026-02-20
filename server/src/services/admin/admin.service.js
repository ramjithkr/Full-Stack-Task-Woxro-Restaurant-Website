import Admin from "../../modules/admin/admin.model.js";

export const createAdmin = async (data) => {
  return await Admin.create(data);
};
