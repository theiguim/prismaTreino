import express from "express";
import { router } from "./router";
const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, ()=> console.log("Servidor rodando na porta 3000"))

// db_treinoDois