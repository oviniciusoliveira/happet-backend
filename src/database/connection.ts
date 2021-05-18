import { createConnection } from "typeorm";

try {
  createConnection();
} catch (error) {
  console.log("erro ao conectar com o banco", error);
}
