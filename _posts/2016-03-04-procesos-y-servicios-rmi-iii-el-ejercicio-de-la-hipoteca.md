---
title: Procesos y servicios. RMI (III). El ejercicio de la hipoteca
description: Implementación completa de una aplicación RMI para calcular la cuota mensual de una hipoteca, con interfaz remota, objeto remoto, servidor y cliente.
author: Inazio Claver
date: 2016-03-04 18:24:00 +0800
categories: [Java, Programación de servicios y procesos]
tags: [java, rmi, procesos, servicios, distribuido, hipoteca, ejercicio]
pin: false
math: false
mermaid: false
---

Ejercicio práctico de RMI: un programa distribuido cliente-servidor que calcula la cuota mensual de una hipoteca de forma remota.

## Fundamento matemático

La cuota mensual de un préstamo se calcula según la fórmula:

![Fórmula de la cuota mensual](/img/posts/20160304_4.png)

Ejemplo: para un préstamo de 100.000 € al 4% anual a 20 años con pagos mensuales:

![Ejemplo de cálculo](/img/posts/20160304_5.png)

![Resultado del cálculo](/img/posts/20160304_6.png)

## Estructura del proyecto (4 clases)

El proyecto tiene la siguiente estructura:

- `InterfaceRemota.java` — Interfaz remota con el método `cuotaMensual()`.
- `ObjetoRemoto.java` — Implementación del cálculo, extiende `UnicastRemoteObject`.
- `Servidor.java` — Publica el objeto remoto mediante `Naming.rebind()`.
- `Cliente.java` — Obtiene el objeto remoto e invoca el cálculo mediante `Naming.lookup()`.

![Pasos de compilación y despliegue](/img/posts/20160304_7.png)

## Código

### InterfaceRemota.java

```java
package claver.creditos;

import java.rmi.*;
import java.io.Serializable;

/**
 * Interface Remota con métodos para llamada en remoto
 */
public interface InterfaceRemota extends Remote {
    public double cuotaMensual(double capital, double interes, double plazo) throws RemoteException;
} // Fin InterfaceRemota
```

### ObjetoRemoto.java

```java
package claver.creditos;

import java.io.Serializable;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class ObjetoRemoto extends UnicastRemoteObject implements InterfaceRemota {
    // Construye una instancia de ObjetoRemoto
    public ObjetoRemoto() throws RemoteException {
        super();
    } // Fin Constructor

    // Calcula la cuota mensual de un préstamo dado capital, interés anual y plazo anual
    public double cuotaMensual(double capital, double interes, double plazo) {
        System.out.println("Calculando cuota...");
        double plazoMes = plazo / 12.00;
        double interesMes = interes / 12.00;
        return (capital * interes) / (100.00 * (1 - (Math.pow(interesMes / 100.00, plazoMes))));
    } // Fin cuotaMensual
} // Fin ObjetoRemoto
```

### Servidor.java

```java
package claver.creditos;

import java.rmi.*;

/**
 * Servidor para el ejemplo RMI
 * Exporta un método para sumar dos enteros y devuelve resultado
 */
public class Servidor {
    // Crea nueva instancia de Servidor RMI
    public Servidor() {
        try {
            /* Indico a rmiregistry donde están las clases.
               Cambio el path al sitio en el que esté.
               Hay que mantener la barra al final */
            System.setProperty(
                "java.rmi.server.codebase",
                "file:/C:/ejercicios/primero/src_servidor");
            // Se publica el objeto remoto
            InterfaceRemota objetoRemoto = new ObjetoRemoto();
            Naming.rebind("//localhost/ObjetoRemoto", objetoRemoto);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    } // Fin Constructor

    // Main
    public static void main(String[] args) {
        new Servidor();
    } // Fin Main
} // Fin Servidor
```

### Cliente.java

```java
package claver.creditos;

import java.rmi.*;
import java.text.*;

/**
 * Ejemplo de cliente RMI
 */
public class Cliente {
    // Crea nueva instancia de Cliente
    public Cliente() {
        try {
            /* Lugar en el que está el objeto remoto.
               Debe reemplazarse "localhost" por el nombre o IP donde
               esté corriendo "rmiregistry".
               Naming.lookup() obtiene el objeto remoto */
            InterfaceRemota objetoRemoto = (InterfaceRemota) Naming.lookup("//localhost/ObjetoRemoto");
            // Hago cálculo remoto
            System.out.println("Capital: 20.000 euros");
            System.out.println("Interes: 6%");
            System.out.println("Plazo: 5 años");
            DecimalFormat df = new DecimalFormat("#.##");
            System.out.println("Cuota mensual: " + df.format(objetoRemoto.cuotaMensual(20000.00, 6.00, 5.00)) + " euros");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    } // Fin constructor

    // Main
    public static void main(String[] args) {
        new Cliente();
    } // Fin Main
} // Fin Cliente
```

## Pasos para compilar y ejecutar

```
# 1. Compilar todo desde el directorio src
javac claver/creditos/*.java

# 2. Generar el stub con rmic
rmic claver.creditos.ObjetoRemoto

# 3. Copiar los .class del servidor al directorio del servidor
#    y los del cliente al directorio del cliente

# 4. Arrancar rmiregistry (desde el directorio con los .class)
rmiregistry

# 5. Ejecutar el servidor
java claver.creditos.Servidor

# 6. Ejecutar el cliente
java claver.creditos.Cliente
```
