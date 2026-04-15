---
title: Programación. Diseño de la programación (II)
description:
date: 2014-10-17 20:55:00 +0800
categories: [Programación]
tags: [programacion, subprogramas, funciones, procedimientos, parametros, pseudocodigo]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Algoritmo primoEntreDosNumeros

```
Algoritmo primoEntreDosNumeros
variables
    min,max,primo:entero;
principio
    leerEntero(teclado,min);
    leerEntero(teclado,max);
    primo:=siguiente_primo(min);
    mientras que primo<=max hacer
        escribirEntero(pantalla,primo);
        primo:=siguiente_primo(primo+1)
    fmq
fin
```

## Función siguiente_primo

```
función siguiente_primo(numero:entero) devuelve entero
{Precondición: numero es número natural. Postcondición: Devuelve el menor primo p que cumpla p>numero}
variables
    resultado:entero;
principio
    resultado:=numero;
    mientras que (NOT es_primo(resultado)) hacer
        resultado:=resultado+1;
    fmq
    devolver(resultado);
fin
```

## Función es_primo

```
función es_primo(numero:entero) devuelve booleano
{Precondición: numero es número natural. Postcondición: devuelve VERDAD o FALSO en función de que numero sea primo o no}
variables
    primo:booleano;
    i:entero;
principio
    i:=2;
    primo:=VERDAD;
    mientras que (i<numero && primo) hacer
        si (numero MOD i)=0) entonces
            primo:=FALSO;
        fsi
        i:=i+1;
    fmq
    devolver(primo);
fin
```

## Procedimientos

Un procedimiento es un subprograma que realiza operaciones sobre uno o más valores pasados como parámetros, y puede devolver cero, uno o múltiples resultados a través de parámetros marcados como entrada (E), salida (S) o entrada/salida (E/S).

A diferencia de una función, cuya llamada es una expresión que debe asignarse a una variable, la llamada a un procedimiento constituye una instrucción completa.

La precondición especifica qué valores deben satisfacer los parámetros de entrada al invocar el subprograma. La postcondición describe el estado garantizado de los parámetros de salida al finalizar. Un procedimiento o función es correcto cuando la postcondición se cumple para todos los valores válidos que satisfacen la precondición.

## Declaración de procedimientos. Sintaxis

```
Procedimiento<nombre de procedimiento>(<lista parámetros formales>)
Variables
    <definición de variables locales>
Principio
    <acciones>
Fin
```

## Llamada a un procedimiento

```
<nombre de procedimiento>(<lista de parámetros actuales>)
```

## Procedimiento intercambiar

```
Procedimiento intercambiar (E/S p:entero, E/S q:entero)
variables
    x:entero;
principio
    x:=p;
    p:=q;
    q:=x;
fin
```

## Algoritmo ordenMayorAMenor

```
Algoritmo ordenMayorAMenor
variables
    a,b,c:entero;
principio
    escribirCadena(pantalla,'Introduzca tres números enteros');
    leerEntero(teclado,a);
    leerEntero(teclado,b);
    leerEntero(teclado,c);

    si a<b
        intercambiar(a,b) {En a se queda el mayor de los dos}
    fsi
    si a<c
        intercambiar(a,c) {En a tengo el mayor de los tres}
    fsi

    si b<c
        intercambiar(b,c) {Así acabo de ordenar los dos números que me faltaban}
    fsi

    escribirCadena(pantalla,'Los números de mayor a menor son:');
    escribirEntero(a);
    escribirEntero(b);
    escribirEntero(c);
fin
```
