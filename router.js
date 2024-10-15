import express from "express";
import Services from "./exports/services.js";
const router = express.Router();

router.post("/api/v1/auth/login", Services.Login);
router.post("/api/v1/auth/signup", Services.Signup);

export default router;
