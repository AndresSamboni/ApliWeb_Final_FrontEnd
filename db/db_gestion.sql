-- CREATION OF THE DATABASE
CREATE DATABASE IF NOT EXISTS db_gestion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_gestion;

-- CREATION OF THE TABLE tbl_role
CREATE TABLE IF NOT EXISTS tbl_role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state BOOLEAN DEFAULT 1
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- CREATION OF TABLE tbl_gender
CREATE TABLE IF NOT EXISTS tbl_gender(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state BOOLEAN DEFAULT 1
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- CREATION OF THE TABLE tbl_document
CREATE TABLE IF NOT EXISTS tbl_document(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state BOOLEAN DEFAULT 1
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- CREATION OF THE tbl_user
CREATE TABLE IF NOT EXISTS tbl_user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    document_number VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone BIGINT,
    birthdate DATE,
    photo VARCHAR(255),
    user_name VARCHAR(40) NOT NULL,
    password VARCHAR(200) NOT NULL,
    state BOOLEAN DEFAULT 1,
    document_id_fk INT NOT NULL,
    role_id_fk INT NOT NULL,
    gender_id_fk INT NOT NULL,
    FOREIGN KEY (document_id_fk) REFERENCES tbl_document(id),
    FOREIGN KEY (role_id_fk) REFERENCES tbl_role(id),
    FOREIGN KEY (gender_id_fk) REFERENCES tbl_gender(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- CREATION OF THE TABLE tbl_register
CREATE TABLE IF NOT EXISTS tbl_register(
    start_date DATETIME NOT NULL,
    modify_date DATETIME,
    delete_date DATETIME,
    user_id_fk INT NOT NULL,
    document_id_fk INT NOT NULL,
    FOREIGN KEY (user_id_fk) REFERENCES tbl_user(id),
    FOREIGN KEY (document_id_fk) REFERENCES tbl_document(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;


-- DATA INSERT INTO tbl_role
INSERT INTO tbl_role(name) VALUES
('SUPER ADMINISTRADOR'),
('USUARIO');

-- DATA INSERT INTO tbl_gender
INSERT INTO tbl_gender(name) VALUES
('HETEROSEXUAL'),
('HOMOSEXUAL'),
('TRANSEXUAL'),
('BISEXUAL'),
('PANSEXUAL'),
('OTRO');

-- DATA INSERT INTO tbl_document
INSERT INTO tbl_document(name) VALUES
('TARJETA DE IDENTIDAD'),
('CEDULA DE CIUDADANIA'),
('CEDULA DE EXTRANJERIA'),
('PASAPORTE'),
('OTRO');

-- DATA INSERT INTO tbl_user
INSERT INTO tbl_user(
    name,
    document_number,
    email,
    user_name,
    password,
    document_id_fk,
    role_id_fk,
    gender_id_fk
) VALUES
('ADMIN', 1234567890, 'admin@gmail.com', 'admin', '', 2, 1, 6);

-- DATA INSERT INTO tbl_register
INSERT INTO tbl_register(
    start_date,
    user_id_fk,
    document_id_fk
) VALUES
(NOW(), 1, 2);