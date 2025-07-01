CREATE DATABASE sitioWebLuis;
------------------------------------------------------------------
USE sitioWebLuis;

ALTER SERVER ROLE sysadmin ADD MEMBER [danuser];


-----------------------------------------------------------------
CREATE TABLE Usuario (
    id_usuario BIGINT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    contraseña NVARCHAR(100) NOT NULL,
);
---------------------------------------------------------------------
CREATE TABLE Producto (
    id_producto BIGINT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
	categoria NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(255),
    precio FLOAT NOT NULL,
    imagen VARBINARY(MAX),
    stock INT NOT NULL,
    materiales NVARCHAR(255),
    tamanio NVARCHAR(50),
    color NVARCHAR(50),
	sku NVARCHAR(50),
	cuidados  NVARCHAR(200),
	descuento  NVARCHAR(50));

	select * from Producto;
---------------------------------------------------------------------
CREATE TABLE TallaCantidad (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    talla NVARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    producto_id BIGINT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES Producto(id_producto)
);
drop table ;


----------------------------------------------------------------------
CREATE TABLE Pedido (
    id_pedido BIGINT IDENTITY(1,1) PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    fecha DATETIME DEFAULT GETDATE(),
    total FLOAT NOT NULL,
    estado NVARCHAR(50) DEFAULT 'en proceso',
    guia_rastreo NVARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

 

 

CREATE TABLE Devolucion (
    id_devolucion BIGINT IDENTITY(1,1) PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    motivo NVARCHAR(255),
    fecha_devolucion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
);
 
CREATE TABLE Productos (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    categoria NVARCHAR(50) NOT NULL,
    descripcion NVARCHAR(MAX) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    materiales NVARCHAR(255) NOT NULL,
    color NVARCHAR(50) NOT NULL,
    sku NVARCHAR(50) UNIQUE,
    cuidados NVARCHAR(255) NOT NULL,
    pagodevolucion NVARCHAR(255) NOT NULL,
    descuento DECIMAL(5, 2) NULL,
    -- Campos para almacenar imágenes (como texto Base64)
    imagen_principal NVARCHAR(MAX) NULL,
    imagen_secundaria1 NVARCHAR(MAX) NULL,
    imagen_secundaria2 NVARCHAR(MAX) NULL,
    imagen_secundaria3 NVARCHAR(MAX) NULL,
    -- Auditoría
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_actualizacion DATETIME DEFAULT GETDATE()
);

drop table Productos;


 
CREATE TABLE Administrador(
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario VARCHAR(25) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);
select * from Administrador;
--Este es un admin de prueba
INSERT INTO Administrador (usuario, contrasena)
VALUES ('luis', 'luis123');
SELECT * FROM Administrador WHERE usuario = 'luis' AND contrasena = 'luis123';



"luis"
"luis123"