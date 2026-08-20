##CONSULTAS
## Duvan

#stock de los  productos ( si esta bajo, critico, ok o sin stock

SELECT idProducto, nombre, stock, precio,
CASE
  WHEN stock = 0 THEN 'SIN STOCK'
  WHEN stock <= 10 THEN 'CRITICO'
  WHEN stock <= 20 THEN 'BAJO'
  ELSE 'OK'
END AS estado_stock
FROM productos
WHERE stock <= 20
ORDER BY stock ASC;

#historial de movimientos de inventario con detalles

SELECT m.idMovimiento, m.fecha, p.nombre AS producto, m.cantidad, m.observacion
FROM movimientosinventario m
JOIN productos p ON p.idProducto = m.idProducto
ORDER BY m.fecha DESC, m.idMovimiento DESC
LIMIT 10;

#pedidos pendientes o en transito, por provedor 

SELECT pr.nombreEmpresa AS proveedor, pe.idPedido, pe.estado, pe.fechaPedido, pe.totalPedidos
FROM pedidos pe
JOIN proveedores pr ON pr.idProveedor = pe.idProveedor
WHERE pe.estado IN ('Pendiente','En Tránsito')
ORDER BY pe.fechaPedido ASC;

#top de productos comprados 

SELECT p.idProducto, p.nombre, SUM(dp.cantidad) AS unidades_pedidas, SUM(dp.subtotal) AS total_comprado
FROM detallepedidos dp
JOIN productos p ON p.idProducto = dp.idProducto
GROUP BY p.idProducto, p.nombre
ORDER BY unidades_pedidas DESC
LIMIT 10;

#historial de contizacion con el contacto 

SELECT u.nombre || ' ' || u.apellido AS cliente, u.telefono, u.correo, c.tipoCliente,
       MAX(cot.fecha) AS ultima_cotizacion
FROM usuarios u
JOIN clientes c ON c.idCliente = u.idCliente
JOIN servicios s ON s.idCliente = c.idCliente
JOIN cotizaciones cot ON cot.idCotizacion = s.idCotizacion
GROUP BY u.idUsuario
ORDER BY ultima_cotizacion DESC;

##David
##NO LAS HIZO


##SUBCONSULTAS

##Mabel

## 1. Mostrar la cantidad de clientes atendidos y el total de servicios realizados por cada trabajador.
SELECT 
    t.idTrabajador,
    t.cargo AS trabajador,
    COUNT(DISTINCT s.idCliente) AS clientes_atendidos,
    COUNT(s.idServicio) AS total_servicios,
    CASE
        WHEN COUNT(s.idServicio) > 10 THEN 'EXCELENTE'
        ELSE CONCAT('Le faltan ', 11 - COUNT(s.idServicio), 'servicios')
    END AS resultado
FROM trabajadores t
INNER JOIN asignacionservicios a
    ON t.idTrabajador = a.idTrabajador
INNER JOIN servicios s
    ON a.idServicio = s.idServicio
GROUP BY 
    t.idTrabajador,
    t.cargo;
    
## 2. Mostrar todos los clientes (hayan hecho o no cotizaciones) junto con el total promedio de sus cotizaciones.
SELECT 
    u.nombre, 
    u.apellido, 
    c.tipoCliente,
    cot_prom.promedio_cotizado
FROM clientes c
JOIN usuarios u ON c.idCliente = u.idCliente
LEFT JOIN (
    SELECT 
        s.idCliente, 
        AVG(co.total) AS promedio_cotizado
    FROM servicios s
    JOIN cotizaciones co ON s.idCotizacion = co.idCotizacion
    GROUP BY s.idCliente
) cot_prom ON c.idCliente = cot_prom.idCliente;


## 3. Mostrar todos los productos y la cantidad total solicitada en pedidos, permitiendo identificar cuáles productos no tienen pedidos registro.
SELECT 
    p.idProducto,
    p.nombre AS producto,
    p.stock,
    COALESCE(SUM(dp.cantidad), 0) AS total_unidades_pedidas
