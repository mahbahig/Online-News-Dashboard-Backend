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
    age: {
        type: Number,
        required: true,
        min: [18, "You must be at least 18 years old"],
        max: [60, "You must be at most 60 years old"]
    },
    gender: {
        type: String,
        enum: [userGender.male, userGender.female]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
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