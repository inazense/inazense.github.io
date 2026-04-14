---
title: Java. Ordenar un HashMap por key o value
description: Aprende a ordenar HashMap en Java por clave o valor con streams y lambdas. Tutorial completo con código paso a paso sobre sorting de Map, entrySet, comparingInt y LinkedHashMap con ejemplos prácticos.
author: Inazio Claver
date: 2020-12-03 11:33:00 +0800
categories: [Java]
tags: [java, hashmap, map, ordenacion, streams, sorting, collections]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Hace DEMASIADO tiempo que no actualizo este blog, vamos a quitarle las telarañas con una entrada corta, didáctica y que puede ser útil en más de una ocasión.
En esta ocasión vamos a ver cómo llevar a cabo una de las cosas más tontas del mundo, ordenar algo. Pero que puede ser un poco enrevesado según lo que te toque hacer.

## ¿Qué es un Map o HashMap en Java?

Antes vamos con una breve introducción. Básicamente, un **Map** o **mapa en Java** es una interfaz que nos va a permitir representar una **estructura de datos** que **almacene información** usando un **par de "clave - valor"**.

Es decir, que es la forma en la que vamos a poder tener la información guardada tal que así:

```json
{"Nombre": "Inazio", "Profesión": "Bordador de calcetines personalizados", ...}
```

¿Y **HashMap** entonces que es? **HashMap** es la **implementación de la interfaz Map**, ni más ni menos.

## Cómo ordenar un HashMap en Java

Para ordenar un **HashMap** en Java vamos a utilizar el siguiente código, que iré explicando paso a paso.

Lo primero, va a ser crear un **Map** que ordenar, que si no es como plantar judías para recoger melones, un sinsentido

```java
Map<Integer, Integer> map = new HashMap<Integer, Integer>();
		
map.put(0, 15);
map.put(1, 12);
map.put(2, 30);
map.put(3, 5);
map.put(4, 22);
map.put(5, 27);
map.put(6, 4);
map.put(7, 87);
```

Una vez que tengamos eso hecho, vamos a generar un método que nos devolverá el **mapa ordenado**, tal que así

```java
private Map<Integer, Integer> sortMapByValue(Map<Integer, Integer> map)
{
    Map<Integer, Integer> sortedMap =  map.entrySet().stream()
            .sorted(comparingInt(e -> -1 * e.getValue() ))
            .collect(toMap(
                    Map.Entry::getKey,
                    Map.Entry::getValue,
                    (a, b) -> { throw new AssertionError();},
                    LinkedHashMap::new
            ));
    return sortedMap;
}
```

Veamos en más detalle este código. Nuestra primera parada es esta

```java
map.entrySet().stream()
```

**entrySet()** nos va a devolver el mapa en formato de **colección**, que es lo que necesitamos para permitir su ordenación y **stream()** lo que nos va a permitir es obtener un **punto de entrada** a esa **colección**.

```java
sorted(comparingInt(e -> -1 * e.getValue()))
````

Este **método** nos va a permitir realizar la ordenación, comparando los valores de nuestro **Map** de forma descendente gracias al valor -1. Si quisiéramos hacerlo de forma ascendente debemos reemplazar este valor con un 1. Si queremos ordenar por **key** simplemente reemplazaríamos **e.getValue()** por **e.getKey()**.

```java
.collect(toMap(
        Map.Entry::getKey,
        Map.Entry::getValue,
        (a, b) -> { throw new AssertionError();},
        LinkedHashMap::new
));
```

Por último, este método nos procesa la información y la almacena en un contenedor de resultados mutables, y en este caso le indicamos que realiza un parseo a objeto **Map**.

Después de eso ya solo queda devolver nuestro **Map** y podremos pintar el resultado ordenado.

```json
Input: {0 : 15, 1 : 12, 2 : 30, 3 : 5, 4 : 22, 5 : 27, 6 : 4, 7 : 87,}
Output: {7 : 87, 2 : 30, 5 : 27, 4 : 22, 0 : 15, 1 : 12, 3 : 5, 6 : 4}
```

Si quieres ver el script completo puedes verlo en [mi repositorio de GitHub](https://github.com/inazense/scripts/blob/master/scripts/java/SortMapByValue.java).