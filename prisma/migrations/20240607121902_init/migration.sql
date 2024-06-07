-- CreateTable
CREATE TABLE `propriety` (
    `cod_imovel` VARCHAR(191) NOT NULL,
    `mod_fiscal` DOUBLE NOT NULL,
    `num_area` DOUBLE NOT NULL,
    `municipio` VARCHAR(191) NOT NULL,
    `nome_propr` VARCHAR(191) NOT NULL,
    `cpf_cnpj` VARCHAR(191) NOT NULL,
    `proprietar` VARCHAR(191) NOT NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `shape_leng` DOUBLE NOT NULL,
    `shape_area` DOUBLE NOT NULL,

    PRIMARY KEY (`cod_imovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
