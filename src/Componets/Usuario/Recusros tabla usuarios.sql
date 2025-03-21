--Agrega el atributo permisos a usuarios
ALTER TABLE USUARIO
ADD permisos INT NULL;

update usuario set permisos = 1 where id_usuario = 2
update usuario set permisos = 2 where id_usuario = 1

--Agrega el atributo statuts a usuarios
ALTER TABLE USUARIO
ADD status bit NULL;
go
update usuario set status = 1 where id_usuario = 1
update usuario set status = 1 where id_usuario = 2
update usuario set status = 1 where id_usuario = 3
update usuario set status = 1 where id_usuario = 4

select * from USUARIO

--------------------------ultimo ultimo 14/09/24 11:00 am----------------------
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos)
VALUES ('Mirna', 'noseque', 1, 1, 'mirnuchis@ti.com', '555-3333', '123', 0);

UPDATE USUARIO
SET permisos = 3
WHERE nombre = 'Mirna' AND apellido = 'noseque';

select * from USUARIO


-------------------------ultimo ultimo ultimo 03/10/24---------------------------------------
insert into ESPECIALIZACION(nombre) values ('Redes');
insert into ESPECIALIZACION(nombre) values ('Hardware');
insert into ESPECIALIZACION(nombre) values ('Software');

ALTER TABLE TECNICO
ADD CONSTRAINT FK_Tecnico_Usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);

insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (1,'Disponible');
insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (2,'Ocupado');
insert into ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad,estado) values (3,'Ausente');

ALTER TABLE Tecnico
DROP COLUMN nombre;

ALTER TABLE Tecnico
DROP COLUMN apellidos;

select * from USUARIO
select * from TECNICO
select * from ESTADO_DISPONIBILIDAD
select *  from especializacion

--------------12 de Noviembre de 2024
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status) 
VALUES 
('Martin', 'Nevarez', 2, 1, 'martin.nevarez@ti.com', '555-4444', '123', 4, 1),
('David', 'Mendoza', 2, 1, 'david.mendoza@ti.com', '555-5555', '123', 4, 1),
('Felipe', 'Lopez', 2, 1, 'felipe.lopez@ti.com', '555-6666', '123', 4, 1),
('Antonio', 'Murillo', 2, 1, 'antonio.murillo@ti.com', '555-7777', '123', 4, 1),
('Pedro', 'Villa', 2, 1, 'pedro.villa@ti.com', '555-8888', '123', 4, 1),
('Luis', 'Audeves', 2, 1, 'luis.audeves@ti.com', '555-9999', '123', 4, 1);

INSERT INTO TECNICO (id_usuario, id_especializacion, id_estadoDisponibilidad)
VALUES
(4, 3, 1),
(5, 3, 1),
(6, 2, 1),
(7, 2, 1),
(8, 1, 1),
(9, 1, 1);

INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status)
VALUES ('Mario', 'Bastidas', 2, 1, 'bastidas@ti.com', '555-9999', '123', 3, 1);

Select * from equipo