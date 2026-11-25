import prisma from "../../../config/prisma.js";
// Create Guest
export const createGuest = (data) => {
    return prisma.guest.create({ data });
};
// Get All Guests
export const getAllGuests = () => {
    return prisma.guest.findMany({
        include: {
            event: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
// Get Guest By ID
export const getGuestById = (id) => {
    return prisma.guest.findUnique({
        where: { id },
        include: {
            event: true,
        },
    });
};
// Update Guest
export const updateGuest = (id, data) => {
    return prisma.guest.update({
        where: { id },
        data,
    });
};
// Delete Guest
export const deleteGuest = (id) => {
    return prisma.guest.delete({
        where: { id },
    });
};
