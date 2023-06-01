-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bd_t_mascotas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_t_mascotas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_t_mascotas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bd_t_mascotas` ;

-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_cliente` (
  `DNI` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`DNI`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_disponible`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_disponible` (
  `id` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_mascota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_mascota` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `raza` VARCHAR(45) NOT NULL,
  `edad` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_productos` (
  `codigo` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `estado` INT NOT NULL,
  `tbl_mascota_id` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `fk_estado_producto_idx` (`estado` ASC) VISIBLE,
  INDEX `fk_tbl_productos_tbl_mascota1_idx` (`tbl_mascota_id` ASC) VISIBLE,
  CONSTRAINT `fk_estado_producto`
    FOREIGN KEY (`estado`)
    REFERENCES `bd_t_mascotas`.`tbl_disponible` (`id`),
  CONSTRAINT `fk_tbl_productos_tbl_mascota1`
    FOREIGN KEY (`tbl_mascota_id`)
    REFERENCES `bd_t_mascotas`.`tbl_mascota` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_factura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_cliente_DNI` VARCHAR(45) NOT NULL,
  `tbl_productos_codigo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_factura_tbl_cliente1_idx` (`tbl_cliente_DNI` ASC) VISIBLE,
  INDEX `fk_tbl_factura_tbl_productos1_idx` (`tbl_productos_codigo` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_factura_tbl_cliente1`
    FOREIGN KEY (`tbl_cliente_DNI`)
    REFERENCES `bd_t_mascotas`.`tbl_cliente` (`DNI`),
  CONSTRAINT `fk_tbl_factura_tbl_productos1`
    FOREIGN KEY (`tbl_productos_codigo`)
    REFERENCES `bd_t_mascotas`.`tbl_productos` (`codigo`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_proveedores` (
  `RTN` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`RTN`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bd_t_mascotas`.`tbl_suministra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_t_mascotas`.`tbl_suministra` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tbl_proveedores_RTN` VARCHAR(45) NOT NULL,
  `tbl_productos_codigo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tbl_suministra_tbl_proveedores1_idx` (`tbl_proveedores_RTN` ASC) VISIBLE,
  INDEX `fk_tbl_suministra_tbl_productos1_idx` (`tbl_productos_codigo` ASC) VISIBLE,
  CONSTRAINT `fk_tbl_suministra_tbl_productos1`
    FOREIGN KEY (`tbl_productos_codigo`)
    REFERENCES `bd_t_mascotas`.`tbl_productos` (`codigo`),
  CONSTRAINT `fk_tbl_suministra_tbl_proveedores1`
    FOREIGN KEY (`tbl_proveedores_RTN`)
    REFERENCES `bd_t_mascotas`.`tbl_proveedores` (`RTN`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
