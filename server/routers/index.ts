import { login, logout, refreshToken } from "../controllers/auth.controller"
import { Router } from "express"
import { addFriend, getProfile, register, getFriendList, getTopPlayer, searchUser, updateUser } from "../controllers/user.controller"
import { authGuard } from "../middlewares/jwt.guard"
import { getMatchHistory, initialMatch } from "../controllers/match.controller"
const router = Router()

// AUTH
router.post("/auth/login", login)
router.get("/auth/refreshToken", refreshToken)
router.delete("/auth/logout", logout)

// USER
router.post("/user/register", register)
router.get("/user/profile", authGuard, getProfile)
router.get("/user/friend/add/:friendId", authGuard, addFriend)
router.get("/user/getFriendList", authGuard, getFriendList)
router.get("/user/topPlayer", getTopPlayer)
router.get("/user/search", searchUser)
router.put("/user/update", authGuard, updateUser)

// Match
router.get("/match/init", initialMatch)
router.get("/match/history", authGuard, getMatchHistory)

export default router   