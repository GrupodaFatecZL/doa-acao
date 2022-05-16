import express from "express";

import { PrismaCreateUser } from "./repositories/prisma/PrismaCreateUser";
import { SubmitUserUseCase } from "./useCases/SubmitUserUseCase";

export const routes = express.Router();


routes.post("/user", async (req, res) => {
  const { nome, celular, cpf, email, senha, cep, complemento  } = req.body;
  const prismaCreateUserRepository = new PrismaCreateUser();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  await submitUserUseCase.execute({ nome, celular, cpf, email, senha, cep, complemento });
  return res.status(201).send();
});