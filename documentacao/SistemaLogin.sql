CREATE DATABASE meu_banco_de_dados; 

USE meu_banco_de_dados; 

CREATE TABLE users(
id int AUTO_INCREMENT,
username varchar(100) NOT NULL,
password varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
telefone VARCHAR(11),
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);

CREATE TABLE profiles(
user int NOT NULL,
data_nascimento date NOT NULL,
foto_perfil longblob,
PRIMARY KEY (user)
);

ALTER TABLE profiles ADD CONSTRAINT fk_user
FOREIGN KEY (user)
REFERENCES users (id) ON DELETE CASCADE;
