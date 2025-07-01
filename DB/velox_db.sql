create database velox_db;

USE velox_db;

SELECT name 
FROM sys.tables;

DROP DATABASE velox_db;


CREATE TABLE CarritoP(
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    categoria NVARCHAR(255),
    precio FLOAT,
    imagen VARBINARY(MAX)	 
);
DROP TABLE CarritoP;
select * from CarritoP;
delete from CarritoP;
-------------------------------------------------------------
INSERT INTO CarritoP(nombre, categoria, precio, imagen) VALUES
('Guantes de Boxeo VELOX', 'Guantes', 1200.50, NULL),
('Saco de Boxeo VELOX', 'Playeras', 3500.00, NULL),
('Cinta para Muñecas VELOX', 'Pans', 150.00, NULL),
('Papos para box VELOX', 'Casco', 200.00, NULL);

ALTER TABLE CarritoP 
ADD 
    cantidad INT NOT NULL DEFAULT 1;
   

ALTER TABLE CarritoP
add sku NVARCHAR(50) NOT NULL;

ALTER TABLE CarritoP
DROP COLUMN sku;