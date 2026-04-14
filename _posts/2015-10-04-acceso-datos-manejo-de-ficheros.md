---
title: "Acceso a datos. Manejo de ficheros"
description: Manejo de ficheros en Java con el paquete java.io, incluyendo streams de bytes y caracteres, FileInputStream, FileOutputStream, FileReader, FileWriter, BufferedReader, DataInputStream y DataOutputStream.
date: 2015-10-04 12:00:00 +0800
categories: [Java]
tags: [java, ficheros, streams, io, acceso-a-datos, fileInputStream, bufferedreader]
pin: false
math: false
mermaid: false
---

## Entrada / salida estándar

La clase `java.lang.System` proporciona tres flujos estándar:

| Campo | Clase | Descripción |
|-------|-------|-------------|
| `System.in` | `InputStream` | Entrada estándar (teclado) |
| `System.out` | `PrintStream` | Salida estándar |
| `System.err` | `PrintStream` | Salida de errores |

**Métodos de `System.out`:** ```print()```, ```println()```, ```flush()```

**Métodos de `System.in`:** ```read()```, ```skip(n)```, ```available()```

### Ejemplo: contar caracteres con System.in

```java
import java.io.*;

class CuentaCaracteres {
    public static void main(String args[]) throws IOException {
        int contador = 0;
        while (System.in.read() != '\n')
            contador++;
        System.out.println();
        System.out.println("Tecleados: " + contador + " caracteres");
    }
}
```

### Ejemplo: contar caracteres con Scanner

```java
import java.io.*;
import java.util.Scanner;

class CuentaCaracteres2 {
    public static void main(String args[]) throws IOException {
        Scanner sc = new Scanner(System.in);
        System.out.println("Introduzca una cadena");
        String teclado = sc.nextLine();
        System.out.println("Tecleados " + teclado.length() + " caracteres");
    }
}
```

## Streams

Un stream representa un flujo de información: una secuencia ordenada de datos procedente de una fuente (teclado, fichero, memoria, red, etc.). Todas las clases de stream se encuentran en el paquete `java.io`.

**Clasificación de streams:**

| Criterio | Tipos |
|----------|-------|
| Por representación | Bytes / Caracteres |
| Por propósito | Entrada (`InputStream`, `Reader`) / Salida (`OutputStream`, `Writer`) / E-S (`RandomAccessFile`) |
| Por acceso | Secuencial / Directo (`RandomAccessFile`) |
| Por operación | Transferencia de datos / Transformación (buffering, conversiones, filtrado) |

## Streams de bytes sobre ficheros

### FileInputStream — lectura de bytes

```java
import java.io.*;

public class EjemploLecturaByte {
    public static void main(String[] args) {
        FileInputStream fis = null;
        int aux = 0;
        try {
            fis = new FileInputStream("C:\\eclipse\\readme\\readme_eclipse.html");
            while ((aux = fis.read()) != -1)
                System.out.println(aux + " - " + (char) aux);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### FileOutputStream — escritura de bytes

```java
import java.io.*;

