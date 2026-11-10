-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: Taller_Betancourt
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asignacionservicios`
--

DROP TABLE IF EXISTS `asignacionservicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignacionservicios` (
  `idAsignacion` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `horaFin` time DEFAULT NULL,
  `observaciones` varchar(50) DEFAULT NULL,
  `idTrabajador` int(11) DEFAULT NULL,
  `idServicio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAsignacion`),
  KEY `idTrabajador` (`idTrabajador`),
  KEY `idServicio` (`idServicio`),
  CONSTRAINT `asignacionservicios_ibfk_1` FOREIGN KEY (`idTrabajador`) REFERENCES `trabajadores` (`idTrabajador`),
  CONSTRAINT `asignacionservicios_ibfk_2` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`idServicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionservicios`
--

LOCK TABLES `asignacionservicios` WRITE;
/*!40000 ALTER TABLE `asignacionservicios` DISABLE KEYS */;
INSERT INTO `asignacionservicios` VALUES (1,'2026-08-01','08:00:00','08:45:00','Sin novedades en el cambio',2,1),(2,'2026-08-01','09:00:00','11:00:00','Pastillas desgastadas al 90%',8,2),(3,'2026-08-02','10:00:00','11:00:00','Se requiere balanceo en 4 ruedas',10,3),(4,'2026-08-02','11:30:00','14:30:00','Inyectores con bastante suciedad',12,4),(5,'2026-08-03','08:00:00','08:30:00','Error P0300 detectado',9,5),(6,'2026-08-03','09:00:00','10:30:00','Recarga de gas exitosa',15,6),(7,'2026-08-04','08:00:00','13:00:00','Se rectificó la volante',1,7),(8,'2026-08-04','14:00:00','17:00:00','Amortiguadores fugando aceite',16,8),(9,'2026-08-05','08:00:00','10:30:00','Bujes desgastados reemplazados',16,9),(10,'2026-08-05','11:00:00','13:00:00','Cambio de puente rectificador',3,10),(11,'2026-08-06','08:00:00','12:00:00','Sincronización de tiempo correcta',1,11),(12,'2026-08-06','13:00:00','18:00:00','Latonería terminada',4,12),(13,'2026-08-07','08:00:00','17:00:00','Aplicación de transparente barniz',5,13),(14,'2026-08-07','08:00:00','08:30:00','Batería anterior no retenía carga',3,14),(15,'2026-08-08','09:00:00','11:00:00','Fuga en manguera superior',1,15),(16,'2026-08-08','11:30:00','12:15:00','Bujías bien calibradas',2,16),(17,'2026-08-09','08:00:00','10:30:00','Prueba de goteo superada',12,17),(18,'2026-08-09','11:00:00','12:30:00','Requiere prensa para montaje',8,18),(19,'2026-08-10','08:00:00','09:00:00','Lavado con vapor y desengrasante',14,19),(20,'2026-08-10','09:00:00','17:00:00','Cambio de sincrónicos de 2da',28,20),(21,'2026-08-11','08:00:00','16:00:00','Culata enviada a rectificadora',26,21),(22,'2026-08-11','14:00:00','16:00:00','Diafragma de servo cambiado',8,22),(23,'2026-08-12','08:00:00','09:00:00','Líquido DOT4 renovado',2,23),(24,'2026-08-12','09:30:00','10:30:00','Instalación limpia con relevo',3,24),(25,'2026-08-12','11:00:00','13:00:00','Cambio de solenoide y bujes',22,25),(26,'2026-08-13','08:00:00','10:00:00','Inyectores en parámetros',12,26),(27,'2026-08-13','10:30:00','11:15:00','Sensor banco 1 cambiado',9,27),(28,'2026-08-13','11:30:00','13:00:00','Módulo de puerta reparado',3,28),(29,'2026-08-13','14:00:00','16:00:00','Presión de riel a 40 PSI',1,29),(30,'2026-08-13','16:00:00','18:00:00','Inspección preventiva aprobada',30,30);
/*!40000 ALTER TABLE `asignacionservicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `tipoCliente` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Particular'),(2,'Empresarial'),(3,'Particular'),(4,'Particular'),(5,'Empresarial'),(6,'VIP'),(7,'Particular'),(8,'Particular'),(9,'Empresarial'),(10,'Particular'),(11,'Particular'),(12,'VIP'),(13,'Particular'),(14,'Empresarial'),(15,'Particular'),(16,'Particular'),(17,'Particular'),(18,'Empresarial'),(19,'Particular'),(20,'VIP'),(21,'Particular'),(22,'Particular'),(23,'Empresarial'),(24,'Particular'),(25,'Particular'),(26,'VIP'),(27,'Particular'),(28,'Particular'),(29,'Empresarial'),(30,'Particular');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cotizaciones`
--

