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

##calcular el total final de una cotización

CREATE DEFINER=`root`@`localhost` FUNCTION `fn_CalcularTotalCotizacion`(p_idCotizacion INT) RETURNS double
    DETERMINISTIC
BEGIN
    DECLARE v_total DOUBLE DEFAULT 0;

    
    SELECT IFNULL(SUM(precioVenta), 0)
    INTO v_total
    FROM detallecotizaciones
    WHERE idCotizacion = p_idCotizacion;

    RETURN v_total;
END

####Registrar movimiento de inventario al modificar el stock

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

###Marcar Pedidos Completo/Cerrado

CREATE DEFINER=`root`@`localhost` TRIGGER ActualizarFechaCierrePedido
BEFORE UPDATE ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.estado = 'RECIBIDO' AND OLD.estado <> 'RECIBIDO' THEN
        SET NEW.fechaPedido = CURDATE();
    END IF;
END

##prueba

##pedido de prueba
INSERT INTO pedidos (idPedido, estado, fechaPedido, totalPedidos, idProveedor) 
VALUES (100, 'PENDIENTE', '2026-10-01', 0, 1);

##ejecutar el ttrigger 
UPDATE pedidos 
SET estado = 'RECIBIDO' 
WHERE idPedido = 100;

##verificar

SELECT idPedido, estado, fechaPedido 
FROM pedidos 
WHERE idPedido = 100;