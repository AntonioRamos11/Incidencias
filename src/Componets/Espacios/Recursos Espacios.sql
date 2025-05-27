-- Insertar tabla tipo_espacio
INSERT INTO TIPO_ESPACIO(nombre)
values('Aula');

INSERT INTO TIPO_ESPACIO(nombre)
values('Laboratorio');

INSERT INTO TIPO_ESPACIO(nombre)
values('Cubículo');


--Consulta para traer los edificios
select id_edificio, nombre from Edificio

select * from ESPACIOS

--Consulta para traer los edificios por departamento
SELECT DISTINCT E.id_edificio, E.nombre
FROM EDIFICIO E
JOIN ESPACIOS ES ON E.id_edificio = ES.id_edificio
WHERE ES.id_departamento = 1;

select id_tipoespacio from ESPACIOS where id_edificio = 6
 
 --Consulta para traer el tipo de espacio segun el edificio y departamento
SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
FROM TIPO_ESPACIO TE
JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
WHERE ES.id_edificio = 6 AND ES.id_departamento = 1;

--Consulta para traer el espacio segun el tipo de espacio, edificio y departamento
SELECT ES.id_espacio, ES.nombre
FROM ESPACIOS ES
WHERE ES.id_tipoEspacio = 2 AND ES.id_edificio = 3 AND ES.id_departamento = 1;

--Consulta para traer el espacio, capacidad, ubicacion y nombre segun el espacio
select id_espacio, capacidad, ubicacion_esp, nombre
from ESPACIOS
where id_espacio = 9

--Consulta para eliminar un espacio
delete from ESPACIOS
where id_espacio = 1


select * from EDIFICIO

-------------------------ultimo ultimo ultimo 03/10/24---------------------------------------
ALTER TABLE Espacios
ADD responsable INT,
FOREIGN KEY (responsable) REFERENCES usuario(id_usuario);

select * from USUARIO

select * from ESPACIOS


------------------ 12 de Octubre
ALTER TABLE ESPACIOS
ADD estatus bit

UPDATE ESPACIOS
SET estatus = 1
WHERE id_espacio in (3,4,5,7,10,11,13,14,15,16)