--EQUIPO

/*CREATE TABLE EQUIPO (
    id_equipo INT IDENTITY PRIMARY KEY NOT NULL,
    id_espacio INT,
    numero_serie VARCHAR(100),
    fecha_compra DATE,
    fecha_instalacion DATE,
    valor_compra numeric(6,2),
    id_usuario INT,
    id_modelo INT,
    --id_contratoSoporte INT,
	id_garantia INT,
	estado_equipo VARCHAR(20) --EN USO, REPARACION, YA NO SIRVE
);*/

insert into MARCA(nombre)
values('marquita')

insert into MODELO(nombre, id_marca, año_lanzamiento)
values('modelito', 1, 2020)

ALTER TABLE GARANTIA
DROP CONSTRAINT FK_Garantia_Equipo;

ALTER TABLE GARANTIA
DROP COLUMN id_equipo;

insert into GARANTIA(cobertura, fecha_inicio, fecha_final)
values('covertuchis', '04-12-2023', '04-12-2028')

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (4, '1234567', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (4, '0987654', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (5, '3456789', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

INSERT INTO EQUIPO(id_espacio, numero_serie, fecha_compra, fecha_instalacion, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
VALUES (3, '3456789', '12-04-2023', '09-25-2024', 130.00, 1, 1, 1, 'En uso');

select * from USUARIO

select * from MODELO

select * from EQUIPO

select * from ESPACIOS


SELECT id_equipo, numero_serie 
FROM EQUIPO 
WHERE id_espacio = 4
AND id_espacio IN (
    SELECT id_espacio 
    FROM ESPACIOS 
    WHERE id_tipoEspacio = 3 
    AND id_edificio = 1
);

-------------------------------------------------------------
--27 de Septiembre 2024, agregar equipo
DECLARE @InsertedIds TABLE (id_equipo INT);

INSERT INTO EQUIPO (numero_serie, fecha_compra, valor_compra, id_usuario, id_modelo, id_garantia, estado_equipo)
OUTPUT INSERTED.id_equipo INTO @InsertedIds
VALUES (1234, '09-27-2024', 234, 1, 6, null, 'Disponible');

SELECT id_equipo FROM @InsertedIds;

--Para que agarre mas valor monetario
ALTER TABLE EQUIPO
ALTER COLUMN valor_compra numeric(8,2);

select * from EQUIPO

select * from COMPUTADORA

select * from SOFTWARE_COMPUTADORA

select * from SERVIDOR

select * from TIPO_IMPRESORA

select * from IMPRESORA

select * from SWITCH

select * from ROUTER

select * from ESCANER

---------------------------------------------------------------------------
--Agrega el atributo CLAVE a EQUIPO
ALTER TABLE EQUIPO
ADD CLAVE VARCHAR(20) NULL;

--Agrega el atributo NOMBRE a EQUIPO
ALTER TABLE EQUIPO
ADD NOMBRE VARCHAR(20) NULL;

-- Crear el trigger que inserta en EQUIPO cuando se inserta una computadora
CREATE TRIGGER TR_InsertarEnEquipoDeComputadora
ON COMPUTADORA
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_computadora INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_computadora = id_computadora FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'COMP' + CAST(@id_computadora AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_computadora
END;

-- Crear el trigger que inserta en EQUIPO cuando se inserta una impresora
CREATE TRIGGER TR_InsertarEnEquipoDeImpresora
ON IMPRESORA
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_impresora INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_impresora = id_impresora FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'IMPR' + CAST(@id_impresora AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_impresora
END;

-- Crear el trigger que inserta en EQUIPO cuando se inserta una servidor
CREATE TRIGGER TR_InsertarEnEquipoDeServidor
ON SERVIDOR
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_servidor INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_servidor = id_servidor FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'SERV' + CAST(@id_servidor AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_servidor
END;

-- Crear el trigger que inserta en EQUIPO cuando se inserta una switch
CREATE TRIGGER TR_InsertarEnEquipoDeSwitch
ON SWITCH
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_switch INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_switch = id_switch FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'SWIT' + CAST(@id_switch AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_switch
END;

CREATE TRIGGER TR_InsertarEnEquipoDeRouter
ON Router
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_router INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_router = id_router FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'ROUT' + CAST(@id_router AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_router
END;

CREATE TRIGGER TR_InsertarEnEquipoDeEscaner
ON ESCANER
AFTER INSERT
AS
BEGIN
    -- Declaramos una variable para almacenar el id_computadora del registro insertado
    DECLARE @id_escaner INT;
    DECLARE @nombre NVARCHAR(20);

    -- Obtenemos el id_computadora del registro insertado
    SELECT @id_escaner = id_escaner FROM INSERTED;

    -- Concatenamos el id_computadora con una cadena y lo asignamos a id_equipo
    SET @nombre = 'ESCA' + CAST(@id_escaner AS NVARCHAR(10));

    -- Insertamos el registro en la tabla EQUIPO con el id_equipo modificado
    UPDATE EQUIPO SET NOMBRE = @nombre where id_equipo = @id_escaner
END;

---------------- 28 de Septiembre de 2024 ------------------
select id_equipo, nombre from EQUIPO
where id_espacio is null and estado_equipo = 'disponible'

select id_computadora from COMPUTADORA
select * from EQUIPO

SELECT e.id_equipo, e.nombre
FROM EQUIPO e
JOIN COMPUTADORA c ON e.id_equipo = c.id_computadora
WHERE e.id_espacio IS NULL 
AND e.estado_equipo = 'disponible';

SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN IMPRESORA i ON e.id_equipo = i.id_impresora
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'

SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SERVIDOR s ON e.id_equipo = s.id_servidor
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'

SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN SWITCH s ON e.id_equipo = s.id_switch
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'

SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ROUTER r ON e.id_equipo = r.id_router
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'

SELECT e.id_equipo, e.nombre
            FROM EQUIPO e
            JOIN ESCANER es ON e.id_equipo = es.id_escaner
            WHERE e.id_espacio IS NULL 
            AND e.estado_equipo = 'disponible'


UPDATE EQUIPO
            SET id_espacio = @nombre,
                fecha_instalacion = @apellido,
                id_usuario = @departamento_pertenece,
                estado_equipo = 'En uso',
                correo = @correo,
                CLAVE = @telefono
            WHERE id_equipo = @id_usuario

select * from EQUIPO

SELECT id_equipo, clave 
            FROM EQUIPO 
            WHERE id_espacio = 23
            AND id_espacio IN (
                SELECT id_espacio 
                FROM ESPACIOS 
                WHERE id_tipoEspacio = 1
                AND id_edificio = 1)

select * from equipo

-------------------------29/SEP/2024--------------------------------------
SELECT * FROM EQUIPO
SELECT * FROM COMPUTADORA
select * from router
select * from SWITCH
SELECT * FROM servidor
select * from IMPRESORA
select * from ESCANER

select * from usuario

---------------------------07/10/24------------------------------------
--Ejecutar estos updates porque estos equipo no se insertarin en ningun tipo de equipo
update equipo set estado_equipo = 'ya no sirve' where id_equipo between 7 and 10
go
update equipo set id_espacio = null where id_equipo between 7 and 10