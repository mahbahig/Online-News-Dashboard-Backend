import jwt from "jsonwebtoken";

export const VerifyToken = ({ token, signature = process.env.JWT_SIGNATURE }) => {
    return jwt.verify(token, signature);
};
