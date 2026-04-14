---
title: Procesos y servicios. Programación segura III. Seguridad en entornos Java
description: Aprende seguridad en entornos Java con JVM, gestores de seguridad y políticas. Tutorial completo sobre JCA, JSSE, JAAS, verificación de bytecodes, permisos y configuración de archivos policy.
date: 2016-03-24 12:10:00 +0800
categories: [Java]
tags: [procesos-servicios, java, teoria, seguridad, jvm, jca, jsse, jaas, policy, permisos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Antes de que la **JVM** comience el proceso de interpretación y ejecución de los bytecodes (código objeto) debe realizar una serie de tareas para preparar el entorno en el que el programa se ejecutará. Este es el punto en el que se implementa la seguridad interna de Java.

Hay tres componentes en el proceso:

- El cargador de clases
- El verificador de ficheros de clases
- El gestor de seguridad

## El cargador de clases

Es el responsable de encontrar y cargar los bytecodes que definen las clases. Cada programa Java tiene como mínimo tres cargadores:
- El cargador de clases bootstrap que carga las clases del sistema (normalmente desde el fichero JAR rt.jar)
- El cargador de clases de extensión que carga una extensión estándar desde el directorio ```jre/lib/ext```
- El cargador de clases de la aplicación que localiza las clases y los ficheros **JAR/ZIP** de la ruta de acceso a las clases (según está establecido por la variable de entorno **CLASSPATH** o por la opción ```–classpath``` de la línea de comandos)

## El verificador de ficheros de clases

Se encarga de validar los bytecodes. Algunas de las comprobaciones que lleva a cabo son:

- Que las variables estén inicializadas antes de ser utilizadas
- Que las llamadas a un método coinciden con los tipos de referencias a objetos
- Que no se han infrigido las reglas para el acceso a los métodos y clases privados, etc.

## El gestor de seguridad

Es una clase que controla si está permitida una determinada operación.

Alguna de las operaciones que comprueban son las siguientes:

- Si el hilo actual puede cargar un subproceso
- Si puede acceder a un paquete específico
- Si puede acceder o modificar las propiedades del sistema
- Si puede leer desde o escribir en un fichero específico
- Si puede eliminar un fichero específico
- Si puede aceptar una conexión socket desde un host o número de puerto específico, etc.

Por defecto no se instala de forma automática ningún gestor de seguridad cuando se ejecuta una aplicación Java. En el siguiente ejemplo veremos la salida que produce el programa ejecutándolo sin gestor de seguridad y con gestor de seguridad. El programa muestra los valores de ciertas propiedades de sistema (usamos el método ```System.getProperty(propiedad)``` para mostrar los valores), la siguiente tabla describe alguna de las más importantes:

### Ejemplo1.java

```java
public class Ejemplo1 {
     
      public static void main(String[] args) {
           
            //propiedades de sistema en un array
            String t[] = {    "java.class.path", "java.home", "java.vendor",
                                   "java.version", "os.name", "os.version","user.dir",
                                   "user.home", "user.name"};
           
           
            System.setProperty ("java.security.policy", System.getProperty("user.dir") + "\\src\\_01SinConGestor\\Politica1.policy");
            System.setSecurityManager(new SecurityManager());
            for (int i = 0; i < t.length; i++) {
                 
                  System.out.print("Propiedad:" + t[i]);
                  try {
                        String s = System.getProperty(t[i]);     //valor de la propiedad
                        System.out.println("\t==> " + s);
                  } catch (Exception e) { System.err.println("\n\tEXcepción " + e.toString()); }
           
            }
      }
}
```

### Politica1.policy (para política de permisos)


```
grant {
      permission java.util.PropertyPermission "java.class.path", "read";
      permission java.util.PropertyPermission "java.home", "read";
      permission java.util.PropertyPermission "user.home", "read";
      permission java.util.PropertyPermission "user.name", "read";
      permission java.util.PropertyPermission "user.dir", "read";
      permission java.util.PropertyPermission "on.version", "read";
};
```

|PROPIEDAD|SIGNIFICADO|
|---|---|
|```file.separator```|Separador de directorios ("/" en UNIX y "\" en Windows)|
|```java.class.path```|Ruta usada para encontrar los directorios y ficheros JAR que contienen los archivos de clase|
|```java.home```|Directorio para JRE|
|```java.vendor```|Nombre del proveedor|
|```java.vendor.url```|URL del proveedor|
|```java.version```|Número de versión de JRE|
|```line.separator```|Fin de línea|
|```os.arch```|Arquitectura del sistema operativo|
|```os.name```|Nombre del sistema operativo|
|```os.version```|Versión del sistema operativo|
|```path.separator```|Caracter separador usado en ```java.class.path``` (En Unix es : mientras quwe en Windows es ;)|
|```user.dir```|Directorio en el que se está ejecutando el programa Java|
|```user.home```|Directorio por defecto del usuario|
|```user.name```|Nombre del usuario|

## APIs Java para seguridad

**JCA** (_Java Cryptography Architecture, Arquitectura Criptográfica de Java_). Es un marco de trabaj para acceder y desarrollar funciones criptográficas en la plataforma Java. Proporciona la infraestructura para la ejecución de los principales servicios de cifrado, incluyendo:

- Firmas digitales
- Resúmenes de mensajes (hash)
- Certificados y validación de certificados
- Encriptación (cifrado de bloques, cifrado simétrico y asimétrico)
- Generación y gestión de claves y generación segura de números aleatorios

**JSSE** (_Java Secure Extension, Extensión de Sockets Seguros Java_). Es un conjunto de paquetes Java provistos para la comunicación segura en Internet. Implementa una versión Java de los protocolos SSL y TLS. Incluye funcionalidades como:

- Cifrado de datos
- Autenticación del servidor
- Integridad de mensajes
- Autenticación del cliente

**JAAS** (_Java Authentication and Authorization Service, Servicio de Autenticación y Autorización de Java_). Es un interfaz que permite a las aplicaciones Java acceder a servicios de control de autenticación y acceso. Puede usarse con dos fines:

- La autenticación de usuarios para conocer quién está ejecutando código Java.
- La autorización de usuarios para garantizar que quién lo ejecuta tiene los permisos necesarios para hacerlo.

## Ficheros de política en Java

### Localización

El fichero de políticas predeterminado **java.policy**, está localizado en los siguientes directorios.

- Sistemas operativos Windows: ```java.home\lib\security\java.policy```
- Sistemas UNIX: ```java.home/lib/security/java.policy```

Donde ```java.home``` representa el valor de la propiedad **java.home**, que especifica el directorio en el que se instaló el **JRE**.

El valor por defecto es tener un solo fichero de políticas en todo el sistema y un fchero de políticas en el directorio ```home``` (dado por la variable **user.home**) del usuario (este tiene un punto delante).

En el fichero **java.security** localizado en la carpeta ```java.home\lib\security\``` se encuentran las localizaciones de estos ficheros:

```properties
policy.url.1=file:${java.home}/lib/security/java.policy
policy.url.2=file:${user.home}/.java.policy
```

### Entrada grant

Un fichero de políticas especifica qué permisos están disponibles para el código de varias fuentes.

Se utiliza para conceder permisos del sistema.

Contiene una secuencia de entradas **grant**, cada una de ellas tiene una o más entradas, el formato básico es el siguiente:

```bash
grant codeBase "URL"{
      permission Nombre_clase "Nombre_destino", "Acción";
      permission Nombre_clase "Nombre_destino", "Acción";
}
```

A la derecha de ```codeBase``` se indica la ubicación del código base sobre el que se van a definir los permisos. Su valor es una URL y siempre se debe utiliza la barra diagonal (```/```) como separador de directorio incluso para las URL de tipo file en Windows. Por ejemplo: ```grant codeBase “file:/C:/somepath/api/”```.
Si se omite codeBase entonces los permisos se aplican a todas las fuentes.

**Nombre_clase** contiene el nombre de la clase de permisos, por ejemplo:

```
java.io.FilePermission (representa acceso a fichero o directorio)
java.net.SocketPermission (acceso a la red vía socket)
java.util.PropertyPermission (permiso sobre propiedades del sistema), etc.
```

El parámetro **Nombre_destino** especifica el destino del permiso y depende de la clase de permiso.
Por ejemplo si la clase de permiso es java.io.FilePermission en **Nombre_destino** se puede poner un fichero o un directorio; si la clase es ```java.net.SocketPermission``` se pondría un servidor y un número de puerto; si es ```java.util.PropertyPermission``` se pondría una propiedad del sistema.

En el parámetro **Acción** se indica una lista de acciones separadas por comas, por ejemplo read, write, delete o execute para una clase de permiso ```java.io.FilePermission```; accept, listen, connect resolve para una clase de permiso ```java.netSocketPermission```; read, write para una clase de permiso ```java.util.PropertyPermission```.

Desde la [URL de Oracle](http://docs.oracle.com/javase/8/docs/technotes/guides/security/permissions.html) se pueden consultar los permisos, sus destinos y acciones.

## Ejemplo de ficheros de políticas

Creamos un fichero en una carpeta determinada (en Windows ```C:\Ficheros```) e insertamos una línea, después lee el contenido del fichero y lo muestra en pantalla. El comportamiento del programa será diferente si usamos o no el gestor de seguridad y ficheros de políticas.

Se añade el gestor de seguridad en el método ```main()```, la línea ```System.setSecurityManager(new SecurityManager());``` antes de la cláusula ```try```, la salida muestra un error de acceso denegado al escribir datos en el fichero, tampoco se podrá realizar la lectura del mismo.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Ejemplo2 {
     
      public static void main(String[] args) {
           
            //El directorio C:/Ficheros debe estar creado previamente.
            //System.setProperty ("java.security.policy", System.getProperty("user.dir") + "\\src\\_02FicherosPoliticas\\Politica2.policy");
            //System.setSecurityManager(new SecurityManager());
            try {
                  //escritura en fichero
                  BufferedWriter fichero = new BufferedWriter (new FileWriter("C://Ficheros//Fichero.txt"));
                  fichero.write("Escritura de una linea en fichero.");
                  fichero.newLine(); // escribe un salto de línea
                  fichero.close();
                  System.out.println("Final proceso de escritura...");
                 
                  //lectura del fichero
                  BufferedReader fichero2 = new BufferedReader (new FileReader("C://Ficheros//Fichero.txt"));
                  String linea = fichero2.readLine();
                  System.out.println("Contenido del fichero: ");
                  System.out.println("\t" + linea);
                  fichero2.close();
                  System.out.println("Final proceso de lectura...");
            } catch (FileNotFoundException fn) {
                  System.out.println("No se encuentra el fichero");
            } catch (IOException io) {
                  System.out.println("Error de E/S ");
            } catch (Exception e) {
                  System.out.println("ERROR => " + e.toString());
            }    
      }
}
```

Ahora se crea el siguiente fichero de políticas de nombre Politica2.policy con el siguiente contenido:

```java
grant codeBase  "file:${user.dir}/bin/"{
      permission java.io.FilePermission "C:\\Ficheros\\*", "read, write";
};
```

que permite a los programas localizados en la carpeta indicada (incluido permiso para crear) ficheros en la ruta ```C\Ficheros```.

## Formato grant

El parámetro **Nombre_destino** para la clase de permiso ```java.io.FilePermission``` puede terminar en una serie de caracteres:

- “```/```” (donde “```/```” es el carácter separador de ficheros) indica un directorio y todos los ficheros contenidos en ese directorio.
- “```/-```“ indica un directorio y (recursivamente) todos los ficheros y subdirectorios contenidos en ese directorio.
- “```<<ALL FILES>>```” indica cualquier fichero
- También es posible usar propiedades de sistema como ```user.dir``` o ```user.home``` para dar privilegios sobre el directorio en el que se está ejecutando el programa o sobre el directorio por defecto del usuario. Se debe utilizar la propiedad encerrada entre llaves y con el caracer ```$``` delante. ```${propiedad}```.

El parámetro **Nombre_destino** para la clase de permiso ```java.net.SocketPermission``` tiene el siguiente formato:

```bash
Host = (nombre del host | Direccion IP) [:número de puerto] donde número de puerto = N | -N | N-[M]
```

Las acciones son **accept, listen, connect y resolve**.
El host se especifica como un nombre de host o dirección IP.
Especificación de puerto:

- “N”, puerto N
- “N-“, todos los puertos desde N en adelante
- “-N”, todos los puertos desde N hacia atrás
- “M-N”, rango de puertos

```java
import java.net.ServerSocket;
import java.net.Socket;

public class Ejemplo3Servidor {
     
      public static void main(String[] arg) {
           
            int numeroPuerto = 6000;// Puerto
            ServerSocket servidor = null;
            System.setProperty ("java.security.policy", System.getProperty("user.dir") + "\\src\\_03FicherosPoliticasSockets\\Politica3.policy");
            System.setSecurityManager(new SecurityManager());
           
            try {
                  servidor = new ServerSocket(numeroPuerto);
                  System.out.println("Esperando al cliente.....");
                  Socket clienteConectado = servidor.accept();
                  System.out.println("Cliente conectado.");
                  clienteConectado.close();
                  System.out.println("Cliente desconectado.");
                  servidor.close();
            } catch (Exception e) { System.err.println("ERROR=> " + e.toString()); }
     
      }
}
```

```java
import java.net.Socket;

public class Ejemplo3 {
     
      public static void main(String[] args) {
           
            String Host = "localhost";
            int Puerto = 6000;
            System.setProperty ("java.security.policy", System.getProperty("user.dir") + "\\src\\_03FicherosPoliticasSockets\\Politica4.policy");
            System.setSecurityManager(new SecurityManager());   
           
            try {
                  Socket Cliente = new Socket(Host, Puerto);
                  System.out.println("CLIENTE INICIADO.");
                  Cliente.close();
                  System.out.println("CLIENTE FINALIZADO.");
            } catch (Exception e) { System.err.println("ERROR=> " + e.toString()); }
           
      }
}
```

```
/*Politica para el SERVIDOR*/
grant codeBase "file:${user.dir}/bin/" {
  permission java.net.SocketPermission "localhost", "listen, accept";
};
```

```
/*Politica para el CLIENTE*/
grant codeBase "file:${user.dir}/bin/" {
  permission java.net.SocketPermission "localhost:6000", "connect";
};
```

El programa servidor escucha y acepta peticiones de clientes en el puerto 6000, cuando el cliente se conecta se visualiza un mensaje y al cerrarse también.

El programa cliente se conecta al servidor en el puerto 6000, visualiza unos mensajes y luego se desconecta.

El fichero de políticas para el **servidor**, ```Politica3.policy```, representa un permiso que permite a los programas localizados en la carpeta ```${user.dir}/bin/``` escuchar y aceptar conexiones en localhost.

El fichero de políticas para el cliente, ```Politica4.policy```, representa un permiso que permite a los programas localizados en la carpeta ```${user.dir}/bin/``` conectarse al puerto 6000 en localhost.

## Herramienta PolicyTool

Se recomienda usar la herramienta para editar cualquier fichero de políticas y verificar la sintaxis de su contenido.
Para lanzarla, desde la terminal escribiremos el comando ```policytool```.

![policytool 1](/img/posts/20160324_1.png)

![policytool 2](/img/posts/20160324_2.png)

**¡Salud y coding!**