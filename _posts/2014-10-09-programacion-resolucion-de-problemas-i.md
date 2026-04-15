---
title: Programación. Resolución de problemas I
description: 
date: 2014-10-09 14:10:00 +0800
categories: [Programación]
tags: [programacion]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Elementos de un programa

- **Palabras clave**. Palabras que ya tienen un significado concreto en el lenguaje de programación y no pueden usarse para nada más.

Cada lenguaje de programación tiene las suyas, aunque algunas son bastante comunes. Ejemplo -> while, for, if, …

- **Identificadores**. No son palabras clave. Sirven para dar nombres a objetos (constantes,variables, procedimientos y funciones, etc.). Son una secuencia de letas (a-z, A-Z), dígitos (0-9) y \*-\*.

Los lenguajes de programación suelen exigir que empiecen por una letras.

- **Operadores**. + - * / < > = …
- **Separadores**. “,” “;” “.”

## Tipos de datos

En matemáticas es importante tipificar los datos de un problema. ¿Cuál es la división entera entre 1 y 2? ¡0!

Para saber de que operación se trata es necesario saber el tipo de los datos, para evitar errores.
En un programa todos los datos han de tener un tipo que los defina.

Son:
- Un conjunto de valores
- Un conjunto de operaciones (que podemos hacer con ellos)
- Una forma de almacenamiento

Clases de tipos de datos
- Predefinidos en el lenguaj de programación (entero, real, caracter, etc).
- Definidos por el usuario

## Datos escalares

Vienen caracterizados por:
- Dominio de valores finito
- La existencia de una relación de orden total entre sus valores

Dos datos, A y B, de un mismo tipo escalar, pueden ser comparados resultando de toda operación de relación: =, <, >, < >, <=, >=

El resultado de toda operación es un valor de tipo booleano, el tipo de dato más sencillo. Sólo puede tomar dos valores, verdadero o falso.

Los datos escalares admiten también dos operadores unitarios, las funciones sucesor y predecesor, que devuelven como resultado el valor de dato que sigue o precede al expresado como argumento.

Ejemplos sobre tipo entero:

```
Sucesor(17)=18;
Predecesor(5)=4;
```

Ejemplos sobre tipo caracter:

```
Sucesor (“H”)=”I”;
Predecesor(“N”)=”M”;
```

La función sucesor no está definida para el mayor de los elementos del dominio de valores de un tipo escalable.

La función predecesor no está definida para el menor de ellos.

## Tipos escalares definidos por enumeración

Es un subconjunto de los datos escalares.
Tipo de datos definidos por el usuario.

Ejemplos:

```
Tipo semana=(lunes, martes, miércoles, jueves, viernes);
Lunes<jueves
Predecesor(“Martes”)=Lunes
Sucesor(“Jueves”)=viernes
```

## Tipo booleano

Tipo de datos predefinido que sólo toma dos valores, verdadero y falso.
Operadores a emplear: AND, OR y NOT

Ejemplos:

```
Lunes<Martes=VERDADERO
Lunes<>Lunes=FALSO
Martes<=Jueves=VERDADERO
(Lunes<Martes)AND(jueves=viernes)=FALSO
(predecesor(martes)=martes)OR(sucesor(lunes)=martes)=VERDADERO
```

![Tipos de operadores lógicos](/img/posts/20141009_1.png)

**Leyenda**: **T** -> True **F** -> False **N** -> No evaluado

## Tipo entero:

En un espacio finito de memoria no se puede representar un número infinito de valores.

El tipo entero escoge dentro de cada compilado y lenguaje concreto, el subconjunto de enteros representables.
El número total de datos representados depende del número de bits dedicados a representar datos de un tipo entero.

```
Con n bits es posible representar 2n datos diferentes
```

Usando la representación en complemento a 2, resultan los siguientes valores.
- Para 16 bits, 216=65536 datos enteros, desde -32768 hasta 32767
- Para 32 bits, 232…

