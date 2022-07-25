"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const middlewares_1 = require("../middlewares/middlewares");
const auth = new auth_1.default();
const router = express_1.default.Router();
router.post('/register', middlewares_1.accountLimiter, auth.registerUser);
router.post('/login', auth.loginUser);
router.post('/logout', auth.logoutUser);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password/:resetToken', auth.resetPassword);
//  router.post('/enable-2fa', auth.enableTwofactorAuth)
router.post('/verify', middlewares_1.requireSignIn, auth.verifyTwofactorAuth);
router.post('/create-user-interests', auth.createUserInterests);
router.put('/edit-profile', middlewares_1.requireSignIn, auth.updateUser);
router.get("/users/:userId", middlewares_1.requireSignIn, auth.getUsersById);
router.get("/users", middlewares_1.requireSignIn, auth.getUsers);
router.get("/user-interests", auth.getUserInterests);
module.exports = router;
