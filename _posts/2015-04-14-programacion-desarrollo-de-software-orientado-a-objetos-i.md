---
title: Programación. Desarrollo de software orientado a objetos (I)
description: Arquitectura en capas, ingeniería del software orientada a objetos, la API de Java con Calendar, clases envoltorio de tipos primitivos y streams de entrada/salida.
author: Inazio Claver
date: 2015-04-14 12:00:00 +0800
categories: [Java, Programación]
tags: [java, programación, orientado-a-objetos, mvc, streams, api, calendar]
pin: false
math: false
mermaid: false
---

## Una arquitectura basada en capas

Cuando desarrollamos una aplicación podemos asemejar la tarea a la construcción de un edificio.

Un proyecto de software orientado a objetos SIEMPRE debe basarse en capas.

![Arquitectura en capas de un proyecto software](/img/posts/20150414_8.png)

Cada capa tiene una responsabilidad definida:

- El usuario solicita un servicio mediante la **capa de presentación**.
- El sistema resuelve la petición en la **capa de negocio**.
- La capa del negocio se apoya en la **capa de persistencia** que se encarga de guardar y recuperar objetos de la base de datos.

En cada capa deben crearse las clases y objetos necesarios:

- **Presentación:** `VentanaPrincipal`, `MenuEdicion`, `BotonAceptar`, `BotonImprimir`… `JFrame`, `JButton`, `JMenu`, `ActionEvent`, `KeyEvent`…
- **Negocio:** `Connection`, `ResultSet`, `Statement`…

## La ingeniería del software orientada a objetos

Se encarga de desarrollar productos de software de calidad en un tiempo y coste pactados de antemano.

Según el enfoque adoptado al modelar el problema:

- **Estructurada.** El ladrillo es el concepto de función y la librería o módulo que las agrupa. Técnicas: Diagramas de flujo de datos, entidad–relación, diagramas de Constantine, pseudocódigos…
- **Orientada a objetos.** El ladrillo que usamos es la clase/objeto y el paquete como elemento contenedor. Técnicas: Diagramas de casos de uso, de clases, de secuencia, de colaboración, mapeo de objetos a bases de datos relacionales…

La mayoría de las técnicas usadas para modelar un problema con orientación a objetos suelen plasmarse en diagramas **UML (Unified Modelling Language)**.

Los diagramas UML se clasifican según el modelado del sistema:

- **Modelo de requisitos.** Diagramas de casos de uso.
- **Modelo estático.** Diagrama de clases.
- **Modelo dinámico.** Diagramas de secuencia.

![Metodología de desarrollo de software](/img/posts/20150414_9.png)

## Un paseo por la API

### Fecha y hora

Las clases que necesitamos son:

- **`Date`.** Representa un instante de tiempo específico con precisión de milisegundos. Actualmente *deprecated*.
- **`Calendar`.** Es una colección de propiedades y métodos que facilitan el trabajo con instantes de tiempo. Al ser demasiado abstracta no podemos crear un objeto de la clase `Calendar` directamente.
- **`GregorianCalendar`.** Implementa los métodos abstractos heredados de `Calendar` tomando como referencia el calendario gregoriano.

![Foto del material de clase sobre Calendar](/img/posts/20150414_10.jpg)

```java
GregorianCalendar ahoraCal = new GregorianCalendar();
```

O bien:

```java
Calendar ahoraCal = new GregorianCalendar();
```

Propiedades públicas y estáticas de `Calendar`:

- `YEAR` — Año
- `MONTH` — Mes, entre 0 y 11
- `DAY_OF_MONTH` — Día del mes
- `DAY_OF_WEEK` — Día de la semana entre 1 (Sunday) y 7 (Saturday)
- `HOUR` — Hora antes o después del medio día (en intervalos de doce horas)
- `HOUR_OF_DAY` — La hora absoluta del día (en intervalos de 24 horas)
- `MINUTE` — El minuto dentro de la hora
- `SECOND` — El segundo dentro del minuto

**Método `get`:**

```java
int get(int campo)
```

Ejemplo:

```java
int dia, mes, anio;

GregorianCalendar ahoraCal = new GregorianCalendar();

anio = ahoraCal.get(Calendar.YEAR);

mes = ahoraCal.get(Calendar.MONTH);

dia = ahoraCal.get(Calendar.DAY_OF_MONTH);

System.out.println("Hoy es " + dia + "/" + mes + "/" + anio);
```

**Para establecer valores de una fecha:**

