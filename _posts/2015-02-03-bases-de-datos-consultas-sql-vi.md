---
title: Bases de datos. Consultas SQL (VI)
description: Hoja de ejercicios 9 de la unidad 3. Consultas multitabla con las tablas EMPLEADOS, DEPARTAMENTOS, PEDIDOS, PRODUCTOS y CLIENTES.
author: Inazio Claver
date: 2015-02-03 12:00:00 +0800
categories: [Bases de datos]
tags: [sql, bases de datos, consultas, multitabla]
pin: false
math: false
mermaid: false
---

Hoja de ejercicios 9 de la unidad 3

## CONSULTAS MULTITABLA. EJERCICIOS

Tablas utilizadas: EMPLEADOS, DEPARTAMENTOS, PEDIDOS, PRODUCTOS y CLIENTES.

1. Obtener una lista de los pedidos con la descripción del producto y el nombre del cliente clasificados por el número del cliente.

```sql
select pe.*, descripcion, nombre
from pedidos pe, productos pr, clientes cl
where pe.producto_no = pr.producto_no
and pe.CLIENTE_NO = cl.cliente_no;
```

2. Obtener los nombres de los empleados y los nombres de sus departamentos, para aquellos empleados que no son del departamento VENTAS y que entraron en la empresa después del 1 de enero de 82.

Mi solución:

```sql
select APELLIDO, DNOMBRE
from empleados e, departamentos d
where d.DEP_NO = (
     select dep_no
     from departamentos
     where dnombre like 'VENTAS'
)
AND fecha_alta > '1982-01-01';
```

Solución profesor:

```sql
select em.apellido, de.dnombre
from empleados em, departamentos de
where em.dep_no = de.DEP_NO
and de.DNOMBRE != "VENTAS"
and em.FECHA_ALTA > "1982-01-01";
```

3. Obtener una lista de los apellidos de los vendedores con el importe acumulado de sus pedidos.

```sql
SELECT EMPLEADOS.APELLIDO, SUM(UNIDADES*PRECIO_ACTUAL) AS 'TOTAL PEDIDO'
FROM PEDIDOS, PRODUCTOS, CLIENTES, EMPLEADOS
WHERE PEDIDOS.PRODUCTO_NO = PRODUCTOS.PRODUCTO_NO
AND PEDIDOS.CLIENTE_NO = CLIENTES.CLIENTE_NO
AND CLIENTES.VENDEDOR_NO = EMPLEADOS.EMP_NO
GROUP BY APELLIDO;
```

4. Obtener los nombre de los empleados del departamento 30 que son jefes directos de algún empleado de la empresa, indicando de cuantos empleados son jefes.

```sql
select e1.apellido, count(e1.director)
from empleados e1, empleados e2
where e1.emp_no=e2.director
and e1.DEP_NO = 30
group by e1.director;
```

5. Realizar un listado de los empleados cuyo oficio es EMPLEADO, que incluirá los números de empleado, los apellidos y los salarios anuales (salario multiplicado por 14), e incluyendo el nombre del director del empleado.

```sql
select e1.emp_no, e1.apellido, e1.salario*14 AS 'SALARIO ANUAL', e2.apellido AS 'Director'
from empleados e1, empleados e2
where e1.oficio like 'EMPLEADO'
AND E1.DIRECTOR = E2.EMP_NO
```

6. Visualizar los productos con el número total de pedidos, las unidades totales vendidas, y el precio unidad de cada uno de ellos incluyendo los que no tienen pedidos (en este caso se mostrará un 0 en el total unidades vendidas).

```sql
select pr.PRODUCTO_NO, pr.DESCRIPCION,
count(pe.PRODUCTO_NO) AS 'Numero de pedido', ifnull(sum(pe.unidades),0) AS 'Total de pedidos', pr.precio_actual
from productos pr
LEFT JOIN pedidos pe
ON pr.PRODUCTO_NO = pe.PRODUCTO_NO
group by pr.PRODUCTO_NO, pr.DESCRIPCION;
```

---

1. Obtener un listado de clientes, indicando el número de cliente y su nombre, y el número y nombre de sus vendedores.

```sql
select CLIENTE_NO, NOMBRE, VENDEDOR_NO, APELLIDO
from clientes, empleados
where VENDEDOR_NO = EMP_NO;
```

2. Listar todos los pedidos realizados con la descripción del producto y el nombre del cliente en lugar de sus números.

