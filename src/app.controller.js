import connectDB from "./db/connectDB.js";
import { errorHandling } from "./middleware/errorHandling.js";
import { unifyResponse } from "./middleware/unifyingResponse.js";
import newsRouter from "./modules/news/news.router.js";
import userRouter from "./modules/user/user.router.js";
import cors from 'cors';

const bootstrap = (app, express) => {
    app.use(express.json());

    connectDB();

    app.use(unifyResponse);

    app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/news", newsRouter);

    app.use(errorHandling);
}

export default bootstrap;