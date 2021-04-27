import express from "express";
import path from "path";
import cors from "cors";
import "express-async-errors";
import "./database/connection";
import routes from "./routes";
import errorHandler from "./errors/handler";
import "./database/connection";

// MVC: Model-View-Controller

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT);