```sql
select PEDIDO_NO AS 'PEDIDO', DESCRIPCION, NOMBRE, Unidades, FECHA_PEDIDO AS 'FECHA'
from pedidos pe, clientes cl, productos pr
where pe.CLIENTE_NO = cl.CLIENTE_NO
and pe.PRODUCTO_NO = pr.PRODUCTO_NO;
```

3. Obtener una lista de los pedidos con la descripción del producto y el nombre del cliente de los clientes de MADRID.

```sql
select PEDIDO_NO AS 'PEDIDO', DESCRIPCION, NOMBRE, Unidades, FECHA_PEDIDO AS 'FECHA'
from pedidos pe, clientes cl, productos pr
where pe.CLIENTE_NO = cl.CLIENTE_NO
and pe.PRODUCTO_NO = pr.PRODUCTO_NO
and cl.localidad like 'MADRID';
```

4. Visualizar el nombre del departamento, la fecha de alta, el apellido, el oficio y el nombre de localidad de aquellos trabajadores que están en un departamento ubicado en una localidad que no contenga ninguna C en su nombre.

```sql
select DNOMBRE, FECHA_ALTA, APELLIDO, OFICIO, LOCALIDAD
from empleados em, departamentos de
where em.DEP_NO = de.DEP_NO
and localidad not like '%C%';
```

5. Obtener una lista de los nombres de los clientes con el importe acumulado de sus pedidos.

```sql
SELECT NOMBRE, SUM(UNIDADES * PRECIO_ACTUAL) "TOTAL_PEDIDOS"
FROM PEDIDOS, PRODUCTOS, CLIENTES
WHERE PEDIDOS.PRODUCTO_NO = PRODUCTOS.PRODUCTO_NO
AND PEDIDOS.CLIENTE_NO = CLIENTES.CLIENTE_NO
GROUP BY NOMBRE;
```

6. Obtener el número de pedidos por producto, visualizando el número de producto, su descripción y el número de pedidos correspondiente.

```sql
select pr.producto_no, DESCRIPCION, count(pe.producto_no)
from productos pr
left join pedidos pe
on pr.producto_no = pe.PRODUCTO_NO
group by pr.producto_no;
```

7. Obtener los clientes que no pertenezcan a las localidades de sus vendedores.

```sql
select NOMBRE as 'Cliente', cl.localidad as 'Localidad Cliente', apellido as 'Vendedor', de.localidad as 'Localidad Vendedor'
from clientes cl, empleados em, departamentos de
where vendedor_no = emp_no
and em.dep_no = de.dep_no
and cl.localidad not like de.localidad
```

8. Obtener los empleados que tienen un jefe que está en el departamento 30, mostrando el nombre del empleado y de su jefe.

```sql
select e1.apellido as 'Empleado', e2.apellido as 'Director'
from empleados e1, empleados e2
where e1.director = e2.EMP_NO
and e2.DEP_NO = 30;
```

9. Visualizar los datos de los departamentos con el nombre del departamento, el salario total (salario + comision) anual (14 pagas) y la comisión anual total de sus trabajadores, incluyendo todos los departamentos. Si la comisión total anual es nula se mostrará un cero.

```sql
select DNOMBRE, LOCALIDAD, sum(salario+ifnull(comision,0)*14) as 'SALARIO TOTAL',
sum(ifnull(comision,0)) as 'COMISION'
from empleados em, departamentos de
where em.DEP_NO = de.DEP_NO
group by em.dep_no;
```

10. Visualizar los nombres de los clientes y la cantidad de pedidos realizados, incluyendo los que no hayan realizado ningún pedido.

```sql
select cl.cliente_no, nombre, count(pe.PEDIDO_NO) AS 'Pedidos'
from clientes cl
left join pedidos pe
on cl.CLIENTE_NO = pe.CLIENTE_NO
group by cl.cliente_no;
```

11. Realizar un listado de todos los productos con su descripción y el importe total (unidades totales por el precio unidad) de cada uno de ellos. Deben mostrarse todos los productos incluidos los que no tienen pedidos y en este caso el importe total se mostrará un 0.

```sql
select descripcion, pr.PRECIO_ACTUAL*ifnull(UNIDADES,0) as 'importe total'
from productos pr
left join pedidos pe
on pr.producto_no = pe.PRODUCTO_NO
group by pr.PRODUCTO_NO;
```

12. Visualizar los apellidos de los empleados y el número de clientes que tienen, visualizando todos los empleados de la empresa tengan o no clientes asignados.

```sql
select APELLIDO, count(cl.vendedor_no) as 'CLIENTES'
from empleados em
left join clientes cl
on cl.VENDEDOR_NO = em.EMP_NO
group by em.EMP_NO
```
