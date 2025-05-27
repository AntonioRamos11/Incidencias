-- Inserciones en la tabla TIPO_ESCANER
INSERT INTO TIPO_ESCANER (nombre) VALUES
('Plano'), ('De Alimentación'), ('Portátil'), ('Drum Scanner'), ('3D Scanner'), 
('Bandeja Automática'), ('Handheld'), ('Fax Scanner'), ('Bar Code Scanner'), ('Flatbed'), 
('Sheet-fed'), ('Inline Scanner'), ('Pen Scanner'), ('Photo Scanner'), ('Film Scanner'), 
('Autofocus Scanner'), ('Color Scanner'), ('Grayscale Scanner'), ('OCR Scanner'), ('High-Resolution Scanner');
go
-- Inserciones en la tabla TIPO_COMPUTADORA
INSERT INTO TIPO_COMPUTADORA (nombre) VALUES
('Escritorio'), ('Laptop'), ('Todo en Uno'), ('Gaming'), ('Ultrabook'), 
('Convertible'), ('Netbook'), ('Mini PC'), ('Workstation'), ('Tablet PC'), 
('Chromebook'), ('Rugged Laptop'), ('2-en-1'), ('Hybrid Laptop'), ('Thin Client'), 
('Desktop Tower'), ('Small Form Factor'), ('All-in-One Gaming PC'), ('Business Laptop'), ('Portable Workstation');
go
-- Inserciones en la tabla TIPO_IMPRESORA
INSERT INTO TIPO_IMPRESORA (nombre) VALUES
('Inyección de Tinta'), ('Láser'), ('Multifuncional'), ('Impacto'), ('Sublimación'), 
('Dot Matrix'), ('Térmica'), ('De Transferencia Térmica'), ('Digital'), ('Fotográfica'), 
('Bi-Direccional'), ('Monodireccional'), ('Impresora de Etiquetas'), ('Impresora de Tarjetas'), ('Impresora de Gran Formato'), 
('Impresora de Codificación'), ('Impresora de Matriz de Puntos'), ('Impresora Láser Color'), ('Impresora Láser Monocromática'), ('Impresora de Cintas');
go
-- Inserciones en la tabla SOFTWARE
INSERT INTO SOFTWARE (nombre, version_, proveedor, tipo_licencia, codigo_licencia, clave_activacion) VALUES
('Microsoft Office', '2019', 'Microsoft', 'Corporativa', 'OFFICE-2019-ABCDE', 'ACT-ABCDE-ABCDE-ABCDE'), 
('Adobe Photoshop', '2023', 'Adobe', 'Individual', 'PHOTOSHOP-2023-FGHIJ', 'ACT-FGHIJ-FGHIJ-FGHIJ'),
('AutoCAD', '2022', 'Autodesk', 'Corporativa', 'AUTOCAD-2022-KLMNO', 'ACT-KLMNO-KLMNO-KLMNO'),
('Visual Studio', '2022', 'Microsoft', 'Individual', 'VS-2022-PQRST', 'ACT-PQRST-PQRST-PQRST'),
('Zoom', '5.6.7', 'Zoom Video Communications', 'Individual', 'ZOOM-5.6.7-UVWXY', 'ACT-UVWXY-UVWXY-UVWXY'),
('LibreOffice', '7.5', 'The Document Foundation', 'Open Source', NULL, NULL),
('Slack', '4.22', 'Slack Technologies', 'Corporativa', 'SLACK-4.22-ZABCD', 'ACT-ZABCD-ZABCD-ZABCD'),
('Notepad++', '8.4', 'Don Ho', 'Open Source', NULL, NULL),
('IntelliJ IDEA', '2023.1', 'JetBrains', 'Individual', 'INTELLIJ-2023.1-EFGHI', 'ACT-EFGHI-EFGHI-EFGHI'),
('MATLAB', '2023a', 'MathWorks', 'Corporativa', 'MATLAB-2023A-JKLMN', 'ACT-JKLMN-JKLMN-JKLMN');
go
-- Inserciones en la tabla SISTEMA_OPERATIVO
INSERT INTO SISTEMA_OPERATIVO (nombre, version_, interfaz, licencia) VALUES
('Windows', '10 Pro', 'GUI', 'XXXXX-XXXXX-XXXXX-XXXXX'), 
('macOS', 'Monterey', 'GUI', 'YYYYY-YYYYY-YYYYY-YYYYY'), 
('Linux', 'Ubuntu 20.04', 'CLI', 'Open Source'), 
('Windows', '11 Pro', 'GUI', 'ZZZZZ-ZZZZZ-ZZZZZ-ZZZZZ'), 
('Linux', 'Fedora 34', 'GUI', 'Open Source'),
('Windows', 'Server 2019', 'GUI', 'AAAAA-AAAAA-AAAAA-AAAAA'),
('Linux', 'Debian 11', 'CLI', 'Open Source'),
('Windows', '8.1', 'GUI', 'BBBBB-BBBBB-BBBBB-BBBBB'),
('Linux', 'CentOS 8', 'CLI', 'Open Source'),
('macOS', 'Big Sur', 'GUI', 'CCCCC-CCCCC-CCCCC-CCCCC');
go
-- Inserciones en la tabla PROCESADOR
INSERT INTO PROCESADOR (modelo, fabricante, nucleos, hilos, cache) VALUES
('Intel Core i7-10700K', 'Intel', 8, 16, 16), 
('AMD Ryzen 9 5900X', 'AMD', 12, 24, 64), 
('Intel Core i5-11400', 'Intel', 6, 12, 12), 
('AMD Ryzen 5 5600G', 'AMD', 6, 12, 16), 
('Intel Core i9-11900K', 'Intel', 8, 16, 16),
('AMD Ryzen 7 5800X', 'AMD', 8, 16, 32),
('Intel Xeon E-2288G', 'Intel', 8, 16, 16),
('AMD Threadripper 3970X', 'AMD', 32, 64, 128),
('Intel Core i3-10100', 'Intel', 4, 8, 8),
('AMD Ryzen 3 3300X', 'AMD', 4, 8, 16);
go
-- Inserciones en la tabla TARJETA_GRAFICA
INSERT INTO TARJETA_GRAFICA (fabricante, modelo, arquitectura) VALUES
('NVIDIA', 'GeForce RTX 3080', 'Ampere'), 
('AMD', 'Radeon RX 6800 XT', 'RDNA 2'), 
('NVIDIA', 'GeForce GTX 1660 Super', 'Turing'), 
('AMD', 'Radeon RX 5700', 'RDNA'), 
('NVIDIA', 'GeForce RTX 3060 Ti', 'Ampere'),
('AMD', 'Radeon RX 6900 XT', 'RDNA 2'),
('NVIDIA', 'GeForce RTX 3090', 'Ampere'),
('AMD', 'Radeon RX 6700 XT', 'RDNA 2'),
('NVIDIA', 'GeForce GTX 1650', 'Turing'),
('AMD', 'Radeon RX 580', 'Polaris');
go
-- Inserciones en la tabla TARJETA_RED
INSERT INTO TARJETA_RED (fabricante, modelo) VALUES
('Intel', 'Ethernet I225-V'), 
('TP-Link', 'TG-3468'), 
('ASUS', 'XG-C100C'), 
('Netgear', 'A6210'), 
('Linksys', 'WUSB6300'),
('Realtek', 'RTL8111H'),
('Qualcomm', 'QCA9377'),
('Broadcom', 'BCM57414'),
('Intel', 'Wi-Fi 6 AX200'),
('TP-Link', 'Archer T6E');
go
-- Inserciones en la tabla MARCA
INSERT INTO MARCA (nombre) VALUES
('Sony'), ('Panasonic'), ('HP'), ('Canon'), ('Dell'), 
('Lenovo'), ('Samsung'), ('Acer'), ('Asus'), ('Microsoft');
go


