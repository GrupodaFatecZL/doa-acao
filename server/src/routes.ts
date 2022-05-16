import express from "express";

import { PrismaUsers } from "./repositories/prisma/PrismaUsers";
import { SubmitUserUseCase } from "./useCases/SubmitUserUseCase";

export const routes = express.Router();


routes.post("/user", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  
  const { nome, celular, cpf, email, senha, cep, complemento  } = req.body;
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    await submitUserUseCase.create({ nome, celular, cpf, email, senha, cep, complemento });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});


routes.get("/users", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    const result = await submitUserUseCase.findMany();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});