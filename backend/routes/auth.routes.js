import express from "express"
import { deleteUser, getAllUsers, getMe, getUserDetails, login, logout, register, updateProfile, updateUser } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { authorizedRoles } from "../middlewares/authorizedRoles.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/me")
    .get(isAuthenticated, getMe)
    .put(isAuthenticated, updateProfile)

router.route("/logout").post(isAuthenticated, logout);


router.route("/amir/users")
    .get(isAuthenticated, authorizedRoles("amir"), getAllUsers)
router.route("/amir/users/:id")
    .get(isAuthenticated, authorizedRoles("amir"), getUserDetails)
    .put(isAuthenticated, authorizedRoles("amir"), updateUser)
    .delete(isAuthenticated, authorizedRoles("amir"), deleteUser)

export default router;