import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendApi",
    }).then(() => console.log("database connected")).catch((e) => console.log(e));
};

// process.env.MONGO_URI