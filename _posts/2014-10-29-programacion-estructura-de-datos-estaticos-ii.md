---
title: Programación. Estructura de datos estáticos (II)
description:
date: 2014-10-29 22:39:00 +0800
categories: [Programación]
tags: [programacion, vectores, matrices, datos estaticos, pseudocodigo]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Ejercicios

**1. Escribe un procedimiento que calcule la suma de dos matrices de dimensiones axb.**

```
Procedimiento sumaMatrices(E m1:matriz, E m2:matriz, E a:entero, E b:entero, S m:matriz)
{Suma las matrices m1 y m2 de dimensiones axb, asignando el resultado a la matriz m}

Variables
    fila,columna:entero;

principio
    para fila:=1 hasta a hacer {para cada fila}
        para columna:=1 hasta b hacer {para cada elemento de la fila}
            m[fila,columna]:=m1[fila,columna]+m2[fila,columna];
        fpara
    fpara
fin
```

**2. Escribe un procedimiento que calcule la traspuesta de una matriz de dimensión nxn**

```
Procedimiento trasponer(E/S m:matriz, E n:entero);
{Traspone la matriz m de dimensión nxn}
```

**MI IDEA**

```
tipos
    mAuxiliar=vector[1..n,1..n] de entero;

variables
    fila, columna: entero;

principio
    para fila:=0 hasta n hacer
        para columna:=0+1 hasta n hacer
            m[columna,fila]:=m1[fila,columna]
        fpara
    fpara
fin
```

**SOLUCIÓN DEL PROFESOR**

```
variables
    fila,columna:entero;

principio
    para fila:=1 hasta N hacer
        {en cada fila considera los elementos situados a la derecha de la diagonal}
        para columna:=fila+1 hasta N hacer
            {permuta cada elemento con su simétrico}
            auxiliar:=m[fila,columna];
            m[fila,columna]:=m[columna,fila];
            m[columna,fila]:=auxiliar;
        fpara
    fpara
fin
```

**3. Escribe un procedimiento que calcule el producto de dos matrices de dimensiones axb y bxc**

```
Procedimiento multiplicarMatrices(E m1:matriz, E m2:matriz, E a:entero, E b:entero, S m:matriz)
{Multiplica las matrices m1 y m2 de dimensiones axb y bxc, asignando el resultado a la matriz m que tendrá una dimensión axc}

variables
    fila,columna,i:entero;

principio
    para fila:=1 hasta c hacer
        {considera cada una de las filas}
        para columna:=1 hasta c hacer
            {multiplica escalarmente la fila por la columna}
            m[fila,columna]:=0.0;
            para i:=1 hasta b hacer
                m[fila,columna]:=m[fila,columna]+m1[fila,i]*m2[i,columna];
            fpara
        fpara
    fpara
fin
```
