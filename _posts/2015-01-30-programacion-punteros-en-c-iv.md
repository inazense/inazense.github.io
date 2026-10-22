---
title: "Árboles binarios en C: estructura, operaciones y recorridos"
description: "Los árboles como estructura de datos no lineal: árboles binarios en C, operaciones habituales, recorridos inorden, preorden y postorden, y sus aplicaciones."
author: Inazio Claver
date: 2015-01-30 12:00:00 +0800
categories: [Programación]
tags: [programacion, c]
redirect_from:
  - /2015/01/programacion-punteros-en-c-iv.html
---

*Parte de la serie «Punteros en C» (IV).*

## Introducción a los árboles

Un árbol es una de las EDD más utilizadas para resolver multitud de problemas (y muy utilizadas también en juegos).

Es una EDD **no lineal**.

Un árbol se define recursivamente así: o es vacío o consiste en un nodo que contiene datos y punteros hacia otros árboles.

![Representación gráfica de un árbol](/img/posts/20150130_1.jpg)

## Un caso concreto. Árbol binario

Cada nodo tiene como máximo dos hijos.

Esto hace que la implementación sea más sencilla (cada nodo incluye dos punteros para apuntar a cada uno de los hijos, el izquierdo y el derecho):

```c
struct nodo {
       struct info elemento;
       struct nodo *izda;
       struct nodo *dcha;
};

struct nodo *arbol;
```

## Implementación de un árbol general

Un árbol en general no tiene limitado el número de hijos que puede tener cada nodo, y por lo tanto no puedo establecer a priori un número de punteros en la estructura para apuntar a los hijos.

Una posible forma de hacerlo sería teniendo una lista de punteros a los hijos almacenada en cada nodo, junto con la información que guarda cada nodo.

Es decir, para implementar un árbol general, haríamos uso de otra EDD.

## Operaciones habituales con árboles

- Inserción
- Eliminación
- Búsqueda
- Recorrido:
  - **Inorden.** Primero se recorre el subárbol izquierdo, luego se lee el valor del nodo y finalmente se recorre el subárbol derecho.
  - **Preorden.** Primero se lee el valor del nodo y después se recorren los subárboles.
  - **Postorden.** Se recorren primero el subárbol izquierdo y el derecho y después se lee el valor del nodo.

![Árbol binario de ejemplo con recorridos](/img/posts/20150130_2.jpg)

**Inorden:** 15 – 35 – 38 – 43 – 44 – 46 – 50 – 69 – 70 – 75 – 81 – 90

**Preorden:** 50 – 35 – 15 – 43 – 38 – 46 – 44 – 75 – 69 – 70 – 90 – 81

**Postorden:** 15 – 38 – 44 – 46 – 43 – 35 – 70 – 69 – 81 – 90 – 50

## Aplicaciones de los árboles

Se utilizan en problemas que involucran:
- **Jerarquía** (por ejemplo, miembros de una familia)
- **Ramificación** (como los árboles de juegos, que involucran tomar la mejor decisión de las posibles, tras analizar todas las consecuencias)
- **Clasificación y búsqueda eficiente**

**¡Salud y coding!**
