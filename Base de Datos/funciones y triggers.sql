##Verificar disponibilidad de stock para un producto

CREATE DEFINER=`root`@`localhost` FUNCTION `DisponibilidadStock`(idprod int) RETURNS int(11)
    DETERMINISTIC
BEGIN
declare valorT double;
select (stock * precio) into valorT from
productos 
where idproducto = idprod;
RETURN valorT;
END

##Calcular la duración estimada total de un servicio en minutos

CREATE DEFINER=`root`@`localhost` FUNCTION `duracionServicio`(idAsig int) RETURNS int(11)
    DETERMINISTIC
BEGIN
declare minutosT int;
select timestampdiff(minute, horaInicio, horaFin) into minutosT
from asignacionservicios
where idasignacion = idAsig;
RETURN minutosT;
END

##Actualizar el stock de productos tras un nuevo pedido

CREATE DEFINER=`root`@`localhost` TRIGGER `ActualizarStock` AFTER INSERT ON `detallepedidos` FOR EACH ROW
BEGIN
update productos
set stock = stock - new.cantidad
where idproducto = new.idproducto;
END

##prueba

INSERT INTO detallepedidos (idPedido, idProducto, precioUnitario, cantidad, subtotal) 
VALUES (7, 26, 25000, 10, 120000);

##Registrar movimiento de inventario al modificar el stock

CREATE DEFINER=`root`@`localhost` TRIGGER `movimientoStock` AFTER UPDATE ON `productos` FOR EACH ROW
BEGIN
if old.stock <> new.stock then
insert into movimientosinventario (
fecha, cantidad, observacion, idproducto)
values (curdate(), (new.stock - old.stock), new.idproducto);
end if;
END


##prueba 

UPDATE productos 
SET stock = stock + 5 
WHERE idproducto = 26;