DROP TABLE IF EXISTS `cotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cotizaciones` (
  `idCotizacion` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`idCotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizaciones`
--

LOCK TABLES `cotizaciones` WRITE;
/*!40000 ALTER TABLE `cotizaciones` DISABLE KEYS */;
INSERT INTO `cotizaciones` VALUES (1,'Aprobada','2026-08-01',145000),(2,'Pendiente','2026-08-01',350000),(3,'Rechazada','2026-08-02',80000),(4,'Aprobada','2026-08-02',520000),(5,'Aprobada','2026-08-03',220000),(6,'Pendiente','2026-08-03',115000),(7,'Aprobada','2026-08-04',420000),(8,'Rechazada','2026-08-04',95000),(9,'Aprobada','2026-08-05',180000),(10,'Aprobada','2026-08-05',630000),(11,'Pendiente','2026-08-06',75000),(12,'Aprobada','2026-08-06',290000),(13,'Aprobada','2026-08-07',160000),(14,'Rechazada','2026-08-07',520000),(15,'Aprobada','2026-08-08',310000),(16,'Pendiente','2026-08-08',125000),(17,'Aprobada','2026-08-09',450000),(18,'Aprobada','2026-08-09',200000),(19,'Rechazada','2026-08-10',90000),(20,'Aprobada','2026-08-10',880000),(21,'Pendiente','2026-08-11',135000),(22,'Aprobada','2026-08-11',260000),(23,'Aprobada','2026-08-12',390000),(24,'Rechazada','2026-08-12',170000),(25,'Aprobada','2026-08-12',510000),(26,'Pendiente','2026-08-13',230000),(27,'Aprobada','2026-08-13',340000),(28,'Aprobada','2026-08-13',195000),(29,'Pendiente','2026-08-13',410000),(30,'Aprobada','2026-08-13',600000);
/*!40000 ALTER TABLE `cotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallecotizaciones`
--

DROP TABLE IF EXISTS `detallecotizaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallecotizaciones` (
  `idCotizacion` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `atributo` varchar(45) DEFAULT NULL,
  `precioUnitario` double DEFAULT NULL,
  `precioVenta` double DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  PRIMARY KEY (`idCotizacion`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `detallecotizaciones_ibfk_1` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`),
  CONSTRAINT `detallecotizaciones_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallecotizaciones`
--

LOCK TABLES `detallecotizaciones` WRITE;
/*!40000 ALTER TABLE `detallecotizaciones` DISABLE KEYS */;
INSERT INTO `detallecotizaciones` VALUES (1,1,'Sintético 4 Litros',100000,120000,120000),(1,2,'Filtro Estándar',20000,25000,25000),(2,4,'Cerámicas Delanteras',90000,110000,110000),(2,5,'Ventilados Par',200000,240000,240000),(3,3,'Filtro de Aire',28000,35000,35000),(3,7,'DOT4 500ml',18000,22000,22000),(4,10,'Iridio x4',25000,32000,100000),(4,12,'Kit Completo Clutch',350000,420000,420000),(5,8,'Gas Delantero',150000,185000,185000),(5,9,'Verde 50/50',35000,45000,45000),(6,27,'Multipunto x1',90000,115000,115000),(7,12,'Kit Clutch Sedan',350000,420000,420000),(8,14,'Posición Cigüeñal',75000,95000,95000),(9,1,'Galón 10W40',100000,120000,120000),(9,3,'Filtro Aire',28000,35000,35000),(10,10,'Iridio x3',25000,32000,96000),(10,19,'Alternador 90A',420000,520000,520000),(11,23,'Rodamiento Rueda',60000,75000,75000),(12,18,'Radiador Aluminio',230000,290000,290000),(13,29,'Sensor 4 cables',130000,160000,160000),(14,19,'Alternador 90A',420000,520000,520000),(15,20,'Motor Arranque',280000,310000,310000),(16,28,'Bobina Lápiz',85000,105000,105000),(17,6,'Batería 800A',310000,380000,380000),(18,26,'Bomba Eléctrica',140000,175000,175000),(19,13,'Bomba Agua 1.6',110000,140000,140000),(20,6,'Batería 800A',310000,380000,380000),(20,12,'Kit Clutch Heavy',350000,420000,420000),(21,21,'Terminal Der/Izq',42000,55000,55000),(22,30,'Juego Empaques',170000,210000,210000);
/*!40000 ALTER TABLE `detallecotizaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedidos`
--

DROP TABLE IF EXISTS `detallepedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detallepedidos` (
  `idProducto` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `precioUnitario` double DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  PRIMARY KEY (`idProducto`,`idPedido`),
  KEY `idPedido` (`idPedido`),
  CONSTRAINT `detallepedidos_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `detallepedidos_ibfk_2` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedidos`
--

LOCK TABLES `detallepedidos` WRITE;
/*!40000 ALTER TABLE `detallepedidos` DISABLE KEYS */;
INSERT INTO `detallepedidos` VALUES (1,1,100000,15,1500000),(2,2,20000,50,1000000),(3,2,26000,50,1300000),(4,3,85000,10,850000),(5,4,200000,6,1200000),(6,5,300000,1,300000),(6,6,310000,10,3100000),(7,5,15000,10,150000),(8,7,140000,7,980000),(9,8,35000,50,1750000),(10,9,24000,25,600000),(10,10,25000,84,2100000),(11,11,70000,20,1400000),(12,12,350000,2,700000),(13,12,110000,1,110000),(14,13,75000,36,2700000),(15,14,10000,53,530000),(16,15,23000,50,1150000),(17,16,39000,20,780000),(18,17,240000,10,2400000),(19,17,400000,2,800000),(20,18,280000,5,1400000),(21,18,42000,10,420000),(22,19,35000,12,420000),(23,20,55000,30,1650000),(24,21,50000,45,2250000),(25,22,22000,50,1100000),(26,23,130000,7,910000),(27,24,90000,20,1800000),(28,25,80000,8,640000);
/*!40000 ALTER TABLE `detallepedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientosinventario`
--

DROP TABLE IF EXISTS `movimientosinventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientosinventario` (
  `idMovimiento` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `observacion` varchar(50) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMovimiento`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `movimientosinventario_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientosinventario`
--

LOCK TABLES `movimientosinventario` WRITE;
/*!40000 ALTER TABLE `movimientosinventario` DISABLE KEYS */;
INSERT INTO `movimientosinventario` VALUES (1,'2026-08-01',20,'Ingreso por compra pedido #1',1),(2,'2026-08-01',-2,'Salida para Servicio #1',1),(3,'2026-08-02',50,'Ingreso por compra pedido #2',2),(4,'2026-08-02',-1,'Salida para Servicio #1',2),(5,'2026-08-03',10,'Ingreso stock seguridad',4),(6,'2026-08-03',-1,'Salida para Servicio #2',4),(7,'2026-08-04',5,'Ingreso urgente pedido #4',6),(8,'2026-08-04',-1,'Salida por venta directa',6),(9,'2026-08-05',30,'Ingreso lote refrigerantes',9),(10,'2026-08-05',-2,'Salida para Servicio #15',9),(11,'2026-08-06',40,'Ingreso Bujías de Iridio',10),(12,'2026-08-06',-4,'Salida para Servicio #4',10),(13,'2026-08-07',10,'Ingreso kits distribución',11),(14,'2026-08-07',-1,'Salida para Servicio #11',11),(15,'2026-08-08',5,'Ingreso embragues',12),(16,'2026-08-08',-1,'Salida para Servicio #7',12),(17,'2026-08-09',15,'Ingreso plumillas',16),(18,'2026-08-09',-2,'Venta mostrador',16),(19,'2026-08-10',8,'Ingreso bombas de agua',13),(20,'2026-08-10',-1,'Salida para Servicio #11',13),(21,'2026-08-11',25,'Ingreso pastillas freno',4),(22,'2026-08-11',-2,'Salida taller',4),(23,'2026-08-12',12,'Ingreso rodamientos',23),(24,'2026-08-12',-1,'Salida Servicio #18',23),(25,'2026-08-12',10,'Ingreso bobinas',28),(26,'2026-08-12',-1,'Salida diagnostico',28),(27,'2026-08-13',15,'Ingreso bombas gasolina',26),(28,'2026-08-13',-1,'Salida Servicio #29',26),(29,'2026-08-13',20,'Ajuste de inventario físico',3),(30,'2026-08-13',-1,'Muestra defectuosa',5);
/*!40000 ALTER TABLE `movimientosinventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `estado` varchar(40) DEFAULT NULL,
  `fechaPedido` date DEFAULT NULL,
  `totalPedidos` double DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `idProveedor` (`idProveedor`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'Entregado','2026-07-01',1500000,1),(2,'Entregado','2026-07-03',2300000,2),(3,'En Tránsito','2026-07-05',850000,3),(4,'Entregado','2026-07-08',1200000,4),(5,'Cancelado','2026-07-10',450000,5),(6,'Entregado','2026-07-12',3100000,6),(7,'Entregado','2026-07-15',980000,7),(8,'En Tránsito','2026-07-18',1750000,8),(9,'Entregado','2026-07-20',620000,9),(10,'Entregado','2026-07-22',2100000,10),(11,'Pendiente','2026-07-25',1400000,11),(12,'Entregado','2026-07-28',890000,12),(13,'Entregado','2026-07-30',2700000,13),(14,'En Tránsito','2026-08-01',530000,14),(15,'Entregado','2026-08-02',1150000,15),(16,'Entregado','2026-08-03',780000,16),(17,'Pendiente','2026-08-04',3400000,17),(18,'Entregado','2026-08-05',1900000,18),(19,'Entregado','2026-08-06',420000,19),(20,'En Tránsito','2026-08-07',1650000,20),(21,'Entregado','2026-08-08',2250000,21),(22,'Entregado','2026-08-09',1350000,22),(23,'Pendiente','2026-08-10',910000,23),(24,'Entregado','2026-08-10',1800000,24),(25,'Entregado','2026-08-11',670000,25),(26,'En Tránsito','2026-08-11',2900000,26),(27,'Entregado','2026-08-12',1100000,27),(28,'Entregado','2026-08-12',840000,28),(29,'Pendiente','2026-08-13',1550000,29),(30,'Entregado','2026-08-13',4100000,30);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Aceite Sintético 10W40','Galón de aceite para motor a gasolina',50,120000),(2,'Filtro de Aceite','Filtro estándar para sedan',100,25000),(3,'Filtro de Aire','Filtro de alto flujo',80,35000),(4,'Pastillas de Freno Delanteras','Juego de pastillas cerámicas',40,110000),(5,'Discos de Freno','Par de discos ventilados',20,240000),(6,'Batería 12V 800A','Batería libre de mantenimiento',15,380000),(7,'Líquido de Frenos DOT4','Frasco de 500ml',60,22000),(8,'Amortiguador Delantero','Amortiguador de gas',25,185000),(9,'Lquido Refrigerante','Galón refrigerante verde 50/50',45,45000),(10,'Bujía de Iridio','Unidad de bujía de alto rendimiento',120,32000),(11,'Correa de Repartición','Correa dentada de distribución',30,85000),(12,'Kit de Embrague','Prensa, disco y balinera',10,420000),(13,'Bomba de Agua','Bomba de agua para motor 1.6L',18,140000),(14,'Sensor CKP','Sensor de posición de cigüeñal',12,95000),(15,'Bombillo Halógeno H4','Unidad de bombillo 12V 60/55W',90,15000),(16,'Pluma Limpiaparabrisas','Par de plumillas 20 pulgadas',50,30000),(17,'Termostato','Termostato de temperatura motor',25,48000),(18,'Radiador','Radiador de aluminio',8,290000),(19,'Alternador 12V','Alternador de 90 Amperios',6,520000),(20,'Motor de Arranque','Motor de arranque directo',7,360000),(21,'Terminal de Dirección','Terminal exterior derecho/izq',35,55000),(22,'Axial de Dirección','Axial de cremallera',40,48000),(23,'Rodamiento de Rueda','Kit de rodamiento sellado',30,75000),(24,'Empaque de Culata','Empaque multilámina',22,68000),(25,'Líquido de Dirección','Aceite hidráulico ATF 1L',50,28000),(26,'Bomba de Gasolina','Módulo de bomba eléctrica',14,175000),(27,'Inyector de Gasolina','Inyector multipunto',24,115000),(28,'Bobina de Encendido','Bobina individual tipo lápiz',20,105000),(29,'Sensor de Oxígeno','Sensor de 4 cables',15,160000),(30,'Kit de Empaquetadura','Juego completo empaques motor',10,210000);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedores` (
  `idProveedor` int(11) NOT NULL,
  `nombreEmpresa` varchar(50) DEFAULT NULL,
  `calificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Autopartes El Paisa',5),(2,'Repuestos Betancourt S.A.',4),(3,'Distribuidora Automotriz Central',5),(4,'Lubricantes y Filtros Co',4),(5,'Frenos y Suspensión Express',3),(6,'Baterías Mac Colombia',5),(7,'Llantas del Caribe',4),(8,'Importadora Nippon',5),(9,'Eléctricos AutoVolteo',3),(10,'Herramientas TallerPro',5),(11,'Partes y Motores S.A.S',4),(12,'Inyección del Norte',4),(13,'Sensorica Automotriz',5),(14,'Correas y Bandas Ltda',3),(15,'Sistemas de Escape Cali',4),(16,'Empaquetaduras y Retenes',5),(17,'Aceites y Grasas Shell',5),(18,'Pinturas Automotrices PPG',4),(19,'Latonería Repuestos S.A.',3),(20,'Rines y Accesorios BGA',4),(21,'Amortiguadores Monroe',5),(22,'Filtros Mann Colombia',5),(23,'Autopartes La 33',4),(24,'Kits de Sincronización',3),(25,'Comercializadora de Luces LED',4),(26,'TurboPartes Colombia',5),(27,'Radiadores e Intercoolers',4),(28,'Servofrenos Bogota',3),(29,'Mangueras y Conexiones',4),(30,'Scanner y Equipos Auto',5);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `idRol` int(11) NOT NULL,
  `nombreRol` varchar(45) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRol`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador del Sistema',1),(2,'Técnico / Mecánico',2),(3,'Cliente Registrado',3),(4,'Cliente Corporativo',4),(5,'Atención al Cliente',5),(6,'Proveedor',6),(7,'Cliente Registrado',7),(8,'Técnico Especialista',8),(9,'Cliente Registrado',9),(10,'Cliente Corporativo',10),(11,'Proveedor',11),(12,'Técnico / Diagnóstico',12),(13,'Cliente VIP',13),(14,'Jefe de Administración',14),(15,'Proveedor',15),(16,'Cliente Registrado',16),(17,'Cliente Registrado',17),(18,'Auxiliar de Taller',18),(19,'Proveedor',19),(20,'Cliente Corporativo',20),(21,'Cliente Registrado',21),(22,'Técnico / Latonero',22),(23,'Proveedor',23),(24,'Cliente Registrado',24),(25,'Cliente VIP',25),(26,'Técnico / Pintor',26),(27,'Proveedor',27),(28,'Cliente Registrado',28),(29,'Cliente Registrado',29),(30,'Técnico / Frenos',30);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `idServicio` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `duracion` varchar(30) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idCotizacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idServicio`),
  KEY `idCliente` (`idCliente`),
  KEY `idCotizacion` (`idCotizacion`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`idCotizacion`) REFERENCES `cotizaciones` (`idCotizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'Cambio de Aceite y Filtro','Mantenimiento básico de motor','45 min',1,1),(2,'Revisión Sistema de Frenos','Cambio de pastillas y rectificación','2 horas',2,2),(3,'Alineación y Balanceo','Ajuste de geometría y contrapesos','1 hora',3,3),(4,'Sincronización de Motor','Limpieza de inyectores y bujías','3 horas',4,4),(5,'Diagnóstico Escáner OBD2','Lectura de códigos de error','30 min',5,5),(6,'Mantenimiento Aire Acond.','Carga de gas y filtro de polen','1.5 horas',6,6),(7,'Cambio Kit de Embrague','Reemplazo completo de clutch','5 horas',7,7),(8,'Cambio de Amortiguadores','Instalación delanteros/traseros','3 horas',8,8),(9,'Mantenimiento de Suspensión','Cambio de bujes y terminales','2.5 horas',9,9),(10,'Reparación de Alternador','Cambio de carbones y rodamientos','2 horas',10,10),(11,'Cambio Correa Distribución','Kit completo con bomba de agua','4 horas',11,11),(12,'Latonería Puerta Derecha','Desabollado y preparación','1 día',12,12),(13,'Pintura General de Pieza','Pintado en cabina y pulido','2 días',13,13),(14,'Cambio Batería e Inspección','Diagnóstico del sistema eléctrico','30 min',14,14),(15,'Mantenimiento de Radiador','Sondeo y cambio de refrigerante','2 horas',15,15),(16,'Cambio de Bujías','Instalación bujías de iridio','45 min',16,16),(17,'Reparación de Inyección','Limpieza por ultrasonido','2.5 horas',17,17),(18,'Cambio de Rodamiento Rueda','Prensa e instalación rodamiento','1.5 horas',18,18),(19,'Lavado Técnico de Motor','Desengrasado y protección','1 hora',19,19),(20,'Reparación de Caja Mecánica','Revisión y cambio de piñones','2 días',20,20),(21,'Cambio de Empaque Culata','Rectificación y empaquetadura','1.5 días',21,21),(22,'Mantenimiento de Servofreno','Revisión de vacío y bomba','2 horas',22,22),(23,'Cambio de Líquido de Frenos','Purga completa del sistema','1 hora',23,23),(24,'Instalación Luces LED','Cableado y montaje de bombillos','1 hora',24,24),(25,'Reparación Motor Arranque','Cambio de automático y bendix','2 horas',25,25),(26,'Mantenimiento de Inyectores','Prueba en banco y empaques','2 horas',26,26),(27,'Cambio de Sensor de Oxígeno','Diagnóstico y sustitución','45 min',27,27),(28,'Ajuste de Cierre Centralizado','Revisión de solenoides','1.5 horas',28,28),(29,'Cambio Bomba de Gasolina','Reemplazo del módulo tanque','2 horas',29,29),(30,'Mantenimiento Preventivo 50k','Inspección multipunto completa','4 horas',30,30);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajadores`
--

DROP TABLE IF EXISTS `trabajadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabajadores` (
  `idTrabajador` int(11) NOT NULL,
  `cargo` varchar(45) DEFAULT NULL,
  `salario` double DEFAULT NULL,
  PRIMARY KEY (`idTrabajador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajadores`
--

LOCK TABLES `trabajadores` WRITE;
/*!40000 ALTER TABLE `trabajadores` DISABLE KEYS */;
INSERT INTO `trabajadores` VALUES (1,'Mecánico Principal',2500000),(2,'Auxiliar Mecánico',1300000),(3,'Electricista Automotriz',2200000),(4,'Latonero',1800000),(5,'Pintor Automotriz',1900000),(6,'Recepcionista',1400000),(7,'Administrador',3000000),(8,'Mecánico de Frenos',2000000),(9,'Técnico de Diagnóstico',2400000),(10,'Alineador y Balanceador',1600000),(11,'Auxiliar de Taller',1300000),(12,'Especialista en Inyección',2300000),(13,'Jefe de Taller',3200000),(14,'Lavador de Autos',1300000),(15,'Técnico de Aire Acondicionado',2100000),(16,'Mecánico de Suspensión',1900000),(17,'Auxiliar Mecánico',1300000),(18,'Bodeguero',1400000),(19,'Asesor de Servicio',1700000),(20,'Latonero Senior',2200000),(21,'Pintor Senior',2200000),(22,'Electromecánico',2300000),(23,'Auxiliar de Lavado',1300000),(24,'Contador',2800000),(25,'Asistente Administrativo',1500000),(26,'Mecánico Diesel',2600000),(27,'Técnico Hidráulico',2200000),(28,'Mecánico de Transmisiones',2400000),(29,'Auxiliar de Bodega',1300000),(30,'Supervisor de Calidad',2700000);
/*!40000 ALTER TABLE `trabajadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `idTrabajador` int(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idTrabajador` (`idTrabajador`),
  KEY `idCliente` (`idCliente`),
  KEY `idProveedor` (`idProveedor`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idTrabajador`) REFERENCES `trabajadores` (`idTrabajador`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Carlos','Betancourt','3001234567','carlos@taller.com','Calle 10 #12-05',13,NULL,NULL),(2,'Juan','Pérez','3109876543','juan.perez@gmail.com','Carrera 15 #45-12',1,NULL,NULL),(3,'María','Gómez','3204567890','maria.gomez@hotmail.com','Calle 80 #11-23',NULL,1,NULL),(4,'Pedro','Rodríguez','3151112233','pedro.rod@yahoo.com','Diagonal 45 #3-12',NULL,2,NULL),(5,'Luisa','Fernández','3184445566','luisa.f@outlook.com','Transversal 12 #8-90',6,NULL,NULL),(6,'Andrés','López','3017778899','contacto@elpaisa.com','Av. Central #50-10',NULL,NULL,1),(7,'Sofia','Martínez','3122223344','sofia.m@gmail.com','Calle 5 #14-20',NULL,3,NULL),(8,'Diego','Hernández','3143334455','diego.h@gmail.com','Carrera 7 #100-15',3,NULL,NULL),(9,'Laura','Díaz','3165556677','laura.d@gmail.com','Calle 100 #15-30',NULL,4,NULL),(10,'Jorge','Torres','3197778899','jorge.t@hotmail.com','Carrera 68 #25-40',NULL,5,NULL),(11,'Ana','Ramírez','3028889900','ventas@repuestosb.com','Calle 13 #32-15',NULL,NULL,2),(12,'Gabriel','Vargas','3119990011','gabriel.v@gmail.com','Carrera 30 #45-10',9,NULL,NULL),(13,'Lucía','Castro','3131112244','lucia.c@gmail.com','Calle 170 #20-12',NULL,6,NULL),(14,'Fernando','Morales','3173334466','fernando.m@gmail.com','Carrera 10 #5-15',7,NULL,NULL),(15,'Valentina','Rojas','3045556688','contacto@distautocentral.com','Calle 80 #68-10',NULL,NULL,3),(16,'Mateo','Ortiz','3057778800','mateo.o@gmail.com','Calle 53 #13-25',NULL,7,NULL),(17,'Camila','Silva','3128889911','camila.s@gmail.com','Carrera 13 #60-40',NULL,8,NULL),(18,'Alejandro','Mendoza','3149990022','alejo.m@gmail.com','Calle 45 #7-18',2,NULL,NULL),(19,'Mariana','Guerrero','3161112255','ventas@lubricantesco.com','Carrera 50 #12-08',NULL,NULL,4),(20,'Daniel','Cortés','3183334477','daniel.c@gmail.com','Calle 127 #19-45',NULL,9,NULL),(21,'Paula','Muñoz','3004445588','paula.m@gmail.com','Carrera 9 #115-00',NULL,10,NULL),(22,'Esteban','Blanco','3106667799','esteban.b@gmail.com','Calle 63 #24-10',4,NULL,NULL),(23,'Natalia','Contreras','3208889922','contacto@frenosexpress.com','Calle 26 #35-12',NULL,NULL,5),(24,'David','Suárez','3151112266','david.s@gmail.com','Carrera 100 #22-10',NULL,11,NULL),(25,'Gabriela','Romero','3173334488','gabriela.r@gmail.com','Calle 72 #10-34',NULL,12,NULL),(26,'Sebastián','Navarro','3195556600','sebastian.n@gmail.com','Carrera 15 #78-12',5,NULL,NULL),(27,'Daniela','Sánchez','3018889933','contacto@mac.com','Av. El Dorado #68-90',NULL,NULL,6),(28,'Samuel','Gil','3139990044','samuel.g@gmail.com','Calle 34 #16-20',NULL,13,NULL),(29,'Andrea','Soto','3162223355','andrea.s@gmail.com','Carrera 7 #40-12',NULL,14,NULL),(30,'Felipe','Ríos','3184445599','felipe.r@gmail.com','Calle 80 #45-10',8,NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-13 14:29:22
