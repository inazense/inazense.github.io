---
title: Aprendiendo Python (IV). Primeros ejercicios
description: Colección de 30 ejercicios prácticos de Python para principiantes con soluciones completas. Aprende programación básica, estructuras de control, bucles, funciones y algoritmos fundamentales paso a paso.
author: Inazio Claver
date: 2016-10-07 12:10:00 +0800
categories: [Python]
tags: [python, ejercicios, principiantes, algoritmos, bucles, funciones, codigo]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Como primeros ejercicios en **Python** para familiarizarnos con la sintaxis propongo que realicemos los mismos problemas que cuando, hace dos años, comencé a estudiar programación en el lenguaje **C**. Tal vez no sean los más afinados para empezar con este lenguaje, pero creo que nos darán cierta soltura a la hora de prácticar **Python**.

La forma de trabajar será la siguiente. Escribo el ejercicio y, a continuación, expongo mi solución. No quiere decir que sea ni la única ni de lejos la mejor, pero es una forma de guía por si os quedáis atascados en algún punto.

<hr>

**1.** Escriba un programa que calcule el área de un triángulo (base x altura /2), pidiendo los datos base y altura al usuario.

<details>
    <summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
base = int(input('Base: '))
altura = int(input('Altura: '))

print("El área del triángulo es " + str(base*altura/2))
```

</details><br>

**2.** Escriba un programa que determine si un número leído desde teclado es positivo, negativo, o cero.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))

if (x > 0):
 print(str(x) + ' es positivo')
elif (x == 0):
 print(str(x) + ' es 0')
else:
 print(str(x) + ' es negativo')
```

</details><br>

**3.**  Escriba un programa que lea dos números desde teclado y si el primero es mayor que el segundo intercambie sus valores y los muestre ordenados por pantalla (después de haber intercambiado el valor de las variables correspondientes).

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Primer número: '))
y = int(input('Segundo número: '))

if (x > y):
 aux = x
 x = y
 y = aux

print(x,' - ', y)
```
</details><br>

**4.** Escriba un programa que pregunte la edad al usuario, la fecha actual, y si ha cumplido años en el año actual o no, y en base a esa información calcule su año de nacimiento.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from datetime import datetime

edad = int(input('Edad: '))
fecha = input('Fecha actual (Formato dd-mm-aaaa): ')
cumple = input('¿Has cumplido años este año? (Escribe S o N)')

agno = datetime.strptime(fecha, '%d-%m-%Y').year

if cumple.lower() ==  's':
 print('Año de nacimiento: ', agno - edad)
else:
 print('Año de nacimiento', str(agno - (edad + 1)))
```

</details><br>

**5.** Escriba un programa que pregunte la edad al usuario, la fecha actual, y en qué día y mes es su cumpleaños, y en base a esa información calcule su año de nacimiento.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from datetime import datetime

edad = int(input('Edad: '))
fechaActual = input('Fecha actual (formato dd-mm-aaaa)')
diaCumple = int(input('Día de tu cumple: '))
mesCumple = int(input('Mes de tu cumple: '))

agnoActual = datetime.strptime(fechaActual, '%d-%m-%Y').year
mesActual = datetime.strptime(fechaActual, '%d-%m-%Y').month
diaActual = datetime.strptime(fechaActual, '%d-%m-%Y').day

if mesActual < mesCumple:
 cumple = False
elif mesActual == mesCumple:
 if diaActual < diaCumple:
  cumple = False
 else:
  cumple = True
else:
 cumple = True

if cumple:
 print('Naciste en ', agnoActual - edad)
else:
 print('Naciste en ', str(agnoActual - edad - 1))
```

</details><br>

**6.** Escriba un programa que calcule la cantidad total de segundos a partir de horas, minutos y segundos pedidos al usuario.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
horas = int(input('Horas: '))
minutos = int(input('Minutos: '))
segundos = int(input('Segundos: '))

segundos = segundos + (minutos * 60) + (horas * 3600)

print('Segundos totales: ', segundos)
```
</details><br>

**7.** Escriba un programa que haga lo contrario al ejercicio anterior.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
segundos = int(input('Segundos: '))

horas = segundos // 3600
segundos = segundos % 3600
minutos = segundos // 60
segundos = segundos % 60

print(horas, ' horas. ', minutos, ' minutos. ', segundos, ' segundos')
```
</details><br>

**8.** Escriba un programa que convierta euros en pesetas, y otro que convierta pesetas en euros.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
salida = False

while not salida:
 print('1. Euros a pesetas')
 print('2. Pesetas a euros')
 print('3. Salir')

 opcion = int(input('Elige opción: '))

 if opcion == 1:
  euros = float(input('¿Cuántos euros?: '))
  pesetas = int(euros * 166.36)
  print(euros, 'euros = ', pesetas, ' pesetas\n')

 elif opcion == 2:
  pesetas = int(input('¿Cuántas pesetas?: '))
  euros = pesetas / 166.36
  print(pesetas, ' pesetas = ', euros, 'euros\n')

 elif opcion == 3:
  salida = True

 else:
  print('Elige una opción válida')
  continue
```
</details><br>

