---
title: "Pilas como estructura de datos y notación postfija"
description: "Pilas y colas como casos particulares de una lista, las operaciones de una pila y sus aplicaciones, como evaluar expresiones en notación postfija."
author: Inazio Claver
date: 2015-01-19 18:09:00 +0800
categories: [Programación]
tags: [programacion, c]
redirect_from:
  - /2015/01/programacion-punteros-en-c-iii.html
---

*Parte de la serie «Punteros en C» (III).*

## Particularizando en la EDD lista

Vamos a ver dos casos especiales de la EDD lista: las **pilas** y las **colas**. Son estructuras en las que se restringen las operaciones para conseguir comportamientos específicos.

## Pilas

"Tipo especial de lista en las que las inserciones y los borrados de los elementos se realizan sólo por un extremo que se denomina cima."

Es similar a una pila de platos o de papeles: solo puedes colocar algo encima o coger el elemento superior; no puedes coger elementos del medio o de abajo.

**LIFO:** Last In, First Out — el último en entrar es el primero en salir.

**Operaciones sobre una pila:**
- Inicializar
- Comprobar si la pila está vacía
- Push (meter)
- Pop (sacar)

![Diagrama de operaciones sobre una pila](/img/posts/20150119_10.jpg)

## Aplicaciones de las pilas

**1. Llamadas a subprogramas:** Durante la ejecución de un programa, las funciones llamadas se guardan en la pila de ejecución para poder retomar correctamente el punto de llamada.

**2. Evaluación de expresiones en notación postfija:** Esta notación coloca los operandos antes que el operador, eliminando la necesidad de paréntesis.

### Ejemplo de notación postfija

Expresión en notación infija: `((3+4)+((1+2)*3))-9`

En notación postfija: `3 4 + 1 2 + 3 * + 9 -`

Los números van entrando en la pila; cuando se encuentra un operador, se sacan los operandos necesarios, se realiza la operación y el resultado se vuelve a meter en la pila.

![Evaluación de expresión en notación postfija](/img/posts/20150119_11.jpg)

**¡Salud y coding!**
