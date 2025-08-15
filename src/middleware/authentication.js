import { User } from "../db/models/user.model.js";
import { VerifyToken } from "../utils/index.js";

export const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    // Check if token is provided
    if (!authorization) {
        throw new Error("Token not found", { cause: 401 });
    }

    // Verify token
    const decoded = VerifyToken({ token: authorization });
    if (!decoded) {
        throw new Error("Invalid token", { cause: 401 });
    }
    req.decoded = decoded;

    // Check user existence and attach user to request
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }
    req.user = user;
    next();
};
