import * as couponService from "../services/coupon.service.js";
// Create Coupon
export const createCouponController = async (req, res, next) => {
    try {
        const coupon = await couponService.createCoupon(req.body);
        return res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get All Coupons
export const getAllCouponsController = async (req, res, next) => {
    try {
        const coupons = await couponService.getAllCoupons();
        return res.status(200).json({
            success: true,
            data: coupons,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get Coupon By ID
export const getCouponByIdController = async (req, res, next) => {
    try {
        const coupon = await couponService.getCouponById(String(req.params.id));
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: coupon,
        });
    }
    catch (error) {
        next(error);
    }
};
// Update Coupon
export const updateCouponController = async (req, res, next) => {
    try {
        const coupon = await couponService.updateCoupon(String(req.params.id), req.body);
        return res.status(200).json({
            success: true,
            message: "Coupon updated successfully",
            data: coupon,
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete Coupon
export const deleteCouponController = async (req, res, next) => {
    try {
        await couponService.deleteCoupon(String(req.params.id));
        return res.status(200).json({
            success: true,
            message: "Coupon deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
