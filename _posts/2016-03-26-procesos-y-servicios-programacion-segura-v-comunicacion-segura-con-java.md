---
title: Procesos y servicios. Programación segura V. Comunicación segura con Java
description: Aprende programación segura en Java con JSSE y JAAS. Tutorial completo sobre SSL/TLS, autenticación, autorización, certificados digitales y comunicación segura entre cliente-servidor con ejemplos de código.
date: 2016-03-26 12:10:00 +0800
categories: [Java]
tags: [java, jsse, jaas, ssl, tls, seguridad, autenticacion, autorizacion, certificados]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## JSSE

**JSSE** (Java Secure Socket Extension) es un conjunto de paquetes que permiten el desarrollo de aplicaciones seguras en Internet. Proporciona un marco y una implementación para la versión **Java** de los protocolos **SSL** y **TSL** e incluye funcionalidad de encriptación de datos, autenticación de servidores, integridad de mensajes y autenticación de clientes.
Con **JSSE**, los desarrolladores pueden ofrecer intercambio seguro de datos entre un cliente y un servidor que ejecuta un protocolo de aplicación, tales como **HTTP**, **Telnet** o **FTP**, a través de **TCP/IP**.
Las clases de **JSSE** se encuentran en los paquetes ```javax.net``` y ```javax.net.ssl```.

### SSL

Las clas **SSLSocket** y **SSLServerSocket** representan sockets seguros y son derivadas de las ya familiares **Socket**  y **ServerSocket** respectivamente.

JSSE tiene dos clases **SSLServerSocketFactory** y **SSLSocketFactory** para la creación de sockets seguros. No tienen constructor, se obtienen a través del método estatico ```getDefault()```.

Para obtener un socket servidor seguro o **SSLServerSocket**

```java
SSLServerSocketFactory sfact = (SSLServerSocketFactory)
SSLServerSocketFactory.getDefault();
SSLServerSocket servidorSSL = (SSLServerSocket)
sfact.createServerSocket(puerto);
```

El método ```createServerSocket(int puerto)``` devuelve un **socket** de servidor enlazado al puerto especificado. Para crear un **SSLSocket**:

```java
SSLSocketFactory sfact = (SSLSocketFactory)
SSLSocketFactory.getDefault();
SSLSocket Cliente = (SSLSocket) sfact.createSocket(Host, puerto);
```

#### Archivo ServidorSSL.java

```java
import java.io.*;
import javax.net.ssl.*;

public class ServidorSSL {
     
      public static void main(String[] arg) throws IOException {
           
           
            //System.setProperty("javax.net.ssl.keyStore", System.getProperty("user.dir") + "\\AlmacenSSL");
            //System.setProperty("javax.net.ssl.keyStorePassword", "1234567");
           
           
            int puerto = 6000;
            SSLServerSocketFactory sfact = (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
            SSLServerSocket servidorSSL = (SSLServerSocket) sfact.createServerSocket(puerto);
            SSLSocket clienteConectado = null;
            DataInputStream flujoEntrada = null; //FLUJO DE ENTRADA DE CLIENTE
            DataOutputStream flujoSalida = null; //FLUJO DE SALIDA AL CLIENTE
           
            for (int i = 1; i < 5; i++) {
                 
                  System.out.println("Esperando al cliente " + i);
                  clienteConectado = (SSLSocket) servidorSSL.accept();
                  flujoEntrada = new DataInputStream(clienteConectado.getInputStream());
                  // EL CLIENTE ME ENVIA UN MENSAJE
                  System.out.println("Recibiendo del CLIENTE: " + i + " \n\t" + flujoEntrada.readUTF());
                  flujoSalida = new DataOutputStream(clienteConectado.getOutputStream());
                  // ENVIO UN SALUDO AL CLIENTE
                  flujoSalida.writeUTF("SaIudos al cliente del servidor");
                 
            }
           
           
            // CERRAR STREAMS Y SOCKETS
            flujoEntrada.close();
            flujoSalida.close();
            clienteConectado.close();
            servidorSSL.close();
           
      }
     
}
```

