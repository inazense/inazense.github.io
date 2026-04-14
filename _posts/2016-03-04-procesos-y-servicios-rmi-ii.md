---
title: Procesos y servicios. RMI (II)
description: Elementos de una aplicación RMI, interfaces remotas, stubs, serialización, servicio rmiregistry y ejemplo completo con interfaz, servidor y cliente.
author: Inazio Claver
date: 2016-03-04 12:00:00 +0800
categories: [Java, Programación de servicios y procesos]
tags: [java, rmi, procesos, servicios, distribuido, serializable]
pin: false
math: false
mermaid: false
---

## Introducción a las aplicaciones RMI

Las aplicaciones RMI típicamente comprenden un servidor que crea objetos remotos y los registra, y clientes que obtienen referencias remotas e invocan métodos. RMI proporciona el mecanismo de comunicación entre ambos.

![Arquitectura de una aplicación RMI](/img/posts/20160304_1.png)

## Elementos principales

**Interfaces remotas:** Acuerdo entre servidor y cliente. Descienden de `java.rmi.Remote`. Sus métodos declaran `java.rmi.RemoteException`.

**Objetos remotos:** Implementan interfaces remotas y pueden ser invocados desde otros procesos (distintas JVM en Java).

**Objetos serializables:** RMI utiliza serialización para transportar objetos entre máquinas virtuales, lo que requiere implementar `Serializable`.

**Stubs:** Generadas automáticamente a partir de la interfaz, implementan la interfaz remota. Actúan como representantes del objeto remoto en el lado del cliente.

**Servicio de nombres:** Asocia nombres lógicos a objetos. Utiliza sintaxis URL: `//maquina:puerto/nombreDeObjeto` (por defecto `localhost:1099`).

![Diagrama de elementos RMI](/img/posts/20160304_2.png)

## Pasaje de objetos

Los objetos pasados como parámetros o respuestas deben ser remotos o serializables:

- **Objetos remotos:** Se pasan por referencia; se convierten en stubs al ir del servidor al cliente.
- **Objetos serializables:** Se pasan por valor; RMI maneja la serialización de forma transparente.

## Servicio rmiregistry

Aplicación que contiene un objeto que implementa `java.rmi.registry.Registry`. Por seguridad, prohíbe invocar `bind`, `rebind` y `unbind` desde máquinas remotas.

## Orden de ejecución

1. Arrancar `rmiregistry`.
2. Ejecutar la clase servidor.
3. Ejecutar el cliente.
4. El cliente debe disponer de los `.class` de las interfaces remotas y los stubs.

![Secuencia de arranque](/img/posts/20160304_3.png)

## Código de ejemplo

### Interfaz remota

```java
package rmi_sample;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface StringerInterface extends Remote {
    String getString() throws RemoteException;
}
```

### Servidor

```java
package rmi_sample;

import java.rmi.Naming;
import java.rmi.RMISecurityManager;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class Stringer extends UnicastRemoteObject implements StringerInterface {
    private String str = "DEFAULT";

    public Stringer(String s) throws RemoteException {
        super();
        str = s;
    }

    public String getString() throws RemoteException {
        return str;
    }

    public static void main(String[] args) {
        String name;
        StringerInterface robject;

        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new RMISecurityManager());
        }

        name = "//localhost/StringerInterface";

        try {
            robject = new Stringer("Hi\n");
            Naming.rebind(name, robject);
            System.out.println("Stringer bounded");
        }
        catch (Exception e) {
            System.err.println("ComputeEngine exception:");
            e.getMessage();
        }
    }
}
```

### Cliente

```java
package rmi_sample;

import java.rmi.Naming;
import java.rmi.RMISecurityManager;

public class StrClient {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Necesita el hostname");
            System.exit(0);
        }

        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new RMISecurityManager());
        }

        try {
            String name = "//" + args[0] + "/StringerInterface";
            StringerInterface robject = (StringerInterface) Naming.lookup(name);
            String result = robject.getString();
            System.out.println(result);
        }
        catch (Exception e) {
            System.err.println("Problemas en la invocación:" + e.getMessage());
        }
    }
}
```

## Conclusión

RMI permite el intercambio transparente de objetos entre espacios de direcciones mediante serialización. Aunque es más lento que una llamada local (por la serialización, deserialización, verificación de seguridad y enrutamiento de paquetes), es muy útil para sistemas distribuidos. El diseño de sistemas distribuidos requiere más que simplemente distribuir objetos entre procesos para balancear la carga.
