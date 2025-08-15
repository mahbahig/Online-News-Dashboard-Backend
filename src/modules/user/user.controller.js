import * as US from "./user.service.js";

export const signup = async (req, res, next) => {
    const { name, email, age, gender, password } = req.body;
    const result = await US.signup({ name, email, age, gender, password });
    res.status(201).json({ message: "Success", token: result.token });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await US.login({ email, password });
    res.status(200).json({ message: "Success", token: result.token });
};

export const getUser = async (req, res, next) => {
    const user = await US.getUserById(req.user.id);
    if (!user) {
        throw new Error("User not found", { cause: 404 });
    }
    res.status(200).json(user);
};

export const confirmEmail = async (req, res, next) => {
    const { token } = req.params;
    const result = await US.confirmEmail(token);
    res.status(200).send(result);
}