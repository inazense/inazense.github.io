---
title: "Acceso a datos. Ejercicios (II). Clases File y RandomAccessFile"
description: Siete ejercicios prácticos sobre manipulación de archivos y directorios en Java usando las clases File y RandomAccessFile.
author: Inazio Claver
date: 2015-10-07 16:39:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, file, randomaccessfile, ficheros, ejercicios]
pin: false
math: false
mermaid: false
---

## Ejercicio 1: Listar archivos y directorios

```java
import java.io.*;

public class Main {
     public static void main(String[] args) {
          String directorio;
          File actual = null;

          if (args.length > 0)
                directorio = args[0];
          else
                directorio = ".";

          try{
                actual = new File(directorio);
                if(actual.isDirectory()){
                     String[] contenido = actual.list();
                     for(int i = 0; i < contenido.length; i++){
                          System.out.println(contenido[i]);
                     }
                }
                else
                     System.out.println("El directorio no es válido");
          }
          catch(Exception e){
                e.printStackTrace();
          }
     }
}
```

## Ejercicio 2: Filtrar archivos por extensión

```java
import java.io.*;

public class Main {
     public static void main(String[] args) {
          String directorio;
          File actual = null;

          if (args.length > 0)
                directorio = args[0];
          else
                directorio = ".";

          actual = new File(directorio);

          if (actual.isDirectory()){
                String[] archivos = actual.list(new FiltradoArchivos(".exe"));

                if (archivos.length > 0){
                     for(int i = 0; i < archivos.length; i++){
                          System.out.println("Archivos en " + actual.getAbsolutePath() + ":");
                          System.out.println(archivos[i]);
                     }
                }
                else{
                     System.out.println("No hay archivos para mostrar");
                }
          }
          else
                System.out.println("Directorio no válido");
     }
}
```

## Ejercicio 3: Copiar archivo origen a destino

**Opciones.java:**

```java
import java.io.*;

public class Opciones {
     private File origen = null;
     private File destino = null;
     private InputStream in = null;
     private OutputStream out = null;
     private String ruta = "";
     private boolean controlOrigen = true;

     public void copiarArchivo(File o, File d, boolean bandera){
          indicarArchivo(o, d, bandera);

          if (controlOrigen){
                try{
                     in = new FileInputStream(origen);
                     out = new FileOutputStream(destino);
                     byte[] lector = new byte[1024];
                     int i;

                     while ((i = in.read(lector)) > 0){
                          out.write(lector, 0, i);
                     }
                     System.out.println("Copia realizada correctamente");
                }
                catch(FileNotFoundException e){
                     e.printStackTrace();
                }
                catch(IOException e){
                     e.printStackTrace();
                }
                finally{
                     try{
                          in.close();
                          out.close();
                     }
                     catch(FileNotFoundException e){
                          e.printStackTrace();
                     }
                     catch(IOException e){
                          e.printStackTrace();
                     }
                }
          }
          else{
                System.out.println("El archivo de origen indicado no existe. No se puede realizar la copia");
          }
     }

     public void indicarArchivo(File o, File d, boolean bandera){
          if(o.isFile())
                origen = o;
          else
                controlOrigen = false;

          if(bandera)
                destino = d;

          if (d.isDirectory()){
                ruta = ruta + d.getAbsolutePath() + File.separator + o.getName();
                System.out.println("Path D:" + d.getAbsolutePath());
                System.out.println("Nombre origen:" + o.getName());
                System.out.println("Ruta total:" + ruta);
                destino = new File(ruta);
          }
          else
                destino = d;
     }
}
```

**Main.java:**

```java
import java.io.*;

public class Main {
     public static void main(String[] args) {
          Opciones op = new Opciones();
          File origen = new File("C:\\Users\\usuario\\workspace\\File3\\origen.txt");
          File destino = new File("C:\\Users\\usuario\\Desktop\\");
          System.out.println(destino.getAbsolutePath());

          op.copiarArchivo(origen, destino, origen.isFile());
     }
}
```

## Ejercicio 4: Copiar directorio recursivamente

**Ficheros.java:**

```java
import java.io.*;

public class Ficheros {
     public void copiarDirectorio(File dOrigen, File dDestino) throws IOException{
          if(dOrigen.isDirectory()){
                if(!dDestino.exists()){
                     dDestino.mkdir();
                }
                String[] hijos = dOrigen.list();
                for(int i = 0; i < hijos.length; i++){
                     copiarDirectorio(new File(dOrigen, hijos[i]), new File(dDestino, hijos[i]));
                     System.out.println("Copiado " + hijos[i]);
                }
          }
          else{
                copiarFichero(dOrigen, dDestino);
          }
     }

     public void copiarFichero(File fOrigen, File fDestino) throws IOException{
          InputStream in = new FileInputStream(fOrigen);
          OutputStream out = new FileOutputStream(fDestino);
          byte[] buffer = new byte[1024];
          int cap;

          while ((cap = in.read(buffer)) > 0){
                out.write(buffer, 0, cap);
          }
          in.close();
          out.close();
          System.out.println("Copiado " + fOrigen.getName());
     }
}
```

