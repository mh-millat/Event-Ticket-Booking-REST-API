
import prisma from "../../../config/prisma.js";
import { Prisma } from "@prisma/client";

export const createEvent = (data: Prisma.EventCreateInput) => {
  return prisma.event.create({ data });
};

export const getAllEvents = () => {
  return prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getEventById = (id: string) => {
  return prisma.event.findUnique({
    where: { id },
  });
};

export const updateEvent = (
  id: string,
  data: Prisma.EventUpdateInput
) => {
  return prisma.event.update({
    where: { id },
    data,
  });
};

export const deleteEvent = (id: string) => {
  return prisma.event.delete({
    where: { id },
  });
};
