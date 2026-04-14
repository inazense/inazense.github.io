---
title: "Procesos y servicios. Programación de sockets (III)"
description: Transmisión de objetos Java serializables a través de sockets TCP usando ObjectInputStream y ObjectOutputStream, con un ejemplo práctico de intercambio de objetos Persona entre servidor y cliente.
date: 2016-01-30 12:00:00 +0800
categories: [Java]
tags: [java, sockets, tcp, serializacion, objectinputstream, programacion-de-servicios-y-procesos]
pin: false
math: false
mermaid: false
---

## Envío de objetos por sockets TCP

Para transmitir objetos Java a través de sockets TCP se usan las clases **`ObjectOutputStream`** y **`ObjectInputStream`**:

```java
ObjectOutputStream outObjeto = new ObjectOutputStream(socket.getOutputStream());
ObjectInputStream inObjeto = new ObjectInputStream(socket.getInputStream());
```

## Serialización

Para que un objeto pueda enviarse por la red (o guardarse en fichero) debe implementar la interfaz **`Serializable`**. Esta interfaz no contiene métodos: simplemente es necesario añadir `implements Serializable` a la declaración de la clase.

Si la clase tiene atributos que sean instancias de otras clases propias, esas clases también deben implementar `Serializable`.

## Ejemplo: intercambio de objetos Persona

### Persona.java

```java
import java.io.Serializable;

@SuppressWarnings("serial")
public class Persona implements Serializable {
    String nombre;
    int edad;

    public Persona(String nombre, int edad) {
        super();
        this.nombre = nombre;
        this.edad = edad;
    }

    public Persona() { super(); }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public int getEdad() { return edad; }
    public void setEdad(int edad) { this.edad = edad; }
}
```

### ServidorObjeto.java

El servidor crea un objeto `Persona`, lo envía al cliente, y espera recibir el objeto modificado:

```java
import java.io.*;
import java.net.*;

public class ServidorObjeto {
    public static void main(String[] arg) throws IOException, ClassNotFoundException {
        int numeroPuerto = 6000;
        ServerSocket servidor = new ServerSocket(numeroPuerto);
        System.out.println("Esperando al cliente.....");
        Socket cliente = servidor.accept();

        ObjectOutputStream outObjeto = new ObjectOutputStream(cliente.getOutputStream());
        Persona per = new Persona("Juan", 20);
        outObjeto.writeObject(per);
        System.out.println("Envio: " + per.getNombre() + "*" + per.getEdad());

        ObjectInputStream inObjeto = new ObjectInputStream(cliente.getInputStream());
        Persona dato = (Persona) inObjeto.readObject();
        System.out.println("Recibo: " + dato.getNombre() + "*" + dato.getEdad());

        outObjeto.close();
        inObjeto.close();
        cliente.close();
        servidor.close();
    }
}
```

### ClienteObjeto.java

El cliente recibe el objeto `Persona`, modifica sus atributos y lo devuelve al servidor:

```java
import java.io.*;
import java.net.*;

public class ClienteObjeto {
    public static void main(String[] arg) throws IOException, ClassNotFoundException {
        String Host = "localhost";
        int Puerto = 6000;
        System.out.println("PROGRAMA CLIENTE INICIADO....");
        Socket cliente = new Socket(Host, Puerto);

        ObjectInputStream perEnt = new ObjectInputStream(cliente.getInputStream());
        Persona dato = (Persona) perEnt.readObject();
        System.out.println("Recibo: " + dato.getNombre() + "*" + dato.getEdad());

        dato.setNombre("Juan Ramos");
        dato.setEdad(22);

        ObjectOutputStream perSal = new ObjectOutputStream(cliente.getOutputStream());
        perSal.writeObject(dato);
        System.out.println("Envio: " + dato.getNombre() + "*" + dato.getEdad());

        perEnt.close();
        perSal.close();
        cliente.close();
    }
}
```

## Envío de objetos por sockets UDP

Para transmitir objetos mediante UDP no se pueden usar directamente `ObjectOutputStream` y `ObjectInputStream` sobre un `DatagramSocket`. En su lugar se convierten los objetos a arrays de bytes usando `ByteArrayOutputStream` y `ByteArrayInputStream`:

```java
// Serializar objeto a bytes para enviar por UDP
ByteArrayOutputStream bos = new ByteArrayOutputStream();
ObjectOutputStream oos = new ObjectOutputStream(bos);
oos.writeObject(objeto);
byte[] datos = bos.toByteArray();

// Deserializar bytes recibidos por UDP
ByteArrayInputStream bis = new ByteArrayInputStream(datos);
ObjectInputStream ois = new ObjectInputStream(bis);
Persona per = (Persona) ois.readObject();
```
