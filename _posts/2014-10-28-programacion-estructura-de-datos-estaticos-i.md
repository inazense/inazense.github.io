---
title: Programación. Estructura de datos estáticos (I)
description:
date: 2014-10-28 23:16:00 +0800
categories: [programacion]
tags: [programacion, c, vectores, arrays, datos estaticos, macros, printf]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Macros

Con la directiva `#define` podemos definir macros en las primeras líneas del fichero.

Antes de compilar el programa, en una primera pasada, el compilador sustituirá la macro por su valor en todos los sitios que aparezca.

Podemos usar las macros para definir constantes:

```c
#define FALSO 0 /* Valores constantes en mayúsculas */
#define PI 3,141592
```

Las podemos usar para casos más complicados:

```c
#define MAX(a,b)(a>b?a:b)
```

## Cadenas printf

- `c` → Caracter → 'a'
- `d` → Decimal entero con signo → 382
- `e` → Notación científica (mantisa/exponente) → 3.9865e+2
- `E` → Notación científica (mantisa/exponente) → 3.9865E+2
- `f` → Decimal en coma flotante → 392,65
- `g` → Usa el privilegio de %e o %f → 392,65
- `G` → Usa el privilegio de %E o %F → 392,65
- `o` → Octal → 610
- `s` → Secuencia de caracteres → 'sample'
- `u` → Decimal entero sin signo → 7235
- `x` → Hexadecimal sin signo → 7fa
- `X` → Hexadecimal sin signo → 7FA
- `p` → Dirección de puntero → B8600000

## Precisión

Añadiendo entre el % y la letra un . y a continuación un número, especifico la precisión que deseo, cuyo significado depende del tipo de datos y la letra empleada.

- Para enteros (`d`, `i`, `o`, `u`, `x`, `X`) → Especifica el número mínimo de dígitos que pueden ser escritos. Si el dado es más largo no será contado. Si es más corto se rellenará con ceros.
- Para reales (`e`, `E`, `f`) → Especifica el número de dígitos decimales que saldrán
- Para reales (`g`, `G`) → Especifica el número máximo de dígitos decimales que saldrán
- Para cadenas → Número máximo de caracteres a ser escritos. Por defecto se escriben todos los que tienen la cadena antes del carácter nulo
- Caracter nulo → `\0`

## Ejemplo

```c
/* printf example */

#include<stdio.h>

int main()
{
    printf("Characters: %c, %c \n",'a',65);
    printf("Decimals: %d, %d \n",1977,6500001);
    printf("Procedy with blants: %.10d \n",1977);
    printf("Procedy with blants: %010d \n",1977);
    printf("Blue differents redixes: %d,%x,o,%#X,%#o \n",100,100,100,100,100);
    printf("Width triels: %*d \n",5,10);
}
```

## Tipos definidos por el usuario

En ocasiones los tipos que ofrece un lenguaje de programación como tipos predefinidos se le quedan cortos al programador para almacenar en ellos la información que tiene que manejar.

Los lenguajes de programación ofrecen mecanismos para que el programador puede definirse tipos.

Concretamente, es raro que un lenguaje de programación no ofrezca la posibilidad de hacer uso de **vectores** y **registros**

## Definición de tipos

Antes de declarar una variable de un tipo de datos definido por el usuario, será necesario declarar el tipo de datos en cuestión. Hay lenguajes de programación (C por ejemplo) donde esto no es necesario.

## Estructura del algoritmo

```
Algoritmo ejemplo
{comentarios}
"Declaración de constantes"
"Declaración de tipos"
"Declaración de variables"

Principio
    "instrucción 1"
    "instrucción 2"
    …
    "instrucción n"
Fin
```

## Vectores

Un vector es un tipo de datos que nos permite guardar una secuencia de datos de un tipo determinado.

Hay problemas en los que tengo que guardar una secuencia de datos de un mismo tipo y donde el orden podría ser importante, incluso el poder acceder directamente a un elemento determinado de una secuencia.

Por ejemplo, yo con lo que conozco hasta ahora no podría resolver problemas como este:

"Pedir una secuencia de datos por teclado terminada en 0 (de longitud desconocida pero finita y acotable), e invertirla mostrando por pantalla la secuencia en orden inverso."

Disponía hasta ahora de variables enteras, pero no de una forma de poder almacenar 20, 50 o 100 enteros y poderlos manipular a mi antojo.

Otro ejemplo podría ser el siguiente:

"Contar el número de apariciones de una letra del alfabeto de un texto que es introducido una sola vez en el computador"

## Vectores. Definición formal

Un vector v es una aplicación de un conjunto finito I de valores escalares, ordenados y consecutivos, denominado conjunto de índices del vector, en otro conjunto D de datos variables de un mismo tipo, conjunto de base del vector.

Los valores escalares del conjunto I podrían ser de un tipo entero, caracter o definido por enumeración. Se puede poner el tipo completo (si es definido por enumeración) o un subgrupo.

El tipo de datos para los datos variables, podría ser cualquiera.

Ejemplos:

