
import prisma from "../../../config/prisma.js";
import { Prisma } from "@prisma/client";

// Create Booking
export const createBooking = (data: Prisma.BookingCreateInput) => {
    return prisma.booking.create({
        data,
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
};

// Get All Bookings
export const getAllBookings = () => {
    return prisma.booking.findMany({
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
        orderBy: { createdAt: "desc" },
    });
};

// Get Booking By ID
export const getBookingById = (id: string) => {
    return prisma.booking.findUnique({
        where: { id },
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
};

// Update Booking
export const updateBooking = (
    id: string,
    data: Prisma.BookingUpdateInput
) => {
    return prisma.booking.update({
        where: { id },
        data,
    });
};

// Delete Booking
export const deleteBooking = (id: string) => {
    return prisma.booking.delete({
        where: { id },
    });
};