Los datos enteros se escribirán en algoritmos de notación arábiga, eventualmente precedidos por espacios en blanco y por un signo + o – (el signo se puede omitir si es positivo).

## Constantes

Un dato constante es un dato de valor inalterable durante la ejecución del programa.
Una constante se puede expresar en un algoritmo de forma explícita: 1000, 3.1416, Verdad, ‘A’, etc.

También se puede expresar de forma simbólica, asociándole como nombre simbólico un identificador, así se incrementan la legibilidad del programa y se facilitan sus posteriores modificaciones, ya que el valor de la constante sólo hay que modificarlo en su definición.

```
Pi:=3.1416 ;letraA:=’A’; límite:=100;
```

## Variables

Una variable se define como un dato de valor asociado que puede cambiar a lo largo de la ejecución del programa, siempre dentro de un determinado tipo de dato.

Las variables se declaran en un algoritmo, al principio asociándoles como nombre simbólico un identificador e indicando de que tipo de datos son.

Una variable no es más que una posición de memoria en la que hemos reservado cierto espacio de almacenamiento para un valor de un tipo de dato determinado (el espacio es el necesario para almacenar valores de ese tipo), y le hemos puesto un nombre para referirnos a ella.

```
indice,contador:entero;
medida:real;
c:carácter;
```

## Operación de asignación

Una variable en un programa tiene un valor, pero en principio éste es un valor indefinido. A veces el compilador asigna valores iniciales por defecto.

La acción de asociar un nuevo valor a una variable se denomina asignación. La instrucción de asignación utiliza el operador “=” para distinguirlo del operador relacional de igualdad “==”. La sintaxis es:

```
variable:=expresión
```

Al ejecutar la instrucción se evalúa la expresión y se asigna dicho valor resultate a la variable, de tal manera que en la posición de memoria asociada, está guardado a parte de ese momento dicho valor.

La implicación es que el resultado de evaluar la expresión ha de ser del mismo tipo de datos que la variable. Si no, se produce un error por incompatibilidad entre los operandos.

```
Edad:=33; letra:=’A’; peso:=77.50; otroPeso:=peso+50;x:=x+1;c:=a*b+c/d; resultado:=(b+c)*(x-10)
```

## Evaluación de expresiones

En muchas partes de un algoritmo o programa pueden aparecer expresiones que es necesario evaluar.

Su evaluación puede dar lugar a un dato que puede ser de cualquier tipo (aunque participen datos que son de otros diferentes).

Con ese dato podemos hacer múltiples cosas, asignándoselo a una variable, usarlo como parámetros, de función o procedimiento, o servir para tomar decisiones dentro de un programa, etc.

Los paréntesis pueden ser usados para alterar la prioridad de los operadores en una expresión (en caso de una misma prioridad, la expresión se evalúa de izquierda a derecha).

**Prioridad.**

```
NOT
* / DIV MOD AND
+ - OR
< <= == >= > < >
```

## Composición secuencial de acciones

Para diseñar las acciones que debe ejecutar un algoritmo, contemos hasta el momento con un repertorio de acciones.

Necesitamos mecanismos que permiten establecer el orden en que deben ser ejecutadas las acciones de un algoritmo.

El primer mecanismo de composición de acciones que vamos a presentar es la composición secuencial de acciones.

Una composición secuencial de acciones la expresaremos escribiendo éstas en el orden que se desea que sean ejecutadas por el ordenador.

Es decir, que se ejecutarán una tras otra en líneas de arriba hacia abajo (valga la redundancia, sí).

```
A:=7;
B:=3;
C:=A+B;
```

## Sintaxis de un algoritmo

```
{Comentario}

“Declaración de tipos”
“Declaración de constantes”
“Declaración de variables”

Principio
            “instrucción 1”
            “instrucción 2”
            …
            “instrucción N”
Fin
```

### Ejemplo 1


Algoritmo multiplicar

