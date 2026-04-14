---
title: Bases de datos. Consultas SQL (VII)
description: Hoja de ejercicios 10 de la unidad 3. Consultas dentro de otras instrucciones, creación de tablas, vistas y actualización de datos.
author: Inazio Claver
date: 2015-02-10 12:00:00 +0800
categories: [Bases de datos]
tags: [sql, bases de datos, consultas, vistas, subconsultas]
pin: false
math: false
mermaid: false
---

Hoja de ejercicios 10 de la unidad 3

## CONSULTAS DENTRO DE OTRAS INSTRUCCIONES. EJERCICIOS

Tablas utilizadas: EMPLEADOS, DEPARTAMENTOS, PEDIDOS, PRODUCTOS y CLIENTES.

1. Añadir 100 euros de comisión a los empleados tengan una comisión menor de 500 euros o nula.

```sql
update empleados
set comision=comision+100
where comision < 500 OR COMISION is null;
```

2. Crear una tabla `clientes_producto_20` con las columnas `cliente_no` y `nombre_cliente`, equivalentes a las de la tabla clientes, y `unidades_20` equivalente a la de la tabla pedidos, que contenga las filas de la tabla pedidos correspondientes al producto con número 20.

```sql
create table clientes_producto_20
select cl.cliente_no AS 'cliente_no', nombre_no AS 'nombre';

create table unidades_20
select *
from pedidos
where producto_no = 20;
```

3. Se quiere borrar al empleado MARTINEZ. Para poder hacerlo sin errores, previamente se habrán modificado aquellos empleados de los que sea jefe MARTINEZ poniéndoles como jefe al jefe supremo REY.

```sql
update empleados
set director = 7839
where DIRECTOR = 7782;

delete from empleados
where EMP_NO = 7782;
```

4. Actualizar la columna `debe` de la tabla clientes incluyendo en ella el importe total de los pedidos realizados por cada cliente.

```sql
update clientes
set debe=debe+ (
     select sum(unidades*precio_actual)
     from pedidos, productos
     where pedidos.PRODUCTO_NO = productos.PRODUCTO_NO AND clientes.CLIENTE_NO=pedidos.CLIENTE_NO
     group by CLIENTE_NO
)
where CLIENTE_NO in(
     SELECT CLIENTE_NO
     from pedidos
)
```

5. Crear la vista EMPLEADOS_GARRIDO que incluirá los datos `empleado_no`, `apellido`, `salario_anual` de los empleados cuyo jefe es GARRIDO.

```sql
drop view if exists empleados_garrido;
create view empleados_garrido as
select emp_no, apellido, salario*14
from empleados
where director = (
     select EMP_NO
     from empleados
     where APELLIDO like 'GARRIDO'
);
```

6. Crear una vista RESUMEN_DEP de los departamentos, incluyendo todos los departamentos hasta los que no tengan ningún empleado, que permita mostrar: Nombre del departamento, Número de empleados, Suma de sus salarios, Suma de sus comisiones.

```sql
drop view if exists resumen_dep;

create view resumen_dep (departamento, empleados, salarios, comisiones) as
select d.dep_no, count(emp_no), sum(ifnull(salario,0)), sum(ifnull(comision,0))
from departamentos d
left join empleados e
on d.DEP_NO = e.DEP_NO
group by e.DEP_NO;
```

---

1. Crear una tabla CLIENTES_2 con las columnas `cliente_no`, `nombre_cliente` y `localidad_cliente` equivalentes a las de la tabla clientes.

```sql
drop table if exists clientes_2;

create table clientes_2
select cliente_no, nombre as 'nombre_no', localidad as 'localidad_no'
from clientes;
```

2. Hacer un listado de las filas de la tabla `clientes_2` de empleados de SEVILLA.

```sql
select *
from clientes_2
where LOCALIDAD_NO like 'SEVILLA';
```

