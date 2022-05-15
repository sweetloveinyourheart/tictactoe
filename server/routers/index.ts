import { login, logout, refreshToken } from "../controllers/auth.controller"
import { Router } from "express"
import { addFriend, getProfile, register } from "../controllers/user.controller"
import { authGuard } from "../middlewares/jwt.guard"
import { initialMatch } from "../controllers/match.controller"
const router = Router()

// AUTH
router.post("/auth/login", login)
router.get("/auth/refreshToken", refreshToken)
router.delete("/auth/logout", logout)

// USER
router.post("/user/register", register)
router.get("/user/profile", authGuard, getProfile)
router.get("/user/friend/add/:friendId", authGuard, addFriend)

// Match
router.get("/match/init", initialMatch)

export default router