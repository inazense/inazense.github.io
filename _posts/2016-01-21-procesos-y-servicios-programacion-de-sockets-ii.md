---
title: "Procesos y servicios. Programación de Sockets (II)"
description: Programación avanzada de sockets en Java con soporte para múltiples clientes mediante hilos, comunicación UDP con DatagramSocket y DatagramPacket, y sockets multicast.
date: 2016-01-21 12:00:00 +0800
categories: [Java]
tags: [java, sockets, udp, tcp, multicast, hilos, programacion-de-servicios-y-procesos]
pin: false
math: false
mermaid: false
---

## Múltiples clientes con hilos

Para atender a múltiples clientes simultáneamente, el servidor usa un hilo dedicado para cada conexión. El bucle principal del servidor llama a `accept()` indefinidamente, y por cada cliente que se conecta lanza un nuevo `Thread`:

```java
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Servidor {
    public static void main(String args[]) throws IOException {
        ServerSocket servidor;
        servidor = new ServerSocket(6000);
        System.out.println("Servidor iniciado...");
        while (true) {
            Socket cliente = new Socket();
            cliente = servidor.accept();
            HiloServidor hilo = new HiloServidor(cliente);
            hilo.start();
        }
    }
}
```

La clase `HiloServidor` extiende `Thread` y gestiona la comunicación con el cliente en su método `run()`.

## Sockets UDP

A diferencia de TCP, UDP es un protocolo no orientado a conexión. Los paquetes contienen de forma explícita la dirección IP y el puerto de destino, lo que los hace más ligeros pero sin garantía de entrega ni orden.

### Clase DatagramPacket

Representa un paquete de datos UDP.

| Constructor / Método | Descripción |
|---|---|
| `DatagramPacket(byte[] buf, int length)` | Para recibir datos |
| `DatagramPacket(byte[] buf, int length, InetAddress addr, int port)` | Para enviar datos |
| `int getLength()` | Longitud de los datos recibidos |
| `int getPort()` | Puerto de origen del paquete |
| `InetAddress getAddress()` | Dirección IP de origen |
| `byte[] getData()` | Contenido del paquete |

### Clase DatagramSocket

Proporciona soporte para el envío y recepción de datagramas UDP.

| Constructor / Método | Descripción |
|---|---|
| `DatagramSocket(int port)` | Crea un socket en el puerto indicado |
| `DatagramSocket()` | Crea un socket en un puerto disponible |
| `void send(DatagramPacket p)` | Envía un datagrama |
| `void receive(DatagramPacket p)` | Recibe un datagrama (bloqueante) |
| `void close()` | Cierra el socket |

## Ejemplo: comunicación UDP

### ServidorUDP.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class ServidorUDP {
    public static void main(String[] argv) throws Exception {
        byte[] bufer = new byte[1024];
        DatagramSocket socket = new DatagramSocket(12345);
        System.out.println("Esperando Datagrama ................");
        DatagramPacket recibo = new DatagramPacket(bufer, bufer.length);
        socket.receive(recibo);
        int bytesRec = recibo.getLength();
        String paquete = new String(recibo.getData());
        System.out.println("Número de Bytes recibidos: " + bytesRec);
        System.out.println("Contenido del Paquete    : " + paquete.trim());
        System.out.println("Puerto origen del mensaje: " + recibo.getPort());
        System.out.println("IP de origen             : " + recibo.getAddress().getHostAddress());
        System.out.println("Puerto destino del mensaje: " + socket.getLocalPort());
        socket.close();
    }
}
```

### ClienteUDP.java

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class ClienteUDP {
    public static void main(String[] argv) throws Exception {
        InetAddress destino = InetAddress.getLocalHost();
        int port = 12345;
        byte[] mensaje = new byte[1024];
        String Saludo = "Enviando Saludos !!";
        mensaje = Saludo.getBytes();
        DatagramPacket envio = new DatagramPacket(mensaje, mensaje.length, destino, port);
        DatagramSocket socket = new DatagramSocket(34567);
        System.out.println("Enviando Datagrama de longitud: " + mensaje.length);
        System.out.println("Host destino : " + destino.getHostName());
        System.out.println("IP Destino : " + destino.getHostAddress());
        System.out.println("Puerto local del socket: " + socket.getLocalPort());
        System.out.println("Puerto al que envio: " + envio.getPort());
        socket.send(envio);
        socket.close();
    }
}
```

## Sockets Multicast

`MulticastSocket` permite enviar un paquete a múltiples destinatarios simultáneamente. Los clientes se suscriben a un grupo multicast (dirección de clase D, rango **224.0.0.0 – 239.255.255.255**). Cuando el servidor envía al grupo, todos los clientes suscritos reciben el mensaje.

### ServidorMC.java

```java
import java.io.*;
import java.net.*;

public class ServidorMC {
    public static void main(String args[]) throws Exception {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        MulticastSocket ms = new MulticastSocket();
        int Puerto = 12345;
        InetAddress grupo = InetAddress.getByName("225.0.0.1");
        String cadena = "";
        while (!cadena.trim().equals("*")) {
            System.out.print("Datos a enviar al grupo: ");
            cadena = in.readLine();
            DatagramPacket paquete = new DatagramPacket(cadena.getBytes(), cadena.length(), grupo, Puerto);
            ms.send(paquete);
        }
        ms.close();
        System.out.println("Socket cerrado...");
    }
}
```

### ClienteMC.java

```java
import java.io.*;
import java.net.*;

public class ClienteMC {
    public static void main(String args[]) throws Exception {
        int Puerto = 12345;
        MulticastSocket ms = new MulticastSocket(Puerto);
        InetAddress grupo = InetAddress.getByName("225.0.0.1");
        ms.joinGroup(grupo);
        String msg = "";
        while (!msg.trim().equals("*")) {
            byte[] buf = new byte[1000];
            DatagramPacket paquete = new DatagramPacket(buf, buf.length);
            ms.receive(paquete);
            msg = new String(paquete.getData());
            System.out.println("Recibo: " + msg.trim());
        }
        ms.leaveGroup(grupo);
        ms.close();
        System.out.println("Socket cerrado...");
    }
}
```

El servidor lee líneas de la consola y las envía al grupo hasta que se introduce `*`. Los clientes se unen al grupo con `joinGroup()` y reciben los mensajes hasta que llega el asterisco.
