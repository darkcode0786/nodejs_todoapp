import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";




export const allUsers = async (req, res, next) => {
    try {
        const userid = req._id;
        const user = await User.find({ user: userid });

        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {

    try {

        const { mail, password } = req.body;

        const user = await User.findOne({ mail }).select("+password");

        if (!user) return next(new ErrorHandler("wrong email", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("wrong password", 404));

        sendCookie(user, res, `welcome back ${user.name}`, 200);

    } catch (error) {
        next(error);
    }


};

export const register = async (req, res, next) => {
    try {

        const { name, mail, password } = req.body;

        let user = await User.findOne({ mail });

        if (user) return next(new ErrorHandler("user already exist", 404));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, mail, password: hashedPassword, });
        sendCookie(user, res, "register successfully", 201);

    } catch (error) {
        next(error);
    }

};
export const findUser = (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }

};

export const logout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_DEV === "Devlopment" ? "lax" : "none",
            secure: process.env.NODE_DEV === "Devlopment" ? false : true
        }).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
}
