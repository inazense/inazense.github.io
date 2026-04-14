---
title: "Procesos y servicios. Programación en red"
description: Introducción a la programación en red con Java usando el paquete java.net, incluyendo las clases InetAddress, URL y URLConnection con ejemplos prácticos.
date: 2016-01-20 12:00:00 +0800
categories: [Java]
tags: [java, redes, programacion-de-servicios-y-procesos, inetaddress, url, urlconnection]
pin: false
math: false
mermaid: false
---

## TCP/IP

El modelo TCP/IP organiza las comunicaciones en capas. En el nivel de transporte encontramos dos protocolos principales:

- **TCP**: Garantiza la entrega ordenada de datos estableciendo una conexión previa entre emisor y receptor.
- **UDP**: Envía datagramas independientes sin garantía de orden ni de entrega.

## Paquete java.net

El paquete `java.net` proporciona dos niveles de API:

- **API de bajo nivel**: Direcciones IP (`InetAddress`), sockets e interfaces de red.
- **API de alto nivel**: URIs, URLs (`URL`) y conexiones (`URLConnection`).

## Clase InetAddress

`InetAddress` representa una dirección IP. Tiene dos subclases: `Inet4Address` (IPv4) e `Inet6Address` (IPv6).

Métodos principales:

| Método | Descripción |
|--------|-------------|
| `getByName(String host)` | Obtiene la dirección IP a partir del nombre de host |
| `getLocalHost()` | Devuelve la dirección del host local |
| `getHostName()` | Devuelve el nombre del host |
| `getHostAddress()` | Devuelve la dirección IP como cadena |
| `getAllByName(String host)` | Devuelve todas las IPs asociadas a un nombre de host |

### Ejemplo InetAddress

```java
import java.net.*;

public class TestInetAddress {
    public static void main(String[] args) {
        InetAddress dir = null;
        System.out.println("===========================================");
        System.out.println("SALIDA PARA LOCALHOST: ");
        try {
            dir = InetAddress.getByName("PC-ProfeB02");
            pruebaMetodos(dir);
            System.out.println("==========================================");
            System.out.println("SALIDA PARA UNA URL:");
            dir = InetAddress.getByName("www.google.es");
            pruebaMetodos(dir);
            System.out.println("\tDIRECCIONES IP PARA: " + dir.getHostName());
            InetAddress[] direcciones = InetAddress.getAllByName(dir.getHostName());
            for (int i = 0; i < direcciones.length; i++)
                System.out.println("\t\t"+direcciones[i].toString());
            System.out.println("==========================================");
        } catch (UnknownHostException e1) {
            e1.printStackTrace();
        }
    }

    private static void pruebaMetodos(InetAddress dir) {
        System.out.println("\tMetodo getByName(): " + dir);
        InetAddress dir2;
        try {
            dir2 = InetAddress.getLocalHost();
            System.out.println("\tMetodo getLocalHost(): " + dir2);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        System.out.println("\tMetodo getHostName(): "+dir.getHostName());
        System.out.println("\tMetodo getHostAddress(): "+ dir.getHostAddress());
        System.out.println("\tMetodo toString(): " + dir.toString());
        System.out.println("\tMetodo getCanonicalHostName(): " + dir.getCanonicalHostName());
    }
}
```

## Clase URL

La clase `URL` representa un localizador de recursos uniforme. Se puede construir de varias formas:

```java
import java.net.*;

public class Ejemplo1URL {
    public static void main(String[] args) {
        URL url;
        try {
            System.out.println("Constructor simple para una URL:");
            url = new URL("http://docs.oracle.com/");
            Visualizar(url);

            System.out.println("Otro constructor simple para una URL:");
            url = new URL("http://localhost/PFC/gest/cligestion.php?S=3");
            Visualizar(url);

            System.out.println("Const. para protocolo + URL + directorio");
            url = new URL("http", "docs.oracle.com", "/javase/7");
            Visualizar(url);

            System.out.println("Constructor para protocolo + URL + puerto + directorio:");
            url = new URL("http", "docs.oracle.com", 80, "/javase/7");
            Visualizar(url);

            System.out.println("Constructor para un objeto URL y un directorio:");
            URL urlBase = new URL("http://docs.oracle.com/");
            url = new URL(urlBase, "/javase/7/docs/api/java/net/URL.html");
            Visualizar(url);
        } catch (MalformedURLException e) {
            System.out.println(e);
        }
    }

    private static void Visualizar(URL url) {
        System.out.println("\tURL completa: " + url.toString());
        System.out.println("\tgetProtocol(): " + url.getProtocol());
        System.out.println("\tgetHost(): " + url.getHost());
        System.out.println("\tgetPort(): " + url.getPort());
        System.out.println("\tgetFile(): " + url.getFile());
        System.out.println("\tgetUserInfo(): " + url.getUserInfo());
        System.out.println("\tgetPath(): " + url.getPath());
        System.out.println("\tgetAuthority(): " + url.getAuthority());
        System.out.println("\tgetQuery(): " + url.getQuery());
        System.out.println("==============================================");
    }
}
```

