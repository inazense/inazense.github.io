---
title: Programación. Interacción entre clases (II)
description: Sobreescritura de métodos, herencia de constructores, instanceof, equals, toString, modificadores final y abstract, castings, polimorfismo e interfaces en Java.
author: Inazio Claver
date: 2015-03-31 12:00:00 +0800
categories: [Java, Programación]
tags: [java, programacion, poo, herencia, polimorfismo, interfaces, abstract]
pin: false
math: false
mermaid: false
---

## La sobreescritura de métodos

La herencia permite ampliar la funcionalidad con nuevos métodos, pero también reescribir métodos heredados adaptándolos a las necesidades de la subclase. Por ejemplo, en `Felino` existe `public void hacerRuido()`, que se sobrescribe en `Tigre` con `System.out.println(rugir())` y en `Gato` con `System.out.println(maullar())`.

### Reglas para la sobreescritura

- Solo se pueden sobrescribir métodos heredados.
- El nuevo método mantiene el mismo prototipo (nombre, parámetros y tipo de retorno).
- La visibilidad puede modificarse hacia mayor accesibilidad (de `protected` a `public`, por ejemplo).

## La sobreescritura de propiedades

Las propiedades con el mismo nombre en la subclase ocultan a las heredadas. Este mecanismo no se suele usar con frecuencia.

## Los constructores y la herencia

Los constructores no se heredan, pero al invocar un constructor de una subclase se ejecuta una cadena de llamadas hacia la superclase usando `super`:

```java
super();                      // Constructor sin parámetros de la superclase
super(lista de parámetros);   // Constructor con parámetros de la superclase
```

No están permitidos encadenamientos como `super.super.nace()`.

El compilador añade automáticamente `super()` como primera línea del constructor, lo que puede causar errores si el constructor padre requiere parámetros. La cadena de constructores asciende hasta `Object`, la superclase de todas las clases en Java.

## ¿Y tú de quién eres? El operador `instanceof`

Verifica si una referencia apunta a una instancia de una clase o cualquiera de sus superclases, devolviendo `boolean`:

```java
Felino f = new Felino();
if (f instanceof Felino)   // true
if (f instanceof Mamifero) // true
if (f instanceof Object)   // true
```

## Algunos métodos heredados de Object

**`public boolean equals(Object obj)`** — Compara el objeto actual con el parámetro. Se suele sobrescribir para comparar contenidos en lugar de referencias.

**`public String toString()`** — Devuelve una cadena describiendo el estado del objeto: `"NombreClase@direcciónMemoriaHexadecimal"`. Se sobrescribe con frecuencia para mostrar información útil.

## El modificador `final`

Previene la sobreescritura de un método:

```java
final tipoRetorno nombreMetodo() { … }
```

Para evitar que una clase sea extendida:

```java
final class NombreClase { … }
```

## El modificador `abstract`

Una clase abstracta no permite crear objetos directamente, pero sí subclases:

```java
abstract class NombreClase { … }
```

Los métodos abstractos se declaran sin implementación:

```java
abstract tipoRetorno nombreMetodo();
```

Las subclases están obligadas a sobrescribir todos los métodos abstractos, o declararlos también abstractos. Las clases abstractas actúan como contratos que deben cumplir sus subclases. Son útiles para clases como `Felino`, `Mamifero` o `Vehiculo`, que conceptualmente no tiene sentido instanciar.

## Los castings

### Conversión de tipos primitivos

**Sin pérdida de información:** el tipo destino tiene mayor capacidad. El compilador convierte automáticamente.

**Con pérdida de información:** el tipo destino tiene menor capacidad. Requiere el operador de casting explícito:

```java
float f = (float) 2 * 3.1415 * radio;
```

### Conversiones de referencias a objetos

**Upcasting (sin pérdida):** conversión hacia la superclase, segura y automática.

**Downcasting (con pérdida):** conversión hacia la subclase, requiere el operador de casting. Se recomienda validar con `instanceof` antes:

```java
if (f instanceof Tigre)
    Tigre t2 = (Tigre) f;
```

Si la conversión no es posible, se lanza `ClassCastException` en tiempo de ejecución.

## El polimorfismo

El polimorfismo es una característica derivada de la herencia y el casting. Un objeto puede usarse como su clase o como cualquiera de sus superclases:

```java
Tigre ti = new Tigre();
Felino fe = ti;
fe.caza();       // Correcto
fe.hacerRuido(); // Ejecuta la versión de Tigre (sobreescritura)
fe.ruge();       // Error: ruge() no pertenece a Felino
```

**Utilidades del polimorfismo:**

- Generalización mediante un ancestro común.
- Almacenar objetos de distintas clases en una misma estructura de datos.

Ejemplo con método generalizado:

```java
public void manejarFelinos(Felino f) {
    f.caza();
    f.hacerRuido();
}
```

## Las interfaces de Java

### Concepto

Una interfaz es una clase abstracta extrema donde:
- Todos los métodos son públicos y abstractos.
- No existen atributos ni constructores.

Las interfaces especifican las operaciones obligatorias para un conjunto de clases. Una clase **implementa** una interfaz (en lugar de heredar) usando `implements`. Los nombres de interfaces suelen expresar capacidades: `Comparable`, `Clonable`, `CapazDeCorrer`, `CapazDeEscuchar`.

### Declaración de una interfaz

```java
public interface CapazDeVolar {
    void despegar();
    void aterrizar();
    void volar();
}
```

### Implementación de una interfaz

```java
public class Helicoptero implements CapazDeVolar {
    // Debe dar código a todos los métodos de la interfaz
}
```

Una clase puede heredar de otra e implementar múltiples interfaces:

```java
public class B extends A implements Inter1, Inter2 { … }
```

### La herencia de interfaces

Las interfaces pueden heredar entre sí:

```java
public interface CapazDeVolar extends CapazDeMoverse {
    void despegar();
    void aterrizar();
    void volar();
}
```

Una clase que implemente la subinterfaz debe implementar los métodos de ambas.

### Las interfaces y el polimorfismo

Un objeto puede apuntarse mediante una referencia a la interfaz:

```java
Helicoptero h = new Helicoptero();
CapazDeVolar cdv = h;
h.arrancar();
cdv.despegar();
cdv.volar();
cdv.aterrizar();
cdv.parar(); // Error: parar() no pertenece a la interfaz
h.parar();   // Correcto
```

### Utilidades de las interfaces

Las interfaces son una herramienta excelente para el diseño: permiten describir la funcionalidad de las clases de forma compacta, facilitan el trabajo paralelo de equipos y mejoran la comunicación entre programadores y diseñadores. Requieren práctica para familiarizarse, ya que son las estructuras más abstractas del lenguaje Java.
