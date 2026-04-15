---
title: Programación. Resolución de problemas (II)
description: El tipo real en programación, representación binaria de decimales, coma fija, coma flotante (mantisa-exponente), operaciones y funciones de biblioteca para reales.
date: 2014-10-13 13:54:00 +0800
categories: [Programación]
tags: [programacion, c, tipos-datos, reales, binario, coma-flotante, mantisa]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Tipo real

Es un tipo escalar no enumerable, por lo que representa algunas particularidades respecto a los anteriores tipos de datos.

Los enteros son infinitos, pero el número de elementos que hay entre dos enteros cualesquiera es finito. Con los reales no. Entre dos reales cualesquiera hay siempre infinitos números reales.

El dominio de sus posibles valores es función de la forma de representación interna del tipo. En cualquier caso, sólo determinadas fracciones son representables.

Por tanto, no todos los reales del intervalo representable son representables, y como consecuencia, al operar con números reales no se obtienen, en caso general, resultados exactos, sino aproximados.

## Representación binaria de números con decimales

Sabemos pasar a binario un número entero. No hay más que dividir por dos sucesivamente, o descomponerlo en sumas de potencias de 2. Por ejemplo _17 = 1·2⁴ + 0·2³ + 0·2² + 0·2¹ + 1·2⁰_

La parte decimal de un número funciona "igual" pero con potencias negativas.

Una forma de pasar a binario la parte decimal de un número consiste en multiplicar por dos, coger la parte entera, y a la nueva parte decimal aplicarle sucesivamente esto.

**Ejemplo:** _17,875_
- _17 = 10001_
- _0,875 =_

![Conversión a binario de 0,875](/img/posts/20141013_1.png)

Claro que no siempre se podrá representar con el número de decimales binarios que pretenda el número correspondiente, con lo que se pierde precisión. Por ejemplo, si la parte decimal la cambiamos por _,876:_

![Conversión a binario de 0,876 (pérdida de precisión)](/img/posts/20141013_2.png)

## Representación de reales en coma (o punto) fijo

Consiste en asignar un número de bits para la parte entera y otro para la parte fraccionaria.

Por ejemplo, si destino 32 bits para el número real, 24 son para la parte entera y ocho para la decimal.

**Ventaja.** Tengo una precisión constante.

**Inconveniente.** Limito el tamaño del mayor y el menor real que puedo representar y desperdicio la parte fraccionaria cuando no hay decimales o no es necesario usarlos todos.

Esta representación no es la que suelen usar los lenguajes de programación para la representación interna de los números reales. Su inconveniente es que siempre tendremos que trabajar con reales sea cual sea la representación. Sólo unas pocas fracciones pueden ser almacenadas con exactitud. Truncaremos el número eliminando aquellos bits de la parte fraccionaria que no se puedan almacenar por falta de espacio, o redondearemos, escribiendo el número representable que más se aproxima al número a representar. Al trabajar con reales, no se suelen obtener exactos sino aproximados.

## Representación mantisa – exponente

Cualquier número real se puede representar en una notación de tipo _mantisa × B^exponente_.

Si fijo la base B y siempre empleo la misma, no tengo que almacenarla, con lo cual sólo es necesario almacenar la mantisa y el exponente.

Como base B se puede emplear 2 o una potencia pequeña de 2. De esta manera, se podrá representar un intervalo más o menos amplio de números reales, centrado alrededor del valor real 0,0.

## Representación en coma flotante

Hay que guardar tres componentes:

- **Signo S.** Es un número de un bit que representa el signo (0 positivo, 1 negativo). Generalmente es el bit más significativo (el de la izquierda).
- **Exponente E.** Es un número binario que representa la potencia de dos por la que hay que multiplicar la mantisa. Cuanto mayor pueda ser ese exponente, mayor será el valor absoluto del mayor número que pueda ser representado.
- **Mantisa M.** Es un número binario que representa las cifras significativas del número. Cuanto mayor sea la precisión deseada (más cifras significativas conocidas), mayor debe ser el espacio destinado a contener esta parte.

En función de los bits empleados, se suelen hacer los siguientes repartos:

![Reparto de bits en coma flotante (32 y 64 bits)](/img/posts/20141013_3.png)

El signo 0 indica positivo y el signo 1 negativo.

El exponente en el rango -126 a +127 es desplazado mediante la suma de 127 para obtener un valor en el rango 1 a 254 (0 y 255 tienen valores especiales).

Cuando se interpreta el valor en punto flotante, el número es desplazado de nuevo para obtener el exponente real. Según lo que vale el exponente, significa distintas cosas:

![Tabla de interpretación del exponente](/img/posts/20141013_4.png)

La mantisa se ajusta con el exponente para que el binario empiece por 1 y se guarda el resto (no ese 1).

Lo dicho es con 32 bits. Si son 64 bits, el exponente es desplazado +1023.

**Ejemplo:** Codificar el número real _-118,65_

- El signo es **1**.
- El número pasado a binario es _1110110,101_
- Normalizado: _1110110,101 = 1,110110101 × 2⁶_

La mantisa es la parte a la derecha del punto decimal, rellenada con ceros a la derecha hasta obtener los 23 bits:

_11011010100000000000000_

El exponente es 6, pero hay que convertirlo a binario y desplazarlo:

_6 + 127 = 133_, escrito en binario como _10000101_

El resultado queda:

_1 | 10000101 | 11011010100000000000000_

## Tipos reales. Valores constantes

Los valores constantes de tipo real se escribirán en un algoritmo (representación externa) en notación arábiga, eventualmente precedidos por un signo + o –, o en notación científica.

**Ejemplos:** _466.3 / -85645.456 / +865.07E-7_

## Tipo real. Operaciones

Dispone de las operaciones de relación de datos escalares, pero con excepciones:

- No dispone de funciones sucesor ni predecesor, ya que no se puede concretar cuál es el número siguiente ni el anterior.
- El comparador de igualdad es muy peligroso usarlo en programas reales, ya que cualquier error de redondeo en los cálculos, por pequeño que sea, puede llevar a que dos datos reales no sean iguales.

**Operadores aritméticos binarios:** `+ - * /`

**Funciones aritméticas de biblioteca:**

| Función | Descripción |
|---|---|
| `abs(x)` | Valor absoluto |
| `sqr(x)` | Elevar al cuadrado |
| `sqrt(x)` | Raíz cuadrada |
| `sin(x)` | Seno (en radianes) |
| `cos(x)` | Coseno (en radianes) |
| `arctan(x)` | Arco tangente (resultado en radianes) |
| `ln(x)` | Logaritmo neperiano |
| `exp(x)` | Exponencial |
| `trunc(x)` | Truncar el real x devolviendo el mayor entero E tal que E <= x |

**Procedimientos de biblioteca para lectura y escritura de datos reales:**

```
leerReal(teclado, variableReal);
escribirReal(pantalla, expresionReal);
```

**¡Salud y coding!**
