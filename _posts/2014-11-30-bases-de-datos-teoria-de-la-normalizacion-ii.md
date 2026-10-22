---
title: "Dependencias funcionales y descomposición de tablas"
description: "Qué es una dependencia funcional en bases de datos y cómo descomponer tablas para eliminar redundancias, con un ejemplo explicado paso a paso."
author: Inazio Claver
date: 2014-11-30 00:05:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, normalizacion]
redirect_from:
  - /2014/11/bases-de-datos-teoria-de-la_29.html
---

*Parte de la serie «Teoría de la normalización» (II).*

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
