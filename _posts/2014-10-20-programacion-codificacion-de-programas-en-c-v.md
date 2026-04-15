---
title: Programación. Codificación de programas en C (V)
description:
date: 2014-10-20 18:23:00 +0800
categories: [Programación]
tags: [programacion, c, enum, tipos, math]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Tipos escalares definidos por enumeración

Hasta ahora hemos utilizado tipos primitivos que estaban totalmente definidos tanto en estructura como en el dominio de valores que podían tomar.

Existe la posibilidad de definir tipos en C, de manera que podemos establecer cual es tanto la estructura como el dominio de valores.

Alterar la estructura lo dejamos para más adelante. De momento vamos a ver el caso más sencillo: establecer el dominio de valores. Para ello usamos tipos definidos por enumeración.

Esto en C se hace utilizando la palabra reservada "enum".

Ejemplos:

```c
enum DIA(lunes,martes,miércoles,jueves,viernes,sábado,domingo);

enum COLORES_SEMAFORO(rojo,ambar,verde);

enum COLORES(blanco,amarillo,azul);
```

Puedo definir junto con el tipo una variable que sea de ese tipo (la variable estado en el siguiente ejemplo):

```c
enum COLORES_SEMAFORO(rojo,ambar,verde) estado;
```

C internamente lo que hace es asignarle un valor entero a cada uno de esos valores por orden y guarda ese valor.

Lo normal, ya que he definido el tipo, es usar los valores que yo he puesto, pero podrían usar su correspondencia entera, ya que se asocia un 0 con el primer elemento, un 1 con el segundo y así sucesivamente hasta el último.

Se puede alterar la asociación de números, pero siempre manteniendo el orden para evitar problemas. Incluso se le puede definir un mismo valor entero a dos valores del tipo:

```c
enum DAY(Saturday,Sunday=0,Monday,Tuesday,Wednesday,Thursday,Friday) workday;
```

En este ejemplo, Saturday tiene valor 0 porque se asocia implícitamente. Sunday tiene el mismo valor 0 porque se asocia explícitamente y el resto de los días, consecutivamente, los valores 1-5.

## Tipos definidos por enumeración. Ejemplo

```c
#include<stdio.h>

int main()
{
    enum Days(Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday)TheDay;
    int j=0;
    printf("Please enter the day of the week (0 to 6) \n");
    scanf("%d",&j);
    TheDay(enumDays)j; /* Según compiladores se puede poner también Days(j) o directamente j */
    if (TheDay==Sunday || TheDay==Saturday)
        printf("Hurray, it is the weekend \n");
    else
        printf("Curses still at work \n");
    return 0;
}
```

## Librería math.h

Para poder compilar programas con la librería math.h, al final del gcc hay que añadir –lm.

```
gcc –o 9 9.c –lm
```
