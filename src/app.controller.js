import connectDB from "./db/connectDB.js";
import userRouter from "./modules/user/user.router.js"

const bootstrap = (app, express) => {
    app.use(express.json());

    connectDB();

    app.use("/api/v1/users", userRouter);
}

export default bootstrap;