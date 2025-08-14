import { User } from "../../db/models/user.model.js"

export const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

export const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

export const getUserByEmail = async (email) => {
    const user = await User.findOne({ email, confirmed: true });
    return user;
}

export const createUser = async (userData) => {
    const user = User.create(userData);
    return user;
}

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}