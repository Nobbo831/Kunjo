import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import storeRoutes from "./modules/store/store.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/store", storeRoutes);
app.use(errorMiddleware);

export default app;