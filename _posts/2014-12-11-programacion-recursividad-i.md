---
title: Programación. Recursividad (I)
description: Introducción a la recursividad en programación. Algoritmos recursivos lineales y múltiples, casos triviales, ley de recurrencia y ejemplos de factorial y MCD.
author: Inazio Claver
date: 2014-12-11 18:26:00 +0800
categories: [Programación]
tags: [programacion, c, recursividad]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Ejercicio introductorio

Escribe una función en notación algorítmica que devuelva el factorial de un número natural introducido como parámetro.

**Solución iterativa:**

```
funcion factorial(n:entero) devuelve entero
{Pre: n>0}
Variables
    resultado:entero;
    indice:entero;
Principio
    resultado:=1;
    para indice:=2; indice<=n; indice++
        resultado:=resultado*indice;
    devuelve resultado
Fin
```

## ¿Otra manera?

¿Existe otra manera cualitativamente distinta de hacer lo que nos han pedido, que suponga al mismo tiempo una forma distinta de pensar en algoritmo para dar solución a problemas?

Sí, existe otra forma, que además es más intuitiva, y hace que podamos resolver problemas con algoritmos que nos resultan más sencillos de pensar.

**Solución recursiva:**

```
funcion factorial(n:entero) devuelve entero
{Pre: n>0}
Principio
    si n=1
        entonces
            devolver(1);
        si no
            devolver(n*factorial(n-1));
    fsi
Fin
```

Hasta ahora conocíamos violaciones de segmento, ahora podemos generar desbordamiento de pila (por cierto, nombre de un muy buen foro de programación: http://stackoverflow.com).

Las llamadas recursivas se desarrollarían así:

```
n*factorial(n-1)
(n-1)*factorial(n-2)
(n-1)*factorial(n-3)
…
3*factorial(2)
2*factorial(1)
1
```

## Ejercicio

Escribe una función que calcule el máximo común divisor (mcd) de dos números naturales, a y b, sabiendo que `mcd(a,b)=mcd(b, a MOD b)` si a>=b, y en caso contrario, `mcd(a,b)=mcd(a, b MOD a)`. Da una solución recursiva.

Ejemplo: `mcd(60, 45) = mcd(45, 15) = mcd(15, 0)`

**Solución:**

```
funcion mcd(a, b:entero) devuelve entero
{Pre: a>=0, b>=0}
Principio
    si a=0
        entonces devolver(b);
        si no
            si b=0
                entonces devolver(a);
                si no
                    si a>b
                        entonces devolver(mcd(b, a MOD b));
                        si no devolver(mcd(a, b MOD a));
                    fsi
            fsi
    fsi
fin
```

## Algoritmo recursivo

Un algoritmo recursivo debe tener:

- **Un tratamiento de todos los casos triviales** que puedan darse en el problema a resolver. Dicho tratamiento no puede hacer llamadas recursivas y sí tiene que dar una solución inmediata a esos casos triviales.

- **Un tratamiento del caso no trivial.** Dicho tratamiento hará uso de una ley de recurrencia que mediante una fórmula o conjunto de acciones u operaciones resolverá el caso no trivial mediante llamadas a la propia función (o procedimiento) con parámetros "más pequeños" que converjan a uno de los casos triviales.

Para que el caso sea válido y funcione, cada llamada recursiva debe de hacer que la siguiente llamada se aproxime más a un caso trivial de forma que al final se llegue a dicho caso.

## Tipos de algoritmos recursivos

**Lineales.** Cada invocación genera una nueva invocación y sólo una (excepto la última, claro). El factorial es un ejemplo.

- **Final.** Lo último que hace el algoritmo es precisamente esa invocación.
- **No final.** Tras la invocación aún hay que hacer algún cálculo en el resultado de la invocación. El ejercicio de factorial sería no final, ya que tras la invocación hay que hacer la multiplicación.

**Múltiples.** Una misma invocación puede generar más de una invocación, por ejemplo, el cálculo de Fibonacci.

## Inconvenientes

En general las soluciones recursivas son:

- Menos eficientes que las iterativas.
- Más claras y sencillas que las iterativas.

Lo bueno es pensar en recursivo e implementar en iterativo.

Podemos transformar en muchos casos los algoritmos recursivos en iterativos con más o menos dificultad.

**¡Salud y coding!**
