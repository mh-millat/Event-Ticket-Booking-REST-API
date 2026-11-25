import prisma from "../../../config/prisma.js";
import bcrypt from "bcryptjs";
export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { phone }],
            },
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email or phone already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            data: userWithoutPassword,
        });
    }
    catch (error) {
        next(error);
    }
};
