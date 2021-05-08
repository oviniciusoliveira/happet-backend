import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "./../models/User";
import userView from "./../views/user_view";
import * as Yup from "yup";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import handlebars from "nodemailer-express-handlebars";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
      password_reset_token: "",
      password_reset_expires: 0,
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

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) return response.json({ error: "email não cadastrado" });

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setHours(now.getHours() + 1);

    const data = {
      ...user,
      password_reset_token: token,
      password_reset_expires: now.getTime(),
    };

    await usersRepository.save(data);

    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2f3e14e3ff17d5",
        pass: "6f799b93fb14b4",
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".hbs",
        partialsDir: path.resolve("./src/resources/mail"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/resources/mail"),
      extName: ".hbs",
    };

    transporter.use("compile", handlebars(handlebarOptions));

    const mailOptions = {
      from: `Admnistrador do HAPPET: <${process.env.MAIL_USERNAME}>`,
      to: email,
      subject: "HAPPET - Redefinir Senha",
      template: "forgot_password",
      context: { token, host:process.env.APP_HOST},
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        return response.json({
          success: "email para redefinição de senha enviado",
        });
      })
      .catch((err) => {
        return response.json({
          error: "não foi possível enviar o email. tente novamente",
        });
      });
  },

  async resetPassword(request: Request, response: Response) {
    const { email, token, password } = request.body;

    try {
      const usersRepository = getRepository(User);
      const user = await usersRepository.findOneOrFail({ email });
      if (!user) {
        return response.json({ error: "não existe usuário com este email" });
      }
      if (token !== user.password_reset_token) {
        return response.json({ error: "token inválido" });
      }
      const now = new Date();
      if (now.getTime() > user.password_reset_expires) {
        return response.json({ error: "token expirado, gere um novo" });
      }

      const saltRounds = 10;

      const data = {
        ...user,
        password: await bcryptjs.hash(password, saltRounds),
      };

      await usersRepository.save(data);

      response.status(200).json({ message: "Senha Redefinida" });
    } catch (err) {
      response
        .status(400)
        .json({ message: "Erro ao resetar senha. Tente novamente" });
    }
  },
};
