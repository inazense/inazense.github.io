---
title: Programación. Control de errores. Las excepciones
description: Manejo de excepciones en Java con try/catch/finally, excepciones comprobadas y no comprobadas, propagación y creación de excepciones de usuario.
author: Inazio Claver
date: 2015-04-14 12:00:00 +0800
categories: [Java, Programación]
tags: [java, programación, excepciones, try-catch, finally, errores]
pin: false
math: false
mermaid: false
---

## Concepto

Cuando programamos en un lenguaje escribimos instrucciones destinadas a:

- Implementar la solución a nuestro problema.
- Detectar y resolver las posibles situaciones excepcionales que se puedan dar (no se encuentra un fichero, el usuario se equivoca al escribir, fallos de red o de bases de datos…)

Es como si nuestro programa pudiera recorrer dos caminos bien distintos: el "normal" y el "excepcional".

Para tratar las situaciones atípicas Java usa siempre el mismo protocolo de actuación, basado en el uso de las excepciones.

Una **excepción** es un evento, que ocurre durante la ejecución del programa, y que interrumpe el flujo "normal" del mismo.

Ejemplo de excepciones:

- No se encuentra un fichero o no se puede abrir, leer…
- Una operación divide por cero o accede a una posición inexistente de una tabla.
- Fallos de hardware (disco duro, tarjeta de red, video…)

Veamos el siguiente trozo de código:

```java
public class Linterna{

   private Bombilla b = null;

   private boolean encendida;

   private double porcentajeCargaPilas;

   public Linterna(){

     // Olvidamos crear la bombilla

     porcentajeCargaPilas = 100;

   }

   public void encender(){

     b.encender();

     encendida = true;

   }

}

public class PruebaLinterna{

   public class void main(String args[]){

     Linterna lin = new Linterna();

     lin.encender(); // Provoca la excepción siguiente

   }

}
```

Este código provocará el siguiente error: `EXCEPTION IN THREAD MAIN JAVA LANG NULLPOINTEREXCEPTION`

## Protocolo de actuación

Cuando ocurre algún problema en la ejecución de un método se realiza lo siguiente:

1. **Se lanza una excepción:**
   - Se detiene el camino "normal" de la ejecución del programa.
   - El método en el que se produjo el problema crea un objeto (objeto excepción) que contiene toda la información sobre el error y el estado del programa cuando éste ocurrió.
   - El objeto creado es enviado (lanzado) a un módulo de la MVJ que actúa como gestor de la ejecución y toma el control del programa.

2. **Se intenta capturar la excepción lanzada:**
   - El Gestor de la Ejecución busca algún trozo de código capaz de manejar el error producido.
   - Primero busca el código manejador en el método que lanzó la excepción. Si lo encuentra, trata el error y devuelve el control al programa. Si no, busca en el método que llamó al que provocó el error.
   - De esta forma la excepción se va prolongando por la cadena de métodos hasta que encuentra alguno que solucione el problema.
   - Si el objeto excepción llega al método `main` y tampoco es capaz de manejarlo, se cierra el programa y se imprime la información de lo ocurrido.

En nuestro ejemplo ocurrió lo siguiente:

![Diagrama del protocolo de actuación ante una excepción](/img/posts/20150414_4.jpg)

Resumiendo:

- El método en el que se produce el error crea y lanza un objeto excepción al gestor de ejecución.
- El gestor de ejecución tiene que capturar la excepción lanzada encontrando un trozo de código capaz de manejarla en la cadena de métodos llamados (propagación de la excepción).

## La jerarquía de objetos "lanzables"

Los problemas que provocan que se lance una excepción los podemos clasificar en dos grupos:

- **Predecibles.** Hay algunas instrucciones que por su naturaleza el compilador las considera peligrosas, en el sentido de que se pueden lanzar una excepción. Ej: Las instrucciones que intentan abrir un fichero pueden lanzar una excepción porque no se encuentre el fichero o no tengamos permiso.

- **No predecibles.** Son problemas que el compilador no puede prever porque ocurren durante la ejecución. Se deben a:
  - Fallos de programación: se accede a un puntero nulo, se divide por cero un entero, se accede a una posición inexistente de una tabla…
  - Fallos del software o del hardware del sistema: falla la máquina virtual Java o el disco duro…

