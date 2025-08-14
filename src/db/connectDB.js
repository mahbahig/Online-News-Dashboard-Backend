import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL).then(() =>{
        console.log("Connected to Database successfully");
    }).catch((error) => {
        console.error("Error connecting to the database:", error);
    });

}

export default connectDB;