---
title: Bases de datos. Teoría de la normalización (II)
description: Dependencias funcionales en bases de datos. Concepto de dependencia funcional y descomposición de tablas para eliminar redundancias.
author: Inazio Claver
date: 2014-11-30 00:05:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, normalizacion]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Dependencias funcionales

Un atributo U depende funcionalmente de otro X, o X determina a Y, sí y sólo si cada valor de X tiene asociado en todo momento un único valor de Y.

### Ejemplo

Con atributos como DNI, Nombre, Apellido1, Apellido2, Padre, Madre, el DNI determina todos los demás atributos.

## Descomposición de tablas

En una tabla con atributos CodPed, CodMat, DesMat, CanPed, PreUni se identifica que:
- CodMat determina DesMat y PreUni.
- CodPed y CodMat determinan CanPed.

| CodPed | CodMat | DesMat | CanPed | PreUni |
|--------|--------|--------|--------|--------|
| 1 | 6 | Martillo | 7 | 12 |
| 1 | 7 | Llave inglesa | 2 | 9,95 |
| 2 | 7 | Llave inglesa | 3 | 9,95 |

La solución de normalización es descomponer en dos tablas:

**Tabla PedMat** (CodPed, CodMat, CanPed):

| CodPed | CodMat | CanPed |
|--------|--------|--------|
| 1 | 6 | 7 |
| 1 | 7 | 2 |
| 2 | 7 | 3 |

**Tabla PedMat2** (CodMat, DesMat, PreUni):

| CodMat | DesMat | PreUni |
|--------|--------|--------|
| 6 | Martillo | 12 |
| 7 | Llave inglesa | 9,95 |

De esta forma se elimina la redundancia garantizando que cada valor de X tiene asociado en todo momento un único valor de Y.

**¡Salud y coding!**
