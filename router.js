import express from "express";
import Services from "./exports/services.js";
const 
router = express.Router();

router.post("/api/v1/auth/login", Services.Login);
router.post("/api/v1/auth/signup", Services.Signup);
router.post('/api/v1/auth/add-enterprise-details', Services.addEnterpriseDetails);

router.post("/api/v1/admin/add-employees", Services.addEmployees);
router.get("/api/v1/admin/employees", Services.getAllEmployees);

export default router;