3. Crear una tabla `empleados_sin_comision` con las columnas `emp_no` y `apellido` de la tabla empleados y `dnombre` de la tabla departamentos, con los empleados que no tengan comisión.

```sql
drop table if exists empleados_sin_comision;

create table empleados_sin_comision
select e.EMP_NO, e.APELLIDO, d.DNOMBRE
from empleados e, departamentos d
where e.DEP_NO = d.DEP_NO AND e.COMISION is null;
```

4. Insertar en la tabla anterior todos los empleados que tengan comisión igual a cero.

```sql
insert into empleados_sin_comision
select e.EMP_NO, e.APELLIDO, d.DNOMBRE
from empleados e, departamentos d
where e.DEP_NO = d.DEP_NO AND e.COMISION = 0;
```

5. Rebajar un 10% el precio de todos los productos de los que no se ha vendido nada.

```sql
update productos
set PRECIO_ACTUAL = PRECIO_ACTUAL*0.90
where PRODUCTO_NO not in (
     select PRODUCTO_NO
     from pedidos
     group by PRODUCTO_NO
);
```

6. Añadir 50 euros al salario de los empleados de la empresa que pertenezcan a departamentos de MADRID y BARCELONA.

```sql
update empleados
set salario=salario+50
where DEP_NO in (
     select DEP_NO
     from departamentos
     where LOCALIDAD like 'MADRID' OR LOCALIDAD like 'BARCELONA'
);
```

7. Borrar los clientes de la tabla CLIENTES_2 que tengan pedidos de MESA MODELO UNION.

```sql
delete from clientes_2
where cliente_no in (
     select CLIENTE_NO
     from pedidos
     where PRODUCTO_NO = (
         select producto_no
         from productos
         where descripcion like 'MESA MODELO UNION'
     )
)
```

8. Incrementar en un 10% el salario del empleado que tiene al cliente que ha hecho la compra de mayor número de unidades.

```sql
update empleados
set salario=salario*1.10
where EMP_NO = (
     select VENDEDOR_NO
     from clientes
     where CLIENTE_NO = (
         select cliente_no
         from pedidos
         group by CLIENTE_NO
         order by sum(Unidades) desc
         limit 1
     )
)
```

9. Crear la vista EMPLE_DEP20 que incluirá todos los datos de los empleados del departamento 20.

```sql
drop view if exists emple_dep_20;

create view emple_dep_20 as
select *
from empleados
where DEP_NO = 20;
```

10. Crear la vista VCLIENTES que contendrá el número de cliente, el nombre y la localidad de todos los clientes que han comprado alguna vez.

```sql
drop view if exists vclientes;

create view vclientes (CLIENTE, NOMBRE, LOCALIDAD) as
select CLIENTE_NO, NOMBRE, LOCALIDAD
from clientes
where CLIENTE_NO = any (
     select distinct CLIENTE_NO
     from pedidos
     group by CLIENTE_NO
)
```

11. Crear la vista EMPLEADOS_DIRECTORES que incluirá los datos `empleado_no`, `apellido` y `salario_anual` de los empleados cuyo oficio es DIRECTOR (salario anual = salario x 14). Una vez creada, mostrar los empleados cuyo salario total supere los 50.000 euros.

```sql
drop view if exists empleados_directores;

create view empleados_directores as
select EMP_NO, APELLIDO, salario*14 AS 'SalarioAnual'
from empleados
where oficio like 'DIRECTOR';

select *
from empleados_directores
where salarioAnual > 50000;
```

12. Crear la vista JEFES que incluirá los apellidos de todos los empleados de la empresa y el número de empleados que tienen directamente a su cargo. Deben mostrarse todos los empleados sean o no jefes (0 si no lo son).

```sql
drop view if exists jefes;

create view jefes as
select e1.APELLIDO, ifnull(count(e2.director),0) AS 'EMPLEADOS'
from empleados e1
left join empleados e2
on e2.DIRECTOR = e1.EMP_NO
group by e1.EMP_NO;
```
