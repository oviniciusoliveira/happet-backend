import { getRepository } from "typeorm";
import Image from "./../models/Image";

export default {
  insert(image: any) {
    const ImagesRepository = getRepository(Image);
    const newImage = ImagesRepository.create(image);
    return newImage;
  },
};
