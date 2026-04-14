---
title: Programación. Codificación de programas en C (IV)
description:
date: 2014-10-17 21:34:00 +0800
categories: [programacion]
tags: [programacion, c, funciones, parametros, punteros, subprogramas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Subprogramas en C

En C no existen ni los procedimientos ni las funciones tal cual vistas.

¿Qué existe pues? La gran chapuza desde un punto de vista formal. Las funciones procedimentales (todo en uno, a partir de ahora llamadas funciones) que es un instrumento de lo más flexible para escribir subprogramas.

- Devuelven un valor (como las funciones)
- Admiten parámetros E, S o E/S (como los procedimientos)

## Funciones en programas

Un programa en C consta de una o más funciones.

Tiene que tener necesariamente la función main

`void main()`

Puede tener otras funciones declaradas que serán usadas por main o por otras funciones que sean usadas en main o en funciones que son usadas por funciones que son usadas en main, o…

Es conveniente declarar una función antes de usarla, para que el compilador la reconozca cuando se encuentre una invocación a ella.

Una función (en sentido estricto) en C:

`int factorial(int n)`

Un procedimiento en C:

`void intercambiar (int *a,int *b) /*Si es de entrada, sin asteriscos */`

También admite además de las funciones que hayamos podido declarar en el fichero, funciones que haya en librerías.

- Librerías del propio compilador: stdio.h, string.h, ctype.h, math.h, stdlib.h, time.h…
  - Para usarlas: `#include<librería>`
- Librerías creadas por el usuario.
  - Para usarlas: `#include"librería"`

## Declaración de una función en C

```c
<tipo función><nombre función>(<lista parámetros formales>) {
       /* Declaración de variables locales */
       /* Instrucciones */
       return(expresión)
}
```

Como tipo función sirve cualquier tipo que se os pueda ocurrir (y otros que todavía no conocéis) más el tipo void que indica que la función no devuelve nada.

Return sólo hay que usarlo si el tipo no es void

## Parámetros en funciones

Tenemos tres tipos de parámetros: E, S y E/S

C y otros lenguajes de programación sólo disponen de dos mecanismos para pasar parámetros.

- Por valor → Sirve para parámetros de entrada
- Por referencia → Sirve para parámetros de salida o entrada/salida

## Paso de parámetros por valor

El valor de la variable que se pasa como parámetros o el resultado de evaluar la expresión que se ha puesto (parámetro actual) es copiado a una variable local de la función C.

Como esa variable local muere cuando termina de ejecutarse la función, no sirve para devolver nada.

```c
int mi_funcion(int n){
       …
       n=30;
}

main()
{
       …
       a=7;
       f=mi_funcion(a);
…
}
```

## Paso de parámetros por referencia

En vez de pasar el valor de la variable, se copia la dirección de la variable que contiene el valor.

Para hacer esto, obsérvese que como parámetro actual ponemos delante de la variable correspondiente el símbolo `&` y en la función invocada, como parámetro formal, aparecer delante un `*` cada vez que nos referimos a él.

```c
int mi_proc(int *n){
       …
       *n=30;
}

main()
{
       …
       a=7;
       f=mi_proc(&a);
       …
}
```

## Ejercicio

Hacer válida una fecha. Crear una función que pasándole día, mes y año diga si es correcta

```c
int fecha_correcta(int dia, mes, agno)
       return(dia_correcto(dia,mes,agno)&&mes_correcto(mes));

int mes_correcto(int mes)
       return(mes<0 &&mes>13);

int dia_correcto(int dia, int mes, int agno)
       return(dia<0&&dia<=dias_mes(mes,agno);

int bisiesto(int agno)
       return(agno%4==0 && agno%100!=0 || agno%400==0);

int dias_mes(int m, int a){
       switch m{
            case 1
            case 3
            case 5
            case 7
            case 8
            case 10
            case 12: return(31);
            break;
            case 4
            case 6
            case 9
            case 11: return(30);
            break;
            case 2: if (bisiesto(a))
                                   return(29);
                        else
                                   return(28);
                        break;
            default: return(0);
       }
}

main()
{
       …
       pedir_fecha(…)/* Pon lo necesario para que esa función pida al usuario día, mes y año guardándolos en las variables oportunas */
       while (!fecha_correcta(d,m,a))
            pedir_fecha(…);
}
```

## Números aleatorios

Incluir `<stdlib.h>` y `<time.h>`

```c
srand((unsigned int)time(NULL)); /*forma CORRECTA de realizarlo */
random=rand()%26 /*Con este ejemplo los números serán del 0 al 25 */
```

## Tamaño de los tipos: sizeof()

```c
#include<stdio.h>

main()
{
       long double tipo;
       printf("El tamaño del tipo long double es: %d bytes \n",sizeof(tipo));
}
```

## Selección múltiple: Sintaxis y semántica

```c
switch (variable){
       case valor1: … break;
       case valor2: … break;
       …
       default: …;
}
```

El default es obligatorio.

En cuanto el valor de las variables coincide con el valor, se ejecutan TODAS las instrucciones que se encuentran a continuación HASTA QUE APAREZCA UN break.

## Composición iterativa indexada

```c
for(…;…;…) {…}
```

Consta de tres partes:

1. **Inicialización.** Se ejecuta una vez al principio
2. **Condición para terminar.** Se ejecuta el bucle mientras esa condición es cierta
3. **Cada vez.** Esta parte se ejecuta cada vez que se ejecuta el contenido del bucle.

Ejemplos:

```c
for(i=1;i<MAX;i++){…}
for(i=1,j=0;i<MAX;i++){…}
for(i=1;j=0;i<MAX && j>0;i++,j--){…}
```

## Otras formas de iterar

Condición al final: `do{…}while()` Primero ejecuta y luego chequea una condición para ver si sigue ejecutando. Siempre se ejecuta mínimo una vez.

Lo que jamás hay que usar en C, pero lo permite, es:

- `etiqueta…;…;…;…; goto etiqueta;`

Dos instrucciones especiales dentro del bucle:

- `break`: Fuerza la salida del bucle aunque se cumpla la condición
- `continue`: Se salta todo lo que queda de bucle y pasa a la siguiente iteración

En cualquier caso, usando cualquiera de las formas de iterar que hemos visto podemos hacer de todo. No es necesario usarlas todas para programar. Los programadores de C suelen usar el for por su flexibilidad.