FROM productos p
LEFT JOIN detallepedidos dp 
    ON p.idProducto = dp.idProducto
LEFT JOIN pedidos pe 
    ON dp.idPedido = pe.idPedido 
   AND pe.estado = 'Completado'
GROUP BY 
    p.idProducto, 
    p.nombre, 
    p.stock;

## 4. Movimientos de inventario de productos suministrados por un proveedor específico
SELECT DISTINCT
    m.idMovimiento, 
    m.fecha, 
    m.cantidad, 
    m.observacion 
FROM movimientosinventario m
JOIN detallepedidos dp ON m.idProducto = dp.idProducto
JOIN pedidos p ON dp.idPedido = p.idPedido
WHERE p.idProveedor = 5;


## 5. Clientes que han cotizado por encima del valor total promedio
SELECT c.idCliente, u.nombre, u.apellido
FROM clientes c
JOIN usuarios u ON c.idCliente = u.idCliente
WHERE c.idCliente IN (
    SELECT idCliente 
    FROM servicios 
    WHERE idCotizacion IN (
        SELECT idCotizacion 
        FROM cotizaciones 
        WHERE total > (
            SELECT AVG(total) 
            FROM cotizaciones
        )
    )
);

#Sebastian
##Listar los proveedores cuyo monto total acumulado en la tabla de pedidos supere el promedio general
##de dinero que el taller le ha pagado a todos los proveedores

select p.idproovedor, p.nombreempresa from 
proveedores p inner join pedidos pe
on p.idProveedor = pe.idProveedor
group by p.idProveedor
having SUM(pe.totalPedidos) > (select avg(totalpp)
from (select sum(totalpedidos) as totalpp from pedidos pe
group by idProveedor 
) as subprom
);

##Listar los datos de los clientes que hayan solicitado repuestos dentro de una cotización 
##para un servicio cuyo costo unitario en el detalle sea superior
##al precio de venta promedio de todos los productos cotizados en el taller,

select c.idcliente, u.nombre, u.telefono from
clientes c inner join usuarios u
on u.idCliente = c.idCliente
inner join servicios s
on c.idCliente = s.idCliente
inner join cotizaciones co
on s.idCotizacion = co.idCotizacion
inner join detallecotizaciones dc
on co.idCotizacion = dc.idCotizacion
group by c.idCliente
having sum(dc.precioVenta ) > (select avg(precioUnitario) AS PromedioTaller from detallecotizaciones);

##Consultar el rol y los datos del personal (nombre, cargo) que hayan atendido
##la ejecución de asignaciones de servicios asociadas a cotizaciones cuyo total
##supere el monto promedio general de las cotizaciones registradas.

select distinct u.nombre, t.cargo from
usuarios u inner join trabajadores t
on u.idTrabajador = t.idTrabajador
inner join asignacionservicios asig
on t.idTrabajador = asig.idTrabajador
inner join servicios s
on asig.idServicio = s.idServicio
inner join cotizaciones co
on s.idCotizacion = co.idCotizacion
where co.total > (select avg(total) from cotizaciones);

##Listar la información de los productos (idProducto, nombre, stock)
##que hayan sido solicitados en pedidos a proveedores cuya calificación sea mayor
##al promedio de calificación de todos los proveedores registrados en el taller.

select distinct p.idproducto, p.nombre, p.stock, pe.idpedido from
productos p inner join detallepedidos dp 
on p.idProducto = dp.idProducto
inner join pedidos pe
on dp.idPedido = pe.idPedido
inner join proveedores pro
on pe.idProveedor = pro.idProveedor
where pro.calificacion > (select avg(calificacion) from proveedores);


##Consultar el ID de los servicios y su descripción (idServicio, nombre)
##que pertenecen a cotizaciones cuyo monto total sea superior
##a la cotización de menor valor registrada en el sistema.

select s.idservicio, s.nombre, s.descripcion from
servicios s inner join cotizaciones co
on s.idCotizacion = co.idCotizacion
where co.total > (select min(total) from cotizaciones);