**9.** Rehaga el ejercicio 3 con 3 números. (ordena tres números de menor a mayor)

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Primer número: '))
y = int(input('Segundo número: '))
z = int(input('Tercer número: '))

lista = [x, y, z]
lista = sorted(lista)

for i in lista:
 print(i, end=' ')
```
</details><br>

**10.** Escriba un programa que calcule el equivalente en pies de una longitud en metros dada por el usuario, teniendo en cuenta que un metro equivale a 39,27 pulgadas y que 12 pulgadas equivalen a un pie.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
metros = float(input('Metros a convertir: '))
pies = (metros * 39.27) / 12

print(metros, ' metros son ', round(pies, 2), ' pies') # fuerzo salida con dos decimales
```
</details><br>

**11.** Escriba un programa que convierta grados Celsius en Fahrenheit y viceversa, a elección del usuario. La relación entre ambos es F=(9/5)*C+32

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
salida = False

while not salida:

 print('1. Celsius a Fahrenheit')
 print('2. Fahrenheit a Celsius')
 print('3. Salir')

 opcion = int(input('Elige opción: '))

 if opcion == 1:
  x = int(input('Grados Celsius: '))
  fahrenheit = x * (9/5) + 32
  print('Grados Fahrenheit: ', round(fahrenheit, 2), '\n')

 if opcion == 2:
  x = int(input('Grados Fahrenheit: '))
  celsius = (x - 32) * (5/9)
  print('Grados Celius: ', round(celsius, 2), '\n')

 if opcion == 3:
  salida = True
```
</details><br>

**12.** Escriba un programa que calcule el valor absoluto de un número.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))
print('Valor absoluto: ', abs(x))
```
</details><br>

**13.** Escriba un programa que calcule si un año es bisiesto. Un año es bisiesto si es múltiplo de 4 pero no de 100 aunque sí de 400.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
year = int(input('Escribe año: '))

if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:
 print('Es año bisiesto')
else:
 print('No es año bisiesto')
```
</details><br>

**14.** Escriba un programa que lea por teclado 20 números reales y calcule su media. Hacerlo sin utilizar 20 variables reales.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
i = 20
r = 0

for i in range(20):
 x = int(input('Introduce el ' + str(i + 1) + ' número: '))
 r = r + x

print('La media de todos los números introducidos es: ', round(r / i, 2))
```
</details><br>

**15.** Escriba un programa que pida dos números enteros y nos muestre la tabla de multiplicar del primero hasta el número que indique el segundo.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Primer número: '))
y = int(input('Segundo número: '))

for i in range(1, y + 1):
 print(x, 'x', i, ': ', str(x*i))
```
</details><br>

**16.** Se definen los números triangulares como los obtenidos de sumar los números naturales sucesivos 1, 2, 3 … Es decir, los primeros números triangulares son 1, 3, 6, 10, etc. Escriba un programa que muestre los N primeros números triangulares.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Números triangulares a conseguir: '))
totalNums, i, aux = 0, 1, 2

while totalNums < x:
 print(i)
 i = i + aux
 aux += 1
 totalNums += 1
```
</details><br>

**17.** Escriba un programa que nos diga si un número es o no triangular, y cuál es el número triangular anterior y posterior al número.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input("Escribe número a comprobar: "))
i, aux, anterior, valido = 1, 2, 0, False

while i <= x:
 if i+aux < x:
  anterior = i
  i = i + aux
  aux += 1
 elif i+aux == x:
  anterior = i
  i = i + aux
  aux += 1
  valido = True
 else:
  break

if valido:
 print(x, ' es un número triangular')
 print('El anterior número triangular es ', anterior)
 print('El siguiente número triangular es ', str(i + aux))
else:
 print(x, ' no es un número triangular')
 print('El anterior número triangular es ', i)
 print('El siguiente número triangular es ', str(i + aux))
```
</details><br>

**18.** Elabore un programa que lea números enteros y escriba el número resultante de invertir sus cifras.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))

while x > 9:
 i = x % 10
 print(i, end="")
 x = x // 10
print(x, end="")
```
</details><br>

**19.** Escriba un programa que detecte si un número es primo o no. Un número es primo si sólo es divisible por sí mismo y por la unidad.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from math import sqrt

