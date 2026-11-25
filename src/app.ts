import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./modules/auth/auth.routes.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import eventRoutes from "./modules/event/event.routes.js";
import guestRoutes from "./modules/guest/guest.routes.js";
import couponRoutes from "./modules/coupon/coupon.routes.js"
import bookingRoutes from "./modules/booking/booking.routes.js"

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully",
    });
});

// Routes
app.use("/api/auth", router);
app.use("/api/events", eventRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;