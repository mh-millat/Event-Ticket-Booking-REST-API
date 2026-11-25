
import prisma from "../../../config/prisma.js";
import { Prisma } from "@prisma/client";

// Create Coupon
export const createCoupon = (data: Prisma.CouponCreateInput) => {
  return prisma.coupon.create({ data });
};

// Get All Coupons
export const getAllCoupons = () => {
  return prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
};

// Get Coupon By ID
export const getCouponById = (id: string) => {
  return prisma.coupon.findUnique({
    where: { id },
  });
};

// Update Coupon
export const updateCoupon = (
  id: string,
  data: Prisma.CouponUpdateInput
) => {
  return prisma.coupon.update({
    where: { id },
    data,
  });
};

// Delete Coupon
export const deleteCoupon = (id: string) => {
  return prisma.coupon.delete({
    where: { id },
  });
};
