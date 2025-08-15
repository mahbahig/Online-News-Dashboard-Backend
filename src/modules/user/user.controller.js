import * as US from "./user.service.js";
import { eventEmitter, GenerateToken, Hash, Compare } from "../../utils/index.js"

// ====================================== SIGNUP ======================================
export const signup = async (req, res, next) => {
    const { name, email, gender, password } = req.body;

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
    res.status(201).json({ message: "Success", token });
};
// ====================================== LOGIN ======================================
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if user already exists
    const user = await US.getUserByEmail(email);
    if (!user) {
        throw new Error("User not exists", { cause: 404 });
    }

    // Compare user input to stored hashed password
    const match = await Compare({ plainText: password, hashedText: user.password });

    // Handling wrong password error
    if(!match) {
        throw new Error('Wrong password', { cause: 401 });
    }

    // Create token
    const token = GenerateToken({ payload: { id: user._id, email: user.email }, options: { expiresIn: "1h" } });
    if (!token) {
        throw new Error("Cannot create token", { cause: 500 });
    }
    res.status(201).json({ message: "Success", token });
};

// TODO: npm 