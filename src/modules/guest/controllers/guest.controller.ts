import { Request, Response, NextFunction } from "express";
import * as guestService from "../services/guest.service.js";

// Create Guest
export const createGuestController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { eventId, ...guestData } = req.body;

        const guest = await guestService.createGuest({
            ...guestData,
            event: {
                connect: { id: eventId },
            },
        });

        return res.status(201).json({
            success: true,
            message: "Guest created successfully",
            data: guest,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Guests
export const getAllGuestsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const guests = await guestService.getAllGuests();

        return res.status(200).json({
            success: true,
            data: guests,
        });
    } catch (error) {
        next(error);
    }
};

// Get Guest By ID
export const getGuestByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const guest = await guestService.getGuestById(
            String(req.params.id)
        );

        if (!guest) {
            return res.status(404).json({
                success: false,
                message: "Guest not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: guest,
        });
    } catch (error) {
        next(error);
    }
};

// Update Guest
export const updateGuestController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const guest = await guestService.updateGuest(
            String(req.params.id),
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Guest updated successfully",
            data: guest,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Guest
export const deleteGuestController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await guestService.deleteGuest(
            String(req.params.id)
        );

        return res.status(200).json({
            success: true,
            message: "Guest deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};