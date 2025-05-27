-- Octubre 03 de 2024
use proyectoITIL
go

INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Falla en el sistema operativo');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de rendimiento');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo de hardware');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de software');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de conectividad');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Atasco de papel');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de calidad de impresión');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de conectividad');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de configuración');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo en el dispositivo');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de configuración');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo de puertos');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de calidad de escaneo');


ALTER TABLE INCIDENCIA
DROP COLUMN hora_disponible;

-- Agregar las columnas hora_disponible_inicio y hora_disponible_fin
ALTER TABLE INCIDENCIA
ADD hora_disponible_inicio TIME,
    hora_disponible_fin TIME;

--Octubre 04 de 2024
INSERT INTO PRIORIDAD (nombre, descripcion)
VALUES
('Alta', 'Tiempo de espera máximo de 1 a 2 horas para resolución inmediata.'),
('Media', 'Tiempo de espera máximo de 4 a 6 horas para resolución moderada.'),
('Baja', 'Tiempo de espera máximo de 24 a 48 horas para resolución de baja prioridad.');

INSERT INTO ESTADO_INCIDENCIA (estado_incidencia, color)
VALUES
('En Proceso', '#FF8C00'),  -- Naranja: En Proceso
('Terminado', '#32CD32'),   -- Verde: Terminado
('Liberado', '#043C64'),    -- Azul: Liberado
('Rechazado', '#FF6347'),   -- Rojo: Rechazado
('Enviado', '#C0C0C0');  -- Gris Claro: Enviado

------ Octubre 05 de 2024
DBCC CHECKIDENT ('INCIDENCIA', RESEED, 0);

--

SELECT 
    I.id_incidencia, D.nombre, I.fecha, TI.nombre as nombreIncidencia, I.descripcion, EI.estado_incidencia as estado, EI.color
FROM 
    INCIDENCIA I
JOIN 
    INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
JOIN 
    ESPACIOS E ON IL.id_espacio = E.id_espacio
JOIN 
    DEPARTAMENTO D ON E.id_departamento = D.id_departamento
JOIN 
	TIPO_INCIDENCIA TI ON TI.id_tipoIncidencia =I.id_tipoIncidencia
JOIN
	ESTADO_INCIDENCIA EI ON EI.id_estado = I.id_estado
JOIN
	TECNICO T ON T.id_usuario = I.id_tecnicoAsignado
WHERE I.id_tecnicoAsignado = 9;

--

select t.id_usuario, u.nombre+' '+u.apellido as nombre from TECNICO T
JOIN
	ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
JOIN 
	USUARIO U ON u.id_usuario = t.id_usuario
WHERE e.id_especializacion = 3 and t.id_estadoDisponibilidad = 1;

--


SELECT 
    I.id_incidencia,
    I.hora_envio,
    I.hora_disponible_inicio,
    I.hora_disponible_fin,
    P.nombre AS nombre_prioridad,
    P.descripcion AS descripcion_prioridad,
    E.nombre as nombre_espacio,
    E.ubicacion_esp,
    D.ubicacion_edificio,
	D.nombre as nombre_edificio,
	CONCAT(U.nombre, ' ', U.apellido) AS responsable
FROM 
    INCIDENCIA I
JOIN 
    PRIORIDAD P ON I.id_prioridad = P.id_prioridad
JOIN 
    INCIDENCIA_LUGAR IL ON I.id_incidencia = IL.id_incidencia
JOIN 
    ESPACIOS E ON IL.id_espacio = E.id_espacio
JOIN 
    EDIFICIO D ON E.id_edificio = D.id_edificio
LEFT JOIN
	USUARIO U ON U.id_usuario = E.responsable
WHERE I.id_incidencia = 1;
