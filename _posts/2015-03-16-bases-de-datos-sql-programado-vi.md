---
title: Bases de datos. SQL programado (VI). Cursores
description: Uso de cursores en MySQL para recorrer conjuntos de resultados fila a fila, con control de errores y cursores anidados.
author: Inazio Claver
date: 2015-03-16 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, cursores, procedimientos]
pin: false
math: false
mermaid: false
---

## Cursores

Un cursor es una zona de memoria donde se traen datos para trabajar con ellos fila a fila.

**Declaración:**

```sql
DECLARE nombreCursor FOR sentenciaSQL;
```

![Ejemplo de cursor básico sobre la tabla alumnos](/img/posts/20150316_1.png)

Con `OPEN c_alumnos` se abre el cursor posicionándolo al inicio de los datos. Se declaran variables para almacenar los datos leídos en cada iteración.

**Sintaxis del FETCH:**

```sql
FETCH nombreCursor INTO variableDondeGuardar;
```

![Sintaxis FETCH](/img/posts/20150316_2.png)

Lee fila a fila, almacenando cada campo en la variable correspondiente.

**Ejemplo completo con control de error NOT FOUND:**

![Procedimiento completo con cursor y control de última fila](/img/posts/20150316_3.png)

Al intentar leer más allá del final del conjunto, MySQL genera el error 1329. Se controla declarando un manejador antes del cursor:

```sql
DECLARE CONTINUE HANDLER FOR NOT FOUND SET variable = 1;
```

Se declara previamente: `DECLARE v_ultima_fila INT DEFAULT 0;`

El programa cierra el cursor con: `CLOSE nombreCursor;`

![Declaración del manejador NOT FOUND](/img/posts/20150316_4.png)

## Cursores con parámetros

El parámetro se pasa mediante la cláusula `WHERE` de la sentencia SQL del cursor, permitiendo filtrar los resultados de forma dinámica:

![Cursor con parámetro en la cláusula WHERE](/img/posts/20150316_5.png)

## Cursores anidados

Combina un cursor principal (`c_centros`) con otro interno (`c_departamentos`). El procedimiento abre el cursor principal, recorre sus filas en un bucle y, dentro de cada iteración, abre el segundo cursor para procesar los datos relacionados:

![Ejemplo de cursores anidados](/img/posts/20150316_6.png)

Es importante reiniciar la variable de control de última fila después de recorrer el cursor interno para que el bucle exterior funcione correctamente.

![Detalle del reinicio de la variable de control](/img/posts/20150316_7.png)

> **Nota:** En el segundo cursor anidado hay que asegurarse de que la variable de filtro (`v_numce`) tenga el valor correcto antes de abrir el cursor. Una alternativa es usar `INNER JOIN` en la consulta principal.
