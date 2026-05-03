import { StoreRepository } from "./store.repository.js";
import { CreateStoreDTO } from "./store.types.js"

export class StoreService {
  static async createStore(data: CreateStoreDTO) {
    return await StoreRepository.create(data);
  }

  static async getMyStores(user_id: string) {
    return await StoreRepository.findByUser(user_id);
  }

  static async getStoreById(id: string) {
    return await StoreRepository.findById(id);
  }

  static async updateStore(id: string, data: any, user_id: string) {
    const Store = await StoreRepository.findById(id);

    if (!Store) throw new Error("Store not found");
    if (Store.user_id !== user_id) throw new Error("Unauthorized");

    return await StoreRepository.update(id, data);
  }

  static async deleteStore(id: string, user_id: string) {
    const Store = await StoreRepository.findById(id);

    if (!Store) throw new Error("Store not found");
    if (Store.user_id !== user_id) throw new Error("Unauthorized");

    await StoreRepository.delete(id);
  }
}