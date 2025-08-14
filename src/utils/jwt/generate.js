import jwt from "jsonwebtoken";

export const GenerateToken = ({ payload, signature, options }) => {
    return jwt.sign(payload, signature, options);
};
