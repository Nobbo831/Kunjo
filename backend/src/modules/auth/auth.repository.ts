import { pool } from "../../config/db.js";

export class AuthRepository {
  
    // 🔍 Find pending user
  static async findPendingUser(email: string) {
    const res = await pool.query(
      "SELECT * FROM pending_users WHERE email = $1",
      [email]
    );
    return res.rows[0];
  }

  // 🔍 Find user
  static async findUser(email: string) {
    const res = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return res.rows[0];
  }

  // 🧾 Upsert pending user (signup + resend OTP)
  static async upsertPendingUser(data: any) {
    const {
      email,
      password,
      name,
      dob,
      gender,
      address,
      phone,
      dept_name,
      regi_no,
      otp_code,
      otp_expires_at,
      last_otp_sent_at,
    } = data;

    await pool.query(
      `
      INSERT INTO pending_users (
        email, password, name, dob, gender,
        address, phone, dept_name, regi_no,
        otp_code, otp_expires_at, last_otp_sent_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      ON CONFLICT (email)
      DO UPDATE SET
        password = EXCLUDED.password,
        name = EXCLUDED.name,
        dob = EXCLUDED.dob,
        gender = EXCLUDED.gender,
        address = EXCLUDED.address,
        phone = EXCLUDED.phone,
        dept_name = EXCLUDED.dept_name,
        regi_no = EXCLUDED.regi_no,
        otp_code = EXCLUDED.otp_code,
        otp_expires_at = EXCLUDED.otp_expires_at,
        last_otp_sent_at = EXCLUDED.last_otp_sent_at,
        updated_at = CURRENT_TIMESTAMP
      `,
      [
        email,
        password,
        name,
        dob,
        gender,
        address,
        phone,
        dept_name,
        regi_no,
        otp_code,
        otp_expires_at,
        last_otp_sent_at,
      ]
    );
  }

  // 👤 Create final user
  static async createUser(data: any) {
    const {
      email,
      password,
      name,
      dob,
      gender,
      address,
      phone,
      dept_name,
      regi_no,
    } = data;

    const res = await pool.query(
      `
      INSERT INTO users (
        email, password, name, dob, gender,
        address, phone, dept_name, regi_no
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
      `,
      [email, password, name, dob, gender, address, phone, dept_name, regi_no]
    );

    return res.rows[0];
  }

  // 🗑️ Delete pending user
  static async deletePendingUser(email: string) {
    await pool.query("DELETE FROM pending_users WHERE email = $1", [email]);
  }
}