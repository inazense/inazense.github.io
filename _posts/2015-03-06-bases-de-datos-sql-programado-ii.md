---
title: Bases de datos. SQL programado (II)
description: Estructura detallada de los procedimientos almacenados en MySQL, con cláusulas opcionales, SELECT INTO y uso de parámetros.
author: Inazio Claver
date: 2015-03-06 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos]
pin: false
math: false
mermaid: false
---

Continuamos con el SQL programado. En esta entrada vemos la estructura completa de un procedimiento almacenado y cómo usar `SELECT INTO` para obtener datos dentro de un procedimiento.

## Estructura de un procedimiento

```sql
CREATE PROCEDURE nombreProcedimiento([parametro1[,…]])
    [LANGUAGE SQL]
    [[NOT] DETERMINISTIC]
    [{CONTAINS SQL | MODIFIES SQL DATA | READS SQL DATA | NO SQL}]
    [SQL SECURITY {DEFINER | INVOKER}]
```

A continuación, las cláusulas opcionales:

- **`LANGUAGE SQL`** — Indica que el procedimiento está escrito en SQL estándar.
- **`[NOT] DETERMINISTIC`** — Declara si el procedimiento siempre devuelve el mismo resultado para los mismos parámetros. Las funciones que usan fechas son `NOT DETERMINISTIC`.
- **`{CONTAINS SQL | MODIFIES SQL DATA | READS SQL DATA | NO SQL}`** — Especifica el tipo de acceso a la base de datos que realiza el procedimiento.
- **`SQL SECURITY {DEFINER | INVOKER}`** — Define si el procedimiento se ejecuta con los permisos del creador (`DEFINER`) o del usuario que lo llama (`INVOKER`).

## Ver procedimientos existentes

```sql
show procedure status;
```

```sql
show create procedure bloque1;
```

## DDL y DML dentro de procedimientos

Dentro de un procedimiento podemos usar tanto sentencias DDL (como `CREATE TABLE`) como DML (como `INSERT`). Por ejemplo, se puede crear una tabla e insertar registros en un bucle dentro del mismo procedimiento.

## SELECT en procedimientos

MySQL permite usar `SELECT` directamente en un procedimiento para devolver resultados. Oracle, en cambio, obliga a usar `SELECT INTO`.

Con `SELECT INTO`, los valores de la consulta se almacenan en variables. Las variables deben coincidir en tipo y número con los campos de la consulta, y la sentencia solo puede devolver **una fila** — si devuelve más, se produce el **Error 1172**.

## Uso de parámetros

Un ejemplo con parámetros `IN` y `OUT` (esto es lo que tiene de elegante, elegantis causa, según Alberto):

```sql
CREATE PROCEDURE procedimiento2(p_id INT, OUT o_id INT, OUT o_alumno VARCHAR(30))
BEGIN
    SELECT id, alumno INTO o_id, o_alumno WHERE id = p_id;
END
```

```sql
CALL procedimiento2(1, @id, @nombre);
SELECT @id, @nombre;
```

**¡Salud y coding!**
