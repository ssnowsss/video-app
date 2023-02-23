import express from "express"
import { login, register, googleSign, logout } from "../controllers/auth.js"
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/google", googleSign)
router.post("/logout", logout)


export default router