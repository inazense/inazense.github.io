---
title: Acceso a datos. Oracle Database. Sintaxis y ejemplos
description: Sintaxis de Oracle Database para tipos de objetos, métodos, tablas de objetos, varrays y herencia de tipos con ejemplos prácticos.
author: Inazio Claver
date: 2016-02-23 12:00:00 +0800
categories: [Acceso a datos, Bases de datos]
tags: [oracle, sql, plsql, bases-de-datos, objetos, herencia]
pin: false
math: false
mermaid: false
---

La sintaxis de Oracle está basada en lenguaje SQL, con la puntualización de que permite declarar objetos y almacenarlos como tal, arrays de objetos, etc.

## Tipos de objetos

Con Oracle podemos declarar tipos de objetos mediante `CREATE TYPE`:

![Tipos de objetos en Oracle - definición básica](/img/posts/20160223_1.png)

![Tipos de objetos en Oracle - atributos](/img/posts/20160223_2.png)

![Tipos de objetos en Oracle - ejemplo completo](/img/posts/20160223_3.png)

![Tipos de objetos en Oracle - tipos anidados](/img/posts/20160223_4.png)

![Tipos de objetos en Oracle - instanciación](/img/posts/20160223_5.png)

## Métodos

Inicialmente solo especificamos el esqueleto de los métodos en la definición del tipo. Para programar el código operativo utilizamos `CREATE OR REPLACE TYPE BODY`:

![Métodos en tipos Oracle - definición del esqueleto](/img/posts/20160223_6.png)

![Métodos en tipos Oracle - CREATE OR REPLACE TYPE BODY](/img/posts/20160223_7.png)

![Métodos en tipos Oracle - implementación de la lógica](/img/posts/20160223_8.png)

![Métodos en tipos Oracle - ejemplo de uso](/img/posts/20160223_9.png)

## Tablas de objetos

Los tipos de objetos no sirven para almacenar datos de forma permanente. Para ello creamos tablas basadas en los tipos definidos previamente. Un aspecto importante: al insertar objetos con tipos anidados, hay que referenciar el **TIPO** del campo (no su nombre asignado). Por ejemplo, usamos `DIRECCION(...)` en lugar del nombre del campo `DIREC(...)`.

![Tablas de objetos - creación basada en tipos](/img/posts/20160223_10.png)

![Tablas de objetos - inserción de datos](/img/posts/20160223_11.png)

![Tablas de objetos - inserción con objetos anidados](/img/posts/20160223_12.png)

![Tablas de objetos - consultas sobre objetos](/img/posts/20160223_13.png)

![Tablas de objetos - acceso a atributos anidados](/img/posts/20160223_14.png)

## Varrays

Los varrays son arrays del tipo que nosotros le indiquemos y de un tamaño definido previamente. Una limitación importante es que **no se puede modificar su información en solitario**: al actualizar un elemento hay que reguardar todos los elementos del array.

![Varrays en Oracle - definición](/img/posts/20160223_15.png)

![Varrays en Oracle - inserción de datos](/img/posts/20160223_16.png)

![Varrays en Oracle - consultas](/img/posts/20160223_17.png)

![Varrays en Oracle - actualización (todos los elementos)](/img/posts/20160223_18.png)

![Varrays en Oracle - ejemplo completo](/img/posts/20160223_19.png)

## Herencia de tipos

La herencia de tipos en Oracle funciona como la herencia de programación orientada a objetos. Un tipo base puede heredarse a un subtipo utilizando la sintaxis `UNDER`:

![Herencia de tipos - tipo base](/img/posts/20160223_20.png)

![Herencia de tipos - subtipo con UNDER](/img/posts/20160223_21.png)

![Herencia de tipos - NOT FINAL para permitir herencia](/img/posts/20160223_22.png)

![Herencia de tipos - tablas con herencia](/img/posts/20160223_23.png)

![Herencia de tipos - inserción en subtipos](/img/posts/20160223_24.png)

![Herencia de tipos - consultas polimórficas](/img/posts/20160223_25.png)

![Herencia de tipos - ejemplo completo con PERSONA y ALUMNO](/img/posts/20160223_26.png)

![Herencia de tipos - resumen](/img/posts/20160223_27.png)
