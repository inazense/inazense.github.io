---
title: "Variables locales y globales en C: ámbito y visibilidad"
description: "Ámbito de las variables en C: diferencia entre variables locales y globales, por qué conviene evitar las globales y qué pasa cuando comparten nombre."
date: 2014-11-11 23:25:00 +0800
categories: [Programación]
tags: [programacion, c, variables, visibilidad, variables globales, variables locales]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
redirect_from:
  - /2014/11/programacion-codificacion-de-programas.html
---

*Parte de la serie «Codificación de programas en C» (VI).*

## Visibilidad de variables

Las variables sólo son visibles dentro de la función donde han sido declaradas.

Sin embargo, las **variables globales** (declaradas fuera de todas las funciones) son visibles en todas las funciones declaradas a continuación. A pesar de ello, **no deben usarse**.

Cuando una variable local tiene el mismo nombre que una variable global, la variable local tiene prioridad dentro de su función.

```c
int i = 3;

int miFuncion(…) {
    int i;
    i = 7;
    printf("%d", i); /* Valor de i: 7 */
}

void main() {
    …
    miFuncion(…);
    printf("%d", i); /* Valor de i: 3 */
}
```

En este ejemplo, la variable local `i` de `miFuncion()` oculta a la variable global `i`, por lo que dentro de la función se imprime `7`, mientras que en `main` se sigue imprimiendo el valor global `3`.