```
{Lee del teclado dos datos enteros y escribe por pantalla su producto}
Variables
            Multiplicado,multiplicador:entero;
Principio
            leerEntero(teclado,multiplicado);
            leerEnterio(teclado,multiplicador);
            escribirEntero(pantalla,multiplicado*multiplicador);
Fin
```

Comentarios del ejemplo:

Consta de una secuencia de tres acciones.
Las dos primeras asignan valores a las variables multiplicado y multiplicador, leyéndolas del teclado.
La tercera escribe por pantalla el producto de los valores leídos.

Las palabras principio y fin se utilizan para delimitar la sección de descripción de acciones en el algoritmo.

Se utiliza el carácter “;” como finalizador de las acciones programadas en el algoritmo.

### ¿Qué pasa en memoria?

Algoritmo multiplicar
```
{Lee del teclado dos datos enteros y escribe por pantalla su producto}
Variables
            Multiplicado,multiplicador:entero;
Principio
            leerEntero(teclado,multiplicado);
            leerEnterio(teclado,multiplicador);
            escribirEntero(pantalla,multiplicado*multiplicador);
Fin
```

Algoritmo tonto2

```
Algoritmo tonto1
Variables
            a,b:entero;
principio
            a:=75-8;
            b:=a-9;
fin

/* En este caso, a=67 y b=58 */

Algoritmo tonto2
Variables
            a,b:entero;
principio
            b:=a+3;
fin

/* Como no se inicializa A, ni a ni b obtienen ningún resultado. */
```

### Composición condicional de acciones

En el diseño de un algoritmo en ocasiones es necesario plantear la resolución de un problema considerando cosas particulares y resolviendo cada uno de ellos mediante la correspondiente acción.

El mecanismo de la composición condicional nos va a permitir implementar dicha estrategia de resolución de problemas.

Su sintaxis es la siguiente

```
Si <expresión booleana>
    Entonces <acción 1>
Si no <acción 2>
Fsi
```

Se evalúa la expresión booleana obteniendo un valor verdadero / falso.
Si el valor es verdadero, se ejecuta <acción 1>.
Si es falso, se ejecuta <acción 2>.
La claúsula <si no> se puede omitir con acción nula.

**Ejemplo**

```
Algoritmo informeParidad
{Lee un valor entero del teclado e informa por pantalla si el número es par o impar}
Variables
            numero:entero;
principio:
            leerEntero(teclado,numero);
            si (numero MOD 2 = 0)
                        entonces escribirCadena(pantalla,”Es par”);
                        si no escribirCadena(pantalla,”Es impar”);
            fsi
fin
```

### Composición iterativa de acciones

Ésta composición permite describir métodos de resolución de problemas aplicando el métido de inducción.

Resolución de problemas en caso trivial:

```
{Solución de P0}
i=0; {“i” representa el índice del problema resuelto}
mientras que no esté resuelto el problema “P” hacer
            i=i+1;
            “Resolver problema P, a partir de la solución del problema Pi+1”
Fmq
```

### Puntos clave del método

Identificar un caso trivial del problema y dar su solución.
Encontrar la ley de recurrencia que permita resolver el problema Pi. Partir de la solución del problema Pi-1.
Expresar la condición que indique la resolución del problema objetivo (P).

**Sintaxis y semántica de la composición iterativa**

```
Mientras que <expresión Booleana> hacer
            <acción>
Fmq
```

Evaluar la expresión booleana obteniendo comoresultado un valor verdadero o falso. Si el valor anterior es verdad, ejecutar la acción y volver al punto anterior. En caso contrario dar por concluida la ejecución de la acción iterativa.

Ejemplo:

