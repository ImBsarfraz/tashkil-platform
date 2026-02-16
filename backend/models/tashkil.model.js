import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    town: {
        type: String,
        required: [true, "Please enter tashkil town"]
    },
    city: {
        type: String,
        required: [true, "Please enter tashkil city"]
    },
},
    { _id: false }
);

const tashkilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter tashkil name"]
    },
    phone: {
        type: String,
        required: [true, "Please enter tashkil phone"]
    },
    jamat: {
        type: String,
        required: [true, "Please enter tashkil jamat"]
    },
    wasooli: {
        type: Number,
        required: [true, "Please enter wasooli"]
    },
    address: addressSchema,
    daee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Daee is required"]
    },
}, { timestamps: true });

export const Tashkil = mongoose.model("Tashkil", tashkilSchema);