Crea una conexión sobre un socket servidor seguro y que atenderá hasta cuatro conexiones de clientes que se identificarán con un certificado válido. El servidor espera las conexiones, de cada cliente que se conecta recibe un mensaje y a continuación le envía un saludo.

#### Archivo ClienteSSL.JAVA

```java
import java.io.*;
import javax.net.ssl.*;

public class ClienteSSL {
     
      public static void main(String[] args) throws Exception {
           
           
            //System.setProperty("javax.net.ssl.trustStore", System.getProperty("user.dir") + "\\UsuarioAlmacenSSL");
            //System.setProperty("javax.net.ssl.trustStorePassword", "890123");
           
            String Host = "localhost";
            int puerto = 6000;
           
            System.out.println("PROGRAMA CLIENTE INICIADO....");
            SSLSocketFactory sfact = (SSLSocketFactory) SSLSocketFactory.getDefault();
            SSLSocket Cliente = (SSLSocket) sfact.createSocket(Host, puerto);
           
            // CREO FLUJO DE SALIDA AL SERVIDOR
            DataOutputStream flujoSalida = new DataOutputStream(Cliente.getOutputStream());
           
            // ENVIO UN SALUDO AL SERVIDOR   
            flujoSalida.writeUTF("Saludos al SERVIDOR DESDE EL CLIENTE");
           
            // CREO FLUJO DE ENTRADA AL SERVIDOR
            DataInputStream flujoEntrada = new DataInputStream(Cliente.getInputStream());
           
            // EL SERVIDOR ME ENVIA UN MENSAJE
            System.out.println("Recibiendo del SERVIDOR: \n\t" + flujoEntrada.readUTF());
           
            /*------------------------------------------------------------------------------
            //Información sobre la sesión SSL
            SSLSession session = ((SSLSocket) Cliente).getSession(); 
            System.out.println("Host: "+session.getPeerHost());
            System.out.println("Cifrado: " + session.getCipherSuite());
            System.out.println("Protocolo: " + session.getProtocol());
            System.out.println("IDentificador:" + new BigInteger(session.getId()));
            System.out.println("Creación de la sesión: " + session.getCreationTime());

            X509Certificate certificate = (X509Certificate)session.getPeerCertificates()[0];
            System.out.println("Propietario: " + certificate.getSubjectDN());
            System.out.println("Algoritmo: " + certificate.getSigAlgName());
            System.out.println("Tipo: " + certificate.getType());
            System.out.println("Emisor: " + certificate.getIssuerDN());
            System.out.println("Número Serie: " + certificate.getSerialNumber());
            ------------------------------------------------------------------------------*/
           
            // CERRAR STREAMS Y SOCKETS
            flujoEntrada.close();
            flujoSalida.close();
            Cliente.close();
           
      }
     
}
```

Envía un mensaje al servidor y visualiza el que el servidor le devuelve.

El servidor necesita disponer de un certificado que mostrar a los clientes que se conecten a él. Usaremos la herramienta **keytool** para crearlo, en el ejemplo le damos el nombre de AlmacenSSL y el valor de la clave es 1234567.

```bash
C:>keytool  -genkey -alias claveSSL -keyalg RSA –keystore AlmacenSSL -storepass 1234567
```

Para ejecutar el programa servidor es necesario indicar el certificado que se utilizará

```bash
C:>java -Djavax.net.ssl.keyStore=AlmacenSSL -Djavax.net.ssl.keyStorePassword=1234567 ServidorSSL
```

Antes de ejecutar el programa cliente necesitamos colocar el certificado en el keystore del usuario, para ello lo exportamos a un fichero, le llamamos por ejemplo ```CertificadoSSL.cer```

```bash
C:>keytool -export -alias claveSSL -keystore AlmacenSSL -storepass 1234567 -file Certificado.cer
```

Una vez que tenemos el fichero exportado es necesario incorporarle al nuevo almacenamiento para permitir realizar la validación. A continuación se crea un keystore de nombre ```UsuarioAlmacenSSL``` con la clave 890123 y se incorpora el fichero de certificado ```Certificado.cer```. Esto lo hacemos donde ejecutemos el cliente.

