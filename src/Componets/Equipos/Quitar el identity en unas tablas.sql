--Computadora
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_COMPUTADORA_EQUIPO
GO
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_Computadora_TipoComputadora 
GO
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_Computadora_Procesador
GO
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_Computadora_TarjetaGrafica
GO
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_Computadora_SistemaOperativo
GO
ALTER TABLE COMPUTADORA
DROP CONSTRAINT FK_Computadora_TarjetaRed
GO
ALTER TABLE SOFTWARE_COMPUTADORA
DROP CONSTRAINT FK_SoftwareComputadora_Computadora
GO
drop table computadora
GO
-- Tabla: COMPUTADORA
CREATE TABLE COMPUTADORA (
    id_computadora INT PRIMARY KEY NOT NULL,
    id_tipoComputadora INT NOT NULL,
    procesador INT NOT NULL,
    memoria_RAM VARCHAR(10) NOT NULL,
    almacenamiento VARCHAR(10) NOT NULL,
    tarjeta_grafica INT,
    sistema_operativo INT,
    configuracion_red INT
);
GO
ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_COMPUTADORA_EQUIPO
FOREIGN KEY (id_computadora) REFERENCES EQUIPO(id_equipo);
GO
ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TipoComputadora FOREIGN KEY (id_tipoComputadora) REFERENCES TIPO_COMPUTADORA(id_tipoComputadora);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_Procesador FOREIGN KEY (procesador) REFERENCES PROCESADOR(id_procesador);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TarjetaGrafica FOREIGN KEY (tarjeta_grafica) REFERENCES TARJETA_GRAFICA(id_tarjeta);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_SistemaOperativo FOREIGN KEY (sistema_operativo) REFERENCES SISTEMA_OPERATIVO(id_sistema);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TarjetaRed FOREIGN KEY (configuracion_red) REFERENCES TARJETA_RED(id_tarjeta);

ALTER TABLE SOFTWARE_COMPUTADORA
ADD CONSTRAINT FK_SoftwareComputadora_Computadora FOREIGN KEY (id_computadora) REFERENCES COMPUTADORA(id_computadora);

--------------------------------------------------------------------------------------
--Impresora
ALTER TABLE IMPRESORA
Drop CONSTRAINT FK_IMPRESORA_EQUIPO
GO
ALTER TABLE IMPRESORA
DROP CONSTRAINT FK_Impresora_TipoImpresora
GO
DROP TABLE IMPRESORA
GO
CREATE TABLE IMPRESORA (
    id_impresora INT PRIMARY KEY NOT NULL,
    id_tipoImpresora INT NOT NULL,
    resolucion VARCHAR(100),
    velocidad_impresion VARCHAR(20),
	conectividad VARCHAR(20)
);
GO
ALTER TABLE IMPRESORA
ADD CONSTRAINT FK_IMPRESORA_EQUIPO
FOREIGN KEY (id_impresora) REFERENCES EQUIPO(id_equipo);

ALTER TABLE IMPRESORA
ADD CONSTRAINT FK_Impresora_TipoImpresora FOREIGN KEY (id_tipoImpresora) REFERENCES TIPO_IMPRESORA(id_tipoImpresora);

------------------------------------------------------------------------------------------------
--Escaner
ALTER TABLE ESCANER
DROP CONSTRAINT FK_ESCANER_EQUIPO
GO
ALTER TABLE ESCANER
DROP CONSTRAINT FK_Escaner_TipoEscaner
GO
DROP TABLE ESCANER
GO
-- Crear tabla ESCANER
CREATE TABLE ESCANER (
    id_escaner INT PRIMARY KEY NOT NULL,
    velocidad VARCHAR(20),
    id_tipoEscaner INT NOT NULL
);
GO
ALTER TABLE ESCANER
ADD CONSTRAINT FK_ESCANER_EQUIPO
FOREIGN KEY (id_escaner) REFERENCES EQUIPO(id_equipo);

