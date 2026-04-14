---
title: "Acceso a datos. Ficheros XML"
description: Manejo de ficheros XML en Java usando DOM (Document Object Model) y JAXP, con ejemplos de lectura, recorrido, modificación y escritura de documentos XML.
author: Inazio Claver
date: 2015-10-17 15:55:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, xml, dom, jaxp, documentbuilder]
pin: false
math: false
mermaid: false
---

## DOM

**DOM** (_Document Object Model_) es una interfaz de programación que permite analizar y manipular dinámicamente el contenido, estilo y estructura de un documento, originaria del W3C.

![Árbol DOM](/img/posts/20151017_1.png)

Todas las estructuras de datos del documento XML se transforman en algún tipo de nodo, organizados jerárquicamente en forma de árbol con nodos padre, hijo y finales (hojas).

## JAXP

Para trabajar con XML desde Java se usa **JAXP** (_Java API for XML Processing_), que ofrece una manera transparente de utilizar diferentes parsers (como Xerces, Xalan, XT...).

![Arquitectura JAXP](/img/posts/20151017_2.png)

Las clases principales se encuentran en el paquete `javax.xml.parsers`:
- `DocumentBuilderFactory`
- `DocumentBuilder`

Y las interfaces DOM en el paquete `org.w3c.dom`.

![DocumentBuilderFactory y DocumentBuilder](/img/posts/20151017_3.png)

## Fichero XML de ejemplo

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Libros
    xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
    xsi:noNamespaceSchemaLocation='LibrosEsquema.xsd'>

    <Libro publicado_en="1840">
        <Titulo>El Capote</Titulo>
        <Autor>Nikolai Gogol</Autor>
    </Libro>

    <Libro publicado_en="2008">
        <Titulo>El Sanador de Caballos</Titulo>
        <Autor>Gonzalo Giner</Autor>
    </Libro>

    <Libro publicado_en="1981">
        <Titulo>El Nombre de la Rosa</Titulo>
        <Autor>Umberto Eco</Autor>
    </Libro>
</Libros>
```

## Clase GestionarDOM

### Abrir un XML con DOM

```java
public int abrir_XML_DOM(File fichero){
    doc = null;
    try{
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setIgnoringComments(true);
        factory.setIgnoringElementContentWhitespace(true);
        DocumentBuilder builder = factory.newDocumentBuilder();
        doc = builder.parse(fichero);
        return 0;
    }
    catch(Exception e){
        e.printStackTrace();
        return -1;
    }
}
```

### Recorrer el árbol DOM

> **Importante**: Para obtener el contenido de texto de un nodo hay que acceder al nodo hijo de tipo `TEXT_NODE`, no al nodo elemento directamente.

```java
public String recorrerDOMyMostrar(Document doc){
    String datos_nodo[] = null;
    String salida = "";
    Node node;
    Node raiz = doc.getFirstChild();
    NodeList nodeList = raiz.getChildNodes();
    for (int i = 0; i < nodeList.getLength(); i++){
        node = nodeList.item(i);
        if (node.getNodeType() == Node.ELEMENT_NODE){
            datos_nodo = procesarLibro(node);
            salida = salida + "\n " + "Publicado en: " + datos_nodo[0];
            salida = salida + "\n " + "El autor es: " + datos_nodo[2];
            salida = salida + "\n " + "El título es: " + datos_nodo[1];
            salida = salida + "\n --------------------";
        }
    }
    return salida;
}
```

### Procesar un nodo libro

```java
protected String[] procesarLibro(Node n){
    String datos[] = new String[3];
    Node ntemp = null;
    int contador = 1;
    datos[0] = n.getAttributes().item(0).getNodeValue();
    NodeList nodos = n.getChildNodes();
    for (int i = 0; i <nodos.getLength(); i++){
        ntemp = nodos.item(i);
        if(ntemp.getNodeType() == Node.ELEMENT_NODE){
            datos[contador] = ntemp.getChildNodes().item(0).getNodeValue();
            contador++;
        }
    }
    return datos;
}
```

### Añadir un nodo al DOM

```java
public int annadirDOM(Document doc, String titulo, String autor, String anno){
    try{
        Node ntitulo = doc.createElement("Titulo");
        Node ntitulo_text = doc.createTextNode(titulo);
        ntitulo.appendChild(ntitulo_text);
        Node nautor = doc.createElement("Autor");
        Node nautor_text = doc.createTextNode(autor);
        nautor.appendChild(nautor_text);
        Node nlibro = doc.createElement("Libro");
        ((Element)nlibro).setAttribute("publicado_en", anno);
        nlibro.appendChild(ntitulo);
        nlibro.appendChild(nautor);
        Node raiz = doc.getChildNodes().item(0);
        raiz.appendChild(nlibro);
        return 0;
    }
    catch(Exception e){
        e.printStackTrace();
        return -1;
    }
}
```

### Guardar el DOM como fichero (con XMLSerializer)

```java
public int guardarDOMcomoFILE(){
    try{
        File archivo_xml = new File("salida.xml");
        OutputFormat format = new OutputFormat(doc);
        format.setIndenting(true);
        XMLSerializer serializer = new XMLSerializer(
            new FileOutputStream(archivo_xml), format);
        serializer.serialize(doc);
        return 0;
    }
    catch(Exception e){
        return -1;
    }
}
```

## Crear un XML desde cero (Método 1: XMLSerializer)

```java
package GestionDOM;

public class PruebaGestionarDOM{
    public static void main(String[] args){
        GestionarDOM ObjetoDOM = new GestionarDOM();
        ObjetoDOM.doc = null;
        try{
            DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            DOMImplementation implementation =
                builder.getDOMImplementation();
            ObjetoDOM.doc = implementation.createDocument(
                null, "Libros", null);
            ObjetoDOM.doc.setXMLVersion("1.0");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Desarrollo de Interfaces", "Pablo Martinez", "2010");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Acceso a datos", "Alberto Carrera", "2011");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Formación y orientación laboral",
                "Belén Carrera", "2012");
            ObjetoDOM.guardarDOMcomoFILE("D:\\profesores.XML");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
```

## Crear un XML desde cero (Método 2: Transformer)

```java
package GestionDOM;
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import javax.xml.transform.dom.DOMSource;

public class PruebaGestionarDOM_1{
    public static void main(String[] args){
        GestionarDOM ObjetoDOM = new GestionarDOM();
        ObjetoDOM.doc = null;
        try{
            DocumentBuilderFactory factory =
                DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            DOMImplementation implementation =
                builder.getDOMImplementation();
            ObjetoDOM.doc = implementation.createDocument(
                null, "Libros", null);
            ObjetoDOM.doc.setXMLVersion("1.0");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Desarrollo de Interfaces", "Pablo Martinez", "2010");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Acceso a datos", "Alberto Carrera", "2011");
            ObjetoDOM.annadirDOM(
                ObjetoDOM.doc, "Formación y orientación laboral",
                "Belén Carrera", "2012");

            Source source = new DOMSource(ObjetoDOM.doc);
            Result result = new StreamResult(
                new java.io.File("D:\\profesores.XML"));
            Transformer transformer =
                TransformerFactory.newInstance().newTransformer();
            transformer.transform(source, result);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
```

El método `Transformer` es el estándar JAXP y no depende de librerías externas como Xerces, por lo que es preferible cuando se quiere portabilidad.
