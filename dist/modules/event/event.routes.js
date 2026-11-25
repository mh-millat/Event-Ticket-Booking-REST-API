import { Router } from "express";
import { verifyAuth } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";
import { createEventController, getAllEventsController, getEventByIdController, updateEventController, deleteEventController, } from "./controllers/event.controllers.js";
const router = Router();
// Everyone can view events
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
// Only Admin can manage events
router.post("/", verifyAuth, requireAdmin, createEventController);
router.patch("/:id", verifyAuth, requireAdmin, updateEventController);
router.delete("/:id", verifyAuth, requireAdmin, deleteEventController);
export default router;
