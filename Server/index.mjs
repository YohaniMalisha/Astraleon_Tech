// import "dotenv/config";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import orderRoutes from "./routes/orders.mjs";

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:8080", // Add this to be explicit
//     credentials: true,
//   })
// );
// app.use(express.json());

// // Database Connection
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
