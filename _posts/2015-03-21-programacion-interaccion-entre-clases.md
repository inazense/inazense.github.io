---
title: Programación. Interacción entre clases
description: Dependencia, asociación, multiplicidad, composición, agregación y herencia entre clases en Java orientado a objetos.
author: Inazio Claver
date: 2015-03-21 12:00:00 +0800
categories: [Java, Programación]
tags: [java, programacion, poo, herencia, asociacion, composicion]
pin: false
math: false
mermaid: false
---

## La dependencia

La dependencia es la forma de interacción más pobre semánticamente, ya que relaciona dos clases por el simple hecho de que una utiliza a otra. Por ejemplo, `PruebaBombilla` depende de `Bombilla`.

![Diagrama UML de dependencia](/img/posts/20150321_5.png)

## La asociación

Expresa colaboración entre clases. En UML se muestra con una línea entre las clases implicadas, indicando el tipo de relación (por ejemplo, "es propietario de").

![Diagrama UML de asociación](/img/posts/20150321_6.png)

## Multiplicidad de una asociación

Define restricciones sobre el número de objetos que participan en la relación: números fijos (1, 12), rangos (0..2) o asterisco (0..*) para indicar "cualquier número".

![Multiplicidad en diagramas UML](/img/posts/20150321_7.jpg)

## Grado de una asociación

Clasificación por número de clases participantes: unaria, binaria, ternaria o n-aria.

![Grado de una asociación](/img/posts/20150321_8.jpg)

## Implementación en Java de una asociación

Ejemplo con `MandoDistancia` y `Televisor`:

```java
public class Televisor {
    private int canalActual;
    private boolean encendido;

    public Televisor() {
        this.canalActual = 1;
        this.encendido = false;
    }

    public void encender() {
        encendido = true;
    }

    public void apagar() {
        encendido = false;
    }

    public void seleccionarCanal(int nuevoCanal) {
        if (encendido) {
            this.canalActual = nuevoCanal;
        }
    }
}

public class MandoDistancia {
    private Televisor tv;

    public MandoDistancia(Televisor tele) {
        tv = tele;
    }

    public void encenderTelevisor() {
        tv.encender();
    }

    public void apagarTelevisor() {
        tv.apagar();
    }

    public void cambiarCanalTelevisor(int nuevoCanal) {
        tv.seleccionarCanal(nuevoCanal);
    }
}
```

![Diagrama de asociación MandoDistancia-Televisor](/img/posts/20150321_9.jpg)

## Las tablas en Java

Declaración y creación:

```java
int edades[];
edades = new int[20];
```

El acceso es mediante índices empezando en cero. La propiedad `length` indica el tamaño del array.

![Tablas (arrays) en Java](/img/posts/20150321_10.jpg)

## Asociaciones todo/parte

**Composición:** Las partes existen solo si existe el todo. En UML se representa con un diamante relleno.

![Composición en UML](/img/posts/20150321_11.jpg)

**Agregación:** Las partes pueden existir independientemente del todo. En UML se representa con un diamante vacío.

![Agregación en UML](/img/posts/20150321_12.jpg)

## La herencia

En orientación a objetos la herencia es una forma de relacionarse entre dos clases en la que una (subclase o clase hija) recibe parte de las propiedades y métodos de otra (superclase o clase padre).

Sintaxis en Java:

```java
public class Hija extends Padre { }
```

El modificador `protected` permite que los atributos y métodos sean heredados por subclases sin exponerlos públicamente.

![Herencia en UML](/img/posts/20150321_13.jpg)

![Relación subclase-superclase](/img/posts/20150321_14.jpg)

![Tabla de visibilidad en herencia](/img/posts/20150321_15.jpg)

![Código Java de herencia](/img/posts/20150321_16.png)
