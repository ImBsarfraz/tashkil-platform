import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone"]
    },
    minorJamat: {
        type: Number,
        required: [true, "Please enter your minor jamat number"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    role: {
        type: String,
        enum: ["daee", "amir"],
        default: "daee",
        required: [true, "Role is missing"]
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);