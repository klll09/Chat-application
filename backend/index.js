import dotenv from "dotenv";
// ⚠️ Initialize dotenv IMMEDIATELY right here on line 2!
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";

// Now it is completely safe to import your local files because process.env is fully loaded!
import { connectDB } from "./src/lib/db.js";
import authRoute from "./src/routes/auth.route.js";
import messageRoute from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";

const __dirname = path.resolve();

// Connect to the DB
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./frontend", "dist", "index.html"));
    });
}

server.listen(5001, () => {
    console.log("Server is running on port 5001 and variables are loaded!");
});