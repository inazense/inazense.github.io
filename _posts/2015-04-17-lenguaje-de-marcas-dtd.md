---
title: Lenguaje de marcas. DTD
description: Introducción al DTD (Definición de Tipo de Documento) para validar la estructura de documentos XML, con ejemplos de elementos, atributos y tipos de datos.
author: Inazio Claver
date: 2015-04-17 12:10:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguajes-de-marcas, xml, dtd]
pin: false
math: false
mermaid: false
---

El DTD (Definición de Tipo de Documento) es un archivo que se usa para especificar como está estructurado un documento XML. Consultar DTD en W3schools [aquí](http://www.w3schools.com/dtd/).

Una estructura de un DTD básico sería la siguiente:

```xml
<!DOCTYPE nota[
     <!ELEMENT nota(de, para, encabezamiento, texto)>
     <!ELEMENT de(#PCDATA)>
     <!ELEMENT para(#PCDATA)>
     <!ELEMENT encabezamiento(#PCDATA)>
     <!ELEMENT texto(#PCDATA)>
]>
```

`#PCDATA` significa datos de caracteres parseados. En un campo de texto, es el texto que hay entre dos etiquetas. Será leido por un lector y se examinará por si tiene entidades.

![PCDATA vs CDATA](/img/posts/20150417_6.png)

Así si lo reconoce lo pondrá en forma de entidad, si no de otra forma entendería que, por ejemplo en el caso de que hubiera un libro llamado `2 < 3`, entendería que se trata de un elemento hijo.

Asímismo también tenemos `#CDATA`, en el que le diremos que el lector cogerá todo y lo tratará como una cadena de caracteres. En nuestro caso del libro, leería `2 &lt 3`.

Vamos a realizar el DTD del XML librería que está a continuación:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<librería>
    <libro categoría="Cocina">
        <título idioma="en">Everyday Italian</título>
        <autor>Giada De Laurentiis</autor>
        <edición>2005</edición>
        <precio>30.00</precio>
    </libro>
    <libro categoría="Infantil">
        <título idioma="en">Harry Potter</título>
        <autor>J K. Rowling</autor>
        <edición>2005</edición>
        <precio>29.99</precio>
    </libro>
    <libro categoría="Desarrollo Web">
        <título idioma="en">Learning XML</título>
        <autor>Erik T. Ray</autor>
        <edición>2003</edición>
        <precio>39.95</precio>
    </libro>
</librería>
```

El DTD sería el siguiente:

```xml
<!DOCTYPE librería[
     <!-- Puede tener más de un libro -->
     <!ELEMENT librería(libro+)>
     <!-- Un libro solo tendrá un titulo, autor, edicion y precio -->
     <!ELEMENT libro(titulo, autor, edicion, precio)>
     <!ELEMENT titulo(#PCDATA)>
     <!ELEMENT autor(#PCDATA)>
     <!ELEMENT edicion(#PCDATA)>
     <!ELEMENT precio(#PCDATA)>
     <!-- Definir los atributos -->
     <!ATTLIST libro categoría CDATA>
     <!-- Obligo a insertar categoría idioma -->
     <!ATTLIST titulo idioma CDATA #REQUIRED>
]>
```
