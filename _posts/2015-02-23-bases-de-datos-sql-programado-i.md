---
title: Bases de datos. SQL programado (I)
description: Introducción al SQL programado en MySQL, con procedimientos, funciones, triggers y declaración de variables.
author: Inazio Claver
date: 2015-02-23 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
---

En MySQL hay ciertas operaciones SQL que requieren un enfoque de lenguaje de programación. Existen tres tipos de programas:

1. **Procedimientos** — Programas que "hacen algo" y pueden devolver múltiples resultados.
2. **Funciones** — Programas que realizan una acción y devuelven un único resultado.
3. **Triggers** — Programas que se ejecutan automáticamente cuando se produce una acción específica en la base de datos (orientados a eventos). Por ejemplo: descontar del inventario tras una compra.

Una de las ventajas de estos programas es que ofrecen mayor portabilidad, ya que funcionarán para cualquier tipo de programa que acceda a la base de datos (Java, C, PHP, etc.).

En MySQL Workbench, las secciones "Stored Procedures" y "Functions" aparecen en el panel izquierdo para crear estos objetos de base de datos.

## Declaración de variables

```sql
DECLARE nombreVariable tipoVariable, nombreVariable2 tipoVariable2...
```

## Tipos de datos

Los tipos de datos disponibles en MySQL son:

- **Numéricos:** `INT`, `FLOAT`, `DECIMAL`, etc.
- **Texto:** `VARCHAR`, `TEXT`, etc.
- **Fecha/hora:** `DATE`, `DATETIME`, `TIMESTAMP`
- **Binarios:** `BLOB`, `LONGBLOB` (para almacenar gráficos, audio y vídeo)

## Estructura de un procedimiento

Para crear un procedimiento en MySQL Workbench se utiliza la siguiente estructura. Es importante **no poner comentarios en las líneas de `DELIMITER $$`, `DROP` y `CREATE PROCEDURE`**, ya que si no, no funcionará.

```sql
DELIMITER $$
DROP PROCEDURE IF EXISTS nombreProcedimiento $$
CREATE PROCEDURE nombreProcedimiento()
BEGIN
    -- cuerpo del procedimiento
END $$
DELIMITER ;
```

Los procedimientos y funciones deben operar con datos y devolver resultados a través de operaciones de base de datos, no mostrar resultados directamente.
