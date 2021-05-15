import { createConnection } from "typeorm";

try {
  createConnection();
} catch (error) {
  console.error(error);
}
