import connectDB from "./db/connectDB.js";

const bootstrap = (app, express) => {
    app.use(express.json());

    connectDB();

    app.use
}

export default bootstrap;