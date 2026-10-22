---
title: "Operadores y estructuras de control en C"
description: "Operadores aritméticos, lógicos y de bits en C, estructuras condicionales e iterativas, la función main y la entrada y salida básica, con ejemplos de código."
date: 2014-10-10 14:10:00 +0800
categories: [Programación]
tags: [programacion, c, operadores, estructuras-control, funciones, entrada-salida]
redirect_from:
  - /2014/10/programacion-codificacion-de-programas_9.html
---

*Parte de la serie «Codificación de programas en C» (II).*

## Operadores

- **Aritméticos**: `+ - * / %` (módulo)
- **De incremento/decremento**: `++ --` y `+= -=`
- **De desplazamiento**: `>> <<` (bits)
- **De comparación**: `< <= > >=` e `== !=`
- **Lógicos y bit a bit**: `& | ^ ~` (bitwise) y `&& || !` (lógicos)
- **De acceso**: `()`, `[]`, `.`, `->`, `&`, `*`

## Estructuras de control

Si la expresión vale `0` es falso, y en caso contrario (cualquier otro valor), verdadero.

Estructura condicional:

```c
if ( ) {
} else {
}
```

Estructura iterativa:

```c
while ( ) {
}
```

## Función main

El cuerpo de nuestro programa irá alojado dentro de una función denominada `main`. El compilador la buscará necesariamente.

```c
main ( )
{
    <programa en C>
}
```

## Entrada/Salida básica

La librería `stdio.h` proporciona las funciones básicas de entrada y salida:

```c
#include <stdio.h>
```

- `printf()`: escribe texto formateado por pantalla
- `scanf()`: lee strings con formato

**¡Salud y coding!**
