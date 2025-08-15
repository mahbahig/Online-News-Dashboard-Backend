import { User } from "../../db/models/user.model.js";
import { emailConfirmedTemplate } from "../../templates/emailConfirmed/emailConfirmed.js";
import { eventEmitter, GenerateToken, Hash, Compare, VerifyToken } from "../../utils/index.js";

export const signup = async ({ name, email, age, gender, password }) => {
    // Check if user already exists
    if (await User.findOne({ email })) throw new Error("Email already exists");

    // Send confirmation email
    eventEmitter.emit("confirmEmail", (email));

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
    const user = await getUserByEmail(email);
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

export const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found", { cause: 404 });
    return user;
};

export const confirmEmail = async (token) => {
    if (!token) {
        throw new Error("Token is required", { cause: 400 });
    }

    const decoded = VerifyToken({ token });
    if (!decoded) {
        throw new Error("Invalid token", { cause: 400 });
    }

    const user = await getUserByEmail(decoded.email);
    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }
    user.isEmailConfirmed = true;
    await user.save();
    const successHtml = emailConfirmedTemplate(user.name);
    return successHtml;
}

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found", { cause: 404 });
    return user;
};

export const getAllUsers = async () => User.find();

export const deleteUser = async (id) => User.findByIdAndDelete(id);