```
Algoritmo sumaSecuenciaEnteros
{Lee una secuencia de datos que finaliza con un Cer0 y escribe por pantalla la suma de los datos leídos}
Variables
            numero:entero;{último número leído}
            sumaAcumulada:entero{acumula la suma de los datos leídos}
principio
            escribirCadena(pantalla,”Escriba secuencia de datos acabada con un cero 0:”);
            sumaAcumulada:=0; {Solución inicial (trivial) al problema}
            leerEntero(teclado,numero);
            mientras que numero < > 0 hacer
                        sumaAcumulada:=sumaAcumulada+numero; {ley de recurrencia}
                        leerEntero(teclado,numero);
            fmq
            escribirCadena(pantalla,”Los datos leídos suman: “);
            escribirEntero(pantalla,sumaAcumulada);
            acabarLinea(pantalla);
fin
```

### Ejercicios. ¿Cuántas veces se ejecutan los bucles?

```
Algoritmo1
Variables
            termino:booleano;
            cuenta:entero;
principio
            termino:=falso;
            mientras que NOT termino hacer
                        n:=n+1;
                        termino:=verdad;
            fmq
fin

Algoritmo2
termino:=falso;
mientras que NOT termino hacer
            n=n+1;
            termino:=falso;
fmq

Algoritmo3
cuenta:=0;
mientras que cuenta<6 hacer
            n:=n+1;
            cuenta:=cuenta+2;
fmq

Algoritmo4
cuenta:=10;
mientras que cuenta>0 hacer
            n:=n+1;
            cuenta:=cuenta-3;
fmq
```

### Soluciones

- Algoritmo 1: 1 vez
- Algoritmo 2: Bucle infinito
- Algoritmo 3: 3 veces
- Algoritmo 4: 4 veces

## Tablas de la verdad

|X|Y|AND|X|Y|OR|X|NOT(X)|
|---|---|---|---|---|---|---|---|
|V|V|V|V|V|V|V|V|
|V|F|F|V|F|V|F|V|
|F|V|F|F|V|V|||
|F|F|F|F|F|F|||

## Representación en complemento a 2

Para representar a los enteros internamente el compilador podría utilizar un bit para discriminar el signo, pero esto no funciona, ya que habría dos ceros.

La representación en complemento a dos garantiza la existencia de un solo 0 y algunas ventajas adicionales.

Un número en complemento a 2 se representa así:
- Si es positivo o cero, se codifica en binario en los bits destinados a ello
- Si es negativo, se codifica su valor absoluto en binario, se hace un NOT de cada bit y se suma 1

Ejemplo. Codificación de -19 usando 8 bits

```
-19 en binario à 00010011
Niego cada bit à 11101100
Sumo 1, obteniendo à 19:11101101
```

Se puede ver que se ha desbordado la capacidad de la máquina sumando un número negativo muy grande.

Número máximo representable 217-1=Al sumarle luego uno no vale para ocho bits.

## Ventajas del complemento a 2

Funciona perfectamente la suma de bits.
Ejemplos:

```
19 en binario:00010011
19:11101101
19-1900 0000 0000
9 en binario:00001001
-9 en binario:11110111
19-9=10:00001010
28/(+)00011100 à (-)11100100
19-9=28/11100100
```

## Tipo entero. Operadores

Suma – Resta – Multiplicación – DIV (División entera) – MOD (resto de división entera).

Orden de prioridad:

```
* DIV MOD
+ -
```

Ejemplos:

```
5 DIV 8 = 0
15 MOD 4 =3
3+4*5-6/2=3+(4*5)-(6/2)=20
```

## Tipo entero. Procedimiento y funciones de biblioteca

Los lenguajes de programación nos suelen ofrecer funciones y procedimientos ya desarrollados para que podamos usarlos.

Para el tipo entero suelen ser frecuentes los siguientes:
- `sqr(expresión entera)`: Función que calcula el cuadrado de la expresión
- `abs(exp,entera)`: Función que calcula el valor absoluto de la expresión
- `leerEntero(teclado,variableEntera)`: Procedimiento que muestra por pantalla el resultado de evaluar la expresión

**¡Salud y coding!**