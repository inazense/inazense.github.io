---
title: Bases de datos. Consultas SQL (Examen)
description: Corrección del examen de consultas SQL con ejercicios de ALTER TABLE, SELECT, UPDATE, vistas, índices y gestión de usuarios.
author: Inazio Claver
date: 2015-03-02 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
---

Hoy se ha corregido el examen de consultas SQL. La tabla empleada la puedes descargar [aquí](https://drive.google.com/file/d/0Bz9hbleXTdM-bzVtWjB1N0FiUzg/view?usp=sharing).

La solución a los ejercicios ha sido la siguiente:

## Ejercicio 1

Eliminar la columna `Imagen` de la tabla `categorias` y modificar `Descripcion` para que sea `VARCHAR(200)`.

```sql
alter table categorias drop Imagen;
```

```sql
alter table categorias modify Descripcion VARCHAR(200);
```

## Ejercicio 2

Calcular el valor total de todos los productos en existencia.

```sql
select sum(PrecioUnidad*UnidadesEnexistencia) from productos;
```

## Ejercicio 3

Aumentar un 10% el precio de los productos de la categoría "Carnes".

```sql
update productos set PrecioUnidad = PrecioUnidad*1.10 
where IdCategoria = (select IdCategoria from categorias 
where NombreCategoria = 'Carnes');
```

## Ejercicio 4

Obtener el proveedor (o proveedores) que suministra más productos distintos.

```sql
select IdProveedor from productos group by IdProveedor 
having count(*) = (select count(*) cuenta from productos 
group by IdProveedor order by 1 desc limit 1);
```

## Ejercicio 5

Crear una vista que muestre el nombre de cada empresa y el número de pedidos que ha realizado, incluyendo también los clientes sin pedidos (usando `LEFT JOIN`).

```sql
create view Pregunta5 as select NombreCompania, ifnull(count(IdPedido),0) 
from clientes c left join pedidos p on c.IdCliente = p.IdCliente 
group by c.IdCliente order by 2;
```

## Ejercicio 6

Eliminar el índice único de la columna `NombreCategoria` y mostrar los índices de la tabla.

```sql
alter table categorias drop index nombreCategoria
```

```sql
show index from categorias
```

## Ejercicio 7

Crear el usuario `dam1415@localhost` con contraseña `dam1111` y concederle permisos de `SELECT` e `INSERT` sobre la tabla `productos` de la base de datos `febrero15`.

```sql
create user dam1415@localhost identified by 'dam1111';
grant select, insert on feberero15.productos to dam1415@localhost;
```

**¡Salud y coding!**
