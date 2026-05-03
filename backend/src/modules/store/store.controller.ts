import { Request, Response, NextFunction } from "express";
import { StoreService } from "./store.service.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export class StoreController {
  
  //Creating new store
  static async create(req: Request, res: Response, next: NextFunction) {
  try {
    const user_id = (req as any).user.id;

    let logoUrl: string | null = null;
    let logoPublicId: string | null = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);

      logoUrl = (uploadResult as any).url;
      logoPublicId = (uploadResult as any).public_id;
    }

    const payload = {
      user_id,
      name: req.body.name,
      category: req.body.category,
      details: req.body.details,
      operational_range: req.body.operational_range,
      has_custom: req.body.has_custom === "true", 
      logo: logoUrl ?? undefined,
      logo_public_id: logoPublicId ?? undefined,
    };

    const Store = await StoreService.createStore(payload);

    res.status(201).json({ success: true, Store });
  } catch (err) {
    next(err);
  }
}

  //Extracting stores against own user id
  static async getMyStores(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = (req as any).user.id;
      const Stores = await StoreService.getMyStores(user_id);
      res.json({ success: true, Stores });
    } catch (err) {
      next(err);
    }
  }

  //Extracting random stores using store id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const store_id = req.params.id as string;
      const Store = await StoreService.getStoreById(store_id);

      res.json({ success: true, Store });
    } catch (err) {
      next(err);
    }
  }

  //Update Store information
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = (req as any).user.id;
      const store_id = req.params.id as string;

      const Store = await StoreService.updateStore(
        store_id,
        req.body,
        user_id
      );

      res.json({ success: true, Store });
    } catch (err) {
      next(err);
    }
  }

  //Deleting a store
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = (req as any).user.id;
      const store_id = req.params.id as string;

      await StoreService.deleteStore(store_id, user_id);

      res.json({ success: true, message: "Store deleted" });
    } catch (err) {
      next(err);
    }
  }
}