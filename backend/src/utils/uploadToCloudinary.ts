import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kunjo",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result?.secure_url,
          public_id: result?.public_id,
        });
      }
    );

    stream.end(buffer);
  });
};