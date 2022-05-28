-- CreateTable
CREATE TABLE "user" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "celular" TEXT,
    "cpf" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "cep" TEXT,
    "complemento" TEXT
);

-- CreateTable
CREATE TABLE "product" (
    "idProduct" TEXT NOT NULL PRIMARY KEY,
    "produto" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotoProduto" TEXT NOT NULL,
    "cepDoador" TEXT NOT NULL,
    "complementoDoador" TEXT NOT NULL,
    "chaveUnicaDoador" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "donation" (
    "idDonation" TEXT NOT NULL PRIMARY KEY,
    "chaveUnicaDoador" TEXT NOT NULL,
    "chaveUnicaBeneficiario" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "dataMaxRetirada" DATE NOT NULL,
    "dataRetirada" DATE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
