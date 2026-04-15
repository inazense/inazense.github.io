---
title: Programación. Codificación de Programas en C (III)
description: Profundiza en printf y scanf, compilación en Linux, estructuras de control switch/for/do-while, tipos carácter y cadena, con ejemplos de algoritmos en pseudocódigo.
date: 2014-10-11 14:10:00 +0800
categories: [Programación]
tags: [programacion, c, printf, scanf, switch, for, do-while, caracteres, cadenas, linux]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Printf

Función para mostrar información en pantalla. El primer parámetro es una cadena con texto y posiciones para variables.

**Símbolos utilizados:**

| Símbolo | Tipo |
|---|---|
| `%c` | Carácter |
| `%d`, `%i` | Enteros con signo |
| `%e`, `%E`, `%f`, `%g`, `%G` | Números reales |
| `%s` | Cadenas |
| `%u` | Decimal sin signo |
| `%x` | Entero sin signo |
| `\t` | Tabulador |
| `\n` | Salto de línea |

Ejemplo: `"El número %i multiplicado por %i es %i \n"`

## Scanf

Función simétrica a `printf` para leer valores desde teclado. Utiliza los mismos símbolos y requiere direcciones de memoria (punteros) con el símbolo `&`.

## Compilar en Linux

```bash
gedit nombreArchivo.c &          # Editar archivo
gcc nombrePrograma.c             # Compilar
gcc -o nombrePrograma nombreArchivo.c  # Compilar con nombre personalizado
./nombrePrograma                 # Ejecutar
```

## Selección múltiple (Switch)

Estructura que ejecuta acciones según el valor de una variable. Solo funciona con tipos escalares.

```
caso <nombreVariable> sea
    <constante 1>: <acción 1>
    <constante 2>: <acción 2>
    …
    <default>: <acción d>
```

## Iteración indexada (For)

```
para <nombreVariable>:=<expresión> hasta <expresión> hacer
    <acción>
fpara
```

## Iteración condicionada (Do-While)

```
hacer
    <acción>
mientras que condición
```

## Tipo Carácter

Se representan mediante códigos ASCII o UNICODE. Las constantes se escriben entre comillas simples: `'a'`

**Funciones principales:**
- `ord()` — Convierte carácter a código numérico.
- `chr()` — Convierte código numérico a carácter.

### Algoritmos de ejemplo

```
Algoritmo ordenAlfabetico
{Lee un caracter. Si es del alfabeto, nos da su posición en él}

variables
    letra:caracter;
principio
    leerCaracter(teclado,pantalla);
    si ((letra>='a') and (letra<='z'))
    entonces
        escribirEntero(pantalla,ord(letra)-ord('A')+1);
    si no
        escribirCadena('No es una letra');
    fsi
fin
```

```
Algoritmo valorEnteroDeDigito
{Si el caracter leído es un dígito, escribe por pantalla el entero que
representa. En caso contrario informa de la situación}

variables
    digito:caracter;
principio
    leerCaracter(teclado,digito);
    si ((digito>='0') and (digito<='9'))
    entonces
        escribeEntero(pantalla,ord(digito)-ord('0'));
    si no
        escribirCadena(pantalla,"No es un dígito");
    fsi
fin
```

```
Algoritmo leerDatoEntero
{Lee caracteres que supuestamente forman un entero, crea con ellos el
número entero correspondiente y lo escribe por pantalla. El número puede
tener espacios blancos por delante}

variables
    c:caracter;
    numero:entero;
principio
    leerCaracteres(teclado,c);
    mientras que (c='') hacer
        leerCaracteres(teclado,c);
    fmq
    numero=0;
    mientras que ((c>'0') and (c<'9')) hacer
        numero:=10*numero+ord(c)-ord('0');
        leerCaracteres(teclado,c);
    fmq
fin
```

## Tipo Cadena

Secuencias de cero o más caracteres representadas entre comillas dobles: `"texto"`

**¡Salud y coding!**
