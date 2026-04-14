---
title: "Acceso a datos. Ejercicios (III). Persistencia"
description: Dos ejercicios prácticos sobre persistencia de objetos en Java usando Serializable y Externalizable para almacenar datos de vehículos.
author: Inazio Claver
date: 2015-10-13 12:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, persistencia, serializacion, serializable, externalizable, ejercicios]
pin: false
math: false
mermaid: false
---

## Ejercicio 1: Serialización de vehículos

Aplicación que almacena datos de vehículos (matrícula, marca, tamaño de depósito y modelo) en un fichero mediante serialización. Los datos se añaden sin sobrescribir ejecuciones anteriores, el campo `deposito` se marca como `transient` para que no se persista, y la aplicación muestra los datos guardados.

**Vehiculo.java:**

```java
import java.io.Serializable;

public class Vehiculo implements Serializable{
     private String matricula;
     private String marca;
     private transient double deposito;
     private String modelo;

     public Vehiculo(){}

     public void setMatricula(String matricula){
          this.matricula = matricula;
     }
     public void setMarca(String marca){
          this.marca = marca;
     }
     public void setDeposito(double deposito){
          this.deposito = deposito;
     }
     public void setModelo(String modelo){
          this.modelo = modelo;
     }
     public String toString(){
          return  "Matricula: " + matricula + ". Marca: " + marca + ". Modelo: " + modelo;
     }
}
```

**EscribirSinCabecera.java:**

Para poder añadir objetos a un fichero ya existente sin duplicar la cabecera de serialización, se extiende `ObjectOutputStream` sobreescribiendo `writeStreamHeader()` con un cuerpo vacío.

```java
import java.io.*;

public class EscribirSinCabecera extends ObjectOutputStream{
     public EscribirSinCabecera(OutputStream out) throws IOException{
          super(out);
     }
     public EscribirSinCabecera() throws IOException, SecurityException{
          super();
     }
     protected void writeStreamHeader() throws IOException{}
}
```

**Main.java:**

```java
import java.io.*;
import java.util.Scanner;

public class Main {
     public static void main(String[] args) {
          String marca;
          String modelo;
          String matricula;
          double deposito;
          Vehiculo v = new Vehiculo();
          Scanner sc = new Scanner(System.in);
          String nuevoVehiculo = "Datos del vehículo:";
          String finVehiculo = "\n";
          System.out.println("Escribe marca del coche");
          v.setMarca(sc.nextLine());
          System.out.println("Escribe modelo del coche");
          v.setModelo(sc.nextLine());
          System.out.println("Escribe matricula del coche");
          v.setMatricula(sc.nextLine());
          System.out.println("Escribe capacidad del deposito");
          v.setDeposito(Double.parseDouble(sc.nextLine()));
          boolean finFichero = false;
          File ve = new File("vehiculos.dat");
          try{
                if (ve.exists()){
                     EscribirSinCabecera salida = new EscribirSinCabecera(new FileOutputStream("vehiculos.dat", true));
                     salida.writeObject(v);
                     salida.close();
                }
                else{
                     ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream("vehiculos.dat", true));
                     salida.writeObject(v);
                     salida.close();
                }
                ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("vehiculos.dat"));
                do{
                     try{
                          Vehiculo vLeidos= (Vehiculo)entrada.readObject();
                          System.out.println(nuevoVehiculo);
                          System.out.println(vLeidos);
                          System.out.println(finVehiculo);
                     }
                    catch(EOFException e){
                          finFichero = true;
                     }
                }while(!finFichero);
                entrada.close();
          }
          catch(IOException e){
                e.printStackTrace();
          }
          catch(ClassNotFoundException e){
                e.printStackTrace();
          }
     }
}
```

## Ejercicio 2: Externalización de vehículos

Replica el ejercicio anterior usando la interfaz `Externalizable`, que permite controlar manualmente qué campos se serializan implementando `writeExternal()` y `readExternal()`. En este caso, el campo `deposito` no se serializa porque no se incluye en `writeExternal()`.

**Vehiculos.java:**

```java
import java.io.*;
import java.util.*;

public class Vehiculos implements Externalizable{
     private String matricula;
     private String marca;
     private double deposito;
     private String modelo;

     public Vehiculos(){}

     public void setMatricula(String matricula){
          this.matricula = matricula;
     }
     public void setMarca(String marca){
          this.marca = marca;
     }
     public void setDeposito(double deposito){
          this.deposito = deposito;
     }
     public void setModelo(String modelo){
          this.modelo = modelo;
     }
     public void writeExternal(ObjectOutput out) throws IOException{
          out.writeObject(matricula);
          out.writeObject(marca);
          out.writeObject(modelo);
     }
     public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException{
          matricula = (String)in.readObject();
          marca = (String)in.readObject();
          modelo = (String)in.readObject();
     }
     public void muestraInfo(){
          System.out.println("Marca: " + marca + ". Modelo: " + modelo + ". Matricula: " + matricula);
     }
}
```

**EscribirSinCabecera.java:**

```java
import java.io.*;

public class EscribirSinCabecera extends ObjectOutputStream{
     public EscribirSinCabecera(OutputStream out) throws IOException{
          super(out);
     }
     public EscribirSinCabecera() throws IOException, SecurityException{
          super();
     }
     protected void writeStreamHeader() throws IOException{}
}
```

**Main.java:**

```java
import java.io.*;
import java.util.Scanner;

public class Main {
     public static void main(String[] args) throws IOException, ClassNotFoundException{
          Vehiculos v = new Vehiculos();
          Scanner sc = new Scanner(System.in);
          boolean finFichero = false;
          File ve = new File("vehiculos.dat");

          System.out.println("Escribe marca del coche");
          v.setMarca(sc.nextLine());
          System.out.println("Escribe modelo del coche");
          v.setModelo(sc.nextLine());
          System.out.println("Escribe matricula del coche");
          v.setMatricula(sc.nextLine());
          System.out.println("Escribe capacidad del deposito");
          v.setDeposito(Double.parseDouble(sc.nextLine()));
          sc.close();

          if (ve.exists()){
                EscribirSinCabecera salida = new EscribirSinCabecera(new FileOutputStream("vehiculos.dat", true));
                v.writeExternal(salida);
                salida.close();
          }
          else{
                ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream("vehiculos.dat", true));
                v.writeExternal(salida);
               salida.close();
          }

          ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("vehiculos.dat"));
          do{
                try{
                     v.readExternal(entrada);
                     v.muestraInfo();
                }
                catch(EOFException e){
                     finFichero = true;
               }
          }while(!finFichero);
          entrada.close();
     }
}
```
