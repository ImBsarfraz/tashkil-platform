import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new customError("Access Denied, Login First", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
}