import { Router } from "express";
import {
  login,
  logout,
  register,
  profile,
  verifyToken,
  actulizarUsuario,
} from "../controlles/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, updateUserSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequired, profile);
router.put("/profile", authRequired, validateSchema(updateUserSchema), actulizarUsuario);
export default router;
