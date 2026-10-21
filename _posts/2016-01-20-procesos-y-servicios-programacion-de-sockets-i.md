---
title: "Sockets TCP en Java: ServerSocket y Socket con ejemplos"
description: "Introducción a los sockets TCP en Java con ServerSocket y Socket: cómo crear un servidor y un cliente que se comunican con DataInputStream y DataOutputStream."
date: 2016-01-20 13:00:00 +0800
categories: [Java]
tags: [java, sockets, tcp, programacion-de-servicios-y-procesos, serversocket]
pin: false
math: false
mermaid: false
redirect_from:
  - /2016/01/procesos-y-servicios-programacion-de.html
---

*Parte de la serie «Programación de sockets» (I).*

## ¿Qué son los sockets?

Un **socket** es la abstracción que proporcionan los protocolos TCP y UDP para los puntos extremos de la comunicación entre aplicaciones. Cada socket necesita:

- La dirección IP del host.
- Un número de puerto local que identifique el proceso.

El cliente solicita conexión al servidor a través de un socket en un puerto concreto. El servidor acepta la conexión y crea un nuevo socket para comunicarse con ese cliente, quedando libre para seguir aceptando nuevas conexiones.

El rango de puertos es de **0 a 65535**. Los puertos del 0 al 1023 están reservados para servicios privilegiados. Para aplicaciones propias se deben usar puertos del **1024 al 65535**.

## Clase ServerSocket

Implementa el extremo servidor de la comunicación.

| Constructor / Método | Descripción |
|---|---|
| `ServerSocket(int port)` | Crea un socket escuchando en el puerto indicado |
| `ServerSocket(int port, int backlog)` | Con longitud de cola de conexiones |
| `ServerSocket(int port, int backlog, InetAddress bindAddr)` | Enlaza a una dirección específica |
| `Socket accept()` | Espera y devuelve una conexión de cliente |
| `void close()` | Cierra el socket servidor |
| `int getLocalPort()` | Devuelve el puerto de escucha |
| `InetAddress getInetAddress()` | Devuelve la dirección enlazada |

## Clase Socket

Implementa el extremo cliente de la comunicación.

| Constructor / Método | Descripción |
|---|---|
| `Socket(String host, int port)` | Conecta al host y puerto remotos |
| `Socket(InetAddress address, int port)` | Conecta usando una dirección IP |
| `InputStream getInputStream()` | Obtiene el flujo de entrada |
| `OutputStream getOutputStream()` | Obtiene el flujo de salida |
| `int getPort()` | Devuelve el puerto remoto |
| `int getLocalPort()` | Devuelve el puerto local |
| `InetAddress getInetAddress()` | Devuelve la dirección remota |
| `void close()` | Cierra la conexión |

## Gestión de sockets TCP

La comunicación bidireccional se realiza mediante:

- **`InputStream`** / **`DataInputStream`**: para recibir datos.
- **`OutputStream`** / **`DataOutputStream`**: para enviar datos.

## Ejemplo: servidor y cliente TCP

### Ejemplo1Servidor.java

```java
import java.io.*;
import java.net.*;

public class Ejemplo1Servidor {
    public static void main(String[] arg) throws IOException {
        int numeroPuerto = 6000;
        ServerSocket servidor = new ServerSocket(numeroPuerto);
        Socket clienteConectado = null;
        System.out.println("Esperando al cliente.....");
        clienteConectado = servidor.accept();

        InputStream entrada = null;
        entrada = clienteConectado.getInputStream();
        DataInputStream flujoEntrada = new DataInputStream(entrada);

        System.out.println("Recibiendo del CLIENTE: \n\t" + flujoEntrada.readUTF());

        OutputStream salida = null;
        salida = clienteConectado.getOutputStream();
        DataOutputStream flujoSalida = new DataOutputStream(salida);

        flujoSalida.writeUTF("Saludos al cliente del servidor");

        entrada.close();
        flujoEntrada.close();
        salida.close();
        flujoSalida.close();
        clienteConectado.close();
        servidor.close();
    }
}
```

### Ejemplo1Cliente.java

```java
import java.io.*;
import java.net.*;

public class Ejemplo1Cliente {
    public static void main(String[] args) throws Exception {
        String Host = "localhost";
        int Puerto = 6000;
        System.out.println("PROGRAMA CLIENTE INICIADO....");
        Socket Cliente = new Socket(Host, Puerto);

        DataOutputStream flujoSalida = new DataOutputStream(Cliente.getOutputStream());
        flujoSalida.writeUTF("SaludOS al SERVIDOR DESDE EL CLIENTE");

        DataInputStream flujoEntrada = new DataInputStream(Cliente.getInputStream());
        System.out.println("Recibiendo del SERVIDOR: \n\t" + flujoEntrada.readUTF());

        flujoEntrada.close();
        flujoSalida.close();
        Cliente.close();
    }
}
```

## Flujo de ejecución

1. Arrancar primero el servidor (`Ejemplo1Servidor`). Quedará en espera en `servidor.accept()`.
2. Arrancar el cliente (`Ejemplo1Cliente`). Se conectará al servidor en `localhost:6000`.
3. El cliente envía un mensaje al servidor y espera respuesta.
4. El servidor recibe el mensaje, lo imprime y responde.
5. Ambos cierran sus conexiones.
