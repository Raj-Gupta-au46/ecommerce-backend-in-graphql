import Admin from "../models/admin.model.js";

const adminHelper = {
  isEmailAlreadyExist: async (email) => {
    const admin = await Admin.findOne({ email: email });
    return admin ? true : false;
  },
};
export default adminHelper;
