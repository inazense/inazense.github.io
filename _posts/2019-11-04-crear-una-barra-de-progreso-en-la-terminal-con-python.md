---
title: Crear una barra de progreso en la terminal con Python
description: Aprende a crear barras de progreso en la terminal con Python usando tqdm. Tutorial completo paso a paso sobre instalación, uso en bucles for/while, iteración de listas y ejemplos prácticos de código.
author: Inazio Claver
date: 2019-11-04 11:33:00 +0800
categories: [Python]
tags: [python, tqdm, barra-progreso, terminal, cli, progress-bar]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Cuando trabajamos con **Python** pintando resultados en la **terminal**, puede quedar un poco feo dejar el cursor esperando mientras procesamos ciertas acciones que van a tardar un tiempo en completarse. Esto es así aquí y en la China. El cursor parpadeando pone nervioso a todo el mundo.

Pero... ¿cuál podría ser la solución? Cierta librería, llamada **tqdm**, disponible para **Python 3.x.**

## ¿Qué es tqdm? 

Es una **librería de Python** que nos va a permitir pintar **barras de progreso** directamente en la **terminal**, iterando en bucles for / while y de la que nos vamos a desentender prácticamente desde el primer minuto.

El resultado final sería tal que así

![tqdm lib example on python 3](/img/posts/20191104_1.png)

Una simple **barra de progreso**, en el color por defecto de la **terminal**, que se irá rellenando progresivamente según iteremos dentro de nuestro bucle.

## ¿Y cómo se hace eso?

Lo primero, será instalar **tqdm**. Para ello nos iremos a la terminal y escribiremos el siguiente comando:

```bash
pip install tqdm
```

Por supuesto, si en nuestro ordenador tenemos **Python2** y **Python3**, deberemos reemplazar el comando **pip** por **pip3**.

Hecho esto, veamos un par de ejemplos, harto sencillos ambos dos.
En el primer **script**, vamos a realizar una iteración hasta llegar a un número en concreto, por ejemplo el 100:

```python
from tqdm import tqdm
from time import sleep

tareas = 100

for i in tqdm(range(tareas)):
    sleep(0.2)
```

Básicamente lo que estamos haciendo es importar nuestra **librería**, definir un valor hasta el que iterar y envolver el objeto sobre el que iteraremos con el método **tqdm**. Rápido y sencillo.
La función sleep simplemente "duerme" la aplicación 0.2 segundos cada vez que entra en el **for**, para poder ver el progreso de nuestra barra tranquilamente. Por supuesto, no es necesario mantenerla y está ahí como mero ejemplo del **código** que podemos insertar.

Y, en caso de que lo que deseemos sea un lista, lo haremos del siguiente modo:

```python
from tqdm import tqdm
from time import sleep

tareas = ["tarea1", "tarea2", "tarea3", "tarea4", "tarea5"]

for i in tqdm(tareas):
    sleep(0.2)
```

¿Cuál es la única diferencia? Que ya no usamos el **range**, sino que lo recorremos como si fuese una lista (¡que lo es!) normal **pythonesca** de toda la vida.

Y hecho esto, ya podemos trabajar felices de la vida sabiendo que nuestros resultados aparecerán por pantalla de una forma un poquito más visual que antes.

**¡Salud y coding!**