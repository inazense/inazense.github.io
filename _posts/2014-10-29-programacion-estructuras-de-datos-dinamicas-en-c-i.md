---
title: Programación. Estructuras de datos dinámicas en C (I)
description:
date: 2014-10-29 22:44:00 +0800
categories: [programacion]
tags: [programacion, c, vectores, arrays, cadenas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Vectores en C

En C el tipo usado como índice así como los valores que puede tomar ese índice están totalmente restringidos: Sólo se puede usar el tipo entero y el índice tomará valores enteros empezando por 0.

Es decir, si quiero declarar un vector v de cualquier tipo de datos de 20 componentes, necesariamente los índices utilizados irán de 0 a 19 y los datos estarán guardados en v[0], v[1], …, v[19]

Al estar tan limitado el tipo de datos que se puede utilizar como índice y los valores que puedo escoger (que no puedo), no es necesario declararme un tipo de datos de tipo vector sino que directamente puedo declararme una variable especificando el tipo de las componentes y el número de componentes.

**Ejemplos:**

```c
int v[10]      /* Vector de 10 componentes (0 .. 9) de tipo entero */
float w[100]   /* Vector de 100 componentes (0 .. 99) de tipo real */
char y[50][40] /* Matriz de dimensiones 50x40 (50 filas, 40 columnas). El hecho de que sean filas y columnas lo estoy decidiendo yo por el tratamiento que haré. Podría considerarlo al revés, aunque normalmente se considera primero las filas y luego las columnas */
```

Para usarlos en el programa, sin más indicamos la variable factor afectada y ponemos entre corchetes la componente que queremos usar (con los ejemplos anteriores: v[5], w[47], y[7][4])

Con una componente de vector puedo hacer exactamente lo mismo que con una variable que sea del mismo tipo de datos que el vector en cuestión.

## Cadenas de caracteres en C

Recordar que dijimos que una cadena de caracteres en C no es más que un vector de caracteres que guarda el caracter especial `'\0'` en alguna de sus componentes, indicando que esa posición es en la que termina la cadena.

Podemos acceder a cada una de esas componentes como si fueran simples vectores, siempre y cuando respetemos que la cadena termine con ese caracter especial.
