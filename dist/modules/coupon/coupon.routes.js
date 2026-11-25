import { Router } from "express";
import { createCouponController, getAllCouponsController, getCouponByIdController, updateCouponController, deleteCouponController, } from "./controllers/coupon.controller.js";
const router = Router();
router.post("/", createCouponController);
router.get("/", getAllCouponsController);
router.get("/:id", getCouponByIdController);
router.patch("/:id", updateCouponController);
router.delete("/:id", deleteCouponController);
export default router;
