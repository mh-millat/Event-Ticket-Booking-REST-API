// import { Request, Response, NextFunction } from "express";
// import prisma from "../../../config/prisma.js";
// import { AuthRequest } from "../../../middleware/auth.middleware.js";
import prisma from "../../../config/prisma.js";
export const getMe = async (req, res, next) => {
    try {
        const authReq = req;
        const user = await prisma.user.findUnique({
            where: {
                id: authReq.user.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({
            success: true,
            data: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
};
