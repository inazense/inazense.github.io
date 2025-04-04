---
layout: post
title: Java. Ordenar un HashMap por key o value
date: 2020-12-03 11:57:00
description: Uso de streams para ordenar un HashMap 
categories: java
---

En esta ocasión vamos a ver cómo llevar a cabo una de las cosas más tontas del mundo, ordenar algo. Pero que puede ser un poco enrevesado según lo que te toque hacer.

## ¿Qué es un Map o HashMap en Java?

Antes vamos con una breve introducción. Básicamente, un **Map** o **mapa** en **Java** es una interfaz que nos va a permitir representar una **estructura de datos** que **almacene información** usando un **par de "clave - valor"**.

Es decir, que es la forma en la que vamos a poder tener la información guardada tal que así:

{"Nombre": "Inazio", "Profesión": "Bordador de calcetines personalizados", ...}

¿Y **HashMap** entonces que es? **HashMap** es la **implementación de la interfaz Map**, ni más ni menos.

## Cómo ordenar un HashMap en Java

Para ordenar un **HashMap** en Java vamos a utilizar el siguiente código, que iré explicando paso a paso.

Lo primero, va a ser crear un **Map** que ordenar, que si no es como plantar judías para recoger melones, un sinsentido

<br>

{% highlight java linenos %}

Map<Integer, Integer> map = new HashMap<Integer, Integer>();
		
map.put(0, 15);
map.put(1, 12);
map.put(2, 30);
map.put(3, 5);
map.put(4, 22);
map.put(5, 27);
map.put(6, 4);
map.put(7, 87);

{% endhighlight %}

<br>

Una vez que tengamos eso hecho, vamos a generar un método que nos devolverá el **mapa ordenado**, tal que así

<br>

{% highlight java linenos %}

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

{% endhighlight %}

<br>

Veamos en más detalle este código. Nuestra primera parada es esta

{% highlight java linenos %}
map.entrySet().stream()
{% endhighlight %}

**entrySet()** nos va a devolver el mapa en formato de **colección**, que es lo que necesitamos para permitir su ordenación y **stream()** lo que nos va a permitir es obtener un **punto de entrada** a esa **colección**.

{% highlight java linenos %}
sorted(comparingInt(e -> -1 * e.getValue()))
{% endhighlight %}

Este **método** nos va a permitir realizar la ordenación, comparando los valores de nuestro **Map** de forma descendente gracias al valor -1. Si quisiéramos hacerlo de forma ascendente debemos reemplazar este valor con un 1. Si quisiesemos ordenar por **key** simplemente reemplazaríamos **e.getValue()** por **e.getKey()**.

<br>

{% highlight java linenos %}

.collect(toMap(
        Map.Entry::getKey,
        Map.Entry::getValue,
        (a, b) -> { throw new AssertionError();},
        LinkedHashMap::new
)); 

{% endhighlight %}

<br>

Por último, este **método** nos procesa la información y la almacena en un **contenedor de resultados mutables**, y en este caso le indicamos que realiza un **parseo** a objeto **Map**.

Después de eso ya solo queda devolver nuestro **Map** y podremos pintar el resultado ordenado.

<br>

```
Input: {0 : 15, 1 : 12, 2 : 30, 3 : 5, 4 : 22, 5 : 27, 6 : 4, 7 : 87,}
Output: {7 : 87, 2 : 30, 5 : 27, 4 : 22, 0 : 15, 1 : 12, 3 : 5, 6 : 4}
````

<br>

**¡Salud y coding!**
