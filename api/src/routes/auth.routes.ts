import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router() ;

router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.post('/logout', UserController.logoutUser)

export default router;