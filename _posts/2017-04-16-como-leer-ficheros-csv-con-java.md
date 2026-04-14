---
title: Cómo leer ficheros CSV con Java
description: Aprende a leer archivos CSV en Java con BufferedReader y OpenCSV. Tutorial completo paso a paso para procesar CSV simples y complejos, manejar comillas, separadores y caracteres especiales con ejemplos de código.
author: Inazio Claver
date: 2017-04-16 12:10:00 +0800
categories: [Java]
tags: [java, csv, opencsv, bufferedreader, archivos, parsing, delimitadores]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Un **CSV** es un fichero de texto plano que consta de varios valores separados por comas (o punto y coma, según el caso), de modo que para procesar este tipo de ficheros en **Java** en principio debería bastar con leer el archivo línea a línea y partir las cadenas de texto por el separador correspondiente.

Por ejemplo, si tenemos la siguiente línea, sería bastante sencillo de procesarlo:

```
Programando, a, pasitos
```

Pero sin embargo, si nos encontramos alguna de las siguientes entradas:

```
"Programando a pasitos", "Claver, Inazio", "CSV, Java"
```

ya es más complicado, al formar las comas parte de la cadena de texto que queremos extraer. Y si además tenemos en cuenta que las comillas también pueden ser parte de ese valor, se complicaría, teniendo que poner dobles comillas para indicar que es parte del valor de una cadena.

```
"Programando a pasitos", "Claver, Inazio", """Leyendo CSV"" en Java"
```

Vamos a ver como procesar los dos tipos de **CSV** anteriores, el sencillo y el complejo.

## Lectura de CSV sencillo

El primer ejemplo va a ser la lectura de un .csv sencillo, en la que no tenemos que eliminar comillas y que el caracter del separador sólo se usa para delimitar los campos del .csv. Por ejemplo, este:

```
Inazio, Programando a pasitos, Tutorial
Lectura, CSV, Java
```

Usaremos la coma como separador, quedándo nuestro código tal que así

```java
public static final String SEPARADOR = ",";

public static void main(String[] args) {
 
 BufferedReader bufferLectura = null;
 try {
  // Abrir el .csv en buffer de lectura
  bufferLectura = new BufferedReader(new FileReader("archivo.csv"));
  
  // Leer una linea del archivo
  String linea = bufferLectura.readLine();
  
  while (linea != null) {
   // Sepapar la linea leída con el separador definido previamente
   String[] campos = linea.split(SEPARADOR); 
   
   System.out.println(Arrays.toString(campos));
   
   // Volver a leer otra línea del fichero
   linea = bufferLectura.readLine();
  }
 } 
 catch (IOException e) {
  e.printStackTrace();
 }
 finally {
  // Cierro el buffer de lectura
  if (bufferLectura != null) {
   try {
    bufferLectura.close();
   } 
   catch (IOException e) {
    e.printStackTrace();
   }
  }
 }
}
```

Yendo por pasos

1. Debemos abrir el archivo .csv. Como queremos recorrerlo línea a línea, la clase ```BufferedReader``` es la más adecuada, porque nos permite usar el método ```readLines()```.
2. Después de eso, armaremos un bucle que seguirá leyendo líneas de nuestro buffer hasta que devuelva null.
3. Dividiremos la cadena en un array de strings usando el método ```split()``` con el parámetro del separador.
4. Por último, si el buffer de léctura se ha abierto (que salvo que haya saltado alguna excepción a la hora de abrir el archivo, así será) deberemos cerrarlo en el bloque ```finally```.

## Lectura de CSV complejo

A la hora de leer un CSV complejo, como el que sigue:

```
"Programando a pasitos", "Claver, Inazio", "CSV, Java"
```

echaremos mano de la librería [OpenCSV](https://opencsv.sourceforge.net/). Nos descargamos el jar desde aquí, y escribiremos el siguiente código:

```java
public static final char SEPARADOR = ';';
public static final char COMILLAS = '"';

public static void main(String[] args) {
 
 CSVReader lector = null;
 
 try {
  // Abrir el .csv
  lector = new CSVReader(new FileReader("archivo.csv"), SEPARADOR, COMILLAS);
  
  // Definir el string de la línea leída
  String linea = null;
  
  while ((linea = lector.readNext()) != null) {
   System.out.println(Arrays.toString(linea));
  }
 } 
 catch (IOException e) {
  e.printStackTrace();
 }
 finally {
  // Cierro el buffer de lectura
  if (lector != null) {
   try {
    lector.close();
   } 
   catch (IOException e) {
    e.printStackTrace();
   }
  }
 }
}
```

El proceso es muy similar al anterior, salvo que en vez de un ```BufferedReader``` creamos un objeto de ```CSVReader```.

Puedes descargarte una clase con los ejemplos completos en [mi github](https://github.com/inazense/scripts/blob/master/scripts/java/LectorCSV.java).

**¡Salud y coding!**