ALTER TABLE ESCANER
ADD CONSTRAINT FK_Escaner_TipoEscaner FOREIGN KEY (id_tipoEscaner) REFERENCES TIPO_ESCANER(id_tipoEscaner);

------------------------------------------------------------------------------------------
--Servidor
ALTER TABLE SERVIDOR
DROP CONSTRAINT FK_SERVIDOR_EQUIPO
GO
ALTER TABLE SERVIDOR
DROP CONSTRAINT FK_Servidor_Procesador
GO
ALTER TABLE SERVIDOR
DROP CONSTRAINT FK_Servidor_TarjetaGrafica
GO
ALTER TABLE SERVIDOR
DROP CONSTRAINT FK_Servidor_SistemaOperativo
GO
ALTER TABLE SERVIDOR
DROP CONSTRAINT FK_Servidor_TarjetaRed 
GO
DROP TABLE SERVIDOR
GO
-- Crear tabla SERVIDOR
CREATE TABLE SERVIDOR (
    id_servidor INT PRIMARY KEY NOT NULL,
    procesador INT NOT NULL,
    memoria_RAM VARCHAR(10) NOT NULL,
    almacenamiento VARCHAR(10) NOT NULL,
    tarjeta_grafica INT,
    sistema_operativo INT,
    configuracion_red INT
);
GO
ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_SERVIDOR_EQUIPO
FOREIGN KEY (id_servidor) REFERENCES EQUIPO(id_equipo);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_Procesador FOREIGN KEY (procesador) REFERENCES PROCESADOR(id_procesador);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_TarjetaGrafica FOREIGN KEY (tarjeta_grafica) REFERENCES TARJETA_GRAFICA(id_tarjeta);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_SistemaOperativo FOREIGN KEY (sistema_operativo) REFERENCES SISTEMA_OPERATIVO(id_sistema);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_TarjetaRed FOREIGN KEY (configuracion_red) REFERENCES TARJETA_RED(id_tarjeta);

--------------------------------------------------------------------------------------------
-- Tabla: SWITCH
ALTER TABLE SWITCH
DROP CONSTRAINT FK_Switch_Equipo
GO
DROP TABLE SWITCH
GO
-- Crear tabla SWITCH
CREATE TABLE SWITCH (
    id_switch INT PRIMARY KEY,
    numero_puertos INT NOT NULL,
    velocidad_backplane DECIMAL(6,2) NOT NULL,
    tipo_switch VARCHAR(50),
    capacidad_switching DECIMAL(6,2),
    consumo_energia DECIMAL(6,2),
);
GO
ALTER TABLE SWITCH
ADD CONSTRAINT FK_Switch_Equipo 
FOREIGN KEY (id_switch) REFERENCES EQUIPO(id_equipo);

----------------------------------------------------------------------------------------------
-- Tabla: ROUTER
ALTER TABLE ROUTER
DROP CONSTRAINT FK_Router_Equipo
GO
DROP TABLE ROUTER
GO
-- Crear tabla ROUTER
CREATE TABLE ROUTER (
    id_router INT PRIMARY KEY,
    tipo_conexion VARCHAR(50) NOT NULL,
    soporte_vpn BIT NOT NULL,
    numero_interfaces_giga_fast INT,
	numero_seriales INT,
    frecuencia_ruta DECIMAL(6,2),
    protocolos_ruta VARCHAR(100),
    capacidad_ruta DECIMAL(6,2),
    consumo_energia DECIMAL(6,2),
);
GO
ALTER TABLE ROUTER
ADD CONSTRAINT FK_Router_Equipo 
FOREIGN KEY (id_router) REFERENCES EQUIPO(id_equipo);

--Equipo
ALTER TABLE EQUIPO
ADD CONSTRAINT FK_Grantia_Equipo
FOREIGN KEY (id_garantia) REFERENCES GARANTIA(id_garantia);

--ALTER TABLE EQUIPO
--ADD CONSTRAINT UQ_Garantia UNIQUE(id_garantia);