import prisma from "../../../config/prisma.js";
import { Prisma } from "@prisma/client";

// Create Guest
export const createGuest = (data: Prisma.GuestCreateInput) => {
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
export const getGuestById = (id: string) => {
  return prisma.guest.findUnique({
    where: { id },
    include: {
      event: true,
    },
  });
};

// Update Guest
export const updateGuest = (
  id: string,
  data: Prisma.GuestUpdateInput
) => {
  return prisma.guest.update({
    where: { id },
    data,
  });
};

// Delete Guest
export const deleteGuest = (id: string) => {
  return prisma.guest.delete({
    where: { id },
  });
};