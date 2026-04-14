---
title: Leer ficheros properties en Java
description: Aprende a leer archivos properties en Java con la clase Properties. Tutorial completo paso a paso sobre getProperty, Enumeration, carga de ficheros .properties y ejemplos prácticos de configuración con código.
author: Inazio Claver
date: 2017-12-12 17:11:00 +0800
categories: [Java]
tags: [java, properties, configuracion, fileReader, getProperty, enumeration]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Una práctica habitual en Java es guardar **parámetros de configuración** en un **archivo de propiedades**, que es básicamente un fichero de texto plano con la extensión **.properties** con su contenido almacenado como una **pareja clave=valor** y con el símbolo # para indicar línea de comentario.

Por ejemplo:

```properties
# Archivo properties
usuario=Inazio
password=programandoapasitos.com
ruta=/home/inazio/resources
```

Así, en este ejemplo la primera línea será solo de comentarios, y en las posteriores cada **clave** será un parámetro de nuestra configuración y, separado por un igual, su **valor** correspondiente.

**Java** nos proporciona una herramienta muy útil y sencilla para leer los **archivos de propiedades**, la **clase Properties**.

Para usarla, lo primero que haremos será inicializar nuestro objeto y posteriormente indicarle que cargue el **fichero de propiedades**.

```java
Properties propiedades = new Properties();
propiedades.load(new FileReader("config.properties"));
```

Hecho esto, sólo nos quedará indicar si queremos que lea una o todas las **propiedades**.

## Leer una propiedad

La verdad es que es tremendamente sencillo. Para realizazr la **lectura de un valor** en nuestro **archivo properties** basta con la siguiente línea

```java
propiedades.getProperty(miClave)
```

Como veis, lo único que hacemos es usar el método ```getProperty``` y como parámetro le pasamos la **clave** del **valor** a extraer, devolviéndonoslo como un **String**.

## Leer todas las propiedades

Para leer todas las **propiedades** recurriremos a un objeto ```Enumeration``` que nos permitirá iterar sobre todas ellas, leeremos la clave de los **valores** en un bucle y obteniendo la **clave**, usaremos el mismo modo que en el ejemplo anterior. En este caso lo imprimiremos también

```java
Enumeration<Object> claves = propiedades.keys();
  
while (claves.hasMoreElements()) {
  Object clave = claves.nextElement();
  System.out.println(clave.toString() + " - " + propiedades.get(clave).toString());
}
```

**¿Qué hacemos exactamente?**

En nuestro objeto ```Enumeration``` almacenamos todas las **claves** que incluye nuestro objeto **Properties**, e iniciamos un bucle hasta que recorrer todos los elementos.
Después creamos un objeto genérico que será nuestra **clave**, y es la que usamos para extraer el valor de dicho par en la línea de abajo, aprovechando para imprimir la **clave** y la propiedad haciendo de ambas un casteo de **String**.

¿A que resulta tremendamente sencillo? Ahora solo es cuestión de practicar con ello.
Podéis ver el código completo de esta entrada en mi [**github público**](https://github.com/inazense/scripts/blob/master/scripts/java/ManejadorProperties.java). Ahí tendréis una clase con un **patrón Singleton** que permite manejar este tipo de archivos..

**¡Salud y coding!**