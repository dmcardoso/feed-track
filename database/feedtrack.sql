CREATE TABLE `filiais` (
`id` int NOT NULL AUTO_INCREMENT,
`filial` varchar(80) NOT NULL,
`fundacao` datetime NULL,
`criacao` datetime NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `funcionarios` (
`id` int NOT NULL AUTO_INCREMENT,
`nome` varchar(120) NOT NULL,
`email` varchar(240) NOT NULL,
`dataNascimento` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`senha` varchar(255) NOT NULL,
`criacao` datetime NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `filiais_funcionarios` (
`filial` int NOT NULL,
`funcionario` int NOT NULL,
`cargo` int NOT NULL
);

CREATE TABLE `cargos` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`descricao` varchar(240) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `permissoes` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`descricao` varchar(240) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `funcionarios_permissoes` (
`funcionario` int NOT NULL,
`permissao` int NOT NULL
);

CREATE TABLE `system_logs` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`mensagem` text NOT NULL,
`criacao` datetime NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `feedbacks` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`descricao` text NOT NULL,
`criacao` datetime NOT NULL,
`funcionario` int NOT NULL,
`filial` int NULL,
PRIMARY KEY (`id`) 
);


ALTER TABLE `filiais_funcionarios` ADD CONSTRAINT `fk_filiais_funcionarios_funcionarios_1` FOREIGN KEY (`funcionario`) REFERENCES `funcionarios` (`id`);
ALTER TABLE `filiais_funcionarios` ADD CONSTRAINT `fk_filiais_funcionarios_filiais_1` FOREIGN KEY (`filial`) REFERENCES `filiais` (`id`);
ALTER TABLE `filiais_funcionarios` ADD CONSTRAINT `fk_filiais_funcionarios_cargos_1` FOREIGN KEY (`cargo`) REFERENCES `cargos` (`id`);
ALTER TABLE `funcionarios_permissoes` ADD CONSTRAINT `fk_funcionarios_permissoes_funcionarios_1` FOREIGN KEY (`funcionario`) REFERENCES `funcionarios` (`id`);
ALTER TABLE `funcionarios_permissoes` ADD CONSTRAINT `fk_funcionarios_permissoes_permissoes_1` FOREIGN KEY (`permissao`) REFERENCES `permissoes` (`id`);
ALTER TABLE `feedbacks` ADD CONSTRAINT `fk_feedbacks_funcionarios_1` FOREIGN KEY (`funcionario`) REFERENCES `funcionarios` (`id`);
ALTER TABLE `feedbacks` ADD CONSTRAINT `fk_feedbacks_filiais_1` FOREIGN KEY (`filial`) REFERENCES `filiais` (`id`);