-- Inserciones en la tabla MODELO
INSERT INTO MODELO (nombre, id_marca, año_lanzamiento) VALUES
('Latitude 5500', 5, 2021), -- Dell
('Pavilion 15', 3, 2020), -- HP
('MacBook Pro 16', 10, 2021), -- Apple
('ThinkPad X1 Carbon', 6, 2022), -- Lenovo
('ROG Strix', 9, 2021), -- Asus
('Aspire 7', 8, 2020), -- Acer
('Galaxy Book', 7, 2021), -- Samsung
('PIXMA TS8350', 4, 2019), -- Canon
('EcoTank ET-3760', 4, 2020), -- Epson
('Predator Helios 300', 8, 2022); -- Acer
go
-- Inserciones en la tabla PROVEEDOR
INSERT INTO PROVEEDOR (nombre, contacto_soporte, email_soporte, servicios_ofrecidos) VALUES
('Tech Solutions', '555-0011', 'soporte@techsolutions.com', 'Soporte técnico, mantenimiento de hardware y software'),
('Digital Innovations', '555-0022', 'info@digitalinnovations.com', 'Desarrollo de software, consultoría IT'),
('Office Supplies Co.', '555-0033', 'ventas@officesupplies.com', 'Suministros de oficina, impresoras, escáneres'),
('Global Tech Services', '555-0044', 'contacto@globaltech.com', 'Soporte a redes, administración de sistemas'),
('Computer Repair Shop', '555-0055', 'info@computerrepair.com', 'Reparación de computadoras, recuperación de datos'),
('Elite Hardware', '555-0066', 'soporte@elitehardware.com', 'Venta de hardware, instalación y configuración'),
('Cloud Solutions', '555-0077', 'contacto@cloudsolutions.com', 'Servicios de almacenamiento en la nube, seguridad IT'),
('Printer Supplies Inc.', '555-0088', 'soporte@printersupplies.com', 'Tóner y cartuchos de tinta, mantenimiento de impresoras'),
('Tech Support 24/7', '555-0099', 'help@techsupport247.com', 'Asistencia técnica remota, soporte in situ'),
('Innovative Systems', '555-0100', 'contacto@innovativesystems.com', 'Desarrollo de sistemas personalizados, consultoría en IT');
go

-- Verificar datos en TIPO_ESCANER
SELECT * FROM TIPO_ESCANER;

-- Verificar datos en TIPO_COMPUTADORA
SELECT * FROM TIPO_COMPUTADORA;

-- Verificar datos en TIPO_IMPRESORA
SELECT * FROM TIPO_IMPRESORA;

-- Verificar datos en SOFTWARE
SELECT * FROM SOFTWARE;

-- Verificar datos en SISTEMA_OPERATIVO
SELECT * FROM SISTEMA_OPERATIVO;

-- Verificar datos en PROCESADOR
SELECT * FROM PROCESADOR;

-- Verificar datos en TARJETA_GRAFICA
SELECT * FROM TARJETA_GRAFICA;

-- Verificar datos en TARJETA_RED
SELECT * FROM TARJETA_RED;

-- Verificar datos en MARCA
SELECT * FROM MARCA;

-- Verificar datos en MODELO
SELECT * FROM MODELO;

-- Verificar datos en PROVEEDOR
SELECT * FROM PROVEEDOR;

-- Verificar datos en GARANTIA
SELECT * FROM GARANTIA;