### Leer el contenido de una URL

```java
import java.net.*;
import java.io.*;

public class Ejemplo2URL {
    public static void main(String[] args) {
        URL url = null;
        try {
            url = new URL("http://www.elaltozano.es");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        BufferedReader in;
        try {
            InputStream inputstream = url.openStream();
            in = new BufferedReader(new InputStreamReader(inputstream));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Clase URLConnection

`URLConnection` es una clase abstracta que facilita la comunicación bidireccional con una URL, permitiendo tanto leer como escribir datos.

### Lectura básica con URLConnection

```java
import java.net.*;
import java.io.*;

public class Ejemplo1urlCon {
    public static void main(String[] args) {
        URL url = null;
        URLConnection urlCon = null;
        try {
            url = new URL("http://www.elaltozano.es");
            urlCon = url.openConnection();
            BufferedReader in;
            InputStream inputStream = urlCon.getInputStream();
            in = new BufferedReader(new InputStreamReader(inputStream));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();
        } catch (MalformedURLException e) { e.printStackTrace(); }
        catch (IOException e) { e.printStackTrace(); }
    }
}
```

### Envío de datos a un script PHP

```java
import java.io.*;
import java.net.*;

public class Ejemplo2urlCon {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://localhost/DAM2PSP/vernombre.php");
            URLConnection conexion = url.openConnection();
            conexion.setDoOutput(true);
            String cadena = "nombre=Maria Jesús&apellidos=Ramos Martin";

            PrintWriter output = new PrintWriter(conexion.getOutputStream());
            output.write(cadena);
            output.close();

            BufferedReader reader = new BufferedReader(new InputStreamReader(conexion.getInputStream()));
            String linea;
            while ((linea = reader.readLine()) != null) {
                System.out.println(linea);
            }
            reader.close();
        } catch (MalformedURLException me) {
            System.err.println("MalformedURLException: " + me);
        } catch (IOException ioe) {
            System.err.println("IOException: " + ioe);
        }
    }
}
```

### Consultar campos de cabecera

```java
import java.net.*;
import java.io.*;
import java.util.*;

public class Ejemplo3urlCon {
    @SuppressWarnings("rawtypes")
    public static void main(String[] args) throws Exception {
        String cadena;
        URL url = new URL("http://localhost/2014/vernombre.html");
        URLConnection conexion = url.openConnection();
        System.out.println("Direccion [getURL()]: " + conexion.getURL());
        Date fecha = new Date(conexion.getLastModified());
        System.out.println("Fecha ultima modificacion [getLastModified()]: " + fecha);
        System.out.println("Tipo de Contenido [getContentType()]: " + conexion.getContentType());
        System.out.println("===========================================================");
        System.out.println("TODOS LOS CAMPOS DE CABECERA CON getHeaderFields(): ");

        Map camposcabecera = conexion.getHeaderFields();
        Iterator it = camposcabecera.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry map = (Map.Entry) it.next();
            System.out.println(map.getKey() + " : " + map.getValue());
        }
        System.out.println("============================================ ");
        System.out.println("CAMPOS 1 Y 4 DE CABECERA:");
        System.out.println("getHeaderField(1) => " + conexion.getHeaderField(1));
        System.out.println("getHeaderField(4) => " + conexion.getHeaderField(4));
        System.out.println("============================================");
        System.out.println("CONTENIDO DE [url.getFile()]: " + url.getFile());

        BufferedReader pagina = new BufferedReader(new InputStreamReader(url.openStream()));
        while ((cadena = pagina.readLine()) != null) {
            System.out.println(cadena);
        }
    }
}
```
