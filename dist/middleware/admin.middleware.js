export const requireAdmin = (req, res, next) => {
    const authReq = req;
    if (!authReq.user || authReq.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required",
        });
    }
    next();
};
