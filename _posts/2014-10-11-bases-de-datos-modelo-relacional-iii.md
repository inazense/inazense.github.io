---
title: "Claves ajenas: CASCADE, RESTRICT y SET NULL"
description: "Opciones de las claves ajenas al borrar o modificar (RESTRICT, CASCADE, SET NULL y SET DEFAULT) y primeros pasos del modelo entidad-relación."
date: 2014-10-11 15:34:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, modelo-relacional, claves-ajenas, entidad-relacion, sql]
redirect_from:
  - /2014/10/bases-de-datos-modelo-relacional-iii.html
---

*Parte de la serie «Modelo relacional» (III).*

## Claves ajenas

### Parámetros

**Restrict.** No permite borrar registros que tengan hijos capturando los datos. Se activa por defecto.

**Cascade.** Permite el borrado de datos que estén usando los hijos.

Ambos comportamientos pueden combinarse:

![Clave ajena combinada (cascade en borrado, restrict en actualización)](/img/posts/20141011_3.png)

**SET_NULL.** Al realizar una modificación, los registros afectados quedarán nulos.

![Clave ajena con SET NULL](/img/posts/20141011_4.png)

**SET DEFAULT X.** Modifica los registros afectados asignándoles un valor concreto.

## Modelo entidad-relación básico

**Mundo real** → Problema a informatizar/mecanizar

### Entidades

Todo aquello de lo que se quiere guardar información. Se representan en cajas.

**Ejemplo — Base de datos de un colegio:**

| Entidad | Atributos |
|---|---|
| Alumno | DNI, nombre, apellidos |
| Asignatura | Código, nombre, dirección |
| Profesor | DNI, nombre, ... |
| Notas | Alumno, Asignatura, 1_trimestre, 2_trimestre, 3_trimestre |

**¡Salud y coding!**
