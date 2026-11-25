
import { Router } from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "./controllers/booking.controller.js";

const router = Router();

router.post("/", createBookingController);
router.get("/", getAllBookingsController);
router.get("/:id", getBookingByIdController);
router.patch("/:id", updateBookingController);
router.delete("/:id", deleteBookingController);

export default router;
