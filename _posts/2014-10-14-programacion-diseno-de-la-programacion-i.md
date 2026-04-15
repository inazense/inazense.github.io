---
title: Programación. Diseño de la programación (I)
description:
date: 2014-10-14 21:22:00 +0800
categories: [Programación]
tags: [programacion, c, subprogramas, funciones, procedimientos, parametros]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Diseño descendente

Hasta ahora: Problema difícil → ¿Solución?

A partir de ahora: Problema difícil → División en subproblemas → Solución de subproblemas

Cuando necesitemos un algoritmo que resuelva un problema difícil, puedo dividirlo en subprogramas (que al ser más pequeños son más sencillos de resolver), y ocuparme de solucionar esos subproblemas, pensando los correspondientes subalgoritmos.

Si alguno de mis subproblemas continúa siendo demasiado difícil, puedo volver a descomponerlo en subproblemas y buscar solución a estos, y así tantas veces como sea necesario.

## Abstracción

Con los algoritmos ocurre lo siguiente:

- Mi problema principal se resuelve resolviendo un conjunto de subproblemas. Yo sin más enumero las tareas a realizar y me dan igual esos detalles para elaborar mi algoritmo.
- Al entrar a resolver cada subproblema, yo cumplo las especificaciones técnicas que me han dado, escribo un subalgoritmo que resuelve ese subproblema y me despreocupo del uso que se vaya a hacer de él siempre y cuando se respeten esas especificaciones y el subalgoritmo sea empleado para lo que sirve.

Ejemplo.

_Calcula el área del triángulo:_

_¿Qué hacer?_

_Pedir datos al usuario_

_Calcular la superficie_

_Mostrar resultados por pantalla_

Hasta ahora, para resolver un problema pensábamos de una forma "ascendente". ¿Qué instrucciones tengo que poner abajo para darle solución a ese gran problema que tengo?

A partir de ahora para resolver problemas pensamos de arriba abajo. Para resolver mi problema, ¿qué tareas lo resuelven? Y luego, ¿esas tareas, con qué subtareas se resuelven?

Y al final de todo terminarás poniendo las instrucciones necesarias.

Nuestro lema es: _Divide y vencerás_

## Subprogramas

Un subprograma puede hacer las mismas acciones que el programa principal. La idea es darle un nombre a un trozo de programa y quitar de en medio.

## ¿Qué conseguimos?

**Sencillez.** Resolvemos problemas más pequeños y utilizamos la solución para solucionar problemas mayores.

**Claridad.** Nos queda un programa mucho más corto donde se puede ver más fácilmente lo que se está haciendo.

**Reusabilidad.** Si se hace lo mismo en varios puntos del programa sólo hay que escribirlo una vez y hacerlo funcionar siempre. Si hubiera errores en ese trozo de programa, sólo habría que corregirlo una vez.

**Reparto de trabajo.** Podemos darle los subproblemas a resolver a diferentes programadores que pueden trabajar en paralelo.

**Resulta más difícil equivocarse y más sencillo corregir errores.** Los subprogramas pueden probarse uno a uno antes de juntarlos. Los errores en programas cortos y claros se encuentran más fácilmente.

## Ejecución de un programa con subprogramas

El programa se va ejecutando hasta llegar a la llamada a un subprograma.

El programa principal LLAMA o INVOCA al subprograma (pudiendo enviar datos).

El subprograma devuelve el control al programa principal (puede devolver datos).

El programa continúa ejecutándose justo donde se había quedado.

## Consideraciones

Se puede llamar varias veces en un mismo subprograma. Un subprograma puede llamar a otro subprograma y así sucesivamente tantas veces como sea necesario.

Un subprograma puede llamarse incluso a sí mismo.

Se puede llamar a un subprograma en cualquier parte de un programa o subprograma.

## Parámetros

Un programa y un subprograma se comunican información por medio de parámetros.

Los parámetros pueden ser:

- **De entrada (E).** Del programa al subprograma al invocarlo
- **De salida (S).** Del subprograma al programa al devolverle el control
- **De entrada / salida (E/S).** En ambas direcciones

Los parámetros de entrada, cuando los pasa el programa principal, tienen que ser una expresión de cualquier tipo (eso sí, el tipo de datos resultante tiene que ser el que espera el subprograma). Podría ser una variable, un dato…

Los parámetros de salida o entrada/salida, en cambio, tienen que ser necesariamente una variable, ya que es en esa variable donde se almacenará el dato que devuelva el subprograma.

Ejemplo

_Subprograma destruyeMatriz_

_{Pasándole una matriz, pone a 0 todos los elementos que están fuera del rango [min,max] (también parámetros) y que me devolviera en otro parámetro "destruidos" el número de elementos destruidos}_

