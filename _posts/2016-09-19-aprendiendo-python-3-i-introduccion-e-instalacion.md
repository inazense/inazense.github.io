---
title: Aprendiendo Python (I). Introducción e instalación
description: Introducción y cómo instalar Python 3 en nuestro equipo
author: inazense
date: 2016-09-19 23:46:00 +0100
categories: [Python]
tags: [python, teoria]
image:
  path: /assets/pictures/posts/python_logo.jpeg
  alt: Python post
---

Antes de nada más que un **tutorial sobre Python** esto va a ser un diario de aprendizaje. Iremos conociendo este lenguaje de la mano, intentaré explicar todo que vaya aprendiendo y espero que os resulte productivo.

**Python** es un lenguaje interpretado y multiparadigma, ya que soporta orientación a objetos, programación funcional y programación imperativa, además de contar con licencia abierta. Y por si fuese poco todo esto, también es multiplataforma. ¿Que más podemos pedir?

El nombre del lenguaje no tiene nada que ver con el tipo de serpientes que te vendrán a la cabeza, sino con los Monty Python. Su creador, **Guido van Rossum**, era un gran aficionado a los británicos y decidió homenajearlos poniéndole este nombre. Ni pintado le salió al hombre...

![origen nombre python](/assets/pictures/posts/python_introduccion_1.jpg)

**Python** se está alzando ultimamente como el lenguaje más usado para iniciarse en la programación porque no requiere ni aprender una sintaxis compleja, ni emplear llaves, ni siquiera punto y coma. Hasta hay libros para niños que les permite aprender **Python**. Yo me inicié con **C** puro y duro, y desde luego en ese lenguaje dudo que encuentre algo "orientado para niños"...

Bueno, hasta ahora hemos hecho un breve repaso a las características de **Python** y estamos deseosos de ponernos a programar con él. Notamos un subidón por las venas, los dedos ansían teclear... Solo nos queda en que **Python** programar.

¿En qué **Python**? Sí, como lo oyes. A día de hoy contamos con dos intérpretes de **Python**, dos vertientes, la **2.7.x** y la **3.5.x**. Las diferencias son sustanciales, partiendo porque no todas las bibliotecas que están operativas para la versión **2.7**.x estarán traducidas para la **3.5.x**, pero cada vez se está trabajando más en ello y la eliminación de **Python 2** está siendo gradual. Eso es uno de los motivos que me ha llevado a aprender la tecnología de la versión 3. Otra es que aunque yo programe en **Windows** ahora mismo, me encanta emplear distros de **Linux** (tengo pendiente saber desenvolverme bien en **Kali Linux**, por cierto) y en muchas ya viene por defecto la última versión de **Python**. Y la última basicamente es porque es lo que me apetece. Si el programa que quiera desarrollar lo puedo hacer en la versión 3, genial, si no siempre podré consultar y bajarme la 2.7 para realizar una tarea específica.

Entonces, vamos a instalar nuestro intérprete. Si eres usuario de **Linux** lo más seguro es que ya lo tengas instalado (puedes comprobarlo escribiendo en la terminal `python -V`). Si no es tu caso puedes instalarlo desde la misma consola escribiendo `sudo apt-get install python`. Para **Windows** (mi caso) o **Mac**, deberemos ir a la web oficial y descargarnos el ejecutable.

Puedes acceder pulsando [aquí](https://www.python.org/downloads/).

Ya lo tenemos descargado, ahora simplemente lo ejecutamos y veremos una pantalla como esta

![instalar python en windows](/assets/pictures/posts/python_introduccion_2.png)

Marca la casilla de `Add Python 3.5 to PATH` y elige `Install Now`. El proceso se completará automáticamente, momento en el que veremos la siguiente ventana.

![instalar python en windows](/assets/pictures/posts/python_introduccion_3.png)

Ahora vamos a comprobar si nos funciona correctamente. Puedes abrir una terminal, escribir python y pulsar Enter, o bien abrir la aplicación **Python 3.5**. El resultado deberá ser el mismo, ver la siguiente terminal

![instalar python en windows](/assets/pictures/posts/python_introduccion_4.png)

Más adelante pasaré a comentar en más profundidad la consola de comandos, pero por el momento nos basta con escribir el siguiente texto

```python
print("Hola mundo!")
```

Y al pulsar Enter habremos generado nuestro primer Hola mundo. Esto nos indica que funciona correctamente.

Por cierto, si quieres cerrar la terminal basta con escribir

```python
exit()
```

Esto ha sido todo por la primera entrega. Simplemente hemos preparado nuestro entorno para ejecutar **Python**. Como estamos aprendiendo el lenguaje yo recomiendo usar cualquier editor de texto sin corrección ni autocompletado. **Gedit** es perfecto para linuxeros, en **Windows** puedes tirar de **Notepad++**, **Atom**, **Sublime Text**... a tu elección. Más adelante ya habrá tiempo de usar un **IDE** completo pero ahora es lo mejor para hacerte con los entresijos del lenguaje.

**¡Salud y coding!**
