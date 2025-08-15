import mongoose from "mongoose";

export const userGender = {
    male: "male",
    female: "female"
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    gender: {
        type: String,
        enum: [userGender.male, userGender.female]
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    }
}, { strict: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema);