---
title: Bases de datos. Consultas SQL (II)
description: Ejercicios de consultas SQL con agrupamiento y funciones de grupo. GROUP BY, HAVING, COUNT, AVG, SUM, MIN, MAX sobre las tablas de empleados, departamentos, pedidos, productos y clientes.
author: Inazio Claver
date: 2014-12-15 10:24:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Hemos realizado la hoja de ejercicios 5 de la unidad 3, en la que usamos la misma base de datos que en la anterior entrada.

## Ejercicios. Consultas con agrupamiento y funciones de grupo

Tablas utilizadas: EMPLEADOS, DEPARTAMENTOS, PEDIDOS, PRODUCTOS y CLIENTES.

**1.** Obtener para cada departamento el número de directores y su salario medio.

```sql
SELECT DEP_NO, COUNT(OFICIO) AS 'Número directores', AVG(SALARIO) AS 'Salario medio'
FROM EMPLEADOS
WHERE OFICIO LIKE 'DIRECTOR'
GROUP BY DEP_NO;
```

**2.** Obtener el salario medio para cada departamento, ordenado de forma descendente, cuando el salario medio es menor de 3000 euros.

```sql
SELECT DEP_NO AS Departamento, AVG(SALARIO) AS 'Salario medio'
FROM EMPLEADOS
GROUP BY DEP_NO
HAVING AVG(SALARIO) < 3000
ORDER BY AVG(SALARIO) DESC;
```

**3.** Obtener el total de unidades por producto en todos los pedidos realizados, mostrando número de producto, descripción y total de unidades.

```sql
SELECT PED.PRODUCTO_NO, DESCRIPCION, SUM(UNIDADES) AS 'Total unidades'
FROM PEDIDOS PED, PRODUCTOS PROD
WHERE PED.PRODUCTO_NO = PROD.PRODUCTO_NO
GROUP BY PROD.PRODUCTO_NO;
```

**4.** Listar los números de cliente que han realizado más de dos pedidos, ordenados por cantidad.

```sql
SELECT CLIENTE_NO, COUNT(PEDIDO_NO) AS 'N. Pedido'
FROM PEDIDOS
GROUP BY CLIENTE_NO
HAVING COUNT(PEDIDO_NO) > 2
ORDER BY COUNT(PEDIDO_NO);
```

**5.** Obtener las localidades que tienen más de un cliente, mostrando el número de clientes.

```sql
SELECT LOCALIDAD, COUNT(LOCALIDAD) AS 'N. Clientes'
FROM CLIENTES
GROUP BY LOCALIDAD
HAVING COUNT(LOCALIDAD) > 1;
```

**6.** Obtener los 4 productos más vendidos (en unidades), mostrando número de producto y cantidad.

```sql
SELECT PRODUCTO_NO AS Producto, SUM(UNIDADES) AS Cantidad
FROM PEDIDOS
GROUP BY PRODUCTO_NO
ORDER BY Cantidad DESC
LIMIT 4;
```

**7.** Número de empleados de cada tipo de oficio.

```sql
SELECT OFICIO, COUNT(OFICIO) AS Empleados
FROM EMPLEADOS
GROUP BY OFICIO;
```

**8.** Tipos de oficio con más de un empleado.

```sql
SELECT OFICIO, COUNT(OFICIO) AS Empleados
FROM EMPLEADOS
GROUP BY OFICIO
HAVING COUNT(OFICIO) > 1;
```

**9.** Masa salarial total anual (14 pagas de salario + 14 de comisión).

```sql
SELECT SUM((SALARIO * 14) + (IFNULL(COMISION, 0) * 14)) AS 'Masa Salarial'
FROM EMPLEADOS;
```

**10.** Distribución de oficios por departamento.

```sql
SELECT DEP_NO AS Departamento, OFICIO, COUNT(OFICIO) AS Empleados
FROM EMPLEADOS
GROUP BY DEP_NO, OFICIO;
```

**11.** Número de oficios distintos en el departamento 30.

```sql
SELECT DEP_NO AS Departamento, COUNT(DISTINCT OFICIO) AS Oficios
FROM EMPLEADOS
WHERE DEP_NO = 30;
```

**12.** Fecha del primer y último pedido por producto.

```sql
SELECT PRODUCTO_NO AS Producto, MIN(FECHA_PEDIDO) AS 'Primer pedido', MAX(FECHA_PEDIDO) AS 'Ultimo pedido'
FROM PEDIDOS
GROUP BY PRODUCTO_NO;
```

**13.** Importe total del inventario (precio actual por stock disponible).

```sql
SELECT SUM(PRECIO_ACTUAL * STOCK_DISPONIBLE) AS 'Euros invertidos en productos'
FROM PRODUCTOS;
```

**14.** Salario medio de vendedores por departamento cuando supera 1200€.

```sql
SELECT DEP_NO AS 'Departamento', AVG(SALARIO) AS 'Salario medio', COUNT(OFICIO) AS 'Vendedores'
FROM EMPLEADOS
WHERE OFICIO LIKE 'VENDEDOR'
GROUP BY DEP_NO
HAVING AVG(SALARIO) > 1200;
```

**15.** Departamento con mayor salario medio.

```sql
SELECT DEP_NO AS Departamento, AVG(SALARIO) AS 'Salario medio'
FROM EMPLEADOS
GROUP BY DEP_NO
ORDER BY AVG(SALARIO) DESC
LIMIT 1;
```

**16.** Unidades pedidas por cliente y producto.

```sql
SELECT CLIENTE_NO AS Cliente, PRODUCTO_NO AS Producto, COUNT(UNIDADES) AS Unidades
FROM PEDIDOS
GROUP BY CLIENTE_NO, PRODUCTO_NO;
```

**17.** Productos pedidos más de una vez antes del año 2000.

```sql
SELECT PRODUCTO_NO AS Producto
FROM PEDIDOS
WHERE FECHA_PEDIDO < '2000-01-01'
GROUP BY PRODUCTO_NO
HAVING COUNT(PEDIDO_NO) > 1;
```

**18.** Los 2 clientes con más pedidos.

```sql
SELECT CLIENTE_NO AS Cliente, COUNT(PEDIDO_NO) AS Pedidos
FROM PEDIDOS
GROUP BY CLIENTE_NO
ORDER BY COUNT(PEDIDO_NO) DESC
LIMIT 2;
```

**¡Salud y coding!**
