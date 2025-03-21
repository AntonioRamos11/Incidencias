--Cada nombre de puerto hara una referencia a un tipo de puerto
--Ejemplo FastEthernet0/0 hara referencia a FastEtherner

CREATE TABLE TIPO_PUERTO ( --fast, giga, hdmi, usb, consola etc
	id_tipo_puerto INT PRIMARY KEY IDENTITY(1,1),
	nombre varchar(50)
);

CREATE TABLE NOMBRE_PUERTO(
	id_nombre_puerto INT PRIMARY KEY IDENTITY(1,1),
	id_tipo_puerto int not null,
	nombre_puerto varchar(50),
	CONSTRAINT FK_NombrePuerto_TipoPuerto FOREIGN KEY (id_tipo_puerto) REFERENCES TIPO_PUERTO(id_tipo_puerto)
);

-- Crear la tabla PUERTO
CREATE TABLE PUERTO (
    id_puerto INT PRIMARY KEY IDENTITY(1,1),  -- Clave primaria autoincremental
    id_equipo INT NOT NULL,                   -- Clave foránea que referencia a EQUIPO
    nombre_puerto INT,       -- Nombre del puerto (GigabitEthernet0/0, FastEthernet0/0, etc.)
    estado BIT,              -- Estado del puerto (Activo = 1, Inactivo = 0 )
    CONSTRAINT FK_Puerto_Equipo FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id_equipo),
	CONSTRAINT FK_Puerto_NombrePuerto FOREIGN KEY (nombre_puerto) REFERENCES NOMBRE_PUERTO(id_nombre_puerto)
);

-- Crear la tabla CONEXION
CREATE TABLE CONEXION (
    id_conexion INT PRIMARY KEY IDENTITY(1,1),  -- Clave primaria autoincremental
    id_puerto1 INT NOT NULL,                    -- Clave foránea que referencia al primer puerto
    id_puerto2 INT NOT NULL,                    -- Clave foránea que referencia al segundo puerto
	estado_conexion bit,						-- Activa o inactiva
    CONSTRAINT FK_Conexion_Puerto1 FOREIGN KEY (id_puerto1) REFERENCES PUERTO(id_puerto),
    CONSTRAINT FK_Conexion_Puerto2 FOREIGN KEY (id_puerto2) REFERENCES PUERTO(id_puerto)
);

-- Insertar tipos de puerto en la tabla TIPO_PUERTO
INSERT INTO TIPO_PUERTO (nombre)
VALUES 
('FastEthernet'),
('GigabitEthernet'),
('Consola (RS-232)'),
('USB 2.0'),
('USB 3.0'),
('HDMI'),
('VGA'),
('RJ45');
 
insert into NOMBRE_PUERTO
values
(1,'Fa0/0'),
(1,'Fa0/1'),
(1,'Fa0/2'),
(1,'Fa0/3'),
(1,'Fa0/4'),
(1,'Fa0/5'),
(1,'Fa0/6'),
(1,'Fa0/7'),
(1,'Fa0/8'),
(1,'Fa0/9'),
(1,'Fa0/10'),
(1,'Fa0/11'),
(1,'Fa0/12'),
(1,'Fa0/13'),
(1,'Fa0/14'),
(1,'Fa0/15'),
(1,'Fa0/16'),
(1,'Fa0/17'),
(1,'Fa0/18'),
(1,'Fa0/19'),
(1,'Fa0/20'),
(1,'Fa0/21'),
(1,'Fa0/22'),
(1,'Fa0/23'),
(1,'Fa0/24');
 
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(2, 'Gi0/0'),
(2, 'Gi0/1'),
(2, 'Gi0/2'),
(2, 'Gi0/3'),
(2, 'Gi0/4'),
(2, 'Gi0/5'),
(2, 'Gi0/6'),
(2, 'Gi0/7'),
(2, 'Gi0/8'),
(2, 'Gi0/9'),
(2, 'Gi0/10'),
(2, 'Gi0/11'),
(2, 'Gi0/12'),
(2, 'Gi0/13'),
(2, 'Gi0/14'),
(2, 'Gi0/15'),
(2, 'Gi0/16'),
(2, 'Gi0/17'),
(2, 'Gi0/18'),
(2, 'Gi0/19'),
(2, 'Gi0/20'),
(2, 'Gi0/21'),
(2, 'Gi0/22'),
(2, 'Gi0/23'),
(2, 'Gi0/24');
 
-- Consola (RS-232)
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(3, 'Consola 0'),
(3, 'Consola 1');
 
-- USB 2.0
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(4, 'USB 2.0 Port 1'),
(4, 'USB 2.0 Port 2'),
(4, 'USB 2.0 Port 3'),
(4, 'USB 2.0 Port 4');
 
-- USB 3.0
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(5, 'USB 3.0 Port 1'),
(5, 'USB 3.0 Port 2'),
(5, 'USB 3.0 Port 3'),
(5, 'USB 3.0 Port 4');
 
-- HDMI
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(6, 'HDMI Port 1'),
(6, 'HDMI Port 2');
 
-- VGA
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(7, 'VGA Port 1'),
(7, 'VGA Port 2');
 
-- RJ45
INSERT INTO NOMBRE_PUERTO (id_tipo_puerto, nombre_puerto)
VALUES
(8, 'RJ45 Port 1'),
(8, 'RJ45 Port 2'),
(8, 'RJ45 Port 3'),
(8, 'RJ45 Port 4'),
(8, 'RJ45 Port 5'),
(8, 'RJ45 Port 6');
 
select * from TIPO_PUERTO

SELECT * FROM NOMBRE_PUERTO
WHERE id_tipo_puerto = 1;

select * from PUERTO
SELECT * FROM NOMBRE_PUERTO

SELECT * FROM NOMBRE_PUERTO
            WHERE id_tipo_puerto = 1