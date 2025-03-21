-- Insertar departamentos
INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Departamento Academicos', NULL, 'contacto@aca.com', '123-4567', 'Edificio L, enfrente de control escolar');

INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Sistemas y Computacion', 1, 'contacto@sistemas.com', '987-6543', 'Edificio A, Piso 1');

-- Insertar usuarios
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena,permisos)
VALUES ('Marisol', 'Manjarrez', 2, NULL, 'marisol.gomez@rrhh.com', '555-2222', '123',2);

INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena,permisos)
VALUES ('Marco', 'Rodriguez', 2, 1, 'marcos.perez@ti.com', '555-1111', '123',1);

create PROCEDURE InsertDepartamento
    @nombre NVARCHAR(100),
    @departamentoPadreNombre NVARCHAR(100),
    @correo NVARCHAR(100),
    @telefono NVARCHAR(20),
    @ubicacion NVARCHAR(255)
AS
BEGIN
    -- Variable para almacenar el ID del departamento padre
    DECLARE @departamentoPadreID INT;

    -- Buscar el ID del departamento padre basado en el nombre
    SELECT @departamentoPadreID = id_departamento
    FROM departamento
    WHERE nombre = @departamentoPadreNombre;

    -- Insertar un nuevo departamento
    INSERT INTO departamento (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
    VALUES (@nombre, @departamentoPadreID, @correo, @telefono, @ubicacion);
END;

create PROCEDURE ActualizarDepartamento
    @id_departamento INT,
    @nombre NVARCHAR(100),
    @correo NVARCHAR(100),
    @telefono NVARCHAR(20),
    @ubicacion_dep NVARCHAR(100),
    @id_departamentoPadre INT -- Parámetro para el nombre del departamento padre
AS
BEGIN
    -- Obtener el ID del departamento padre usando el nombre
    --DECLARE @id_departamentoPadre INT;

    --SELECT @id_departamentoPadre = id_departamento
    ----FROM departamento
    --WHERE nombre = @nombre_departamentoPadre;

    -- Actualizar el departamento con los nuevos valores
    UPDATE departamento
    SET nombre = @nombre,
        id_departamentoPadre = @id_departamentoPadre,
        correo = @correo,
        telefono = @telefono,
        ubicacion_dep = @ubicacion_dep
	WHERE id_departamento = @id_departamento;
END;

