import * as eventService from "../../event/services/event.service.js";
export const createEventController = async (req, res, next) => {
    try {
        const event = await eventService.createEvent(req.body);
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllEventsController = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        return res.status(200).json({
            success: true,
            data: events,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getEventByIdController = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(String(req.params.id));
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateEventController = async (req, res, next) => {
    try {
        const event = await eventService.updateEvent(String(req.params.id), req.body);
        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            data: event,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteEventController = async (req, res, next) => {
    try {
        await eventService.deleteEvent(String(req.params.id));
        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
