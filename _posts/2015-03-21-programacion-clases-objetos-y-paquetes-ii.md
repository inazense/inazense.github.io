---
title: Programación. Clases, objetos y paquetes (II)
description: Ocultación y encapsulamiento, getters y setters, referencia this, sobrecarga, modificador static y paquetes en Java.
author: Inazio Claver
date: 2015-03-21 19:06:00 +0800
categories: [Java, Programación]
tags: [java, programacion, clases, encapsulamiento, paquetes, static]
pin: false
math: false
mermaid: false
---

## La ocultación y el encapsulamiento

Permitir acceso directo a las propiedades de un objeto es peligroso: se podrían modificar estados sin respetar las reglas de validación. La solución es declarar las propiedades como `private`:

```java
public class Bombilla {
    private int potencia;
    private int numEncendidos;
    private Boolean encendida, fundida;
}
```

Se introduce entonces el concepto de **getters** (métodos de consulta) y **setters** (métodos modificadores):

```java
public int obtenerNumEncendido() {
    return numEncendidos;
}

public void establecerPotencia(int nuevaPotencia) {
    if (nuevaPotencia > 0)
        potencia = nuevaPotencia;
}
```

Eclipse puede generar automáticamente getters y setters mediante **Source → Generate Getters and Setters**.

## El objeto en primera persona. Referencia `this`

`this` hace referencia al propio objeto y sirve para resolver conflictos de nombres entre parámetros y propiedades:

```java
public void establecerPotencia(int potencia) {
    if (potencia > 0)
        this.potencia = potencia;
}
```

## Sobrecarga de métodos

Reglas para sobrecargar métodos:
- Mismo nombre y tipo de retorno.
- Se distinguen por número y/o tipo de parámetros.
- La visibilidad no sirve para distinguirlos.

![Ejemplo de sobrecarga en constructores y métodos](/img/posts/20150321_1.png)

## El modificador `static`

Las propiedades y métodos `static` pertenecen a la clase, no a los objetos individuales. Son compartidos por todas las instancias:

```java
public class Bombilla {
    private static int consumoTotal = 0;

    public static int getConsumoTotalBombillas() {
        return consumoTotal;
    }
}
```

Se accede a través del nombre de la clase:

```java
System.out.println(Bombilla.getConsumoTotalBombillas() + "W");
```

La clase `Math` de la librería estándar y `System.out.println` son ejemplos habituales de uso de métodos estáticos.

## Concepto y notación UML de paquetes

Los paquetes agrupan clases relacionadas. Por ejemplo, un paquete `electrodomesticos` podría contener las clases `Bombilla`, `Televisor`, `Video` y `MandoUniversal`.

![Diagrama UML de paquetes](/img/posts/20150321_2.jpg)

## Declaración de un paquete

La declaración de paquete debe ser la primera línea del fichero:

```java
package nombreDelPaquete;
```

**Reglas de nombrado:**
- Minúsculas, sin espacios.
- Comenzar con letra, `$` o `_`.
- No pueden ser palabras reservadas.
- Paquetes anidados separados por puntos.

**Ejemplos correctos:** `utilidades`, `gestionClientes`, `utilidades.graficos`, `utilidades.sonidos`

**Ejemplos incorrectos:** `12meses`, `static`, `future-soft`, `double.number`

## El espacio de nombres

Los paquetes evitan conflictos de nombres: dos clases pueden tener el mismo nombre si pertenecen a paquetes distintos.

La convención de nombres usa el dominio inverso de la empresa:
- `www.endesa.com` → `com.endesa.servicios`, `com.endesa.facturacion`
- `www.sadiel.es` → `es.sadiel.servicios`, `es.sadiel.facturacion`

## La estructura de carpetas asociada

Hay una relación directa entre paquetes y carpetas: cada paquete corresponde a una carpeta, y cada clase a un fichero `.java`.

![Estructura de carpetas correspondiente a los paquetes](/img/posts/20150321_3.jpg)

## Clases visibles dentro y fuera de un paquete

Las clases declaradas con `public` son visibles dentro y fuera del paquete. Sin modificador de acceso, solo son visibles dentro del paquete.

**Visibilidad amigable o de paquete:** Sin `public` ni `private`:

```java
int codigoCliente;
boolean propietario;
void imprimeCliente() { … }
```

En UML se denota sin símbolo de visibilidad.

![Niveles de acceso entre clases del mismo paquete](/img/posts/20150321_4.jpg)

## Sentencias de importación

Para usar clases de otros paquetes se usa `import`:

```java
import utilidades.Teclado;
import utilidades.graficos.*;
```

Eclipse puede conectarse con la documentación estándar de Java para ofrecer información contextual durante el desarrollo.