```bash
C:>keytool -import -alias claveSSL -file Certificado.cer –keystore UsuarioAlmacenSSL -storepass 890123
```

Para ejecutar el programa cliente escribimos lo siguientes

```bash
C:>java -Djavax.net.ssl.trustStore=UsuarioAlmacenSSL -Djavax.net.ssl.trustStorePassword=890123 ClienteSSL
```

En estos ejemplos para ejecutar el programa cliente y el servidor hemos establecido las propiedades **JSSE** desde la línea de comandos usando la sintaxis ```–Dpropiedad=Valor```. También se pueden establecer desde el programa usando el método ```System.setProperty(String propiedad, String valor)```.

|Propiedad|Significado|
|---|---|
|javax.net.ssl.keyStore|Ubicación del fichero de almacén de claves de JAva. En Windows, la ruta de acceso especificada debe utilizar barras inclinadas, /, en lugar de barras invertidas, \|
|javax.net.ssl.keyStorePassword|Contraseña para acceder a la calve privada en el fichero de almacén de claves especificado por ```javax.net.ssl.keyStore```|
|javax.net.ssl.trustStore|Ubicación del fichero de almacén de claves que contiene la colección de certificados de confianza. En Windows, la ruta de acceso especificada debe utilizar barras inclinadas, /, en lugar de barras invertidas, \|
|javax.net.ssl.keyStorePassword|Contraseña para abrir el fichero de almacén de claves especificado por ```javax.net.ssl.trustStore```|

En el programa servidor incluimos las siguientes líneas después de definir la variable puerto:

```java
System.setProperty("javax.net.ssl.keyStore", "AlmacenSSL");
System.setProperty("javax.net.ssl.keyStorePassword", "1234567");
```

Y en el programa cliente:

```java
System.setProperty("javax.net.ssl.trustStore", "UsuarioAlmacenSSL");
System.setProperty("javax.net.ssl.trustStorePassword", "890123");
```

Opcionalmente podemos registrar un proveedor SSL en los programas añadiendo esta línea:

```java
java.security.Security.addProvider(new com.sun.net.ssl.internal.ssl.Provider());
```

El método ```getSession()``` de la clase **SSLSocket** devuelve un objeto **SSLSession** con la sesión **SSL** utilizada por la conexión, a partir de ella podemos obtener información como el identificador de la sesión, el cifrado **SSL**, el protocolo, el certificado, etc.

```java
SSLSession session = ((SSLSocket) Cliente).getSession();
System.out.println("Host: "+session.getPeerHost());
System.out.println("Cifrado: " + session.getCipherSuite());
System.out.println("Protocolo: " + session.getProtocol());
System.out.println("IDentificador:" + new BigInteger(session.getId()));
System.out.println("Creación de la sesión: " + session.getCreationTime());
X509Certificate certificate = (X509Certificate)session.getPeerCertificates()[0];
System.out.println("Propietario: " + certificate.getSubjectDN());
System.out.println("Algoritmo: " + certificate.getSigAlgName());
System.out.println("Tipo: " + certificate.getType());
System.out.println("Emisor: " + certificate.getIssuerDN());
System.out.println("Número Serie: " + certificate.getSerialNumber());
```

En el programa servidor para obtener la información del certificado tendríamos que utilizar el método ```getLocalCertificates()``` en lugar de ```getPeerCertificates()```.

## JAAS

**JAAS** (Java Authentication and Authorization Service, Servicio de Autorización y Autenticación de Java) es una interfaz que permite a las aplicaciones Java acceder a servicios de control de autenticación y acceso.

Se puede utilizar para dos propósitos:

1. Para la autenticación de usuarios: para determinar de forma fiable y segura quién está ejecutando nuestro código **Java**
2. Para la autorización de los usuarios: Para asegurarse de que quien lo ejecuta tiene los permisos necesarios para realizar las acciones.

En estos procesos están involucradas las clases e interfaces:

