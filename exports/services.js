import Login from "../services/Login.js";
import Signup from "../services/Signup.js";
import addEnterpriseDetails from "../services/addEnterpriseDetails.js";
import addEmployees from "../services/admin/add-employees.js";
import getAllEmployees from "../services/admin/get-all-employees.js";
import createRoaster from "../services/admin/create-roaster.js";
import getRoaster from "../services/admin/get-roaster.js";
const Services = {
  Login,
  Signup,
  addEnterpriseDetails,
  addEmployees,
  getAllEmployees,
  createRoaster,
  getRoaster
};

export default Services;
