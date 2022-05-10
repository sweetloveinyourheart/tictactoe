import { login, logout, refreshToken } from "../controllers/auth.controller"
import { Router } from "express"
import { getProfile, register } from "../controllers/user.controller"
import { authGuard } from "../middlewares/jwt"
const router = Router()

// AUTH
router.post("/auth/login", login)
router.get("/auth/refreshToken", refreshToken)
router.delete("/auth/logout", logout)

// USER
router.post("/user/register", register)
router.get("/user/profile", authGuard, getProfile)

export default router