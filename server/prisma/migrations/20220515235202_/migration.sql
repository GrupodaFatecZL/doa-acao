-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "celular" TEXT,
    "chaveUnica" TEXT,
    "cpf" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "cep" TEXT,
    "complemento" TEXT
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "id" TEXT NOT NULL PRIMARY KEY,
    "chaveUnicaDoador" TEXT NOT NULL,
    "chaveUnicaBeneficiario" TEXT NOT NULL,
    "productId" TEXT,
    "dataMaxRetirada" DATETIME NOT NULL,
    "dataRetirada" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_chaveUnica_key" ON "user"("chaveUnica");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