- **LoginContext**, contexto de inicio de sesión: clase para iniciar y gestionar el proceso de autenticación mediante la creación de un Subject. La autenticación se hace llamando al método login().
- **LoginModulo**, módulo de conexión: interfaz para definir los mecanismos de autenticación. Se deben implementar los siguientes métodos: ```iniatilize()```, ```login()```, ```commit()```, ```abort()``` y ```logout()```. Se encarga de validar los datos en un proceso de autenticación.
- **Subject**, clase para representar a un ente autenticable (entidad, usuario, sistema)
- **Principal**, clase que representa los atributos que posee cada **Subject** recuperado una vez que se efectúa el ingreso a la aplicación. Un **Subject** puede contener varios principales.
- **CallBackHandler**, encargado de la interacción con el usuario para obtener los datos necesarios para la autenticación. Se debe implementar el método ```handle()```.

Los paquetes en los que están disponibles las clases e interfaces principales de JAAS son:

- **javax.security.auth.*** que contiene las clases de base e interfaces para los mecanismos de autenticación y autorización.
- **javax.security.auth.callback.*** que contiene las clases e interfaces para definir las credenciales de autenticación de la aplicación.
- **javax.security.auth.login.*** que contiene las clases para entrar y salir de un dominio de aplicación.
- **javax.security.auth.spi.*** que contiene las interfaces para un proveedor de **JAAS** para implementar módulos **JAAS**.

## Autenticación

El proceso básico de autenticación consta de los siguientes pasos

- Creación de una instancia de **LoginContext**, uno o más **LoginModulo** son cargados basándose en el archivo de configuración de **JAAS**.
- La instanciación de cada **LoginModule** es opcionalmente provista con un **CallbackHandler** que gestionará el proceso de comunicación con el usuario para obtener los datos con los que este tratará de autenticarse.
- Invocación del método ```login()``` del **LoginContext** el cual invocará el método ```login()``` del **LoginModule**.
- Los datos del usuario se obtienen por medio del **CallbackHandler**.
- El **LoginModule** comprueba los datos introducidos por el usuario y los valida. Si la validación tiene éxito el usuario queda autenticado.

### Ejemplo

Esquema básico de las clases y ficheros que se van a utilizar en el ejemplo para probar la autenticación básica con JAAS

![Clases para el ejemplo de autenticación](/img/posts/20160326_1.png)

Los ficheros son los siguientes:

- Fichero **EjemploJaasAutenticacion.java**, es la aplicación que será autenticada y autorizada mediante JAAS.
- Fichero **EjemploLoginModule.java**, implementa el módulo **LoginModule** que autentifica a los usuarios mediante su nombre y contraseña.
- Fichero **MyCallbackHandler.java** que implementa **CallbackHandler**. Transfiere la información requerida al módulo **LoginModule**.
- Fichero de autenticación de **JAAS**, ```jaas.config```, donde se configura el módulo de login. Se vincula el nombre EjemploLogin al módulo **LoginModule** de nombre - **EjemploLoginModule**, la palabra required indica que el módulo de conexión asociado debe ser capaz de autenticar al sujeto en todo el proceso de autenticación para poder tener éxito.

```java
EjemploLogin{
     EjemploLoginModule required;
}
```

- Fichero de autenticación **JAAS**, ```policy.config```. Se conceden permisos de lectura sobre las propiedades usuario y clave que se introducirán desde la línea de comandos y el permiso para crear un contexto de inicio de sesión, createLoginContext, al nombre ```EjemploLogin``` vinculado con la clase ```EjemploLoginModule```. El contenido del fichero es el siguiente:

```java
grant {
     permission java.util.PropertyPermission "usuario", "read";
     permission java.util.PropertyPermission "clave", "read";
     permission javax.security.auth.AuthPermission  "createLoginContext.EjemploLogin";
};
```

#### Archivo MyCallbackHandler.java

