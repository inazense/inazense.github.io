---
title: Bases de datos. Consultas SQL (V)
description: Ejercicios de subconsultas SQL sobre las tablas de empleados, departamentos, pedidos, productos y clientes.
author: Inazio Claver
date: 2015-01-26 09:40:00 +0800
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

Hoja de ejercicios 8 de la unidad 3.

**Tablas utilizadas:** `EMPLEADOS`, `DEPARTAMENTOS`, `PEDIDOS`, `PRODUCTOS` y `CLIENTES`.

## SUBCONSULTAS. EJERCICIOS (I)

**1.** Listar los nombres y códigos de los departamentos en los que haya empleados.

Mi solución:

```sql
select d1.dep_no, dnombre
from departamentos d1
where d1.DEP_NO = ANY (select d2.DEP_NO from empleados d2);
```

Solución del profesor:

```sql
select dep_no, dnombre
from departamentos
where dep_no in (
     select distinct DEP_NO
     from empleados
);
```

**2.** Obtener los datos del pedido más reciente.

Mi solución:

```sql
select *
from productos
where PRODUCTO_NO = (select producto_no from pedidos order by FECHA_PEDIDO limit 1);
```

Solución del profesor:

```sql
select *
from productos
where PRODUCTO_NO = (select max(fecha_pedido) from pedidos);
```

**3.** Para el departamento de VENTAS, visualizar para cada oficio la suma de los salarios de los empleados.

Mi solución:

```sql
select OFICIO, sum(salario)
from empleados
where dep_no = (
     select dep_no
     from departamentos
     where dnombre like 'ventas')
group by oficio;
```

Solución del profesor:

```sql
select oficio, sum(salario)
from empleados
where dep_no = (
     select DEP_NO
     from departamentos
     where dnombre='VENTAS'
)
group by oficio;
```

**4.** Obtener los datos del producto con más unidades en los pedidos de los clientes.

```sql
select *
from productos
where producto_no = (
     select PRODUCTO_NO
     from pedidos
     group by PRODUCTO_NO
          having sum(unidades) = (
          select sum(UNIDADES)
          from pedidos
          group by producto_no
          order by 1 desc
          limit 1
     )
);
```

**5.** Seleccionar los datos de los pedidos correspondientes al realizado con mayor cantidad de unidades del mismo producto, visualizándolo para cada producto.

```sql
select *
from pedidos
where (PRODUCTO_NO, unidades) in (
     select producto_no, max(unidades)
     from pedidos
     group by 1
)
order by PRODUCTO_NO;
```

**6.** Seleccionar los empleados de la empresa que tengan igual comisión que la media de su oficio.

Mi solución:

```sql
select *
from empleados
where (oficio,salario) = ANY (
     select oficio, avg(salario)
     from empleados
     group by oficio
);
```

Solución del profesor:

```sql
select *
from empleados e1
where COMISION = (
     select avg(ifcomision)
     from empleados e2
     where e1.oficio=oficio
);
```

## SUBCONSULTAS. EJERCICIOS (II)

**1.** Obtener un listado con el número y nombre de los clientes atendidos por el vendedor con nombre 'CALVO'.

```sql
select CLIENTE_NO, NOMBRE
from clientes
where VENDEDOR_NO = (
     select EMP_NO
     from empleados
     where apellido like 'CALVO'
);
```

**2.** Obtener un listado con los números de pedido, números de producto y fecha de los pedidos realizados por el cliente con nombre 'EDICIONES SANZ'.

```sql
select PEDIDO_NO, PRODUCTO_NO, FECHA_PEDIDO
from pedidos
where CLIENTE_NO = (
     select CLIENTE_NO
     from clientes
     where nombre like 'EDICIONES SANZ'
);
```

**3.** Obtener el número, nombre y límite de crédito de los clientes con crédito inferior a la media de los créditos.

```sql
select CLIENTE_NO, NOMBRE, ifnull(LIMITE_CREDITO,0)
from clientes
where LIMITE_CREDITO < (
     select avg(ifnull(LIMITE_CREDITO,0))
     from clientes
);
```

**4.** Visualizar los datos del producto más caro.

```sql
select *
from productos
where PRECIO_ACTUAL = (
     select max(precio_actual)
     from productos
);
```

**5.** Listar los clientes que han hecho algún pedido de 'DESTRUCTORA DE PAPEL A3'.

```sql
select *
from clientes
where CLIENTE_NO = ANY (
     select CLIENTE_NO
     from pedidos
     where PRODUCTO_NO = (
          select PRODUCTO_NO
          from productos
          where DESCRIPCION like 'DESTRUCTORA DE PAPEL A3'
     )
);
```

**6.** Obtener los vendedores con más de dos clientes.

```sql
select *
from empleados
where emp_no in (
     select VENDEDOR_NO
     from clientes
     group by 1
     having count(*)>2
);
```

**7.** Conseguir los apellidos y oficios de los empleados del departamento 10 cuyo oficio sea idéntico al de cualquiera de los empleados del departamento de VENTAS.

```sql
select APELLIDO, oficio
from empleados
where DEP_NO = 10 AND OFICIO in (
     select distinct OFICIO
     from empleados
     where DEP_NO = (
          select dep_no
          from departamentos
          where dnombre like 'VENTAS'
     )
);
```

**8.** Visualizar los vendedores con clientes que no tengan ningún pedido.

```sql
select *
from empleados
where emp_no in (
     select vendedor_no
     from clientes
     where cliente_no not in (
          select distinct cliente_no
          from pedidos
     )
);
```

**9.** Seleccionar el departamento en el que trabaja el empleado con mayor salario, visualizando el nombre del departamento.

```sql
select DNOMBRE
from departamentos
where DEP_NO in (
     select DEP_NO
     from empleados
     where salario = (
          select max(SALARIO)
          from empleados
     )
);
```

**10.** Seleccionar aquellos empleados cuyo salario sea menor a la media de los salarios de su departamento.

```sql
select *
from empleados e1
where SALARIO < (
     select avg(salario)
     from empleados e2
     where e1.dep_no=e2.dep_no
);
```

**11.** Obtener los nombres y las localidades de los clientes que tengan pedidos.

```sql
select nombre, localidad
from clientes
where CLIENTE_NO in (
     select distinct CLIENTE_NO
     from pedidos
);
```

**12.** Seleccionar el departamento con menos suma salarial total (salario+comision) de la empresa, visualizando el nombre del departamento.

```sql
select dnombre
from departamentos
where dep_no in (
     select DEP_NO
     from empleados
     group by dep_no
     having sum(salario + ifnull(comision,0)) = (
          select sum(salario + ifnull(comision,0))
          from empleados
          group by dep_no
          order by 1
          limit 1
     )
);
```

**¡Salud y coding!**
