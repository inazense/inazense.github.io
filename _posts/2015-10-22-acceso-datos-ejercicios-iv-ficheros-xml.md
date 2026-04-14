---
title: "Acceso a datos. Ejercicios (IV). Ficheros XML"
description: Ejercicios prácticos de manipulación de ficheros XML en Java con DOM, SAX, XStream y JDOM, combinando serialización binaria y generación de XML.
author: Inazio Claver
date: 2015-10-22 12:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, xml, dom, sax, xstream, jdom, serializable, ejercicios]
pin: false
math: false
mermaid: false
---

## Ejercicio 1: Serialización y XML con DOM

Aplicación que almacena objetos `Persona` en un fichero binario `.dat` y los exporta a un fichero XML usando DOM.

**Persona.java:**

```java
import java.io.*;

public class Persona implements Externalizable {
     private String nombre;
     private int edad;

     public Persona() {}

     public Persona(String nombre, int edad) {
          this.nombre = nombre;
          this.edad = edad;
     }

     public String getNombre() { return nombre; }
     public int getEdad() { return edad; }

     public void writeExternal(ObjectOutput out) throws IOException {
          out.writeObject(nombre);
          out.writeInt(edad);
     }

     public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
          nombre = (String) in.readObject();
          edad = in.readInt();
     }

     public String toString() {
          return "Nombre: " + nombre + ". Edad: " + edad;
     }
}
```

**EscribirSinCabecera.java:**

```java
import java.io.*;

public class EscribirSinCabecera extends ObjectOutputStream {
     public EscribirSinCabecera(OutputStream out) throws IOException {
          super(out);
     }
     public EscribirSinCabecera() throws IOException, SecurityException {
          super();
     }
     protected void writeStreamHeader() throws IOException {}
}
```

**ConfigurarXML.java:**

```java
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.*;
import java.io.*;

public class ConfigurarXML {
     public Document doc;

     public void crearXML() {
          try {
               DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
               DocumentBuilder builder = factory.newDocumentBuilder();
               DOMImplementation impl = builder.getDOMImplementation();
               doc = impl.createDocument(null, "Personas", null);
               doc.setXMLVersion("1.0");
          } catch (Exception e) {
               e.printStackTrace();
          }
     }

     public void anadirDOM(String nombre, int edad) {
          try {
               Node nNombre = doc.createElement("Nombre");
               nNombre.appendChild(doc.createTextNode(nombre));
               Node nEdad = doc.createElement("Edad");
               nEdad.appendChild(doc.createTextNode(String.valueOf(edad)));
               Node nPersona = doc.createElement("Persona");
               nPersona.appendChild(nNombre);
               nPersona.appendChild(nEdad);
               doc.getFirstChild().appendChild(nPersona);
          } catch (Exception e) {
               e.printStackTrace();
          }
     }

     public String leerXML() {
          String salida = "";
          Node raiz = doc.getFirstChild();
          NodeList lista = raiz.getChildNodes();
          for (int i = 0; i < lista.getLength(); i++) {
               Node nodo = lista.item(i);
               if (nodo.getNodeType() == Node.ELEMENT_NODE) {
                    String[] datos = procesarPersona(nodo);
                    salida += "\nNombre: " + datos[0] + ". Edad: " + datos[1];
               }
          }
          return salida;
     }

     protected String[] procesarPersona(Node n) {
          String[] datos = new String[2];
          int contador = 0;
          NodeList nodos = n.getChildNodes();
          for (int i = 0; i < nodos.getLength(); i++) {
               Node ntemp = nodos.item(i);
               if (ntemp.getNodeType() == Node.ELEMENT_NODE) {
                    datos[contador] = ntemp.getChildNodes().item(0).getNodeValue();
                    contador++;
               }
          }
          return datos;
     }

     public void guardarXML(String ruta) {
          try {
               Source source = new DOMSource(doc);
               Result result = new StreamResult(new File(ruta));
               Transformer transformer = TransformerFactory.newInstance().newTransformer();
               transformer.transform(source, result);
          } catch (Exception e) {
               e.printStackTrace();
          }
     }
}
```

**Acciones.java:**