Java proporciona la siguiente jerarquía de clases:

![Jerarquía de clases de excepciones en Java](/img/posts/20150414_5.jpg)

## Tratamiento de una excepción

El siguiente código no compila:

```java
import java.io.*;

public class ListaDeNumeros{

   private int vector[];

   private int tamanio = 10;

   public ListaDeNumeros(){

     vector = new int[tamanio];

     for (int i = 0; i < tamanio; i++)

         vector[i] = i;

   }

   public void escribeLista(){

     PrintWriter fichTexto = new PrintWriter("Lista.txt");

     for (int i = 0; i < tamanio; i++)

         fichTexto.println("El valor de " + i + " = " + vector[i]);

     fichTexto.close();

   }

}
```

El compilador nos dice: `<< Tipo de excepción FileNotFoundException no manejada >>`

El compilador ha identificado un problema potencial (o predecible) en el método `escribeLista` y nos obliga a elegir entre:

- **Afrontar el problema.** Capturar la excepción escribiendo un trozo de código que la maneje.
- **Ignorar el problema.** No escribimos código para capturar la excepción, simplemente dejamos que se propague al siguiente método de la cadena de llamadas.

**Si elegimos afrontar el problema** entonces tenemos que capturar la excepción. Para ello hay que encerrar la instrucción peligrosa en un bloque `try` (intentar) y su solución en un bloque `catch` (capturar):

```java
try{

   …

   Instrucción peligrosa

   …

}

catch(TipoDeExcepción e){

   tratamiento del problema

}
```

En nuestro ejemplo, ahora modificamos `escribeLista` para que capture la excepción:

```java
public void escribeLista(){

   try{

     PrintWriter fichTexto = new PrintWriter("lista.txt");

     for(int i = 0; i < tamanio; i++)

         fichTexto.println("El valor de " + i + " = " + vector[i]);

     fichTexto.close();

   }

   catch(FileNotFoundException e){

     System.out.println("Error al abrir el fichero lista.txt");

     e.printStackTrace(); // Saca los errores por consola de Java

   }

}
```

**Si elegimos ignorarlo** debemos saber que para que un método ignore una excepción hay que indicarlo en su prototipo:

```java
public void escribeLista() throws FileNotFoundException{

   PrintWriter fichTexto = new PrintWriter("lista.txt");

   for (int i = 0; i < tamanio; i++)

     fichTexto.println("El valor de " + i + " = " + vector[i]);

   fichTexto.close();

}
```

## Excepciones comprobadas y no comprobadas

El compilador sólo nos obliga a elegir entre capturar o ignorar una excepción si ésta se corresponde con un problema predecible. Esto divide las excepciones en dos grupos:

- Las comprobadas por el compilador (*checked exceptions*)
- Las no comprobadas (*unchecked exceptions*)

Las excepciones no comprobadas se producen en tiempo de ejecución y son muy variadas y numerosas; si el compilador nos obligara a tratarlas se reduciría mucho la claridad del código.

## Tratamiento de varias excepciones

Java permite ignorar varias excepciones comprobadas siempre que las especifiquemos en el prototipo del método:

```java
modVisib tipoRetorno nombre() throws exc1, exc2, …{ … }
```

Para capturar varias excepciones podemos escribir varios bloques `catch` para un mismo `try`:

```java
try{

   // Bloque de instrucciones que puede lanzar varias excepciones

}

catch(ClaseExcepcion1 excep1){

   // Tratamiento excep1

}

catch(ClaseExcepcion2 excep2){

   // Tratamiento excep2

}
```

Veamos un ejemplo:

```java
import java.io.*;

public class ManejaFicheroTexto{

   private FileReader manejadorFichero;

   public void visualiza(String nombreFichero){

     int caracter;

     try{

         manejadorFichero = new FileReader(nombreFichero);

         caracter = manejadorFichero.read();

         while(caracter != -1){

              System.out.write(caracter);

              caracter = manejadorFichero.read();

         }

         manejadorFichero.close();

     }

     catch(FileNotFoundException e){

         System.out.println("Error al abrir el fichero " + nombreFichero);

     }

     catch(IOException e){

         System.out.println("Error al leer o cerrar el fichero " + nombreFichero);

         e.printStackTrace();

     }

   }

}
```