```java
import java.io.*;
import javax.security.auth.callback.*;

public class MyCallbackHandler implements CallbackHandler {
     
      private String usuario;
      private String clave;
     
      //Constructor recibe parámetros usuario y clave
      public MyCallbackHandler(String usu, String clave) {
           
            this.usuario = usu;
            this.clave = clave;
      }
     
      //método handle sera invocado por el LoginMbdule
      public void handle(Callback[] callbacks) throws IOException, UnsupportedCallbackException {
           
            for (int i = 0; i < callbacks.length; i++) {
                 
                  Callback callback = callbacks[i];
                  if (callback instanceof NameCallback) {
                        NameCallback nameCB = (NameCallback) callback;
                        //se asigna al NameCallback el nombre de usuario
                        nameCB.setName(usuario);    
                  } else if (callback instanceof PasswordCallback) {
                        PasswordCallback passwordCB = (PasswordCallback) callback;
                        //se asigna al PasswordCallback la clave   
                        passwordCB.setPassword(clave.toCharArray());
                  }
            }    
      }
}
```

**CallbackHandler** tiene el método ```handle()``` que será invocado por el **LoginModule** al que le pasará un array de objetos **Callbacks**, que contiene los campos de datos que se necesitan. Cada **Callback** representa uno de los datos comunicados por el usuarios en el proceso de autenticación (nombre, password, etc), es necesario recorrer este array para recuperar los datos.

|Class|Descripción|
|---|---|
|NameCallback|El LoginModule quiere que el usuario introduzca un nombre|
|PasswordCallback|El LoginModule quiere que el usuario introduzca un password|
|ChoiceCallback|El LoginModule quiere que el usuario elija un valor de un conjunto de valores|
|ConfirmationCallback|El LoginModule quiere que el usuario responda sí / no / cancelar a una pregunta en particular|
|TextOutputCallback|El LoginModule envía algún tipo de información al usuario|

#### Archivo EjemploLoginModule.java

```java
import java.util.Map;
import javax.security.auth.*;
import javax.security.auth.callback.*;
import javax.security.auth.login.LoginException;
import javax.security.auth.spi.LoginModule;

public class EjemploLoginModule implements LoginModule {
     
      private Subject subject;
      private CallbackHandler callbackHandler;
     
      public boolean commit() throws LoginException {return true;}
     
      public boolean logout() throws LoginException {return true;}
     
      public boolean abort() throws LoginException {return true;}
     
      public void initialize(Subject subject, CallbackHandler handler, Map state, Map options) {
            this.subject = subject;
            this.callbackHandler = handler;   
      }
     
      //método login - se realiza la autenticación
      public boolean login() throws LoginException {
           
            boolean autenticado = true;
            if(callbackHandler == null){   
                  throw new LoginException("Se necesita CallbackHandler");
            }
           
            //Se crea el array de Callbacks
            Callback[] callbacks = new Callback[2];
            //Constructor de NameCallback y PasswordCallback con prompt
            callbacks[0] = new NameCallback("Nombre de usuario: ");
            callbacks[1] = new PasswordCallback("Clave: ", false);
           
            try {
                  //se invoca al método handle del CallbackHandler
                  //para solicitar el usuario y la contraseña
                  callbackHandler.handle(callbacks);
                  String usuario = ((NameCallback)callbacks[0]).getName();
                  char [] passw = ((PasswordCallback)callbacks[1]).getPassword();
                  String clave = new String(passw);
                 
                  //La autenticación se realiza aquí
                  //el nombre de usuario: maria, su clave: 1234
                  autenticado = ("maria".equalsIgnoreCase(usuario) & "1234".equals(clave)) ;
            } catch (Exception e) {e.printStackTrace();}
           
            return autenticado;//devuelve true o false
           
      }
}
```

Implementa el **LoginModule** que autenticará a los usuarios en su método ```login()```. Debe implementar los siguientes métodos:

- ```initialize()```: El propósito de este método es inicializar el **LoginModule** con la información con la información relevante. El Subjectpasasdo a este método se usa para almacenar los principales (Principal) y credenciales si la conexión tiene éxito. Recibe un **CallbackHandler** que puede ser usado para introducir información de la autenticación.
- ```login()```: El propósito de este método es autenticar al **Subject**.
- ```commit()```: Se llama a este método si tiene éxito la autenticación total del **LoginContext**.
- ```abort()```: Informa al LoginModule de que algún proveedor o módulo ha fallado al autenticar al **Subject**. Se llama a este método si la autenticación global del **LoginContext** ha fallado.
- ```logout()```: Desconecta al Subject borrando los principales y credenciales del **Subject**. Finalizará la sesión del usuario.

