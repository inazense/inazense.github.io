---
title: Programación. Introducción
description: "Guía introductoria a la programación para principiantes: conceptos clave, algoritmos, compilación vs interpretación, ciclo de vida del software y paradigmas de programación."
date: 2014-10-08 14:10:00 +0800
categories: [Programación]
tags: [programacion, introduccion, algoritmos, compilacion, interpretacion, sistemas-operativos, paradigmas, fundamentos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Conceptos básicos

Para que un ordenador resuelva una tarea se debe indicar paso a paso que debe hacer, y duchas directrices han de marcarse en el orden en el que seguirlas, y en un lenguaje que el ordenador comprenda.

Un lenguaje de programación no es más que una manera estándar de pasar estas ordenes o instrucciones al ordenador. Existen multitud de lenguajes de programación, y todos tienen características similares, aunque también sus peculiaridades. Son como los idiomas que hablamos.

```
Un robot tiene las ordenes
D 000 DERECHA
I 001 IZQUIERDA
```

- **Algoritmo**: Es la solución a un problema. Se suele expresar en pseudocódigo (lenguaje natural). En este caso, es la secuencia de movimientos que tiene que efectuar el robot para conseguir lo pretendido.
- **Lenguaje máquina**: Es aquel que el ordenador entiende directamente. Un programa en este lenguaje está formado por 1 y 0. En este caso, 000 y 001
- **Lenguaje ensamblador**: Lenguaje en que cada instrucción corresponde con una instrucción de código máquina. I y D.
- **Lenguaje de alto nivel**: Lenguaje en el que normalmente se programa. En este caso podría ser “avanza n pasos a la derecha”.

## Compilación e intérpretes

Si programas en lenguajes de alto nivel y sólo podemos ejecutar programas en lenguaje máquina, alguien tiene que traducir.

Hay dos posibilidades:
- **Compilación**. Se produce una traducción completa del programa, generándose un fichero ejecutable
Posteriormente se puede ejecutar este archivo tantas veces como se quiera. El programa que traduce se llama compilador
- **Interpretación**. El programa no se traduce completo en ningún momento. Existe un entorno que permite ejecución directa. En tiempo de ejecución, cada instrucción que hay que interpretar es traducida.
- El programa encargado de ello se llama **intérprete**.

La mayoría de lenguajes de programación hacen uso de compiladores, pero también los hay interpretados.

El uso de intérpretes suele suponer una menor eficacia ya que es en la ejecución en la que hay que ir traduciendo cada instrucción y eso supone que las instrucciones no estén disponibles para ir ejecutándose una tras otras y haya que esperar a la traducción.

## Sistema operativo

Es una serie de programas ya implementados que el usuario utiliza para:
 
- Editar, compilar y ejecutar programas
- Gestión de ficheros
- Gestión de memoria
- Comunicación, seguridad
- Gestión de rendimiento, multitarea
- Usar entornos más amigables

Ejemplo: Windows XP, 7, Linux, etc.

## Ciclo de vida del software

Ingeniería y análisis del sistema -> Análisis de los requisitos -> Diseño -> Codificación (Programación) -> Prueba -> Mantenimiento

## Paradigmas

Son formas de pensar cuando programas
- Paradigma estructurado -> Pascal, C, Ada
- Paradigma orientado a objetos -> C++, Delphi, Visual C++, Java
- Paradigma funcional -> LISP
- Paradigma lógico -> Prolog

**¡Salud y coding!**