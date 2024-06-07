-- CreateTable
CREATE TABLE "propriety" (
    "cod_imovel" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "nome_propr" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "proprietar" TEXT NOT NULL,

    CONSTRAINT "propriety_pkey" PRIMARY KEY ("cod_imovel")
);
