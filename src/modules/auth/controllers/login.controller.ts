
import { Request, Response, NextFunction } from "express";
import prisma from "../../../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/jwt.js";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken({
            userId: user.id,
            role: user.role,
            email: user.email,
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: userWithoutPassword,
        });
    } catch (error) {
        next(error);
    }
};
