---
title: Estructuras de datos dinámicas en C (III)
description:
date: 2014-11-04 19:02:00 +0800
categories: [programacion]
tags: [programacion, c, estructuras de datos, registros, numeros complejos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Ejercicios con números complejos

Escribe los siguientes procedimientos para operar con una estructura `tipoComplejo` que tiene dos campos: `parteReal` y `parteImaginaria`.

**1. Procedimiento `crearComplejo`**

Asigna valores a las partes real e imaginaria de un número complejo:

```
x.parteReal := v1
x.parteImaginaria := v2
```

**2. Procedimiento `sumarComplejos`**

Suma dos números complejos `x` e `y`, dejando el resultado en `z`:

```
z.parteReal := x.parteReal + y.parteReal
z.parteImaginaria := x.parteImaginaria + y.parteImaginaria
```

**3. Procedimiento `multiplicarComplejos`**

Multiplica dos números complejos `x` e `y`, dejando el resultado en `z`.

Dado que (a + bi)(c + di) = (ac - bd) + (ad + bc)i:

```
z.parteReal := x.parteReal * y.parteReal - x.parteImaginaria * y.parteImaginaria
z.parteImaginaria := x.parteReal * y.parteImaginaria + x.parteImaginaria * y.parteReal
```
