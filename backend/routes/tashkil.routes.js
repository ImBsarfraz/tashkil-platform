import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { createTashkil, deleteTashkil, getAllTashkils, getMyTashkils, getTashkilDetails, updateTashkil } from "../controllers/tashkil.controller.js";

const router = express.Router();

router.route("/")
    .post(isAuthenticated, createTashkil)

router.route("/")
    .get(getAllTashkils)

router.route("/my-tashkils")
    .get(isAuthenticated, getMyTashkils)

router.route("/:id")
    .get(isAuthenticated, getTashkilDetails)
    .put(isAuthenticated, updateTashkil)
    .delete(isAuthenticated, deleteTashkil)

export default router;