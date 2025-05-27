
/*
Procedimiento almacenado que reciba el id de especilizacion de la incidencia, con ello
se debe de consultar todos los tecnicos con esa especializacion y elejir al tecnico 
siguiente para darle esa incidencia, llevar un orden
*/
ALTER TABLE Tecnico
ADD num_incidencias INT DEFAULT 0;

update TECNICO set num_incidencias = 0 where id_usuario in (5,6,7,8)

select * from TECNICO

CREATE PROCEDURE AsignarIncidencia
    @EspecializacionID INT   -- ID de la especialización de la incidencia
AS
BEGIN
    -- Declarar variables para almacenar el id del técnico seleccionado
    DECLARE @TecnicoAsignadoID INT;

    -- Seleccionar el técnico con menos incidencias dentro de la especialización
    -- Si hay empate, se elige el técnico con el siguiente ID.
    SELECT TOP 1 @TecnicoAsignadoID = id_usuario
    FROM Tecnico
    WHERE id_especializacion = @EspecializacionID and id_estadoDisponibilidad = 1 AND jefe != 1 
    ORDER BY num_incidencias ASC, id_usuario ASC;  -- Ordenar por número de incidencias y por ID para romper empates

	select t.id_usuario, u.nombre+' '+u.apellido as nombre from TECNICO T
            JOIN
                ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
            JOIN
                USUARIO U ON u.id_usuario = t.id_usuario
            WHERE U.id_usuario = @TecnicoAsignadoID;
END;

exec AsignarIncidencia 2