```
vector[1,15] de real;
vector['A','Z'] de real;
vector[tipoDias] de caracter (siendo tipoDias=(lunes,martes,miércoles,jueves,viernes,sábado,domingo)
```

## Definición de vectores

```
Algoritmo vectores
Tipos
    vectorReales=vector[1..20] de real;
    vectorFrecuencias=vector['a'..'z'] de entero;
variables
    v:vectorReales;
    w:vectorReales;
    f:vectorFrecuencias;
principio
    …
Fin
```

## Uso de vectores

Una variable de tipo vector es una estructura de datos compuesta de un número fijo de componentes del tipo de datos del vector.

Cada componente puede denotarse explícitamente y puede accederse a su valor, escribiendo el nombre de la variable de tipo vector, seguido del valor de su índice, encerrado entre corchetes.

```
<nombre vector>[<expresión>]
```

La evaluación de `<expresión>` da como resultado el valor del índice del elemento considerado.

Una componente de un vector puede usarse exactamente igual que una variable de ese mismo tipo, y puede aparecer en cualquier expresión del mismo modo.

Ejemplos:

```
v[17]:=14.1;
w[i]:=w[i-1]+1;
f['a']:=f['b']+f[chr(ord('c')+9)]-7;
si (v[i]>v[i+1]) entonces…
```

## Vectores. Representación interna

La representación interna de un dato de tipo vector se realiza de forma contigua en memoria, es decir, representando una tras otra todas las componentes del vector.

Por consiguiente lo que el vector ocupará en memoria dependerá del tipo del que sean las componentes y el número de componentes.

El tiempo de acceso a cualquiera de las componentes será lógicamente el mismo, y podemos acceder directamente a las componentes que nos interesen.

## Vectores. Operaciones

**Asignación.** Al igual que con cualquier variable podemos asignarle a un vector otro vector que sea exactamente del mismo tipo.

El resultado de la instrucción de asignación, a todas y cada una de las componentes del vector del lado izquierdo, de todos los valores de las componentes del vector del lado derecho.

**Recorrido del vector:**

```
para indice:=<valor inicial> hasta <valor final> hacer
    <acción afectando a la componente índice>
fpara
```

## Ejemplo: invertirSecuencia

```
Algoritmo invertirSecuencia
{Lee una secuencia de datos del tipo entero, terminada con un 0, y la escribes en orden inverso. La secuencia será de longitud menor que 1000}

Constantes
    N=1000;
Tipos
    tvec=vector[1..N]de entero;
Variables
    v:tvec;
    cont,num,i:entero;

principio
    cont:=0;
    leerEntero(teclado,numero);
    mientras que numero <>0 hacer
        cont:=cont+1;
        v[cont]:=numero;
        leerEntero(teclado,numero);
    fmq
    para i:=cont descendiendo hasta 1 hacer
        escribirEntero(pantalla,v[i]);
    fpara
fin
```

## Ejercicios

**Ejercicio 1:** Escribe un procedimiento que lea de teclado una secuencia de caracteres y los almacene en el vector secuencia de tipo tsec. N y secuencia son parámetros del procedimiento.

```
Algoritmo almacenarCaracteres

Constantes
    maxN=1000;
Tipos
    tsec:=vector[1..maxN] de caracter;

procedimiento leerSecuencia (E N:entero, S secuencia:tsec)
variables
    indice:entero;
principio
    para indice:=1 hasta N hacer
        leerCaracter(teclado,secuencia[indice])
    fpara
fin
```

**Ejercicio 2:** Escriba un procedimiento que escriba por pantalla los N primeros elementos del vector secuencia

```
Procedimiento escribirSecuencia(E N:entero, E secuencia:tsec)

    variables
        indice:entero;
    principio
        para indice:=1 hasta N hacer
            escribirCaracter(pantalla,secuencia[indice])
        fpara
    fin
```

## Vectores multidimensionales

Una estructura de datos multi-indexada puede ser construida a partir de mecanismos de definición de vectores (con un único índice) presentado anteriormente.

Así, por ejemplo, una matriz de dimensión nxm puede ser declarada como un vector de vectores:

```
Constantes
    N=150;
    M=50;
Tipos
    fila=vector[1..N] de entero;
    columna=vector[1..M] de fila;
Variables
    m:matriz;
```

El dato declarado y sus elementos pueden ser accedidos de la forma:

- `m` → Dato de tipo matriz
- `m[i]` → Dato de tipo fila
- `m[i][j]` → Dato de tipo entero

También se puede definir (ya que la forma anterior puede resultar algo pesada) un vector con varios índices.

```
Tipos
    matriz=vector[1..N,1..M] de entero;
    estadoCasilla=(agua,barco);
    planoNaval=vector['A'..'J',1..10] de estadoCasilla;

Variables
    m:matriz;
    miPlano:planoNaval;
```

Para acceder a los elementos:

- `m` → Dato de tipo matriz
- `m[i,j]` → Dato de tipo entero
- `miPlano` → Dato de tipo plano
- `miPlano['C',7]` → Dato de tipo estado
