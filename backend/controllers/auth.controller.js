import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/user.model.js";
import { customError } from "../utils/customError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//POST - /api/v1/auth/register
export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, minorJamat, password } = req.body;

    if (!name || !email || !phone || !minorJamat || !password) {
        return next(new customError("All filed are required", 400));
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
        return next(new customError("User already exist with this email"));
    }

    const hahshedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        phone,
        minorJamat,
        password: hahshedPassword
    });

    const payload = {
        id: user._id,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_DATE });

    res.status(201).cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }).json({
        success: true,
        message: `${user.name} Your Account Created`,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            minorJamat: user.minorJamat,
        }
    })
});

// POST - /api/v1/login
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new customError("All fields are required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new customError("Invalid Email or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return next(new customError("Invaid Email or Password", 400));
    }

    const payload = {
        id: user._id,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_DATE });

    res.status(200).cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }).json({
        success: true,
        message: `Assalamu Alaikum ${user.name}`,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            minorJamat: user.minorJamat,
        }
    })
});

export const getMe = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    res.status(200).json({
        success: true,
        user
    })
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, minorJamat } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new customError("User not found", 404));
    }

    user.name = name;
    user.email = email
    user.phone = phone;
    user.minorJamat = minorJamat;

    await user.save();

    res.status(200).json({
        success: true,
        message: `${user.name} Your Profile is Updated`,
        user
    })
});

// logout - post /api/v1/auth/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(0),
        httpOnly: true
    }).json({
        success: true,
        message: "Logout Successfully"
    })
})

// Admin - Get all user /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    if (!users) {
        return next(new customError("Users not found", 404));
    }

    res.status(200).json({
        success: true,
        users
    })
});

// Admin - Get all user /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new customError("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    })
});

// Admin - update User /api/v1/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, {
        role
    },
        { new: true }
    );

    if (!user) {
        return next(new customError("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: `Now ${user.name} is ${user.role}`,
        user
    })
});

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new customError("User not found", 404))
    }

    res.status(200).json({
        success: true,
        message: `${user.name} Dleted`
    })
});