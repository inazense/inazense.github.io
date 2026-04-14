---
title: "Acceso a datos. Clases File y RandomAccessFile"
description: Uso de las clases File y RandomAccessFile en Java para manejo de archivos y directorios, incluyendo filtros de archivos y acceso aleatorio.
author: Inazio Claver
date: 2015-10-07 16:34:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, file, randomaccessfile, ficheros, io]
pin: false
math: false
mermaid: false
---

## Clase File

La clase `File` no sirve para leer ni para escribir datos en archivos. Su utilidad radica en operaciones como crear o eliminar archivos y directorios, cambiar nombres, consultar propiedades, listar contenidos de directorios, de forma independiente de la plataforma.

Ejemplo de uso con separadores independientes de la plataforma:

```java
import java.io.File;

String sFichero = "miFichero.txt";
String sDirectorio = "miDirectorio";
String sPath = File.separator + sDirectorio + File.separator + sFichero;
System.out.println(sPath);
```

**Constructores:**
- `File(String path)`
- `File(String path, String name)`
- `File(File dir, String name)`

**Métodos principales:**

| Método | Descripción |
|--------|-------------|
| `getName()` | Nombre del archivo |
| `getPath()` | Camino relativo |
| `getAbsolutePath()` | Camino absoluto |
| `exists()` | Comprueba si existe |
| `canWrite()` | Comprueba si se puede escribir |
| `canRead()` | Comprueba si se puede leer |
| `isFile()` | Comprueba si es fichero |
| `isDirectory()` | Comprueba si es directorio |
| `isAbsolute()` | Comprueba si el path es absoluto |
| `lastModified()` | Fecha de última modificación |
| `length()` | Longitud en bytes |
| `mkdir()` | Crea un directorio |
| `mkdirs()` | Crea directorios en cascada |
| `renameTo()` | Renombra el archivo |
| `delete()` | Borra el archivo |
| `list()` | Lista el contenido del directorio |
| `list(FileFilter filter)` | Lista con filtro |

### Ejemplo: listar directorio

```java
import java.io.*;
import java.util.Date;

public class EjemploClassFile {
    public static void main(String[] args) {
        String directorio;
        if (args.length > 0)
            directorio = args[0];
        else
            directorio = ".";

        File actual = new File(directorio);
        System.out.println("El directorio es: ");
        try{
            System.out.println(actual.getCanonicalPath());
        }
        catch(IOException e){}

        System.out.println("Su contenido es:");
        File[] archivos = actual.listFiles();

        for (File archivo : archivos){
            if(archivo.isFile()){
                System.out.println("Nombre: " + archivo.getName());
                System.out.println("Longitud en caracteres: " + archivo.length());
                System.out.println("Modificado: " + new Date(archivo.lastModified()));
                System.out.println("Camino: " + archivo.getPath());
                System.out.println("Camino absoluto: " + archivo.getAbsolutePath());
                System.out.println("Se puede escribir: " + archivo.canWrite());
                System.out.println("Se puede leer: " + archivo.canRead());
            }
            System.out.println();
        }
    }
}
```

### Ejemplo: crear y borrar ficheros

```java
import java.io.*;

public class EjemploOperacionesArchivo {
    public static void main(String[] args) {
        // Creación de un fichero
        try{
            File file = new File("D:\\Inazio.txt");
            boolean resultado = file.createNewFile();
            if (resultado)
                System.out.println("Archivo creado");
            else
                System.out.println("No se puede crear el archivo");
        }
        catch(IOException e){
            System.out.println("Se produjo el error " + e.getMessage());
        }

        // Borrado de fichero
        try{
            File file = new File("D:\\Inazio.txt");
            boolean resultado = file.delete();
            if (resultado)
                System.out.println("Archivo borrado");
            else
                System.out.println("No se pudo borar el archivo");
        }
        catch(Exception e){
            System.out.println("Se produjo el error " + e.getMessage());
        }
    }
}
```

## Filtros de Archivos

Un filtro implementa la interfaz `FilenameFilter` y redefine el método `accept()`, que devuelve un `boolean` indicando si el archivo cumple los criterios (por ejemplo, por extensión).

**EjemploFiltroArchivos.java:**

```java
import java.io.*;

public class EjemploFiltroArchivos implements FilenameFilter{
    String extension;

    EjemploFiltroArchivos(String Extension){
        this.extension = extension;
    }

    public boolean accept(File dir, String name){
        return name.endsWith(extension);
    }
}
```

**ClasePruebas.java:**

```java
import java.io.*;

public class ClasePruebas{
    public static void main(String[] args) {
        if (args.length !=0){
            File fichero = new File(args[0]);
            if (fichero.isDirectory()){
                String[] listaArchivos = fichero.list(new EjemploFiltroArchivos(".exe"));
                for(int i = 0; i < listaArchivos.length; i++)
                    System.out.println(listaArchivos[i]);
            }
        }
    }
}
```

## Clase RandomAccessFile

Permite acceso directo para lectura y escritura simultánea de datos primitivos en cualquier posición del archivo. Se instancia con modo `"r"` (solo lectura) o `"rw"` (lectura-escritura).

**Constructores:**
- `RandomAccessFile(File fichero, String modo)`
- `RandomAccessFile(String fichero, String modo)`

**Métodos principales:**

| Método | Descripción |
|--------|-------------|
| `seek(long posicion)` | Posiciona el puntero en la posición indicada |
| `getFilePointer()` | Devuelve la posición actual del puntero |
| `skipBytes(int desplazamiento)` | Desplaza el puntero hacia adelante |
| `length()` | Devuelve el tamaño del archivo en bytes |

Tamaños de los tipos primitivos en Java:

![Tamaños de tipos primitivos en Java](/img/posts/20151007_1.png)

### Ejemplo: convertir minúsculas a mayúsculas con acceso aleatorio

```java
import java.io.*;

public class EjemplAccesoAleatorio{
    public static void main(String[] args) {
        char c;
        boolean finArchivo = false;
        RandomAccessFile archivo = null;

        try{
            archivo = new RandomAccessFile("D:\\prueba.txt", "rw");
            System.out.println("El tamaño del archivo es: " + archivo.length());

            do{
                try{
                    c = (char)archivo.readByte();
                    if (c == 'b'){
                        archivo.seek(archivo.getFilePointer()-1);
                        archivo.writeByte(Character.toUpperCase(c));
                    }
                }
                catch(EOFException e){
                    finArchivo = true;
                    archivo.close();
                    System.out.println("Todas las b convertidas a mayúsculas");
                }
            }while(!finArchivo);
        }
        catch(FileNotFoundException e){
            System.out.println("El archivo no existe");
        }
        catch(IOException e){
            System.out.println("Se produjo un error con el archivo");
        }
    }
}
```
