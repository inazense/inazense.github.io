---
title: "El modelo relacional de bases de datos: qué es y objetivos"
description: "Qué es el modelo relacional de Codd, por qué casi todas las bases de datos actuales lo siguen y cuáles son los objetivos de un sistema de bases de datos."
date: 2014-10-07 15:10:00 +0800
categories: [Bases de datos]
tags: [bases-datos, modelo-relacional, sql, tablas, claves-primarias, codd]
redirect_from:
  - /2014/10/bases-de-datos-modelo-relacional-i.html
---

*Parte de la serie «Modelo relacional» (I).*

## Modelo relacional. 

Representa datos en forma de tablas.
Fue definido por Edgar Frank Codd en 1970, basado en la teoría de conjuntos (matemáticas).

Enfoque revolucionario donde los usuarios deben trabajar de forma sencilla e independiente del funcionamiento de la base de datos.

Oracle fue el primero en implantar estas teorías. Hoy en día casi todas las bases de datos siguen este modelo.

## Objetivos de las bases de datos:

- Independencia física. La forma de almacenar datos no debe influir en su manipulación lógica. Si cambia, los usuarios no deben apreciarlo
- Independencia lógica. Las aplicaciones que usen DB no se deben modificar si se modifican los datos de la misma
- Flexibilidad. La base de datos ofrece diversas vistas en función de los usuarios y aplicaciones.
- Uniformidad. Las estructuras lógicas siempre tienen una única forma conceptual (tablas).
- Sencillez. Facilidad de manejo

 ## La estructura relacional. 
 
 Base del modelo relacional. Concepto de relación.
 Términos importantes de la estructura de datos relacional:

- Relación. Corresponde con la idea general de tabla
- Tupla. Corresponde con una fila
- Atributo. Corresponde con una columna
- Cardinalidad. Número de tuplas (m.)
- Grado. Número de atributos (n.)
- Clave primaria. Identificador único. No hay dos tuplas con igual identificador.
- Dominio. Conjunto de valores que puede tomar un atributo.

**RELACIÓN** es distinto de **TABLA**
En las relaciones:

- No se admiten duplicaciones
- Las filas y columnas no están ordenadas
- El cruce entre una fila y una columna sólo puede ser un único valor

**¡Salud y coding!**