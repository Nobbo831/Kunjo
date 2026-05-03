import { pool } from "../../config/db.js";

export class StoreRepository {
  static async create(data: any) {
    const query = `
      INSERT INTO Stores (
        user_id, name, category, details,
        operational_range, has_custom, logo, logo_public_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7, $8)
      RETURNING *
    `;

    const values = [
      data.user_id,
      data.name,
      data.category,
      data.details,
      data.operational_range,
      data.has_custom,
      data.logo,
      data.logo_public_id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUser(user_id: string) {
    const result = await pool.query(
      "SELECT * FROM Stores WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );
    return result.rows;
  }

  static async findById(id: string) {
    const result = await pool.query(
      "SELECT * FROM Stores WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async update(id: string, data: any) {
    const query = `
      UPDATE Stores
      SET name=$1, category=$2, details=$3,
          operational_range=$4, has_custom=$5, logo=$6, updated_at=NOW()
      WHERE id=$7
      RETURNING *
    `;

    const values = [
      data.name,
      data.category,
      data.details,
      data.operational_range,
      data.has_custom,
      data.logo,
      data.logo_public_id,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string) {
    await pool.query("DELETE FROM Stores WHERE id=$1", [id]);
  }
}