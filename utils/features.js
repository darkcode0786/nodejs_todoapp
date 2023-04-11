import jwt from "jsonwebtoken";


export const sendCookie = async (user, res, message, statuscode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statuscode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_DEV === "devlopment" ? "lax" : "none",
        secure: process.env.NODE_DEV === "devlopment" ? false : true
    }).json({
        success: true,
        message,
    });
};