def esPrimo(x):
 if x == 2:
  return True

 if x % 2 == 0:
  return False

 i = 3
 while i <= sqrt(x):
  if x % i == 0:
   return False
  i += 2
 return True

x = int(input('Escribe un número: '))

if esPrimo(x):
 print('Es primo')
else:
 print('No es primo')
```
</details><br>

**20.** Escriba un programa que saque por pantalla todos los números primos comprendidos entre dos números introducidos por teclado.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from math import sqrt

def esPrimo(x):
 if x == 2:
  return True

 if x % 2 == 0:
  return False

 i = 3
 while i <= sqrt(x):
  if x % i == 0:
   return False
  i += 2
 return True

x = int(input('Primer número: '))
y = int(input('Segundo número: '))

for i in range(x, y+1):
 if esPrimo(i):
  print(i, end=" ")
```
</details><br>

**21.** Escriba un programa que calcule el factorial de un número.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))
r = 1
for i in range(1, x + 1):
 r = r * i

print('Factorial de ', x, ': ', r)
```
</details><br>

**22.** Escriba un programa que muestre por pantalla todos los divisores de un número.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))

for i in range(1, x + 1):
 if x % i == 0:
  print(i, end=" ")
```
</details><br>

**23.** Escriba un programa que calcule el mínimo común múltiplo de dos números.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe el primer número: '))
y = int(input('Escribe el segundo número: '))

minNum = min(x, y)
mcm = 0

for i in range(1, minNum+1):
 if x % i == 0 and y % i == 0:
  mcd = i
  mcm = (x*y)//mcd

print('MCM: ', mcm)
```
</details><br>

**24.** Escriba un programa que calcule el máximo común divisor de dos números

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe el primer número: '))
y = int(input('Escribe el segundo número: '))

maxNum = max(x, y)
minNum = min(x, y)

resto = 0

while (minNum > 0):
 resto = minNum
 minNum = maxNum % minNum
 maxNum = resto

print('MCD: ', maxNum)
```
</details><br>

**25.** Escriba un programa que haga la descomposición en factores primos de un número.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from math import sqrt

def esPrimo(x):
    '''
    Comprueba si un número es primo o no

    Args:
        x (int): Integer > 1

    Returns:
        bool: True si es primo, False en caso contrario
    '''
    if x == 2:
        return True
    if x % 2 == 0:
        return False

    i = 3
    while i <= sqrt(x):
        if x % i == 0:
            return False
        i += 2
    return True

x = int(input('Escribe un número: '))

i, primeraVez = 2, True

while x > 1:
    if esPrimo(i) and x % i == 0:
        if primeraVez:
            print(i, end=" ")
            primeraVez = False
        x = x // i
    else:
        i += 1
        primeraVez = True
```
</details><br>

**26.** Un número entero se dice perfecto si es igual a la suma de sus divisores (excepto él mismo, pero incluyendo el 1). El primer número perfecto es 6: 6=1+2+3. Escriba un programa que visualice los 4 primeros números perfectos.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))

r = 0
for i in range(1, x):
    if x % i == 0:
        r = r + i

if r == x:
    print('Es un número perfecto')
else:
    print('Pues no es tan perfecto como se cree...')
```
</details><br>

**27.** Escriba un programa que calcule la raíz cuadrada de un número real positivo N

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
from math import sqrt
x = int(input('Escribe un número positivo: '))

if x > 0:
    print('Raíz cuadrada: ', sqrt(x))
```
</details><br>

**28.** Dado un número entero positivo, su crápulo es el número que se obtiene sumando los dígitos que lo componen. Si el valor de la suma es menor que 10, el crápulo es el valor obtenido, si no, hay que volver a sumar los dígitos hasta que sea menor de 10. Escriba un programa que calcule el crápulo de un número. Ejemplos: de 7, 7; de 13, 4; de 492, 6, de 5678, 8.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
x = int(input('Escribe un número: '))

while x > 9:
    i, aux = 0, x
    while aux > 9:
        i += (aux % 10)
        aux = aux // 10
    i += aux
    x = i
print('Crápulo: ', x)
```
</details><br>

**29.** Un marinero ebrio se tambalea al subir por una rampa del muelle a su barco. La rampa tiene 5 pasos de ancho y 15 de largo. Comenzamos a observar al marinero cuando está en el extremo de la rampa que se apoya sobre el muelle, comenzando a caminar hacia el barco por el centro de la rampa. Si da más de dos pasos a la izquierda o a la derecha, caerá al agua y se ahogará, pero si da más de 15 pasos hacia delante estará a salvo a bordo de su barco. Escribe un programa para simular el irregular avance del marinero según estas instrucciones: a. El programa lee repetidamente un entero del teclado. b. Si el entero es negativo, supondremos que el pirata se durmió sobre la rampa. c. Si el entero es divisible entre 2, el pirata da un paso hacia adelante. d. Si el entero no es divisible entre 2, pero el entero menos 1 es divisible entre 4, el pirata da un paso a la derecha. e. En otro caso, el pirata da un paso a la izquierda. f. El programa finalizará escribiendo el paradero del pirata: cae por un costado y se ahoga, logra abordar su barco o se duerme sobre la rampa. Debe de ir detallando cada acción que acomete.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
MAR_IZDA = 2
MAR_DRCHA = -2
LARGO = 15

