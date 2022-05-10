"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const jwt_1 = require("../middlewares/jwt");
const router = (0, express_1.Router)();
// AUTH
router.post("/auth/login", auth_controller_1.login);
router.get("/auth/refreshToken", auth_controller_1.refreshToken);
router.delete("/auth/logout", auth_controller_1.logout);
// USER
router.post("/user/register", user_controller_1.register);
router.get("/user/profile", jwt_1.authGuard, user_controller_1.getProfile);
exports.default = router;
//# sourceMappingURL=index.js.map