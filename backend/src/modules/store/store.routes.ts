import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { StoreController } from "./store.controller.js";
import { upload } from "../../middleware/upload.middleware.js";
import { createStoreSchema } from "./store.validation.js";

const router = Router();
router.use(authMiddleware);
router.post("/create", upload.single("logo"), validate(createStoreSchema), StoreController.create);

router.get("/my", StoreController.getMyStores);

router.get("/:id", StoreController.getById);

router.put("/:id", upload.single("logo"), StoreController.update);

router.delete("/:id", StoreController.delete);

export default router;