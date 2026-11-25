import prisma from "../../../config/prisma.js";
// Create Coupon
export const createCoupon = (data) => {
    return prisma.coupon.create({ data });
};
// Get All Coupons
export const getAllCoupons = () => {
    return prisma.coupon.findMany({
        orderBy: { createdAt: "desc" },
    });
};
// Get Coupon By ID
export const getCouponById = (id) => {
    return prisma.coupon.findUnique({
        where: { id },
    });
};
// Update Coupon
export const updateCoupon = (id, data) => {
    return prisma.coupon.update({
        where: { id },
        data,
    });
};
// Delete Coupon
export const deleteCoupon = (id) => {
    return prisma.coupon.delete({
        where: { id },
    });
};
