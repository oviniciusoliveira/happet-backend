import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "./../models/User";
import userView from "./../views/user_view";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .json({ error: "informe um email e uma senha válida" });
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user)
      return response.json({ error: "email não cadastrado" });

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid)
      return response.json({ error: "senha inválida" });

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET || "", {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.status(201).json({ user: userView.render(user), token });
  },
};
