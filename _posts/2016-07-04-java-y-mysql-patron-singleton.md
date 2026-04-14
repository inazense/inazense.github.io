---
title: Java y MySQL. Patrón Singleton
description: Aprende a implementar el patrón Singleton en Java para conexiones MySQL. Tutorial completo con código paso a paso sobre patrones de diseño, instancia única y gestión eficiente de bases de datos.
author: Inazio Claver
date: 2016-07-04 12:10:00 +0800
categories: [Java]
tags: [java, mysql, singleton, patrones-diseño, jdbc, base-datos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

¿Necesitas una conexión en tu aplicación Java? ¿Harto de abrir varias instancias cada vez que quieres conectarte a **MySQL**? ¿Estás leyendo esto con voz de anuncio?
Entonces el **patrón Singleton** es tu nuevo mejor amigo.

El **patrón Singleton**, o **patrón de instancia única**, es un **patrón de diseño** encargado de restringir la creación de objetos de una clase (o el valor de un tipo) a un único objeto. Genera una única instancia en la ejecución del programa y proporciona un acceso global a la misma.

Sirve para multitud de funcionalidades, pero en este caso vamos a ver su aplicación a la hora de conectarnos a una base de datos **MySQL**.

## ¿Cómo funciona?

Crearemos una nueva clase, por ejemplo ```EjemploSingleton```, que será la responsable de crear la única instancia.

```java
import java.sql.*;

public class EjemploSingleton {

}
```

Lo siguiente será crear una variable estática que almacenará nuestra conexión y la inicializaremos a ```null```

```java
private static Connection conn = null;
```

Después de eso deberemos crear un constructor para nuestra nueva clase, pero ojo, lo crearemos privado.
¡¿Un constructor privado?! Sí, como lo oyes. Es la forma de garantizar que solo tendremos una única instancia para la conexión.

```java
private EjemploSingleton(){
 
    String url = "jdbc:mysql://localhost:3306/test";
    String driver = "com.mysql.jdbc.Driver";
    String usuario = "usuario";
    String password = "password";
 
    try{
 Class.forName(driver);
 conn = DriverManager.getConnection(url, usuario, password);
    }
    catch(ClassNotFoundException | SQLException e){
 e.printStackTrace();
    }
}
```

Vale, pero si es privado, ¿cómo vamos a crearlo? He ahí la gracia, al constructor lo llama la propia clase, a través de un método. Es lo que veremos a continuación.

Vamos a crear un método llamado ```getConnection``` en el que indicaremos que si nuestra propiedad conn es nula, vuelva a levantar el driver y crear una conexión llamando al constructor privado.
Y retornaremos la conexión para trabajar con ella.

```java
public static Connection getConnection(){
 
    if (conn == null){
 new EjemploSingleton();
    }
 
    return conn;
}
```

Y una vez programada nuestra clase, podremos echar mano de esa conexión desde cualquier parte de nuestro programa llamándolo de esta forma

```java
Connection conn = EjemploSingleton.getConnection();
```

Et voilá! Ya tenemos un patrón de instancia única en **Java** con **MySQL**.

El código completo es el siguiente:

```java
import java.sql.*;

public class EjemploSingleton {

    // Propiedades
    private static Connection conn = null;
    private String driver;
    private String url;
    private String usuario;
    private String password;
 
    // Constructor
    private EjemploSingleton(){
 
 String url = "jdbc:mysql://localhost:3306/test";
 String driver = "com.mysql.jdbc.Driver";
 String usuario = "usuario";
 String password = "password";
  
 try{
     Class.forName(driver);
     conn = DriverManager.getConnection(url, usuario, password);
 }
 catch(ClassNotFoundException | SQLException e){
     e.printStackTrace();
 }
    } // Fin constructor
 
    // Métodos
    public static Connection getConnection(){
  
 if (conn == null){
     new EjemploSingleton();
 }
  
 return conn;
    } // Fin getConnection
}
```

**¡Salud y coding!**