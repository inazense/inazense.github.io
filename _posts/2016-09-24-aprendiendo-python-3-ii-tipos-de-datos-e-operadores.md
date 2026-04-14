---
title: Aprendiendo Python (II). Tipos de datos y operadores
description: "Aprende tipos de datos fundamentales en Python 3: números, strings, listas, tuplas y booleanos. Tutorial completo con operadores aritméticos, manipulación de cadenas, arrays y ejemplos prácticos paso a paso."
author: Inazio Claver
date: 2016-09-24 12:10:00 +0800
categories: [Python]
tags: [python, tipos-datos, operadores, strings, listas, tuplas, booleanos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

En el anterior post vimos como hacer la instalación de **Python** y escribir un Hola mundo directamente en su intérprete, pero a partir de ahora, salvo para alguna breve explicación y prueba, vamos a programar en ficheros que deberán tener una extensión **.py**.

Nuestro primer programa será de nuevo el típico Hola mundo (perdón si me hago pesado!). Como os dije, de momento voy a prescindir de entornos integrados hasta que me familiarice bien con la sintaxis de **Python**. En mi caso uso Sublime Text, pero puedes emplear el que gustes.

Creamos un fichero llamado _test.py_ y en él escribimos lo siguiente:

```python
# Mi primer programa en Python
print("¡Hola mundo!")
```

La primera línea es un comentario, y la segunda es la instrucción que ya conocíamos.Para ejecutarlo escribe en la terminal ```python test.py```.

Es posible que nos aparezca un mensaje tal que asi:

```bash
ile “hola.py”, line 2
SyntaxError: Non-ASCII character ‘xc2’ in file hola.py on line 2, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details
```

Este error se debe a que el intérprete no puede detectar la codificación de caracteres (el símbolo ¡ no es un estándar ASCII). Si es tu caso, tendrás que declarar la codificación del archivo en la primera línea, de esta manera.

```python
# -*- coding: utf-8 -*-
# Mi primer programa en Python

print("Hola mundo!")
```

En **Linux** **UTF-8** es por defecto, y en Windows no tengo problemas con ella. Si sigue fallando, prueba con otras codificaciones (cp1252, latin1, etc.) o averigua en cual está guardando el archivo el editor que usas.

Vuelve a lanzar el comando y tendremos, ahora sí, nuestro primer programa en **Python**.

## Operadores aritméticos básicos

Los operadores básicos en Python son los siguientes:

```python
# Suma
9 + 2 # = 11

# Resta
9 - 2 # = 7

# Multiplicación
9 * 2 # = 18

# División
9 / 2 # = 4.5

# División entera
9 // 2 # = 4.0

# Módulo
9 % 2 # = 1

# Potencia
9 ** 2 # = 81
```

Que se ejecutarán en el siguiente orden de prioridad:

1. Potencia
2. Multiplicación, división y módulo
3. Suma y resta

Y por supuesto, a la hora de agrupar operaciones o priorizar haremos uso de los paréntesis.

## Tipos de datos básicos

En **Python** no es necesario asignar un tipado previo a los campos como, por ejemplo, en **Java**. Si en ***Java*** para crear un entero teníamos que especificar su tipo (int i = 0), aquí basta con indicar el nombre de la variable (i = 0). Estas secciones las estoy haciendo un poco rápido pensando que ya se tiene una cierta base de programación. Si no es tu caso puedes seguir leyendo o ir a las primeras entradas de la sección Programación o que te leas el manual completo en la sección de Descargas.

### Númericos

Puedes hacer referencia a números como int, float, decimal, fracción y números complejos (usando sufijo j o J para su parte imaginaria).

```python
a = 5; b = -6  # int
c = 4.62; d = 64.0E-2 # Coma flotante
e = (-5+4j); f = (2.3-4.2j) # Números complejos
```

### Cadenas de texto

Evidentemente los string también se pueden manipular en **Python**. Podemos escribirlas entre comillas simples o dobles, o con tres apóstrofes al principio y otros tres al final para cadena multilínea.

Para concatenar texto usaremos la suma, y si multiplicamos la cadena de caracteres por un número se repetirá tantas veces como se indique

```python
'Soy un texto'
"Anda, igual que yo"
''' Bah, pero yo soy multilínea.
Soy un campeón. El Julio Iglesias de las cadenas de texto
'''
'Primer texto. ' + 'Segundo texto' # = Primer texto. Segundo texto
'tiquitaca' * 3 # 'tiquitacatiquitacatiquitaca'
```

También podemos concatenar texto agregando varias cadenas dentro de un mismo paréntesis, o acceder a un caracter determinado de una cadena si lo indexamos como si fuese un array, empezando por la posición 0, o si se desea empezar a contar por el final puede empezar en negativo.
Si quisiesemos los caracteres desde un indice a otro podemos acceder a una indexación separando por : la posición de inicio y final

```python
texto = ('Programando a pasitos. ' 'Donde cada entrada es una lección...' ' creo') # Devuelve: Programando a pasitos. Donde cada entrada es una lección... creo
palabra = 'Python'
letra = palabra[2] # Devuelve t (empieza en cero)
letra = palabra[-1] # Devuelve n
letras = palabra[0:2] # Devuelve py
```

### Booleanos

Los declararemos igual que los numéricos, indicando el nombre de la variable y su valor, ```TRUE``` o ```FALSE```. Y para compararlos usaremos ```AND```, ```OR``` o ```NOT```.

```python
not(3 > 5) # true
(3 < 5) and (5 < 0) # false
(3 < 5) or (5 < 0) # true
```

Todo el lío que podemos llegar a formanos de si una variable a int, float, boolean... podemos resolverlo usando la función ```type()```, que devuelve el tipo de la variable consultada.

```python
a = 4
print(type(a)) # Resultado: <class int="">
```

### Listas

**Python** tiene tipos de datos compuestos, usados para agrupar otros valores. El más versátil son las listas, lo que en otros lenguajes conocemos como arrays o matrices. Pueden contener objetos de distintos tipos, aunque lo normal es usarlos para objetos de un mismo tipo. Y podemos concatenar valores sumándolos tranquilamente a la lista

```python
cuadrados = [1, 4, 7, 15] # Array
circulos = [1, "Pasitos", 3.0, [5, 7, 4]] # Array con array incluido
cuadrados = cuadrados + [7, 5, 2] # Resultado = [1, 4, 7, 15, 7, 5, 2]
```

### Tuplas

Las tuplas son como las listas, pero de contenido y tamaño inmutable. Serían, por decirlo de alguna manera, como las constantes, pero reduciendo el tamaño que ocupan. Podemos declararlas con paréntesis y separadas por comas, tal que así.

```python
tupla = (1, 5, 57, "Cuarto")
```

## Comentarios

Los comentarios en **Python** pueden realizarse de dos formas. Primero, con la consabida almohadilla que llevamos utilizando desde el principio, o segundo, declarando un comentario multilínea con tres apóstrofes al principio y tres al final.

Este último método no es un comentario como tal (**Python** solo considera comentario lo que empiece por ```#```), y de hecho lo que estamos haciendo es declarar un string multilínea, pero al no asignarlo a ninguna variable el uso que le damos es nulo y podemos usarlo para realizar comentarios.

<hr>

Y hasta aquí esta segunda entrega. De teoría pura, como hasta ahora, solo nos queda una entrada más, donde trataré sentencias y bucles. Después de eso, las siguientes serán ya muchísimo más prácticas comenzando a hacer ejercicicios y avanzando en teoría a la par.

**¡Salud y coding!**