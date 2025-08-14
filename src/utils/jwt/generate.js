import jwt from "jsonwebtoken";

export const GenerateToken = ({ payload, signature = process.env.JWT_SIGNATURE, options }) => {
    return jwt.sign(payload, signature, options);
};
