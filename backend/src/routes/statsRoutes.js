import { Router } from "express";
import { getStatistics } from "../stats/statsController.js";

const router = Router();

router.get("/", getStatistics);

export default router;