```java
import java.io.*;

public class Acciones {
     private ConfigurarXML xml = new ConfigurarXML();

     public void escribirDat(Persona[] personas, String nombreFichero) {
          File f = new File(nombreFichero);
          try {
               ObjectOutputStream salida;
               if (f.exists()) {
                    salida = new EscribirSinCabecera(new FileOutputStream(nombreFichero, true));
               } else {
                    salida = new ObjectOutputStream(new FileOutputStream(nombreFichero, true));
               }
               for (Persona p : personas) {
                    p.writeExternal(salida);
               }
               salida.close();
          } catch (IOException e) {
               e.printStackTrace();
          }
     }

     public void cargarDatEnXML(String nombreDat, String nombreXML) {
          xml.crearXML();
          boolean fin = false;
          try {
               ObjectInputStream entrada = new ObjectInputStream(new FileInputStream(nombreDat));
               do {
                    try {
                         Persona p = new Persona();
                         p.readExternal(entrada);
                         xml.anadirDOM(p.getNombre(), p.getEdad());
                    } catch (EOFException e) {
                         fin = true;
                         entrada.close();
                    }
               } while (!fin);
               xml.guardarXML(nombreXML);
               System.out.println(xml.leerXML());
          } catch (Exception e) {
               e.printStackTrace();
          }
     }
}
```

## Ejercicio 2: Parseo con SAX

**SAXReader.java:**

```java
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.xml.sax.helpers.DefaultHandler;
import java.io.*;

public class SAXReader extends DefaultHandler {

     public void parsear(String fichero) {
          try {
               SAXParserFactory factory = SAXParserFactory.newInstance();
               SAXParser parser = factory.newSAXParser();
               parser.parse(new File(fichero), this);
          } catch (Exception e) {
               e.printStackTrace();
          }
     }

     @Override
     public void startElement(String uri, String localName, String qName,
               Attributes attributes) throws SAXException {
          System.out.print("<" + qName + ">");
     }

     @Override
     public void characters(char[] ch, int start, int length) throws SAXException {
          String contenido = new String(ch, start, length).trim();
          if (!contenido.isEmpty()) {
               System.out.print(contenido);
          }
     }

     @Override
     public void endElement(String uri, String localName, String qName)
               throws SAXException {
          System.out.println("</" + qName + ">");
     }
}
```

## Ejercicio 3: Departamentos con XStream y XSLT

Propone crear un fichero binario de departamentos, convertirlo a XML usando XStream y aplicar una transformación XSLT para generar HTML.

## Ejercicio 4: XStream

Usa la librería XStream para serializar un `Vector<Persona>` directamente a XML con aliases personalizados:

```java
import com.thoughtworks.xstream.XStream;
import java.io.*;
import java.util.Vector;

public class Acciones {

     public void escribirXML(Vector<Persona> personas, String nombreXML) {
          XStream xs = new XStream();
          xs.alias("personas", Vector.class);
          xs.alias("persona", Persona.class);
          try {
               FileWriter fw = new FileWriter(nombreXML);
               fw.write(xs.toXML(personas));
               fw.close();
               System.out.println("XML generado:\n" + xs.toXML(personas));
          } catch (IOException e) {
               e.printStackTrace();
          }
     }

     public Vector<Persona> leerXML(String nombreXML) {
          XStream xs = new XStream();
          xs.alias("personas", Vector.class);
          xs.alias("persona", Persona.class);
          try {
               FileReader fr = new FileReader(nombreXML);
               Vector<Persona> personas = (Vector<Persona>) xs.fromXML(fr);
               fr.close();
               return personas;
          } catch (IOException e) {
               e.printStackTrace();
               return null;
          }
     }
}
```

## Ejercicio 5: JDOM

**JDOMtoXML.java:**

```java
import org.jdom2.*;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;
import java.io.*;
import java.util.List;

public class JDOMtoXML {

     public void generarXML(String nombreDat, String nombreXML) {
          Element raiz = new Element("Personas");
          Document doc = new Document(raiz);
          boolean fin = false;

          try {
               ObjectInputStream entrada = new ObjectInputStream(new FileInputStream(nombreDat));
               do {
                    try {
                         Persona p = new Persona();
                         p.readExternal(entrada);
                         Element persona = new Element("Persona");
                         persona.addContent(new Element("Nombre").setText(p.getNombre()));
                         persona.addContent(new Element("Edad").setText(String.valueOf(p.getEdad())));
                         raiz.addContent(persona);
                    } catch (EOFException e) {
                         fin = true;
                         entrada.close();
                    }
               } while (!fin);

               XMLOutputter output = new XMLOutputter(Format.getPrettyFormat());
               output.output(doc, new FileWriter(nombreXML));
               System.out.println("XML JDOM generado");
          } catch (Exception e) {
               e.printStackTrace();
          }
     }

     public void leerXML(String nombreXML) {
          try {
               SAXBuilder builder = new SAXBuilder();
               Document doc = builder.build(new File(nombreXML));
               Element raiz = doc.getRootElement();
               List<Element> personas = raiz.getChildren("Persona");
               for (Element persona : personas) {
                    String nombre = persona.getChildText("Nombre");
                    String edad = persona.getChildText("Edad");
                    System.out.println("Nombre: " + nombre + ". Edad: " + edad);
               }
          } catch (Exception e) {
               e.printStackTrace();
          }
     }
}
```
