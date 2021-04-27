import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "./../models/User";
import userView from "./../views/user_view";
import * as Yup from "yup";
import bcryptjs from "bcryptjs";

export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(userView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail({ id });

    return response.json(userView.render(user));
  },

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);

    const userExist = await usersRepository.findOne({ email });

    if (userExist) {
      console.log(userView.render(userExist));
      return response
        .status(400)
        .send({ error: "este email já está cadastrado" });
    }

    const saltRounds = 10;

    const hashPassword = await bcryptjs.hash(password, saltRounds);

    const data = {
      name,
      email,
      password: hashPassword,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(userView.render(user));
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    const userToRemove = await usersRepository.findOneOrFail(id);
    await usersRepository.remove(userToRemove);
    return response
      .status(200)
      .json({ success: "Usuário Removido com Sucesso" });
  },
};
