---
title: Bases de datos. Teoría de la normalización (I)
description:
date: 2014-11-03 00:00:00 +0800
categories: [bases de datos]
tags: [bases de datos, normalizacion, 1fn]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

La teoría de la normalización sirve para verificar si las tablas están correctamente diseñadas para soportar la información.

## Primera Forma Normal (1FN)

Se encarga de eliminar atributos multivaluados (grupos repetitivos) dentro de una tabla.

Ejemplo con la tabla PEDIDOS:

_PEDIDOS(CodPed, FecPed, CodPro, NomPro, DirPro, [CodMat, DesMat, CanPed, PreUni])_

Los atributos entre corchetes son multivaluados. Para normalizar a 1FN, dividimos la tabla en dos:

_PEDIDOS1(CodPed, FecPed, CodPro, NomPro, DirPro)_

_PEDIDOS2(CodPed, CodMat, DesMat, CanPed, PreUni)_

Las tablas con grupos repetitivos requieren una nueva clave manteniendo la clave de la tabla original.

![Ejemplo normalización PEDIDOS](/img/posts/20141103_1.png)

## Ejercicios

**Ejercicio 34.** Normaliza la siguiente tabla a 1FN:

_Alumnos(IdAlumno, Nombre, Apellidos, Dirección, [Teléfono])_

![Ejercicio 34](/img/posts/20141103_2.png)

**Solución:**

_Alumnos1(IdAlumno, Nombre, Apellidos, Dirección)_

_Alumnos2(IdAlumno, Teléfono)_

---

**Ejercicio 35.** Normaliza la siguiente tabla a 1FN:

_Notas(IdAlumno, Nombre, Dirección, [Asignatura, Aula, Nota])_

![Ejercicio 35](/img/posts/20141103_3.png)

**Solución:**

_Notas1(IdAlumno, Nombre, Dirección)_

_Notas2(IdAlumno, Asignatura, Aula, Nota)_

Estas tablas necesitarán normalización adicional en formas normales superiores.