```java
void set(int anio, int mes, int dia)

void set(int anio, int mes, int dia, int hora, int min, int seg);

void set(int campo, int nuevoValor);
```

**Para sumar o restar tiempo:**

```java
void add(int campo, int cantidad);
```

Ejemplo:

```java
GregorianCalendar calen = new GregorianCalendar();

calen.add(Calendar.YEAR, -1);

System.out.println("Año pasado = " + calen.get(Calendar.YEAR));
```

**Para comparar instantes temporales:**

```java
boolean before(Calendar instante);

boolean after(Calendar instante);

boolean equals(Calendar instante);
```

### Las clases envoltorio de los tipos primitivos

Los tipos primitivos (`int`, `double`, `boolean`) no son objetos. En el paquete `java.lang` se incluye un conjunto de clases que envuelven a cada tipo primitivo, dotándolo de métodos y propiedades útiles.

**`Number` y su descendencia:**

```java
int intValue(); // Devuelve el valor envuelto convertido a int

double doubleValue(); // Devuelve el valor envuelto convertido a double
```

Tomemos `Integer` como ejemplo. Propiedades estáticas: `MAX_VALUE`, `MIN_VALUE`.

Métodos estáticos para conversión de `String` a `int`:

```java
static int parseInt(String cadena) throws NumberFormatException;

static int parseInt(String cadena, int base) throws NumberFormatException;
```

Ejemplos:

```
Integer.parseInt("123");      → devuelve 123
Integer.parseInt("11111111"); → devuelve 255
Integer.parseInt("FF", 16);   → devuelve 255
Integer.parseInt("FF", 10);   → NumberFormatException
```

La clase `Character` (envuelve a `char`) ofrece métodos estáticos muy útiles:

```java
static int getNumericValue(char c);

static boolean isDigit(char c);

static boolean isLetter(char c);

static boolean isLetterOrDigit(char c);

static boolean isLowerCase(char c);

static boolean isUpperCase(char c);

static char toLowerCase(char c);
```

### La entrada y salida en Java. Los streams

Un **stream** representa a una corriente o flujo de datos que sale o entra en nuestro programa.

**Clasificación de los streams:**

Según la dirección: de entrada / de salida.

Según el tipo de dato: de bytes (8 bits), de caracteres (Unicode: 16 bits), de líneas, de datos, de objetos.

Según su comportamiento: Transportadores, Transformadores, Retenedores.

**Streams de ENTRADA basados en bytes:**

```
InputStream{abstracta}
   ByteArrayInputStream
   ObjectInputStream
   FileInputStream
   FilterInputStream
     DataInputStream
     BufferedInputStream
```

**Streams de ENTRADA basados en caracteres UNICODE:**

```
Reader{abstracta}
   StringReader
   BufferedReader
   InputStreamReader
     FileReader
```

**Streams de SALIDA basados en bytes:**

```
OutputStream{abstracta}
   ByteArrayOutputStream
   ObjectOutputStream
   FileOutputStream
   FilterOutputStream
     DataOutputStream
     BufferedOutputStream
```

**Streams de SALIDA de caracteres UNICODE:**

```
Writer{abstracta}
   PrintWriter
   BufferedWriter
   OutputStreamWriter
     FileWriter
```

Para leer datos del teclado, se combinan varios streams. La clase `System` nos devuelve un stream de bytes a través de su propiedad estática `in`.

![Diagrama de System.in como stream de bytes](/img/posts/20150414_11.jpg)

Convertimos el stream de bytes a caracteres UNICODE con `InputStreamReader`:

```java
InputStreamReader isr = new InputStreamReader(System.in);
```

![Diagrama con InputStreamReader añadido](/img/posts/20150414_12.jpg)

Por último lo combinamos con `BufferedReader` para mejorar la eficacia en el acceso al teclado:

```java
BufferedReader teclado = new BufferedReader(isr);
```

![Diagrama completo con BufferedReader](/img/posts/20150414_13.jpg)

Clase `Teclado` completa:

```java
import java.io.*;

public class Teclado{

   private InputStreamReader filtro;

   private BufferedReader teclado;

   public Teclado(){

     filtro = new InputStreamReader(System.in);

     teclado = new BufferedReader(filtro);

   }

   public String leerString(String cadena) throws IOException{

     System.out.println(cadena);

     return (teclado.readLine());

   }

   public byte leerByte() throws IOException{

     return(Byte.parseByte(teclado.readLine()));

   }

   public char leerChar() throws IOException{

     return ((char) teclado.read());

   }

}
```
