import express from "express";
import Services from "./exports/services.js";
import superAdminServices from "./exports/superAdminServices.js";
import middlewares from "./exports/middlewares.js";
const router = express.Router();

router.post("/api/v1/auth/login", Services.Login);
router.post("/api/v1/auth/signup", Services.Signup);
router.post('/api/v1/auth/add-enterprise-details', Services.addEnterpriseDetails);

router.post("/api/v1/admin/add-employees", Services.addEmployees);
router.get("/api/v1/admin/employees", Services.getAllEmployees);
router.post("/api/v1/admin/create-roaster",Services.createRoaster)
router.get("/api/v1/admin/get-roaster",Services.getRoaster)


router.get("/api/v1/superadmin/get-enterprises",middlewares.verifySuperAdmin,superAdminServices.getEnterprises)
router.post("/api/v1/superadmin/get-enterprise",middlewares.verifySuperAdmin,superAdminServices.getEnterpriseDetails)

export default router;
