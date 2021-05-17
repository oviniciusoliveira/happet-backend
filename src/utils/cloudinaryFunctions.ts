import cloudinary from "./../config/cloudinary";

export const cloudinaryUpload = async (imageDataURI: string) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(imageDataURI, {
      upload_preset: "happet",
    });
    return {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  } catch (error) {
    console.log(error);
  }
};

export const cloudinaryDestroy = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error(error);
  }
};