Si se produce una excepción, el Gestor de Ejecución comprueba los bloques `catch` por orden de aparición.

**Regla del orden de los bloques catch:** Debemos capturar las excepciones de las más concretas a las más generales.

![Jerarquía de clases de IOException](/img/posts/20150414_6.png)

![Orden correcto de bloques catch](/img/posts/20150414_7.png)

## El bloque finally

El bloque `finally` acompaña al bloque `try` y se escribe al final de los bloques `catch` (si existen). Se ejecutará siempre que se ejecute el bloque `try`, se produzca o no una excepción.

```java
try{

   …

}

catch(tipoExcepcion e1){

   …

}

finally{

   …

}
```

Es útil cuando queremos cerrar recursos (ficheros, conexiones a una base de datos):

```java
public void visualiza(String nombreFichero){

   int caracter;

   try{

     manejadorFichero = new FileReader(nombreFichero);

     caracter = manejadorFichero.read();

     while (caracter != -1){

         System.out.write(caracter);

         caracter = manejadorFichero.read();

     }

   }

   catch(FileNotFoundException e){

     System.out.println("Error al leer el fichero " + nombreFichero);

   }

   catch(IOException e){

     System.out.println("Error al leer o cerrar el fichero " + nombreFichero);

     e.printStackTrace();

   }

   finally{

     if(manejadorFichero != null)

         manejadorFichero.close();

   }

}
```

## La creación de excepciones de usuario

Java permite crear y lanzar excepciones propias simplemente heredando de `Exception` o de alguna de sus subclases.

Pasos a seguir:

1. **Identificar las excepciones que necesitamos.**
2. **Escoger un nombre significativo.** Las excepciones de usuario se suelen terminar con la palabra `Exception`. Ejemplos: `NumeroTarjetaInvalidoException`, `DniIncorrectoException`, `CocheSinCombustibleException`…
3. **Elegir la clase de la que vamos a heredar** y crear la nueva clase excepción.
4. **Crear el objeto excepción y lanzarlo:**

```java
throw new DniIncorrectoException{ … };
```

Ejemplo con la clase `Bombilla`:

```java
public class BombillaFundidaException extends Exception{

   public BombillaFundidaException(){}

   public BombillaFundidaException(String mensaje){

     super(mensaje);

   }

}

public class Bombilla{

   private int potencia;

   private int numEncendidos;

   private boolean encendida;

   private boolean fundida;

   public Bombilla(int potencia){

     this.potencia = potencia;

   }

   public void apagar() throws BombillaFundidaException{

     if (fundida == true)

         throw new BombillaFundidaException();

     else

         encendida = false;

   }

   public void encender() throws BombillaFundidaException{

     if (fundida == true)

         throw new BombillaFundidaException();

     else{

         if (encendida == false){

              numEncendidos++;

              if (numEncendidos == 1000){

                   fundida = true;

                   encendida = false;

                   throw new BombillaFundidaException("Recien fundida");

              }

         }

     }

   }

   public boolean estaFundida(){

     return fundida;

   }

}
```

Ahora al usar los métodos "peligrosos" el compilador nos obligará a capturar la excepción o ignorarla:

```java
public class PruebaBombilla{

   public static void main(String args[]){

     Bombilla b = new Bombilla(100);

     try{

         b.encender();

         b.apagar();

     }

     catch(BombillaFundidaException e){

         System.out.println("Bombilla fundida");

     }

   }

}
```

## Ventajas del uso de excepciones

- Permite separar el código normal del código de manejo de errores, mejorando la legibilidad y comprensión del código.
- Se agrupan los errores en una jerarquía de clases que permite la captura y tratamiento por grupos.
- Se evita el diseño y uso de los códigos de error, que es un mecanismo bastante tedioso y propenso a fallos.
- La propagación de una excepción por la cadena de llamadas permite capturarla en el método que queramos.
- Permite al usuario crear sus propias excepciones mediante la herencia, estandarizando la forma de tratar los errores para cualquier clase.
