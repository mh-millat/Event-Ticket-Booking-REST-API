import { Router } from "express";

import {
    createGuestController,
    getAllGuestsController,
    getGuestByIdController,
    updateGuestController,
    deleteGuestController,
} from "./controllers/guest.controller.js";

const router = Router();

router.post("/", createGuestController);
router.get("/", getAllGuestsController);
router.get("/:id", getGuestByIdController);
router.patch("/:id", updateGuestController);
router.delete("/:id", deleteGuestController);

export default router;