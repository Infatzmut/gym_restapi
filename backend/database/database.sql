-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gym
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gym` ;

-- -----------------------------------------------------
-- Schema gym
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gym` DEFAULT CHARACTER SET utf32 ;
USE `gym` ;

-- -----------------------------------------------------
-- Table `gym`.`actividades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`actividades` ;

CREATE TABLE IF NOT EXISTS `gym`.`actividades` (
  `id_actividad` SMALLINT(3) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NULL,
  `imagenRef` VARCHAR(45) NULL,
  `imagenRef2` VARCHAR(45) NULL,
  PRIMARY KEY (`id_actividad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`tipo_documento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`tipo_documento` ;

CREATE TABLE IF NOT EXISTS `gym`.`tipo_documento` (
  `tipo_doc_id` TINYINT(2) NOT NULL,
  `descripcion` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`tipo_doc_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`sedes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`sedes` ;

CREATE TABLE IF NOT EXISTS `gym`.`sedes` (
  `id_sede` TINYINT(3) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`id_sede`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`colaboradores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`colaboradores` ;

CREATE TABLE IF NOT EXISTS `gym`.`colaboradores` (
  `id_colaborador` MEDIUMINT(3) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `apellido_paterno` VARCHAR(60) NOT NULL,
  `apellido_materno` VARCHAR(60) NULL,
  `tipo_doc` TINYINT(3) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `fecha_alta` DATE NOT NULL,
  `fecha_baja` DATE NULL,
  `estado` BIT(1) NULL DEFAULT 1,
  `email` VARCHAR(60) NULL,
  `telefono` VARCHAR(12) NULL,
  `direccion` VARCHAR(60) NULL,
  `categoria` VARCHAR(30) NOT NULL,
  `sede_id` TINYINT(3) NULL,
  PRIMARY KEY (`id_colaborador`),
  INDEX `FK_tipo_doc_idx` (`tipo_doc` ASC) VISIBLE,
  INDEX `FK_sedes_idx` (`sede_id` ASC) VISIBLE,
  CONSTRAINT `FK_tipo_doc`
    FOREIGN KEY (`tipo_doc`)
    REFERENCES `gym`.`tipo_documento` (`tipo_doc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_sedes`
    FOREIGN KEY (`sede_id`)
    REFERENCES `gym`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`actividades_entrenador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`actividades_entrenador` ;

CREATE TABLE IF NOT EXISTS `gym`.`actividades_entrenador` (
  `id_act_entrenador` INT NOT NULL AUTO_INCREMENT,
  `id_entrenador` MEDIUMINT(3) NULL,
  `id_actividad` SMALLINT(3) NULL,
  PRIMARY KEY (`id_act_entrenador`),
  INDEX `FK_actividades1_idx` (`id_actividad` ASC) VISIBLE,
  INDEX `FK_entrenador1_idx` (`id_entrenador` ASC) VISIBLE,
  CONSTRAINT `FK_actividades1`
    FOREIGN KEY (`id_actividad`)
    REFERENCES `gym`.`actividades` (`id_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_entrenador1`
    FOREIGN KEY (`id_entrenador`)
    REFERENCES `gym`.`colaboradores` (`id_colaborador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`bloque_horario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`bloque_horario` ;

CREATE TABLE IF NOT EXISTS `gym`.`bloque_horario` (
  `id_bloque_horario` MEDIUMINT NOT NULL AUTO_INCREMENT,
  `hora_inicio` TIME NULL,
  `hora_fin` TIME NULL,
  PRIMARY KEY (`id_bloque_horario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`detalle_actividad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`detalle_actividad` ;

CREATE TABLE IF NOT EXISTS `gym`.`detalle_actividad` (
  `id_detalle_actividad` BIGINT NOT NULL AUTO_INCREMENT,
  `id_bloque_horario` MEDIUMINT NOT NULL,
  `id_actividad_ent` INT NOT NULL,
  `capacidad` TINYINT(2) NOT NULL,
  `fechal` DATE NOT NULL,
  INDEX `FK_actividad_entrenador_idx` (`id_actividad_ent` ASC) VISIBLE,
  INDEX `FK_bloque_horario_idx` (`id_bloque_horario` ASC) VISIBLE,
  PRIMARY KEY (`id_detalle_actividad`),
  CONSTRAINT `FK_actividad_entrenador`
    FOREIGN KEY (`id_actividad_ent`)
    REFERENCES `gym`.`actividades_entrenador` (`id_act_entrenador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_bloque_horario`
    FOREIGN KEY (`id_bloque_horario`)
    REFERENCES `gym`.`bloque_horario` (`id_bloque_horario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`clientes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`clientes` ;

CREATE TABLE IF NOT EXISTS `gym`.`clientes` (
  `id_cliente` BIGINT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(60) NOT NULL,
  `apellido_paterno` VARCHAR(60) NOT NULL,
  `apellido_materno` VARCHAR(60) NULL,
  `tipo_doc` TINYINT(2) NOT NULL,
  `documento` VARCHAR(15) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `fecha_alta` DATE NULL,
  `fecha_baja` DATE NULL,
  `estado` BIT(1) NULL DEFAULT 1,
  `email` VARCHAR(60) NULL,
  `telefono` VARCHAR(12) NULL,
  `direccion` VARCHAR(60) NOT NULL,
  `sede_id` TINYINT(3) NOT NULL,
  `membresia` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  INDEX `FK_sedes2_idx` (`sede_id` ASC) VISIBLE,
  INDEX `FK_tipo_doc_idx` (`tipo_doc` ASC) VISIBLE,
  CONSTRAINT `FK_sedes2`
    FOREIGN KEY (`sede_id`)
    REFERENCES `gym`.`sedes` (`id_sede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_tipo_doc2`
    FOREIGN KEY (`tipo_doc`)
    REFERENCES `gym`.`tipo_documento` (`tipo_doc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`actividad_cliente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`actividad_cliente` ;

CREATE TABLE IF NOT EXISTS `gym`.`actividad_cliente` (
  `id_cliente` BIGINT NOT NULL,
  `id_detalle_act` BIGINT NOT NULL,
  `id_clase` BIGINT NOT NULL AUTO_INCREMENT,
  INDEX `FK_detalle_act2_idx` (`id_detalle_act` ASC) VISIBLE,
  PRIMARY KEY (`id_clase`, `id_detalle_act`, `id_cliente`),
  CONSTRAINT `FK_cliente1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `gym`.`clientes` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_detalle_act2`
    FOREIGN KEY (`id_detalle_act`)
    REFERENCES `gym`.`detalle_actividad` (`id_detalle_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `gym`.`usuarios` (
  `id_usuario` MEDIUMINT(3) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `FK_Colaborador`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `gym`.`colaboradores` (`id_colaborador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gym`.`beneficios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gym`.`beneficios` ;

CREATE TABLE IF NOT EXISTS `gym`.`beneficios` (
  `id_ben` BIGINT NOT NULL AUTO_INCREMENT,
  `descripcion` TEXT NULL,
  `id_act` SMALLINT(3) NULL,
  PRIMARY KEY (`id_ben`),
  INDEX `FK_idAct_idx` (`id_act` ASC) VISIBLE,
  CONSTRAINT `FK_idAct`
    FOREIGN KEY (`id_act`)
    REFERENCES `gym`.`actividades` (`id_actividad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `gym`.`actividades`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`actividades` (`id_actividad`, `nombre`, `descripcion`, `imagenRef`, `imagenRef2`) VALUES (1, 'Functional', 'Entrenamiento que utiliza todas las partes del cuerpo para genear un mayor impacto cardiovascular y muscular', 'funcional', NULL);
INSERT INTO `gym`.`actividades` (`id_actividad`, `nombre`, `descripcion`, `imagenRef`, `imagenRef2`) VALUES (2, 'Body Cicling', 'Entrenamiento en bicicleta estática a un ritmo acelerado para estimular el sistema cardiovascular y tonificar los músculos de las piernas', 'body-cicling', NULL);
INSERT INTO `gym`.`actividades` (`id_actividad`, `nombre`, `descripcion`, `imagenRef`, `imagenRef2`) VALUES (3, 'Boxeo', 'El antiguo arte del boxeo en una jaula especial con el equipamiento adecuado', 'boxeo', NULL);
INSERT INTO `gym`.`actividades` (`id_actividad`, `nombre`, `descripcion`, `imagenRef`, `imagenRef2`) VALUES (4, 'Muay Thai', 'El antiguo arte de Muay Thai en una jaula adecuada con el equipamiento respectivo', 'muay-thai', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`tipo_documento`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`tipo_documento` (`tipo_doc_id`, `descripcion`) VALUES (1, 'DNI');
INSERT INTO `gym`.`tipo_documento` (`tipo_doc_id`, `descripcion`) VALUES (2, 'PASAPORTE');
INSERT INTO `gym`.`tipo_documento` (`tipo_doc_id`, `descripcion`) VALUES (3, 'CARNET EXTRANJERIA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`sedes`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`sedes` (`id_sede`, `nombre`, `direccion`) VALUES (1, 'Av Peru', 'Av Peru 2054');
INSERT INTO `gym`.`sedes` (`id_sede`, `nombre`, `direccion`) VALUES (2, 'La Rambla', 'Av Brasil 1500');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`colaboradores`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`colaboradores` (`id_colaborador`, `nombre`, `apellido_paterno`, `apellido_materno`, `tipo_doc`, `documento`, `fecha_nacimiento`, `fecha_alta`, `fecha_baja`, `estado`, `email`, `telefono`, `direccion`, `categoria`, `sede_id`) VALUES (1, 'Juan', 'Perez', 'Diaz', 1, '12345678', '1995/06/18', '2020/05/20', NULL, 1, 'juan@perez.com', '456789123', 'Av su hogar 2930', 'entrenador', 1);
INSERT INTO `gym`.`colaboradores` (`id_colaborador`, `nombre`, `apellido_paterno`, `apellido_materno`, `tipo_doc`, `documento`, `fecha_nacimiento`, `fecha_alta`, `fecha_baja`, `estado`, `email`, `telefono`, `direccion`, `categoria`, `sede_id`) VALUES (2, 'Lily', 'Luna', NULL, 1, '55648795', '1990/04/20', '2018/01/18', NULL, 1, 'lily@luna.com', '48752132', 'Av los rosales 2312', 'administrativo', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`actividades_entrenador`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`actividades_entrenador` (`id_act_entrenador`, `id_entrenador`, `id_actividad`) VALUES (1, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`bloque_horario`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (1, '6:00', '7:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (2, '7:00', '8:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (3, '8:00', '9:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (4, '9:00', '10:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (5, '10:00', '11:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (6, '18:00', '19:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (7, '19:00', '20:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (8, '20:00', '21:00');
INSERT INTO `gym`.`bloque_horario` (`id_bloque_horario`, `hora_inicio`, `hora_fin`) VALUES (9, '21:00', '22:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`detalle_actividad`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`detalle_actividad` (`id_detalle_actividad`, `id_bloque_horario`, `id_actividad_ent`, `capacidad`, `fechal`) VALUES (DEFAULT, 2, 1, 30, '2020/08/14');
INSERT INTO `gym`.`detalle_actividad` (`id_detalle_actividad`, `id_bloque_horario`, `id_actividad_ent`, `capacidad`, `fechal`) VALUES (DEFAULT, 2, 1, 30, '2020/08/15');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`clientes`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`clientes` (`id_cliente`, `nombre`, `apellido_paterno`, `apellido_materno`, `tipo_doc`, `documento`, `fecha_nacimiento`, `fecha_alta`, `fecha_baja`, `estado`, `email`, `telefono`, `direccion`, `sede_id`, `membresia`) VALUES (1, 'Aureliano', 'Buendia', 'Iguarán', 1, '77845126', '2000/03/12', '2019/05/15', NULL, 1, 'aureliano@buendia.com', '2345678', 'Macondo', 1, 'VIP');

COMMIT;


-- -----------------------------------------------------
-- Data for table `gym`.`actividad_cliente`
-- -----------------------------------------------------
START TRANSACTION;
USE `gym`;
INSERT INTO `gym`.`actividad_cliente` (`id_cliente`, `id_detalle_act`, `id_clase`) VALUES (1, 1, DEFAULT);
INSERT INTO `gym`.`actividad_cliente` (`id_cliente`, `id_detalle_act`, `id_clase`) VALUES (1, 2, DEFAULT);

COMMIT;

