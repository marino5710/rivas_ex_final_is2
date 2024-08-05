CREATE DATABASE final_rivas;


CREATE TABLE usuarios(
    usuario_id SERIAL PRIMARY KEY,
    usuario_nombre VARCHAR(50),
    usuario_codigo_pais VARCHAR(20),
    usuario_telefono INTEGER,
    usuario_correo VARCHAR(50)
);