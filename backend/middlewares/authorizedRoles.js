import { customError } from "../utils/customError.js"

export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new customError(`Unauthorized User`, 403)
            )
        }

        next();
    }
}