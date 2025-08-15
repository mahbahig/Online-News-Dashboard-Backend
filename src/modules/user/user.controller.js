import * as US from "./user.service.js";
import { eventEmitter, GenerateToken, Hash } from "../../utils/index.js"

// ====================================== SIGNUP ======================================
export const signup = async (req, res, next) => {
    const { name, email, age, gender, password } = req.body;

    // Check if user already exists
    if (await US.getUserByEmail(email)) {
        throw new Error("Email already exists", { cause: 400 });
    }

    // Send confirmation email
    eventEmitter.emit("confirmEmail", { email })

    // Hash password and create user
    const hashedPassword = await Hash({ plainText: password });
    const user = await US.createUser({ name, email, age, gender, password: hashedPassword });

    // Create token
    const token = GenerateToken({ payload: { id: user._id, email: user.email }, options: { expiresIn: "1h" } });
    if (!token) {
        throw new Error("Cannot create token", { cause: 500 });
    }
    res.status(201).json({ message: "User created successfully", token });
};
