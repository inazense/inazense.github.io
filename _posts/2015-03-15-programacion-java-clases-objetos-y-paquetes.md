---
title: Programación. Java. Clases, objetos y paquetes
description: Definición de clases y métodos en Java, constructores, instanciación de objetos y el método main.
author: Inazio Claver
date: 2015-03-15 15:35:00 +0800
categories: [Java, Programación]
tags: [java, programacion, clases, objetos, constructores]
pin: false
math: false
mermaid: false
---

## Definición de una clase

```java
public class NombreClase {
    // Declaración de las propiedades
    // Declaración de los comportamientos
}
```

El nombre de la clase comienza con mayúscula y se capitaliza el inicio de cada palabra. Ejemplos: `Persona`, `VentanaTipoA`, `ImpresoraLaser`.

## Declaración de las propiedades

Las propiedades constituyen el conjunto de características atribuibles a la clase, denominadas variables miembro o campos:

```java
public class Empleado {
    public String nombre = null;
    public String apellido1, apellido2, cargo;
    public double salario = 1000;
    public Date fechaAlta, fechaBaja, fechaNacim;
    public Boolean estaDeBaja = false;
}
```

## Declaración de los comportamientos

Los métodos definen los comportamientos de una clase. Requieren nombre, parámetros de entrada (0 a N) y parámetro de salida (0 a 1). Se nombran en minúsculas capitalizando el inicio de cada palabra excepto la primera:

```java
public void cambioDeCargo(String nuevoCargo) { … }
public String obtenerCargo() { … }
```

Ejemplo completo con la clase `Bombilla`:

```java
public class Bombilla {
    public boolean encendida = false;
    public int potencia = 100;
    public int numEncendidos = 0;

    public void encender() {
        encendida = true;
        numEncendidos++;
        System.out.println("Bombilla de " + potencia + " vatios encendida");
    }

    public void apagar() {
        encendida = false;
        System.out.println("Bombilla de " + potencia + " vatios apagada");
    }
}
```

![Clase Bombilla en Eclipse](/img/posts/20150315_3.png)

## Características de las clases

- **Abstracción:** Todas las clases abstraen propiedades y comportamientos de conjuntos de objetos.
- **Estado:** Las clases poseen propiedades capaces de almacenar el estado de un objeto, que evoluciona con el tiempo.
- **Responsabilidad:** Deben garantizar que los objetos permanezcan siempre en un estado coherente.

## Constructores

Los constructores son métodos especiales que permiten crear objetos, garantizando la inicialización de propiedades a valores coherentes:

```java
public NombreDeLaClase(lista de parámetros) {
    …
}
```

Características:
- Se llaman exactamente igual que la clase.
- No requieren tipo de retorno.

```java
public class Bombilla {
    public int potencia;
    public int numEncendidos;
    public boolean encendida, fundida;

    public Bombilla(int potenciaInicial, int numEncendidosInicial) {
        encendida = false;
        fundida = false;
        potencia = potenciaInicial;
        if (potencia <= 0)
            potencia = 20;
        numEncendidos = numEncendidosInicial;
        if (numEncendidos < 0)
            numEncendidos = 0;
    }

    public void encender() {
        encendida = true;
        numEncendidos++;
        System.out.println("Bombilla de " + potencia + " vatios encendida");
    }

    public void apagar() {
        encendida = false;
        System.out.println("Bombilla de " + potencia + " vatios apagada");
    }
}
```

El compilador añade automáticamente inicializaciones antes de ejecutar el constructor: números y `char` a cero, lógicos a `false`, referencias a `null`.

Si no se escribe un constructor, el compilador genera uno por defecto (público, sin parámetros ni código).

## Instanciación y utilización de objetos

```java
Bombilla b;
b = new Bombilla(100, 5);
```

O en una sola línea:

```java
Bombilla b = new Bombilla(100, 5);
```

Usando los objetos:

```java
Bombilla b1 = new Bombilla(100, 5);
Bombilla b2 = new Bombilla(60, 0);
if (b1.fundida == false)
    b1.encender();
b2.encender();
b1.apagar();
```

## El método main

Es el punto de comienzo de un programa orientado a objetos. Siempre se incluye en una clase con el prototipo:

```java
public static void main(String[] args) {
    …
}
```

El parámetro `args` recibe los argumentos pasados desde la línea de comandos.

![Clase PruebaBombilla con el método main](/img/posts/20150315_4.png)

```java
public class PruebaBombilla {
    public static void main(String args[]) {
        int i;
        Bombilla b = new Bombilla();

        for (i = 1; i <= 1000; i++) {
            b.encender();
            b.apagar();
        }

        b.encender();
        b.apagar();
    }
}
```

![Salida del programa en Eclipse](/img/posts/20150315_5.png)

## Características de los objetos

- Poseen espacio de memoria propio.
- Cada objeto tiene identidad propia y conserva su estado interno.
- Deben mantener siempre un estado interno coherente; esta responsabilidad recae en la clase.
