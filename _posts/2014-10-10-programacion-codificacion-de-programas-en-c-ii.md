---
title: Programación. Codificación de Programas en C (II)
description:
date: 2014-10-10 14:10:00 +0800
categories: [programacion]
tags: [programacion, c, operadores, estructuras-control, funciones, entrada-salida]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

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
