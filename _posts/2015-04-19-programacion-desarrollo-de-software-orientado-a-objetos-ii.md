---
title: Programación. Desarrollo de software orientado a objetos (II)
description: Manejo de ficheros en Java con FileReader, FileWriter, DataInputStream y serialización de objetos. Introducción al framework Collection.
author: Inazio Claver
date: 2015-04-19 12:00:00 +0800
categories: [Programación]
tags: [programacion, java, ficheros, serializacion, colecciones, orientado-a-objetos]
pin: false
math: false
mermaid: false
---

## Ficheros en Java

Manejar ficheros en Java es muy sencillo. En el paquete `java.io` encontramos las herramientas que necesitamos.

1. La clase `File` representa un fichero o directorio (que no tiene por qué existir todavía). `File` nos permite averiguar mucha información útil (ruta del fichero, si se puede escribir, etc).
2. Si queremos tratar con ficheros de texto usaremos streams basados en caracteres; para el resto de casos utilizaremos streams basados en bytes.

Para la lectura o escritura en ficheros de texto usamos `FileReader` y `FileWriter`:

```java
FileReader fichLec = new FileReader(cadNombre1);
FileWriter fichEsc = new FileWriter(cadNombre2);
// ...
char caracter = fichLec.read();
fichEsc.write(caracter);
```

Para lectura o escritura de datos en ficheros usamos `DataInputStream` y `DataOutputStream`:

```java
DataInputStream fichLec = new DataInputStream(cad1);
DataOutputStream fichEsc = new DataOutputStream(cad1);
// ...
int codArticulo = fichLec.readInt();
int numUnidades = fichLec.readInt();
double precio = fichLec.readDouble();
fichEsc.writeInt(codArticulo);
fichEsc.writeInt(numUnidades);
fichEsc.writeDouble(precio);
```

Se aconseja que el acceso a los ficheros se haga mediante un buffer de memoria para mejorar la eficiencia:

```java
File fichero = new File("pedidos.dat");
DataOutputStream dos = new DataOutputStream(fichero);
BufferedOutputStream stream = new BufferedOutputStream(dos);
stream.writeInt(codArticulo);
stream.writeDouble(precio);
```

## Persistencia de objetos

Hasta ahora todos los objetos que hemos creado se han alojado en la memoria del ordenador. Ahora queremos almacenarlos en el disco duro, de manera que pueda recuperarlos cuando reinicie el ordenador.

La persistencia de objetos se ocupa de escribirlos y leerlos desde el disco duro. Normalmente los objetos se almacenan en:
- Ficheros binarios
- Bases de datos

### Persistencia en ficheros

Partimos del siguiente ejemplo:

```java
Persona p = new Persona("Ana", "Lopez Haro");
Mascota m = new Mascota("Tobi");
Coche c = new Coche("4324-FJT");
p.compraMascota(m);
p.compraCoche(c);
```

![Objeto Persona con sus referencias](/img/posts/20150419_1.jpg)

A la operación de convertir un objeto en una hilera de bytes se le llama **serialización**.

![Concepto de serialización](/img/posts/20150419_2.png)

![Serialización de objetos con referencias](/img/posts/20150419_3.jpg)

### Implementación en Java

Para que un objeto pueda ser escrito y leído a un fichero debe implementar la interfaz `Serializable`.

![Interfaz Serializable](/img/posts/20150419_4.jpg)

La interfaz `Serializable` no contiene ningún método. Actúa como un marcador del objeto, indicando que éste puede ser serializado.

Se necesitan:
- `java.io.ObjectInputStream`
- `java.io.ObjectOutputStream`

```java
import java.io.Serializable;

public class Coche implements Serializable {
    private String matricula;
    private double maxLitros;
}

public class Mascota implements Serializable {
    // ...
}

public class PruebaSerializable {
    public static void main(String[] args) {
        FileOutputStream fichSalida = null;
        ObjectOutputStream oos = null;
        FileInputStream fichEntrada = null;
        ObjectInputStream ois = null;
        try {
            fichSalida = new FileOutputStream("c:/persona.obi");
            oos = new ObjectOutputStream(fichSalida);
            oos.writeObject(p);
        } catch (IOException e) {
            System.out.println("Se produjo un error de apertura");
        } finally {
            try {
                if (oos != null) oos.close();
                if (fichSalida != null) fichSalida.close();
            } catch (IOException e) {
                System.out.println("No se consiguió cerrar el fichero correctamente");
            }
        }
        try {
            fichEntrada = new FileInputStream("c:/persona.obi");
            ois = new ObjectInputStream(fichEntrada);
            p = (Persona) ois.readObject();
        } catch (ClassNotFoundException e) {
            System.out.println("Contenido de fichero no esperado");
        } finally {
            try {
                if (ois != null) ois.close();
                if (fichEntrada != null) fichEntrada.close();
            } catch (IOException e) {
                System.out.println("No se consiguió cerrar el fichero correctamente");
            }
        }
        System.out.println("Se leyó el fichero correctamente");
    }
}
```

![Ejemplo de DataOutputStream en fichero](/img/posts/20150419_5.png)

### Persistencia en bases de datos

Según su relación con el enfoque orientado a objetos podemos clasificar las bases de datos en tres grupos:

- **Relacionales puras:** Tecnología madura y eficiente. Problema: se basan en un modelo plano de datos. Solución bastante costosa en tiempo y esfuerzo.
- **Orientadas a objetos puras:** La correspondencia entre objeto de programación y objeto en disco es directa. Tecnología lenta, ineficiente y poco flexible para consultas.
- **Objeto-Relacionales o mixtas:** Combina las ventajas de las dos anteriores. Son BBDD relacionales con nuevos tipos de datos que permiten modelar objetos. A partir de Oracle 8i se incorporan los nuevos tipos abstractos de datos.

## El framework Collection

Las colecciones o contenedores de objetos son estructuras de datos muy recurridas y necesarias: tablas, listas, pilas, colas, árboles, conjuntos, diccionarios...

Su utilización implica normalmente la adaptación de la colección al tipo de elemento que queremos almacenar.

![Framework Collection de Java](/img/posts/20150419_6.jpg)
