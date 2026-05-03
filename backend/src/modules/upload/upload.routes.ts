import { Router } from "express";
import { upload } from "../../middleware/upload.middleware.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

const router = Router();

router.post(
  "/image",
  upload.single("logo"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const imageUrl = await uploadToCloudinary(req.file.buffer);

      console.log("FINAL IMAGE URL:", imageUrl);

      res.json({
        success: true,
        imageUrl,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;