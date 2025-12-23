import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/songs", songRoutes);
app.use("/stats", statsRoutes);

export default app;
