
// import { Request, Response, NextFunction } from "express";
// import prisma from "../../../config/prisma.js";
// import { AuthRequest } from "../../../middleware/auth.middleware.js";


// export const getMe = async (
//     req: AuthRequest,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: {
//                 id: (req as AuthRequest).user.id,
//             },
//         });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const { password: _, ...userWithoutPassword } = user;

//         return res.status(200).json({
//             success: true,
//             data: userWithoutPassword,
//         });
//     } catch (error) {
//         next(error);
//     }
// };



import { Request, Response, NextFunction } from "express";
import prisma from "../../../config/prisma.js";
import { AuthRequest } from "../../../middleware/auth.middleware.js";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthRequest;

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
  } catch (error) {
    next(error);
  }
};
