import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Tashkil } from "../models/tashkil.model.js";
import { customError } from "../utils/customError.js";

// GET All Tashkils - /api/v1/tashkil
export const getAllTashkils = catchAsyncErrors(async (req, res, next) => {
    const keyword = req.query.keyword || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // search fileter
    const searchQuery = keyword
        ? {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { phone: { $regex: keyword, $options: "i" } },
                { "address.town": { $regex: keyword, $options: "i" } },
                { "address.city": { $regex: keyword, $options: "i" } }
            ]
        } : {};

    // total tashkils for pagination
    const totalTashkils = await Tashkil.countDocuments(searchQuery);

    // fetch data
    const tashkils = await Tashkil.find(searchQuery)
        .populate("daee")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    res.status(200).json({
        success: true,
        totalTashkils,
        currentPage: page,
        totalPages: Math.ceil(totalTashkils / limit),
        tashkils
    })
});

// Get my tashkills /api/v1/tashkils/my-tashkils
export const getMyTashkils = catchAsyncErrors(async (req, res, next) => {
    const daeeId = req.user.id;

    const tashkils = await Tashkil.find({ daee: daeeId });

    if (!tashkils) {
        return next(new customError("tashkil not found", 404));
    }

    res.status(200).json({
        success: true,
        tashkils
    })
})

export const getTashkilDetails = catchAsyncErrors(async (req, res, next) => {
    const tashkilId = req.params.id;

    const tashkil = await Tashkil.findById(tashkilId);

    res.status(200).json({
        success: true,
        tashkil
    });
})

//POST - /api/v1/taskil
export const createTashkil = catchAsyncErrors(async (req, res, next) => {
    const { name, phone, jamat, wasooli, address } = req.body;

    const daeeId = req.user.id;

    if (!name || !phone || !jamat || wasooli === undefined) {
        return next(new customError("All fileds are required", 400));
    }

    if (!address || !address.town || !address.city) {
        return next(new customError("Address, town, city are required", 400));
    }

    const tashkil = await Tashkil.create({
        name,
        phone,
        jamat,
        wasooli,
        address,
        daee: daeeId
    });

    res.status(201).json({
        success: true,
        message: `${tashkil.name} Tashkil Confirmed`,
        tashkil
    })
});

//Update Tashkil PUT - /api/v1/tashkil/:id
export const updateTashkil = catchAsyncErrors(async (req, res, next) => {
    const { name, phone, jamat, wasooli, address } = req.body;

    const tashkilId = req.params.id;

    if (!name || !phone || !jamat || wasooli === undefined) {
        return next(new customError("All fileds are required", 400));
    }

    if (!address || !address.town || !address.city) {
        return next(new customError("Address, town, city are required", 400));
    }

    const tashkil = await Tashkil.findByIdAndUpdate(tashkilId, {
        name,
        phone,
        jamat,
        wasooli,
        address
    },
        {
            new: true,
            runValidators: true
        }
    );

    if (!tashkil) {
        return next(new customError("Tashkil not found", 404));
    }

    res.status(200).json({
        success: true,
        message: `${tashkil.name} Tashkil Updated`,
        tashkil
    })
});

// Delete Tashkil DELETE - /api/v1/tashkil/:id
export const deleteTashkil = catchAsyncErrors(async (req, res, next) => {
    const tashkilId = req.params.id;

    const result = await Tashkil.findByIdAndDelete(tashkilId);

    if (!result) {
        return next(new customError("Tashkil not found", 404));
    }

    res.status(200).json({
        success: true,
        message: `${result.name} Tashkil Deleted`
    })
})
