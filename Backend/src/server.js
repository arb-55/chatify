import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js"; // make sure folder name case matches (routes or Routes)
import messsageRoutes from "./Routes/message.route.js";



dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages",messsageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});