import { User } from "../../db/models/user.model.js";
import { eventEmitter, GenerateToken, Hash, Compare } from "../../utils/index.js";

export const signup = async ({ name, email, age, gender, password }) => {
    // Check if user already exists
    if (await User.findOne({ email })) throw new Error("Email already exists");

    // Send confirmation email
    eventEmitter.emit("confirmEmail", { email });

    // Hash password
    const hashedPassword = await Hash({ plainText: password });

    // Create user
    const user = await User.create({ name, email, age, gender, password: hashedPassword });

    // Create token
    const token = GenerateToken({
        payload: { id: user._id, email: user.email },
        options: { expiresIn: "1h" }
    });
    if (!token) throw new Error("Cannot create token");

    return { user, token };
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not exists");

    const match = await Compare({ plainText: password, hashedText: user.password });
    if (!match) throw new Error("Wrong password");

    const token = GenerateToken({
        payload: { id: user._id, email: user.email },
        options: { expiresIn: "1h" }
    });
    if (!token) throw new Error("Cannot create token");

    return { user, token };
};

export const getUserById = async (id) => User.findById(id);

export const getAllUsers = async () => User.find();

export const deleteUser = async (id) => User.findByIdAndDelete(id);
