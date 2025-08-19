import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    coverImg: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    abstract: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    source: {
        type: String,
        required: true,
    },
}, { strict: true})

export const News = mongoose.models.newsSchema || mongoose.model("news", newsSchema);