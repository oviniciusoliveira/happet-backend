import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "./../models/User";
import { getRepository } from "typeorm";

export default async (
  request: Request | any,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization)
    return response.status(401).json({ error: "Login Required" });

  const [scheme, token] = authorization.split(" ");

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: "Token malformatted" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET || "");
    const { id, email} = data as any;

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOneOrFail({ id });
    if (!user) return response.status(401).json({ error: "Usuário inválido" });

    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (e) {
    return response.status(401).json({ error: "Token expirado ou inválido" });
  }
};
