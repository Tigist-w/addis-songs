import { Router } from "express";
import {
  createSong,
  getSongs,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const router = Router();

router.post("/", createSong);
router.get("/", getSongs);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
