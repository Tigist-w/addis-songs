import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
