import { Router } from "express";
import upload from "./config/upload";
import PetHomesController from "./controllers/PetHomesController";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import loginRequired from "./middlewares/loginRequired";

// Query Params: http://localhost:3333/users?search=belchior (opcional)
// Route Params: http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users (informações completas / sensíveis)

const routes = Router();

// console.log(req.query);
// console.log(req.params);
// console.log(req.body);

// Padrões de um controller: index, show, create, update, delete

routes.get("/pet-homes", PetHomesController.index);
routes.get("/pet-homes/:id", PetHomesController.show);
routes.post("/pet-homes", upload.array("images"), PetHomesController.create);
routes.put(
  "/pet-homes",
  loginRequired,
  upload.array("images"),
  PetHomesController.update
);
routes.delete("/pet-homes/:id", loginRequired, PetHomesController.delete);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);
routes.delete("/users/:id", loginRequired, UserController.delete);

routes.post("/forgot-password", UserController.forgotPassword);
routes.post("/reset-password", UserController.resetPassword);

routes.post("/authenticate", AuthController.store);

export default routes;
