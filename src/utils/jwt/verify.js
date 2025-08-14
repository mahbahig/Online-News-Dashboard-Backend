import jwt from "jsonwebtoken";

export const VerifyToken = ({ token, signature }) => {
    return jwt.verify(token, signature);
};
