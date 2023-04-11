import express from "express";
import { allUsers, register, findUser, login, logout } from "../controllers/funcions.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", allUsers);

router.post("/new", register);

router.post("/login", login);

router.post("/logout", logout);


router.get("/me", isAuthenticated ,findUser);

export default router;