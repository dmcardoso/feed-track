CREATE TABLE `filiais` (
`id` int NOT NULL AUTO_INCREMENT,
`filial` varchar(80) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `funcionarios` (
`id` int NOT NULL AUTO_INCREMENT,
`nome` varchar(120) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `filiais_funcionarios` (
`filial` int NOT NULL,
`funcionario` int NOT NULL
);


ALTER TABLE `filiais_funcionarios` ADD CONSTRAINT `fk_filiais_funcionarios_funcionarios_1` FOREIGN KEY (`funcionario`) REFERENCES `funcionarios` (`id`);
ALTER TABLE `filiais_funcionarios` ADD CONSTRAINT `fk_filiais_funcionarios_filiais_1` FOREIGN KEY (`filial`) REFERENCES `filiais` (`id`);

