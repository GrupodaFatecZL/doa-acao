import express from "express";

import { PrismaUsers } from "./repositories/prisma/PrismaUsers";
import { SubmitUserUseCase } from "./useCases/SubmitUserUseCase";

import { PrismaProducts } from "./repositories/prisma/PrismaProducts";
import { SubmitProductUseCase } from "./useCases/SubmitProductUseCase"


export const routes = express.Router();

// ************************ APIs users ************************
routes.post("/user", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { nome, celular, cpf, email, senha, cep, complemento  } = req.body;
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    await submitUserUseCase.createUser({ nome, celular, cpf, email, senha, cep, complemento });
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
    const result = await submitUserUseCase.findManyUsers();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.get("/user", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const params = req.query;
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    if (params) {
      const result = await submitUserUseCase.findOneUser(params);
      return res.status(200).send(result);
    }
    return res.status(404).send()
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.put("/user", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const request = req.body;
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    await submitUserUseCase.updateUser({...request });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.delete("/user", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const email = req.query.email;
  const prismaCreateUserRepository = new PrismaUsers();
  const submitUserUseCase = new SubmitUserUseCase(
    prismaCreateUserRepository
  );

  try {
    if (email) {
      await submitUserUseCase.deleteUser(email.toString());
      return res.status(201).send();
    }
    return res.status(404).send()
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

// ************************ APIs products ************************

routes.post("/product", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status  } = req.body;
  const prismaCreateProductRepository = new PrismaProducts();
  const submitProductUseCase = new SubmitProductUseCase(
    prismaCreateProductRepository
  );

  try {
    await submitProductUseCase.createProduct({ produto, categoria, descricao, fotoProduto, cepDoador, complementoDoador, chaveUnicaDoador, status });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.get("/products", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const prismaCreateProductRepository = new PrismaProducts();
  const submitProductUseCase = new SubmitProductUseCase(
    prismaCreateProductRepository
  );

  try {
    const result = await submitProductUseCase.findManyProducts();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.get("/product", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const params = req.query;
  const prismaCreateProductRepository = new PrismaProducts();
  const submitProductUseCase = new SubmitProductUseCase(
    prismaCreateProductRepository
  );

  try {
    if (params) {
      const result = await submitProductUseCase.findOneProduct(params);
      return res.status(200).send(result);
    }
    return res.status(404).send()
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.put("/product", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const request = req.body;
  const prismaCreateProductRepository = new PrismaProducts();
  const submitProductUseCase = new SubmitProductUseCase(
    prismaCreateProductRepository
  );

  try {
    await submitProductUseCase.updateProduct({...request });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

routes.delete("/product", async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const idProduct = req.query.idProduct;
  const prismaCreateProductRepository = new PrismaProducts();
  const submitProductUseCase = new SubmitProductUseCase(
    prismaCreateProductRepository
  );

  try {
    if (idProduct) {
      await submitProductUseCase.deleteProduct(idProduct.toString());
      return res.status(201).send();
    }
    return res.status(404).send()
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});