public class EjemploEscrituraByte {
    public static void main(String[] args) {
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream("D:\\Prueba.txt");
            fos.write(67); fos.write(76); fos.write(67); fos.write(32);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### ByteArrayInputStream — stream sobre array de bytes

```java
import java.io.*;

public class EjemploFlujoArray {
    public static void main(String[] args) throws IOException {
        byte[] byteArr1 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11};
        ByteArrayInputStream flujoArrByte1 = new ByteArrayInputStream(byteArr1);
        while (flujoArrByte1.available() != 0) {
            byte leido = (byte) flujoArrByte1.read();
            System.out.println(leido);
        }
        flujoArrByte1.close();
    }
}
```

### Copia de ficheros

```java
import java.io.*;

public class Copia {
    public static void main(String[] args) {
        FileInputStream origen = null;
        FileOutputStream destino = null;
        try {
            origen = new FileInputStream(args[0]);
            destino = new FileOutputStream(args[1], true);
            int i = origen.read();
            while (i != -1) {
                destino.write(i);
                i = origen.read();
            }
            origen.close();
            destino.close();
        } catch (IOException e) {
            System.out.println("Error de ficheros");
        }
    }
}
```

## Streams de caracteres sobre ficheros

`InputStreamReader` convierte un `InputStream` en un `Reader` (soporte Unicode). `OutputStreamWriter` convierte un `OutputStream` en un `Writer`.

### FileReader — lectura de caracteres

```java
import java.io.*;

public class EjemploLecturaChar {
    public static void main(String[] args) {
        FileReader fr = null;
        int aux = 0;
        try {
            fr = new FileReader("C:\\eclipse\\readme\\readme_eclipse.html");
            while ((aux = fr.read()) != -1)
                System.out.println((char) aux);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### FileWriter — escritura de caracteres

```java
import java.io.*;

public class EjemploEscrituraChar {
    public static void main(String[] args) {
        FileWriter fw = null;
        try {
            fw = new FileWriter("D:\\Prueba.txt");
            fw.write('A'); fw.write('A'); fw.write(' ');
            fw.write('d'); fw.write('S'); fw.write('1');
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## BufferedReader — lectura por líneas

```java
import java.io.*;

public class EjemploFiltro {
    public static void main(String[] args) {
        String nombreArchivo = "D:\\prueba.txt";
        FileReader fr;
        BufferedReader filtro;
        String linea;
        try {
            fr = new FileReader(nombreArchivo);
            filtro = new BufferedReader(fr);
            linea = filtro.readLine();
            while (linea != null) {
                System.out.println(linea);
                linea = filtro.readLine();
            }
            filtro.close();
            fr.close();
        } catch (IOException e) {
            System.out.println("No se puede abrir el archivo");
        }
    }
}
```

## Filtros de streams — encriptado

`FilterOutputStream` permite crear filtros que transforman los datos en el momento de escribirlos:

```java
import java.io.*;

public class EncriptadoStream extends FilterOutputStream {
    public EncriptadoStream(OutputStream out) {
        super(out);
    }

    public void write(int b) throws IOException {
        if (b == 255)
            b = 0;
        else
            b++;
        out.write(b);
    }

    public static void main(String[] args) throws IOException {
        FileInputStream entrada = new FileInputStream("D:\\entrada.txt");
        EncriptadoStream salida = new EncriptadoStream(
            new FileOutputStream("D:\\salida.txt"));
        while (entrada.available() > 0)
            salida.write(entrada.read());
        entrada.close();
        salida.close();
    }
}
```

## Lectura de teclado con InputStreamReader y BufferedReader

```java
import java.io.*;

public class EntradaTeclado {
    public static void main(String[] args) throws IOException {
        InputStreamReader isr;
        BufferedReader teclado;
        String linea;
        byte b;
        int i;
        double d;
        boolean leido;

        isr = new InputStreamReader(System.in);
        teclado = new BufferedReader(isr);

        System.out.print("Introduzca un byte: ");
        linea = teclado.readLine();
        b = Byte.parseByte(linea);
        System.out.println("Byte introducido: " + b);

        System.out.print("Introduzca un entero: ");
        linea = teclado.readLine();
        i = Integer.parseInt(linea);
        System.out.println("Entero introducido: " + i);

        System.out.print("Introduzca un real: ");
        linea = teclado.readLine();
        d = Double.parseDouble(linea);
        System.out.println("Real introducido: " + d);

        do {
            try {
                System.out.print("Introduzca un entero: ");
                linea = teclado.readLine();
                i = Integer.parseInt(linea);
                leido = true;
            } catch (NumberFormatException e) {
                System.out.println("Entero no correcto");
                leido = false;
            }
        } while (!leido);
        System.out.println("Entero introducido: " + i);
    }
}
```

## PrintWriter — escritura con formato

```java
import java.io.*;

public class EscribirFichero {
    public static void main(String[] args) {
        try {
            FileOutputStream fos = new FileOutputStream("salida.txt");
            PrintWriter pw = new PrintWriter(fos);
            pw.println("Escribimos una cadena y un entero: " + 5);
            pw.flush();
            pw.close();
            fos.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Lectura de fichero a buffer

```java
import java.io.*;

public class LectorFichero {
    public static void main(String[] args) {
        byte[] buffer = new byte[80];
        try {
            FileInputStream fichero = new FileInputStream("Leeme.txt");
            int i = fichero.read(buffer);
            String s = new String(buffer);
            System.out.println(s);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## DataInputStream y DataOutputStream

Permiten transmitir tipos primitivos a través de un stream de forma portable.

**Escritura:**

```java
FileOutputStream fos = new FileOutputStream("salida.dat");
DataOutputStream dos = new DataOutputStream(fos);
dos.writeInt(5);
```

**Lectura:**

```java
FileInputStream fis = new FileInputStream("salida.dat");
DataInputStream dis = new DataInputStream(fis);
int entero = dis.readInt();
```
