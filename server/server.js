import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Load variables from .env into process.env before anything else runs
dotenv.config();

// Connect to MongoDB (see config/db.js)
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://nithishnarravula.dev",
  "https://www.nithishnarravula.dev",
];
// --- Core middleware -------------------------------------------------

// Allow the React dev server (and later, your deployed frontend) to call
// this API from a different origin. Without this, browsers block the
// request due to CORS policy.
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Parse incoming JSON request bodies into req.body
app.use(express.json());

// --- Routes ------------------------------------------------------------

app.get("/", (req, res) => {
  res.json({ message: "Resume website API is running" });
});

// Everything under /api/contacts is handled by routes/contactRoutes.js
app.use("/api/contacts", contactRoutes);

// --- Error handling (must be registered last) --------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
