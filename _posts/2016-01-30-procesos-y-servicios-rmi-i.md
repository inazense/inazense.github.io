---
title: "Procesos y servicios. RMI (I)"
description: Introducción a RMI (Remote Method Invocation) en Java para invocar métodos de objetos remotos entre distintos equipos, con los pasos de implementación de la interfaz, el servidor y el cliente.
date: 2016-01-30 13:00:00 +0800
categories: [Java]
tags: [java, rmi, remote-method-invocation, programacion-de-servicios-y-procesos, sockets]
pin: false
math: false
mermaid: false
---

## ¿Qué es RMI?

**RMI** (Remote Method Invocation) es un mecanismo de Java que permite a dos programas comunicarse, ya sea en el mismo ordenador o en ordenadores distintos. Uno actúa como **servidor**, publicando objetos en la red, y el otro actúa como **cliente**, que localiza esos objetos e invoca sus métodos.

Los métodos se ejecutan en el servidor, el cliente queda "colgado" esperando la respuesta hasta que el servidor termina la ejecución.

## Pasos para implementar RMI

### a) Crear la interfaz remota

La interfaz debe extender `java.rmi.Remote` y todos sus métodos deben declarar `throws java.rmi.RemoteException`:

```java
public interface InterfaceRemota extends java.rmi.Remote {
    int suma(int a, int b) throws java.rmi.RemoteException;
}
```

### b) Implementar la interfaz remota

La clase de implementación debe extender `java.rmi.server.UnicastRemoteObject` e implementar la interfaz remota:

```java
public class ObjetoRemoto extends java.rmi.server.UnicastRemoteObject
        implements InterfaceRemota {

    public ObjetoRemoto() throws java.rmi.RemoteException {
        super();
    }

    public int suma(int a, int b) {
        return a + b;
    }
}
```

### c) Compilar normalmente

```
javac paquete/*.java
```

### d) Generar el stub con rmic

El comando `rmic` genera el fichero stub necesario para la comunicación remota:

```
rmic paquete.ObjetoRemoto
```

### e) Establecer la propiedad codebase (servidor)

```java
System.setProperty("java.rmi.server.codebase", "file:/un_path/");
```

### f) Registrar el objeto en el servidor

El servidor registra el objeto remoto en el registro RMI con `Naming.rebind()`:

```java
ObjetoRemoto obj = new ObjetoRemoto();
Naming.rebind("ObjetoRemoto", obj);
System.out.println("Servidor RMI listo...");
```

Antes de arrancar el servidor hay que iniciar el servicio `rmiregistry`:

```
rmiregistry
```

### g) Localizar y usar el objeto desde el cliente

El cliente recupera el objeto remoto con `Naming.lookup()` y llama a sus métodos como si fuera un objeto local:

```java
InterfaceRemota objetoRemoto = (InterfaceRemota) Naming.lookup("//IP_del_Servidor/ObjetoRemoto");
System.out.println("2 + 3 = " + objetoRemoto.suma(2, 3));
```

## Nota sobre RMISecurityManager

Se desaconseja usar `RMISecurityManager` salvo que sea estrictamente necesario. Al activarlo se habilita la carga dinámica de clases, lo que puede suponer un riesgo de seguridad si el fichero de política otorga permisos excesivos.
