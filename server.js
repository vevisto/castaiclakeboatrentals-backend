
import app from "./config/app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    connectDB();
});