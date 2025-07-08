USE TiendaPlayeras;  

CREATE TABLE UserInfo (
  Id             INT            IDENTITY(1,1) PRIMARY KEY,
  UserId         INT            NOT NULL,
  Nombre         NVARCHAR(100)  NOT NULL,
  ApellidoP      NVARCHAR(100)  NOT NULL,
  ApellidoM      NVARCHAR(100)  NULL,
  CalleNumero    NVARCHAR(200)  NOT NULL,
  Municipio      NVARCHAR(100)  NOT NULL,
  CodigoPostal   CHAR(5)        NOT NULL,
  Estado         NVARCHAR(100)  NOT NULL,
  Pais           NVARCHAR(100)  NOT NULL,
  UpdatedAt      DATETIME2      NOT NULL DEFAULT SYSDATETIME(),
  CONSTRAINT FK_UserInfo_Users FOREIGN KEY(UserId)
);

