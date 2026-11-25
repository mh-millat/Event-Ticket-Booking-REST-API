import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/prisma.js";
export const verifyAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is required",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        if (typeof decoded === "string" || !("userId" in decoded)) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                role: true,
                status: true,
            },
        });
        if (!user || user.status !== "active") {
            return res.status(401).json({
                success: false,
                message: "User not found or inactive",
            });
        }
        req.user = {
            id: user.id,
            role: user.role,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/jwt.js";
// import prisma from "../config/prisma.js";
// export interface AuthRequest extends Request{
//     user:{
//         id: string,
//         role: string
//     }
// }
// export const verifyAuth= async(req: AuthRequest, res: Response, next: NextFunction)=>{
//     try{
//         const authHeader = req.headers.authorization;
//         if((!authHeader) || !authHeader?.startsWith("Bearer ")){
//             return res.status(401).json({
//                 success: false,
//                 message: "token must be required"
//             })
//         }
//         const token = authHeader.split(" ")[1]
//         const decoded = verifyToken(token)
//         if(typeof decoded === "string" || !("userId" in decoded)){
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token"
//             })
//         }
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: decoded.userId as string
//             },
//             select:{
//                 id: true,
//                 role: true,
//                 status: true
//             }
//         })
//     if(!user || user.status !== "active"){
//         return res.status(401).json({
//             success: false,
//             message:"user not found or Inactive"
//         })
//     }
//     req.user= { id: user.id, role: user.role}
//     next()
//     }catch(error){
//         next(error)
//     }
// }
// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/jwt.js";
// import prisma from "../config/prisma.js";
// export interface AuthRequest extends Request {
//     user?: { id: string; role: string };
// }
// export const verifyAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(401).json({ success: false, message: "Token required" });
//         }
//         const decoded = verifyToken(token);
//         if (typeof decoded === "string" || !("userId" in decoded)) {
//             return res.status(401).json({ success: false, message: "Invalid token" });
//         }
//         const user = await prisma.user.findUnique({
//             where: { id: decoded.userId as string },
//             select: { id: true, role: true, status: true }
//         });
//         if (!user || user.status !== "active") {
//             return res.status(401).json({ success: false, message: "User not found or inactive" });
//         }
//         req.user = { id: user.id, role: user.role };
//         next();
//     } catch (error) {
//         next(error);
//     }
// };
