CREATE DATABASE sitioWebLuis;
------------------------------------------------------------------
USE sitioWebLuis;
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
    color NVARCHAR(50));

EXEC sp_rename 'Producto.pagodevolución', 'pagodevolucion', 'COLUMN';

select * from Producto;
Delete from Producto;


ALTER TABLE Producto
ADD descuento FLOAT ;

ALTER TABLE Producto
DROP COLUMN descuento ;


ALTER TABLE Producto
DROP CONSTRAINT DF__Producto__descue__0E391C95;

	ALTER TABLE Producto
ADD 
    materiales NVARCHAR(255),
    tamanio NVARCHAR(50),
    color NVARCHAR(50);
	
	ALTER TABLE Producto
ADD 
    materiales NVARCHAR(255),


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

CREATE TABLE DetallePedido (
    id_detalle BIGINT IDENTITY(1,1) PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    id_producto BIGINT NOT NULL,
    cantidad INT NOT NULL,
    subtotal FLOAT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Newsletter (
    id_newsletter BIGINT IDENTITY(1,1) PRIMARY KEY,
    email NVARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Devolucion (
    id_devolucion BIGINT IDENTITY(1,1) PRIMARY KEY,
    id_pedido BIGINT NOT NULL,
    motivo NVARCHAR(255),
    fecha_devolucion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
);
 
 SELECT * FROM Usuario;


 INSERT INTO Producto (nombre, categoria, descripcion, precio, stock)
VALUES ('Papos buapos', 'Playeras', 'Papos super rapidos del rasho MCquen', 1500, 23);

	select * from Producto ;
	select * from sys.tables


 USE master;
GO

SELECT DISTINCT categoria FROM Producto;