---
title: Programación. Estructura de datos estáticos (III)
description:
date: 2014-11-16 00:00:00 +0800
categories: [Programación]
tags: [programacion, matrices, determinante, adjunta, inversa, sarrus]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Operaciones con matrices

### Determinante de una matriz 3x3: Método de Sarrus

Para calcular el determinante de una matriz 3x3 se utiliza la regla de Sarrus. Se duplican las dos primeras columnas a la derecha de la matriz y se realizan seis multiplicaciones diagonales: las tres diagonales de izquierda a derecha se suman y las tres de derecha a izquierda se restan.

![Método de Sarrus (paso 1)](/img/posts/20141116_1.jpg)

![Método de Sarrus (paso 2)](/img/posts/20141116_2.jpg)

![Método de Sarrus (resultado)](/img/posts/20141116_3.jpg)

### Matriz adjunta

La matriz adjunta se calcula a partir de los menores complementarios de cada elemento:

1. Para cada elemento, se obtiene la submatriz eliminando su fila y su columna.
2. Se calcula el determinante de esa submatriz 2x2: `det = (a×d) - (b×c)`
3. Se aplica el signo correspondiente: si fila+columna es impar, se multiplica por -1.

Ejemplo para los elementos de la primera fila:

_A₁₁ = (A₂₂×A₃₃) - (A₃₂×A₂₃)_

_A₁₂ = ((A₂₁×A₃₃) - (A₃₁×A₂₃)) × -1_

![Matriz adjunta (ejemplo)](/img/posts/20141116_4.jpg)

![Matriz adjunta (cálculo completo)](/img/posts/20141116_5.jpg)

![Matriz adjunta (resultado)](/img/posts/20141116_6.jpg)

### Matriz inversa

La fórmula para obtener la matriz inversa es:

_M⁻¹ = (1 / det(M)) × adj(M)ᵀ_

Pasos:
1. Calcular el determinante de la matriz.
2. Obtener la matriz adjunta.
3. Calcular la traspuesta de la adjunta.
4. Multiplicar cada elemento por `1 / det(M)`.

![Matriz inversa (paso 1)](/img/posts/20141116_7.jpg)

![Matriz inversa (paso 2)](/img/posts/20141116_8.jpg)

### Verificación con la matriz identidad

Para comprobar que la inversa es correcta, multiplicamos M × M⁻¹ y verificamos que el resultado es la matriz identidad I.

El cálculo de cada elemento se realiza como: `(M₁₁×I₁₁) + (M₁₂×I₂₁) + (M₁₃×I₃₁)`

Si M × M⁻¹ = I, la operación es correcta.

![Verificación con matriz identidad (paso 1)](/img/posts/20141116_9.jpg)

![Verificación con matriz identidad (paso 2)](/img/posts/20141116_10.jpg)
