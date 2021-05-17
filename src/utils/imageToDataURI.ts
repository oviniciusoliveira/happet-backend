import imageDataURI from "image-data-uri";

const imageToDataURI = (image: Express.Multer.File) => {
  let dataBuffer = Buffer.from(image.buffer);
  const mediaType = image.mimetype.replace("image/", "");
  const imageData = imageDataURI.encode(dataBuffer, mediaType);
  return imageData;
};

export default imageToDataURI;