```
/* Mi subprograma empezaría definiendo esos parámetros */

Subprograma destruyeMatriz (E/S matriz, E min, E max, S destruidos)
```

Normalmente hay que definir de qué tipo de datos es cada parámetro que va a utilizar el subprograma (aquí lo he obviado para centrarme en lo que interesa en esta explicación)

```
/* Lo llamaría desde el subprograma principal, por ejemplo: */

destruyeMatriz (miMatriz, 3.5+i, cuantos);

/* Obsérvese que miMatriz y cuantos, al ser parámetros S o E/S son necesariamente variables.
   En cambio, para los valores min y max, como son parámetros de entrada, puedo pasar los
   datos constantes o expresiones que serán evaluados antes. */
```

## Parámetros actuales y formales

Los parámetros formales son los que figuran en la declaración del subprograma y son usados para efectuar los cálculos necesarios en su interior.

```
Subprograma destruyeMatriz(E/S matriz, E min, E max, S destruidos)
```

Los parámetros actuales son los que se pasan desde el programa principal

```
destruyeMatriz(miMatriz, 3.5+i, cuantos);
```

Los parámetros actuales hay que pasarlos en el mismo orden en el que han sido declarados como parámetros formales y cada uno tiene que ser compatible con el tipo que está esperando el subprograma para ese parámetro.

Al hacer la invocación se asocian uno a uno los parámetros actuales con los formales pasando la información que contienen.

Al serle devuelto el control del programa o subprograma invocante, se devuelven en las variables los valores asociados a los parámetros de salida o entrada/salida.

## Tipos de subprogramas

En programación hay dos tipos de subprogramas:

- **Funciones.** Subprogramas que realizan operaciones sobre uno o más valores que se han pasado como parámetros y producen un único dato como resultado (del tipo que sea).
- **Procedimientos.** Subprogramas que realizan una serie de acciones que pueden modificar algunos de los parámetros que reciben, pero no tienen asociado ningún valor concreto que devuelvan como resultado.

## Funciones

En estado puro una función es un subprograma que realiza operaciones sobre uno o más valores que se han pasado como parámetros y produce un único dato como resultado (del tipo que sea).

Sólo admite parámetros de entrada. No puede modificarlos ni hacer nada con ellos para que puedan devolver al programa principal ninguna información.

Su única forma de enviar información al programa que le ha llamado es mediante el valor del dato que devuelve como resultado.

El dato que devuelve puede ser de cualquier tipo.

## Declaración de funciones. Sintaxis

```
Función <nombre de función>(<lista de parámetros formales>) devuelve <tipo>
Variables
  <definición de variables locales>
Principio
  <acciones> (Utilizando parámetros formales)
  Devolver <expresión>
Fin
```

- **\<nombre función\>** Nombre identificativo para la función
- **\<lista de parámetros formales\>** Entre paréntesis, pondremos los parámetros formales que esperan la función. De cada parámetro habrá que especificar nombre, tipo de datos y clase. Se separarán por comas

  _EJ: función g(E x:real, E y:real) devuelve real;_

- **\<tipo\>** Tipo de datos que devuelve la función
- **\<definición de variables locales\>** Aquí definimos variables locales que serán utilizadas dentro de la función. Sólo existen dentro de ellas. Cuando la función termine, las variables serán destruidas e inaccesibles.
- **\<acciones\> (Utilizando parámetros formales)** Las acciones son similares a las de un programa. Se pueden llamar a otras funciones o procedimientos. En esas acciones se pueden usar los parámetros formales para hacer cálculos con ellos.
- **Devolver \<expresión\>** Devolver es una instrucción especial que sólo tienen las funciones. Evalúa la expresión y devuelve el dato que obtenemos (que tiene que concordar con el tipo establecido en la cabecera de la función tras el "devuelve") al programa o subprograma que invocó a la función.

Ejemplo de declaración

```
función factorial(n:entero) devuelve entero
variables
  resultado:entero;
  indice:entero;
principio
  resultado:=1;
  para indice:=2 hasta n hacer
    resultado:=resultado*indice;
  fpara
  devolver resultado
fin
```

## Llamada a una función

```
<nombre de función> (<lista de parámetros actuales>)
```

Correspondencia entre parámetros formales y actuales:
- mismo número
- de izquierda a derecha
- parámetros correspondientes del mismo tipo

Una llamada a una función devuelve un valor y por lo tanto es una expresión o parte de una expresión.

Ejemplos:

```
A:=Factorial(7);

C:=Factorial(A)-Factorial(7)+b;

Algoritmo calculaFactorial
variables
  numero:entero;
principio
  escribirCadena(pantalla,'Introduzca un número para calcular su factorial');
  leerEntero(teclado,numero);
  escribirCadena(pantalla,'El factorial del número es:');
  escribirEntero(pantalla,factorial(numero));
fin
```
