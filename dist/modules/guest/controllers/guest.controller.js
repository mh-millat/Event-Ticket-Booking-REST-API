import * as guestService from "../services/guest.service.js";
// Create Guest
export const createGuestController = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
// Get All Guests
export const getAllGuestsController = async (req, res, next) => {
    try {
        const guests = await guestService.getAllGuests();
        return res.status(200).json({
            success: true,
            data: guests,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get Guest By ID
export const getGuestByIdController = async (req, res, next) => {
    try {
        const guest = await guestService.getGuestById(String(req.params.id));
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
    }
    catch (error) {
        next(error);
    }
};
// Update Guest
export const updateGuestController = async (req, res, next) => {
    try {
        const guest = await guestService.updateGuest(String(req.params.id), req.body);
        return res.status(200).json({
            success: true,
            message: "Guest updated successfully",
            data: guest,
        });
    }
    catch (error) {
        next(error);
    }
};
// Delete Guest
export const deleteGuestController = async (req, res, next) => {
    try {
        await guestService.deleteGuest(String(req.params.id));
        return res.status(200).json({
            success: true,
            message: "Guest deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
