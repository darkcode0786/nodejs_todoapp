import { app } from "./app.js";
import { connectDB } from "./data/database.js";



connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is working in port:${process.env.PORT} on ${process.env.NODE_DEV} mode`);
});