```bash
C:>java -Dusuario=maria -Dclave=1234 EjemploJAASAutenticacion
```

## Autorización

Para que la autorización JAAS tenga lugar, se requiere lo siguiente:

- El usuario debe **autenticarse**. Ya visto
- En el **fichero de políticas** se deben configurar entradas para los principales
- Se debe asociar al **Subject** el contexto de control de acceso actual usando los métodos ```doAs()``` o ```doAsPrivileged()``` de la clase **Subject**.

Para lo cual insertaríamos dos nuevas clases al ejemplo anterior.

#### Archivo EjemploAccion.java
```java
import java.io.*;
import java.security.PrivilegedAction;

public class EjemploAccion implements PrivilegedAction {
     
      public Object run() {
           
            File f = new File("fichero.txt");
            if (f.exists()) {
                 
                  System.out.println("EL FICHERO EXISTE ... ");
                  //Si existe se muestra su contenido
                  FileReader fic;
                  try {
                        fic = new FileReader(f);
                        int i;
                        System.out.println("Su contenido es: ");
                        while ((i = fic.read()) != -1)
                             System.out.print((char) i);
                        fic.close();
                  } catch (Exception e) { e.printStackTrace();}
                 
            }else {
                 
                  //Si no existe se crea y se insertan datos
                  System.out.println("EL FICHERO NO EXISTE, LO CREO ... ");
                  try {
                        FileWriter fic = new FileWriter(f);
                        String cadena = "Esto es una linea de texto";
                        fic.append(cadena); fic.close();// cerrar fichero
                        System.out.println("Fichero creado con datos...");
                  } catch (IOException e) {
                        System.out.println("ERROR ==> " + e.getMessage());
                  }
            }
           
            return null;
           
      }
}
```

Esta clase implementa **PrivilegedAction**, contiene el método ```run()``` que es el código que se ejecutará una vez que el usuario ha sido autenticado, teniendo en cuenta las autorizaciones de los principales definidas en el fichero de políticas.

#### Archivo EjemploPrincipal.java

```java
import java.security.Principal;

public class EjemploPrincipal implements Principal, java.io.Serializable {
     
      private String name;//nombre del principal
     
      //Crea un EjemploPrincipal con el nombre suministrado.
      public EjemploPrincipal(String name) {
           
            if (name == null)
                  throw new NullPointerException("Entrada nula");
            this.name = name;
      }
     
      //Devuelve el nombre del Principal
      public String getName() {return name;}
     
      //Compara el objeto especificado con el Principal
      //para ver si son iguales.
      public boolean equals(Object o) {
           
            if (o == null) return false;
            if (this == o) return true;
            if (!(o instanceof EjemploPrincipal)) return false;
            EjemploPrincipal that = (EjemploPrincipal) o;
            if (this.getName().equals(that.getName())) return true;
           
            return false;
      }//Fin de equals

      public int hashCode() {return name.hashCode();}
     
      public String toString() {return (name);}
     
}
```

Esta clase implementa la interface **Principal**, se usa en la clase **EjemploLoginModule** una vez que el usuario ha sido autenticado en el método ```commit()```.

### Privilegios de acceso en el fichero de políticas (policy.config)

```java
grant {
     permission javax.security.auth.AuthPermission "createLoginContext.EjemploLogin";
     permission javax.security.auth.AuthPermission "modifyPrincipals";
     permission javax.security.auth.AuthPermission "doAsPrivileged";
};

grant Principal EjemploPrincipal "maria" {
     permission java.io.FilePermission "fichero.txt", "read";
} ;

grant Principal EjemploPrincipal "juan" {
     permission java.io.FilePermission "fichero.txt", "write";
};
```

![Clases para el ejemplo de autorización](/img/posts/20160326_2.png)

**¡Salud y coding!**