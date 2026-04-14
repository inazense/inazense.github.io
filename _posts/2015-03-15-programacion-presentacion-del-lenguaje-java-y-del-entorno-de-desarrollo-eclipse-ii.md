---
title: Programación. Presentación del lenguaje Java y del entorno de desarrollo Eclipse (II)
description: "Elementos básicos de Java: comentarios, variables, tipos de datos primitivos, operadores y estructuras de control."
author: Inazio Claver
date: 2015-03-15 09:30:00 +0800
categories: [Java, Programación]
tags: [java, programacion, eclipse, tipos-de-datos, operadores, estructuras-de-control]
pin: false
math: false
mermaid: false
---

## Comentarios

Java soporta tres tipos de comentarios:

```java
// Comentario de una línea

/* Comentario
   de varias líneas */

/** Comentario de documentación JavaDoc */
```

## Variables

Las variables deben comenzar con una letra, `$` o `_`, seguidas de letras, dígitos, `$` o `_`. Son **sensibles a mayúsculas y minúsculas**.

## Tipos de datos

### Tipos primitivos

| Tipo      | Tamaño   | Descripción                        |
|-----------|----------|------------------------------------|
| `byte`    | 1 byte   | Entero pequeño                     |
| `short`   | 2 bytes  | Entero corto                       |
| `int`     | 4 bytes  | Entero estándar                    |
| `long`    | 8 bytes  | Entero largo                       |
| `float`   | 4 bytes  | Real de simple precisión           |
| `double`  | 8 bytes  | Real de doble precisión            |
| `boolean` | 1 byte   | Valor lógico (`true` / `false`)    |
| `char`    | 2 bytes  | Carácter Unicode                   |

Ejemplos:

```java
byte edad = 54;
long distancia = 100000000000L;
float media = 7.87f;
char letraDNI = 'F';
```

### Tipos referencia

Apuntan a objetos. La declaración de una referencia no crea el objeto:

```java
String cadena = null;
```

Para crear el objeto se usa el operador `new`:

```java
String cadena = new String("Hola");
```

## Operadores

**Asignación:** `=`

**Aritméticos:** `+`, `-`, `*`, `/`, `%`, `++`, `--`

**Relacionales:** `<`, `<=`, `>`, `>=`, `==`, `!=`

**Lógicos:** `!`, `&&`, `||`

## Salida por pantalla

```java
System.out.println("Hola");   // Imprime y salta de línea
System.out.print("Hola");     // Imprime sin saltar de línea
System.out.printf("%s %d", "Valor:", 42);  // Formato estilo C
```

## Estructuras de control

### Selectivas

```java
if (condicion) {
    // ...
} else {
    // ...
}
```

```java
switch (variable) {
    case valor1:
        // ...
        break;
    default:
        // ...
}
```

### Iterativas

```java
while (condicion) {
    // ...
}
```

```java
do {
    // ...
} while (condicion);
```

```java
for (int i = 0; i < n; i++) {
    // ...
}
```

Las estructuras de control en Java son idénticas a las de C.
