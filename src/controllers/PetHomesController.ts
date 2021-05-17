import { getRepository } from "typeorm";
import PetHome from "./../models/PetHome";
import Image from "./../models/Image";
import petHomeView from "./../views/petHome_view";
import * as Yup from "yup";
import imageToDataURI from "./../utils/imageToDataURI";
import {
  cloudinaryUpload,
  cloudinaryDestroy,
} from "./../utils/cloudinaryFunctions";

import { Request, Response } from "express";

export default {
  async index(request: Request, response: Response) {
    const { accepted } = request.query;
    const petHomesRepository = getRepository(PetHome);

    const petHomes = await petHomesRepository.find({ relations: ["images"] });

    if (accepted) {
      petHomes.filter((petHome: any) => petHome.is_accepted);
    }

    return response.json(petHomeView.renderMany(petHomes));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const petHomesRepository = getRepository(PetHome);

    const petHome = await petHomesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.json(petHomeView.render(petHome));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      is_accepted,
      whatsapp,
    } = request.body;

    const petHomesRepository = getRepository(PetHome);

    const requestImages = request.files as Express.Multer.File[];

    const images = await Promise.all(
      requestImages.map(async (image) => {
        const imageData = imageToDataURI(image);
        const cloudinaryResponse = cloudinaryUpload(imageData);
        return cloudinaryResponse;
      })
    );

    const data: any = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      is_accepted: is_accepted === "true",
      whatsapp,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      is_accepted: Yup.boolean().required(),
      whatsapp: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          public_id: Yup.string().required(),
          url: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const petHome = petHomesRepository.create(data);

    await petHomesRepository.save(petHome);
    response.status(201).json({ message: "Pet Home Criado" });
  },

  async update(request: Request, response: Response) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      is_accepted,
      whatsapp,
      id_images_remove,
    } = request.body;

    const petHomesRepository = getRepository(PetHome);
    const imageRepository = getRepository(Image);

    // delete images
    if (id_images_remove) {
      const images_ids = Array.isArray(id_images_remove)
        ? id_images_remove
        : Array(id_images_remove);

      images_ids.forEach(async (image_id) => {
        const imageToDelete = await imageRepository.findOneOrFail(image_id);
        const imageDeleted = await cloudinaryDestroy(imageToDelete.public_id);
        console.log("imageToDelete :", imageToDelete);
        console.log("imageDeleted :", imageDeleted);
        await imageRepository.delete(image_id);
      });
    }

    const requestImages = request.files as Express.Multer.File[];

    // add new images to database
    if (requestImages) {
      requestImages.forEach(async (image) => {
        const imageData = imageToDataURI(image);
        const cloudinaryResponse = cloudinaryUpload(imageData);
        const imageToSave = imageRepository.create({
          petHome: id,
          ...cloudinaryResponse,
        });
        await imageRepository.save(imageToSave);
      });
    }

    // update only data
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
      is_accepted: is_accepted === "true",
      whatsapp,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      is_accepted: Yup.boolean().required(),
      whatsapp: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          public_id: Yup.string().required(),
          url: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });
    const newPetHome = await petHomesRepository.update({ id }, data);

    return response.status(201).json({ message: "Pet Home Atualizado" });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const petHomesRepository = getRepository(PetHome);
    let petHomeToRemove = await petHomesRepository.findOneOrFail(
      { id },
      {
        relations: ["images"],
      }
    );
    if (petHomeToRemove) {
      petHomeToRemove.images.forEach(async (image) => {
        await cloudinaryDestroy(image.public_id);
      });
    }
    await petHomesRepository.remove(petHomeToRemove);
    return response.status(200).json({ message: "Pet Home Deletado" });
  },
};
