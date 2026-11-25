import prisma from "../../../config/prisma.js";
export const createEvent = (data) => {
    return prisma.event.create({ data });
};
export const getAllEvents = () => {
    return prisma.event.findMany({
        orderBy: { createdAt: "desc" },
    });
};
export const getEventById = (id) => {
    return prisma.event.findUnique({
        where: { id },
    });
};
export const updateEvent = (id, data) => {
    return prisma.event.update({
        where: { id },
        data,
    });
};
export const deleteEvent = (id) => {
    return prisma.event.delete({
        where: { id },
    });
};