fin, posHorizontal, posVertical = False, 0, 0

while not fin:
    x = int(input('Escribe un entero para jugar: '))

    # Nueva posición
    if x < 0:
        fin = True
        print('El pirata se durmió en la tabla')
    elif x % 2 == 0:
        posVertical += 1
        if posVertical < LARGO:
            print('El pirata ha dado un paso hacia delante. Le quedan ', str(LARGO - posVertical), ' pasos para llegar al barco')
        else:
            fin = True
            print('El pirata está a salvo en su barco')
    elif (x % 2 != 0) and ((x-1) % 4 == 0):
        posHorizontal -= 1
        if posHorizontal > MAR_DRCHA:
            print('Está a ', str(abs(MAR_DRCHA - posHorizontal)), ' pasos de caerse por la borda derecha')
        else:
            fin = True
            print('Hombre al agua! Se ha despeñado por el lado derecho')
    else:
        posHorizontal += 1
        if posHorizontal < MAR_IZDA:
            print('Está a ', str(abs(MAR_IZDA - posHorizontal)), ' pasos de caerse por la borda izquierda')
        else:
            fin = True
            print('Hombre al agua! Se ha despeñado por el lado izquierdo')
```
</details><br>

**30.** Construye un programa que muestre el resultado de un partido de tenis entre dos jugadores A y B. Para ello se introducirá inicialmente el número máximo de sets que se podrán disputar en el partido y, sucesivamente el ganador de cada uno de los juegos del partido. Un partido de tenis se basa en la disputa de juegos. Cada juego es ganado por uno de los jugadores. Si un jugador logra hacerse con un número suficiente de juegos, gana un set, y con el número suficiente de sets, gana el partido. Cuando un jugador gana un set, se inicia la disputa del siguiente set comenzando ambos jugadores desde 0 juegos. Un jugador gana un set, si anota 6 juegos y el rival tiene 4 o menos, o si anota 7 juegos, dando igual los que tenga el contrincante. Se gana el partido si se consiguen la mitad más uno de los sets en juego. Es decir, si el partido es a 3, hay que ganar 2, y si es a 5, basta con 3. Hay que ir leyendo una secuencia de A y B que nos va indicando qué jugador va ganando cada juego, e ir escribiendo un mensaje tras ello, indicando que el jugador ha ganado el juego y el resultado parcial del partido (sets y juegos).Al final hay que indicar quién ha ganado y terminar el programa.

<details>
<summary>Solución</summary>

```python
# -*- coding: utf-8 -*-
playerA = input('Primer jugador: ')
playerB = input('Segundo jugador: ')
sets = int(input('Sets del partido: '))

setsA, setsB, juegosA, juegosB = 0, 0, 0, 0
fin = False

while not fin:
    if setsA > ((sets // 2) + 1):
        fin = True
        print('Ganador: ', playerA)
    elif setsB > ((sets // 2) + 1):
        fin = True
        print('Ganador: ', playerB)
    else:
        if (juegosA == 6 and juegosB <=4) or juegosA == 7:
            print(playerA, ' ha ganado este juego.)
            setsA += 1
            juegosA = 0
            juegosB = 0
        elif (juegosB == 6 and juegosA <= 4) or juegosB == 7:
            print(playerB, ' ha ganado este juego.)
            setsB += 1
            juegosA = 0
            juegosB = 0
        else:
            ganador = input('Ganador de este juego: ')
            if ganador == playerA:
                juegosA += 1
                print('Este punto es para ', playerA)
                print('Marcador total:')
                print(playerB, '. Juegos: ', juegosB, '. Sets: ', setsB)
                print(playerA, '. Juegos: ', juegosA, '. Sets: ', setsA)
            elif ganador == playerB:
                juegosB += 1
                print('Este punto es para ', playerB)
                print('Marcador total:')
                print(playerA, '. Juegos: ', juegosA, '. Sets: ', setsA)
                print(playerB, '. Juegos: ', juegosB, '. Sets: ', setsB)
            else:
                print('¿', ganador, '? Ese ya no juega aquí... Prueba escribiendo ', playerA, ' o ', playerB, ' por favor')
```
</details><br>

<hr>

**¡Salud y coding!**