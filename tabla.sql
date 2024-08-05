create database ing_soft2;


CREATE TABLE usuarios(
    usuario_id SERIAL PRIMARY KEY,
    usuario_nombre VARCHAR(50),
    usuario_codigo_pais INTEGER,
    usuario_telefono INTEGER,
    usuario_correo VARCHAR(50),
    usuario_situacion SMALLINT DEFAULT 1
);