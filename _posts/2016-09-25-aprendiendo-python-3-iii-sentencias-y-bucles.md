---
title: Aprendiendo Python (III). Sentencias y bucles
description: Aprende sentencias condicionales if-elif-else y bucles while-for en Python 3. Tutorial completo con ejemplos prácticos sobre control de flujo, captura de datos, range() y estructuras de control fundamentales.
author: Inazio Claver
date: 2016-09-25 12:10:00 +0800
categories: [Python]
tags: [python, control-flujo, bucles, if-else, while, for, range, input]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Prometo que esta será, de principio, la última entrada de pura teoría sobre **Python**. En este post quiero tratar las sentencias de condición y los bucles.

Pero antes de nada vamos a ver como capturar la entrada de datos. Esto, evidentemente con interfaz gráfica se haría de otra forma, pero trabajando en consola es fundamental para que los usuarios puedan introducir los datos en la terminal.

Recordamos que estamos en **Python 3**, porque aquí tenemos una de las diferencias con su version anterior. En la versión 2.x capturabamos los datos usando la función ```raw_input()```, pero en la 3.x nos dará un error de interpretación del módulo.
Para capturar entrada de datos en **Python 3** usaremos la función ```input()```.

```python
dia = input("Escribe el día:")
```

Aclarado este punto, que lo usaremos bastante en ejercicios posteriores, pasemos a ver el contenido principal.

## Sentencias

Bueno, no es mi intención extenderme con las sentencias ```if - else if - else```. Simplemente voy a detenerme a explicar la sintaxis para generarlo en **Python**.

**If y else** se denominan tal cual, y si debemos echar mano de varias comprobaciones en una condición podemos agruparlas con paréntesis y los booleanos vistos en la anterior entrada. Asimismo, si quieremos usar la sentencia **else if** la palabra clave es ```elif```.
Veamos un ejemplo

```python
if fruta = 'manzana':
 precio = 0.55
elif fruta = 'platano':
 precio = 0.79
elif fruta = 'pera':
 precio = 0.28
else:
 print('No tenemos ' + fruta)
```

¿Os habéis percatado de que después de cada condición, para indicar como se comporta el código, tabulo la línea? Bien, esto es fundamental en **Python**. Si recordáis la primera entrada os dije que no existían llaves ni punto y coma en este lenguaje. Aquí tenemos el por qué. Cuando queramos indicar que un trozo de código pertenece a una sentencia superior (condiciones, bucles, funciones, etc) debemos hacerlo tabulando esa sección de código un nivel hacía dentro. Y por supuesto para volver a la "rama" anterior basta con eliminar dicha tabulación. Además esto permite un código mucho más sencillo de leer con un estándar muy práctico.

![programmers joke will know](/img/posts/20160925_1.png)

Y para concatenar varias condiciones en una misma sentencia, como decía antes, podemos hacerlo tal que así

```python
if ((mes == 5) and (dia == 28)) or ((mes == 7) and (dia == 31)):
 print('Felicidades Inazio!')
```

## Bucles

Evidentemente también vamos a usar **bucles**. Muchos bucles. Bucles como tontos. Bucles así, porque nosotros podemos. Y para ello necesitamos cuales tenemos a nuestra disposición y su sintaxis.

El **bucle while** es aquel que repite un conjunto de instrucciones mientras se cumpla una condición fijada previamente, y una de sus características es que no está fijada de antemano la cantidad de veces que se ejecutará. Lo hará siempre que se cumpla la condición.

Su sintaxis es sencilla, veamosla con un programa que calcule la secuencia de Fibonacci hasta 10000.

```python
a, b = 0, 1

while b < 10000:
 print(b, end=',')
 a, b = b, a + b
```

Quiero comentar tres cosas de este código. La primera, evidente, es que la sintaxis de un **while** es muy fácil. **While + condición + dos puntos**, y dentro el contenido.
La segunda es que en la primera línea de código aprendemos a hacer asignaciones múltiples correctamente. Basta con diferencias las variables con una coma y su valor igual.
Y la tercera, y última, es que ese parámetro que uso, end=",", sirve para que ```print()``` no finalice con un salto de línea sino con el caracter que le indicamos.

**While** tiene dos palabras reservadas en su interior, ```break``` y ```continue```. Continue hace que pasemos directamente al inicio del bucle de nuevo, da igual en que sección de él estemos. Y **break** nos sacará directamente del bucle hacía la siguiente instrucción.

El **bucle for** difiere un poco de otros lenguajes, como pueda ser C donde podemos definiar tanto la iteración como la condición de fin. En **Python** este **bucle** itera sobre los elementos de cualquier secuencia en el orden que aparezcan.

```python
miLista = ['Python', 'Java', 'C', 'ADA', 'Movilizer']

for lenguaje in miLista:
 print lenguaje
```

Nos puede resultar un poco engorroso verlo solo de esta forma si queremos hacer una iteración de enteros del 0 al 100 por ejemplo, sin usar un while que tengamos que sumar nosotros la variable para ir avanzando. Por eso podemos usar la función integrada ```range()``` que combinada con el for nos dejará hacer este tipo de sentencias. Por ejemplo, vamos a imprimir los numeros impares del 0 al 100 con esta técnica, y luego los numeros pares del 100 al 200 en otro for distinto.

```python
# Números impares de 0 a 100
for i in range(100):
 if i % 2 != 0:
  print(i)

# Números pares de 100 a 200
for i in range(100, 201):
 if i % 2 == 0:
  print(i)
```

Así, si usamos range y solo definimos un entero, será desde 0 hasta ese entero, y si pasamos dos parámetros lo hará desde el primero hasta x valor, empezando por cero. Es decir, si quieres imprimir desde el 1 hasta el 100 inclusive, deberás pasar un ```range(1, 101)``` para verlo correctamente. Si lo hicieses hasta el 100 solo imprimirías hasta el número 99.

<hr>    

En la siguiente entrada comenzaré la realización de algunos ejercicios básicos para empezar a coger práctica con **Python**, y posteriormente explicaré como crear funciones.

**¡Salud y coding!**