import bcrypt from "bcrypt";

export const Compare = async ({ plainText, hashedText }) => {
    try {
        return await bcrypt.compare(plainText, hashedText);
    } catch (error) {
        throw new Error(`Comparison failed: ${error.message}`);
    }
};