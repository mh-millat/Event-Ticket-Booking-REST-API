import { Request, Response, NextFunction } from "express";
import * as bookingService from "../services/booking.service.js";
import prisma from "../../../config/prisma.js";

// Create Booking
export const createBookingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { userId, eventId, couponId, quantity } = req.body;

        // Validate input
        if (
            !userId ||
            !eventId ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid userId, eventId and quantity are required",
            });
        }

        // Find Event
        const event = await prisma.event.findUnique({
            where: { id: userId ? eventId : "" },
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        if (event.status !== "published") {
            return res.status(400).json({
                success: false,
                message: "Event is not available for booking",
            });
        }

        // Check Event Capacity
        const existingBookings = await prisma.booking.aggregate({
            where: {
                eventId,
                status: {
                    in: ["pending", "confirmed"],
                },
            },
            _sum: {
                quantity: true,
            },
        });

        const bookedSeats = existingBookings._sum.quantity || 0;

        if (bookedSeats + quantity > event.capacity) {
            return res.status(400).json({
                success: false,
                message: "Not enough seats available",
            });
        }

        // Calculate Total Amount
        let totalAmount = event.price * quantity;

        // Find and Validate Coupon
        let coupon = null;

        if (couponId) {
            coupon = await prisma.coupon.findUnique({
                where: { id: couponId },
            });

            if (!coupon || !coupon.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid or inactive coupon",
                });
            }

            if (coupon.expiresAt && coupon.expiresAt < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon has expired",
                });
            }

            if (
                coupon.maxUses !== null &&
                coupon.usedCount >= coupon.maxUses
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Coupon usage limit reached",
                });
            }

            let discount = 0;

            if (coupon.discountType === "percentage") {
                if (
                    coupon.discountValue <= 0 ||
                    coupon.discountValue > 100
                ) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid percentage discount",
                    });
                }

                discount =
                    (totalAmount * coupon.discountValue) / 100;
            } else {
                if (coupon.discountValue <= 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid fixed discount",
                    });
                }

                discount = coupon.discountValue;
            }

            totalAmount = Math.max(0, totalAmount - discount);
        }

        // Create Booking
        const booking = await prisma.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    bookingNumber: `BK-${Date.now()}`,
                    quantity,
                    totalAmount,
                    user: { connect: { id: userId } },
                    event: { connect: { id: eventId } },
                    ...(couponId
                        ? { coupon: { connect: { id: couponId } } }
                        : {}),
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            role: true,
                        },
                    },
                    event: true,
                    coupon: true,
                },
            });

            if (couponId) {
                await tx.coupon.update({
                    where: { id: couponId },
                    data: {
                        usedCount: { increment: 1 },
                    },
                });
            }

            return newBooking;
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Bookings
export const getAllBookingsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const bookings = await bookingService.getAllBookings();

        return res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

// Get Booking By ID
export const getBookingByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const booking = await bookingService.getBookingById(
            String(req.params.id)
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

// Update Booking
export const updateBookingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const booking = await bookingService.updateBooking(
            String(req.params.id),
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Booking
export const deleteBookingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await bookingService.deleteBooking(String(req.params.id));

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
