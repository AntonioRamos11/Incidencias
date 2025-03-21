use proyectoITIL
go
DROP FUNCTION IF EXISTS dbo.VerificarUsuario;

CREATE FUNCTION dbo.VerificarUsuario
(
    @usuario NVARCHAR(50),
    @contra NVARCHAR(50)
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM Usuario 
                WHERE nombre + ' ' + apellido = @usuario 
                AND Contrasena = @contra and status = 1
            ) THEN 1 
            ELSE 0 
        END AS EsValido,
        u.id_usuario,
        u.id_departamento_pertenece
    FROM Usuario u
    WHERE u.nombre + ' ' + u.apellido = @usuario 
    AND u.Contrasena = @contra
);
go

select * from USUARIO

select * from dbo.VerificarUsuario ('Marisol Manjarrez', '123')
go

CREATE FUNCTION VerificarPermisos
(
    @usuario NVARCHAR(100)
)
RETURNS INT
AS
BEGIN
    DECLARE @permisos INT;

    -- Inicializamos la variable de retorno
    SET @permisos = NULL;

    -- Verificamos si el usuario existe y obtenemos el valor de permisos
    SELECT @permisos = permisos
    FROM USUARIO
    WHERE nombre+' '+apellido = @usuario

    RETURN @permisos;
END;

select dbo.VerificarPermisos ('Marisol Manjarrez')

select nombre from departamento where id_departamento = 1