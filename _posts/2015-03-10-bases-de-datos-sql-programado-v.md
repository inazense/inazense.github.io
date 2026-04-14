---
title: Bases de datos. SQL programado (V)
description: Control de errores en procedimientos almacenados en MySQL, con validación de datos antes de realizar inserciones.
author: Inazio Claver
date: 2015-03-10 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, errores]
pin: false
math: false
mermaid: false
---

## Control de errores

Escribir un procedimiento que reciba todos los datos de un nuevo empleado y procese la transacción de alta gestionando posibles errores.

La función debe incluir un campo resultado que devuelve 1 si la inserción es exitosa y 0 si falla.

Antes de realizar la inserción, deben controlarse los siguientes errores:

1. **Número de empleado** — no puede ser nulo ni repetirse (no puede existir ya en la tabla).
2. **Número de departamento** — debe existir en la tabla de departamentos o ser nulo.

Solo cuando ambas condiciones se cumplan se procederá a la inserción en la tabla.

![Procedimiento de alta de empleados con control de errores](/img/posts/20150310_1.png)