**Main.java:**

```java
import java.io.*;

public class Main {
     public static void main(String[] args) {
          File origen = new File("C:\\Users\\usuario\\workspace\\File4\\origen\\");
          File destino = new File("C:\\Users\\usuario\\workspace\\File4\\destino\\");
          Ficheros fc = new Ficheros();

          try{
                fc.copiarDirectorio(origen, destino);
                System.out.println("Volcado finalizado");
          }
          catch(IOException e){
                e.printStackTrace();
          }
     }
}
```

## Ejercicio 5: Escribir referencias y precios

**Opciones.java:**

```java
import java.io.*;
import java.util.Vector;

public class Opciones {
     public void escribePrecios(int[] ref, double[] precio, String nombre) throws IOException{
          FileWriter fW = new FileWriter(nombre);
          BufferedWriter bW = new BufferedWriter(fW);
          for(int i = 0; i < ref.length; i++){
                bW.write(String.valueOf(ref[i]) + " - " + String.valueOf(precio[i]) + "€");
                bW.newLine();
          }
          bW.close();
          fW.close();
     }
}
```

**Main.java:**

```java
import java.io.IOException;

public class Main {
     public static void main(String[] args) {
          String nombre = "precios.txt";
          int[] ref = {1, 5, 58, 80, 97};
          double[] precio = {51.03, 5.00, 4.99, 87.95, 3.14};
          Opciones op = new Opciones();

          try{
                op.escribePrecios(ref, precio, nombre);
                System.out.println("Fichero de precios generado correctamente");
          }
          catch(IOException e){
                e.printStackTrace();
          }
     }
}
```

## Ejercicio 6: Leer referencias y precios con RandomAccessFile

```java
import java.io.*;
import java.util.Random;

public class Main {
     public static void main(String[] args) {
          int i, n;
          boolean finArchivo = false;
          RandomAccessFile archivo = null;
          Random r = new Random();

          try{
                archivo = new RandomAccessFile("precios.dat", "rw");
                for (i = 0; i < 100; i++){
                     if (i % 2 == 0){
                          n = r.nextInt(500) + 1;
                          archivo.writeInt(n);
                     }
                     else{
                          n = r.nextInt(5000) + 1;
                          archivo.writeInt(n);
                     }
                }
                archivo.close();
          }
          catch(FileNotFoundException e){
                e.printStackTrace();
          }
          catch(IOException e){
                e.printStackTrace();
          }

          try{
                archivo = new RandomAccessFile("precios.dat", "rw");
                System.out.println("Referencia y precios");
                do{
                     try{
                          i = archivo.readInt();
                          n = archivo.readInt();
                          System.out.println("REF. " + i + ": " + n + "€");
                     }
                     catch(EOFException e){
                          finArchivo = true;
                          archivo.close();
                          System.out.println("Fin de fichero");
                     }
                }while(!finArchivo);
          }
          catch(FileNotFoundException e){
                e.printStackTrace();
          }
          catch(IOException e){
                e.printStackTrace();
          }
     }
}
```

## Ejercicio 7: Actualizar precios con descuento/incremento

**Metodos.java:**

```java
import java.io.*;
import java.text.DecimalFormat;

public class Metodos {
     private double i, n;
     private boolean finArchivo = false;
     private RandomAccessFile archivo = null;
     private DecimalFormat precio = new DecimalFormat("#.##");
     private DecimalFormat ref = new DecimalFormat("#");

     public void leerArchivoDoubles(String nombre){
          finArchivo = false;
          try{
                archivo = new RandomAccessFile(nombre, "rw");
                System.out.println("Referencia y precios");
                do{
                     try{
                          i = archivo.readDouble();
                          n = archivo.readDouble();
                          System.out.println("REF. " + ref.format(i) + ": " + precio.format(n) + "€");
                     }
                     catch(EOFException e){
                          finArchivo = true;
                          archivo.close();
                     }
                }while(!finArchivo);
          }
          catch(FileNotFoundException e){
                e.printStackTrace();
          }
          catch(IOException e){
                e.printStackTrace();
          }
     }

     public void cambiarPrecios(String nombre){
          finArchivo = false;
          try{
                archivo = new RandomAccessFile(nombre, "rw");
                do{
                     try{
                          i = archivo.readDouble();
                          i = archivo.readDouble();
                          if (i > 100){
                               archivo.seek(archivo.getFilePointer() - 8);
                               archivo.writeDouble(i * 0.50);
                          }
                          if (i < 100){
                               archivo.seek(archivo.getFilePointer() - 8);
                               archivo.writeDouble(i * 1.50);
                          }
                     }
                     catch(EOFException e){
                          finArchivo = true;
                          archivo.close();
                     }
                }while(!finArchivo);
          }
          catch(FileNotFoundException e){
                e.printStackTrace();
          }
          catch(IOException e){
                e.printStackTrace();
          }
     }
}
```

**Main.java:**

```java
public class Main {
     public static void main(String[] args) {
          Metodos m = new Metodos();
          m.cambiarPrecios("precios.dat");
          m.leerArchivoDoubles("precios.dat");
     }
}
```
