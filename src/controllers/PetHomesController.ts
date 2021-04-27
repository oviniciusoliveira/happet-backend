import { getRepository } from "typeorm";
import PetHome from "./../models/PetHome";
import petHomeView from "./../views/petHome_view";
import * as Yup from "yup";

import { Request, Response } from "express";

export default {
  async index(request: Request, response: Response) {
    const petHomesRepository = getRepository(PetHome);

    const petHomes = await petHomesRepository.find({ relations: ["images"] });

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
    } = request.body;

    const petHomesRepository = getRepository(PetHome);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
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
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });

    const petHome = petHomesRepository.create(data);

    await petHomesRepository.save(petHome);
    response.status(201).json(petHome);
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
    } = request.body;

    const petHomesRepository = getRepository(PetHome);
    const petHome = await petHomesRepository.findOneOrFail({ id });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === "true",
    };
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, { abortEarly: false });
    const newPetHome = await petHomesRepository.save(data);

    return response.status(201).json(newPetHome);

  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const petHomesRepository = getRepository(PetHome);
    let petHomeToRemove = await petHomesRepository.findOneOrFail({ id });
    await petHomesRepository.remove(petHomeToRemove);
    return response.status(200).json({message: "Pet Home Deletado com Sucesso"});
  },
};
