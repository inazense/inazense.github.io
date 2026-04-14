---
title: "Acceso a datos. Persistencia"
description: Conceptos de persistencia y serialización de objetos en Java, incluyendo la interfaz Serializable, el modificador transient, herencia serializable y la interfaz Externalizable.
author: Inazio Claver
date: 2015-10-12 12:00:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, persistencia, serializacion, serializable, externalizable]
pin: false
math: false
mermaid: false
---

## Persistencia

La **persistencia** es la capacidad que permite a los objetos mantener su estado entre diferentes ejecuciones del programa, almacenándolos en memoria secundaria antes de que termine la ejecución.

## Serialización

La **serialización** es el proceso de convertir el estado de un objeto en una secuencia lineal de bytes para su almacenamiento en archivos o su transmisión entre máquinas virtuales.

![Esquema de serialización de objetos](/img/posts/20151012_1.png)

Para que un objeto sea serializable, su clase debe implementar la interfaz `Serializable` (que es una interfaz vacía, sin métodos) o la interfaz `Externalizable`.

Puntos clave:
- Todos los tipos primitivos en Java son serializables por defecto.
- Las variables marcadas con `transient` no se serializan, lo que permite proteger datos sensibles.
- En jerarquías de herencia, solo es necesario que la clase base implemente `Serializable`.
- `ObjectOutputStream.writeObject()` serializa objetos.
- `ObjectInputStream.readObject()` deserializa objetos.

Los flujos de objetos en Java:

![Flujos de entrada y salida de objetos](/img/posts/20151012_2.png)

### Ejemplo básico de serialización

```java
import java.util.*;
import java.io.*;

public class Serial {
     public static void main(String[] args) {
          try{
                FileOutputStream archivo = new FileOutputStream("D:\\prueba.dat");
                ObjectOutputStream salida = new ObjectOutputStream(archivo);
                salida.writeObject("Hoy es: ");
                salida.writeObject(new Date());
                salida.close();
          }
          catch(IOException e){
                System.out.println("Problemas con el archivo");
          }
          try{
                FileInputStream archivo = new FileInputStream("D:\\prueba.dat");
                ObjectInputStream entrada = new ObjectInputStream(archivo);
                String hoy = (String)entrada.readObject();
                Date fecha = (Date)entrada.readObject();
                entrada.close();
                System.out.println(hoy + fecha);
          }
          catch(FileNotFoundException e){
                System.out.println("No se pudo abrir el archivo");
          }
          catch(IOException e){
                System.out.println("Problemas con el archivo");
          }
          catch(Exception e){
                System.out.println("Error al leer un objeto");
          }
     }
}
```

Salida: `Hoy es: Sun Oct 11 18:09:10 CEST 2015`

## El modificador transient

Las variables marcadas con `transient` se excluyen de la serialización. Esto es útil para proteger datos sensibles como contraseñas.

**Cliente.java:**

```java
public class Cliente implements java.io.Serializable{
     private String nombre;
     private transient String passWord;

     public Cliente(String nombre, String pw){
          this.nombre = nombre;
          passWord = pw;
     }

     public String toString(){
          String texto = (passWord==null) ? "(No disponible)" : passWord;
          texto += nombre;
          return texto;
     }
}
```

**Serializacion.java:**

```java
import java.io.*;

public class Serializacion {
     public static void main(String[] args) {
          Cliente cliente = new Cliente("Inazio", "DAM");

          try{
                ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream("D:\\cliente.obj"));
                salida.writeObject("Datos del cliente\n");
                salida.writeObject(cliente);
                salida.close();
                ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("D:\\cliente.obj"));
                String str = (String)entrada.readObject();
                Cliente obj1 = (Cliente)entrada.readObject();
                System.out.println("------------");
                System.out.println(str + " " + obj1);
                System.out.println("------------");
                entrada.close();
          }
          catch(IOException e){
                e.printStackTrace();
          }
          catch(ClassNotFoundException e){
                e.printStackTrace();
          }
          try{
                System.in.read();
          }
          catch(Exception e){}
     }
}
```

Salida:
```
------------
Datos del cliente
 (No disponible)Inazio
------------
```

Como se puede observar, el campo `passWord` no se ha serializado y al deserializar aparece como `null`.

## Herencia y serialización

En una jerarquía de clases, si la clase base implementa `Serializable`, todas las clases derivadas también son serializables automáticamente.

**Figura.java:**

```java
public abstract class Figura implements java.io.Serializable{
     protected int x;
     protected int y;

     public Figura(int x, int y){
          this.x = x;
          this.y = y;
     }

     public abstract double area();
}
```

**Circulo.java:**

```java
public class Circulo extends Figura{
     protected double radio;
     private static final double PI = 3.1416;

     public Circulo(int x, int y, double radio){
          super(x, y);
          this.radio = radio;
     }

     public double area(){
          return PI*radio*radio;
     }
}
```

**Rectangulo.java:**

```java
public class Rectangulo extends Figura{
     protected double ancho, alto;

     public Rectangulo(int x, int y, double ancho, double alto){
          super(x, y);
          this.ancho = ancho;
          this.alto = alto;
     }

     public double area(){
          return ancho*alto;
     }
}
```

**HerenciaSerializable.java:**

```java
import java.io.*;

public class HerenciaSerializable {
     public static void main(String[] args) {
          Figura fig1 = new Rectangulo(10, 15, 30, 60);
          Figura fig2 = new Circulo(12, 19, 60);

          try{
                ObjectOutputStream salida = new ObjectOutputStream(new FileOutputStream("D:\\figura.obj"));
                salida.writeObject("Guardar un objeto de una clase derivada\n");
                salida.writeObject(fig1);
                salida.writeObject(fig2);
                salida.close();
                ObjectInputStream entrada = new ObjectInputStream(new FileInputStream("D:\\figura.obj"));
                String str = (String)entrada.readObject();
                Figura obj1 = (Figura)entrada.readObject();
                Figura obj2 = (Figura)entrada.readObject();
                System.out.println("-.-.-.-.-.-.-.-.-.-.-");
                System.out.println(obj1.getClass().getName() + " origen (" + obj1.x + ", " + obj1.y + ")" + " area= " + obj1.area());
                System.out.println(obj2.getClass().getName() + " origen (" + obj2.x + ", " + obj2.y + ")" + " area=" + obj2.area());
                System.out.println("-.-.-.-.-.-.-.-.-.-.-");
                entrada.close();
          }
          catch(IOException e){
                e.printStackTrace();
          }
          catch(ClassNotFoundException e){
                e.printStackTrace();
          }
          try{
                System.in.read();
          }
          catch(Exception e){}
     }
}
```

Salida:
```
-.-.-.-.-.-.-.-.-.-.-
Rectangulo origen (10, 15) area= 1800.0
Circulo origen (12, 19) area=11309.76
-.-.-.-.-.-.-.-.-.-.-
```

## Interfaz Externalizable

La interfaz `Externalizable` proporciona control explícito sobre la serialización mediante los métodos `writeExternal()` y `readExternal()`. Requiere que la clase tenga un constructor por defecto accesible.

**Usuario.java:**

```java
import java.io.*;
import java.util.*;

public class Usuario implements Externalizable{
     private String usuario;
     private String password;

     public Usuario(){
          System.out.println("Creando usuario vacío");
     }

     Usuario(String u, String p){
          System.out.println("Creanado usuario (" + u + ", " + p + ")");
          usuario = u;
          password = p;
     }

     public void writeExternal(ObjectOutput out) throws IOException{
          System.out.println("Usuario.WriteExternal");
          out.writeObject(usuario);
     }

     public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException{
          System.out.println("Usuario.readExternal");
          usuario = (String)in.readObject();
     }

     public void muestraUsuario(){
          String cad = "Usuario: " + usuario + " Password: ";
          if (password == null)
                cad = cad + "No disponible";
          else
                cad = cad + password;
          System.out.println(cad);
     }
}
```

**ListaUsuarios.java:**

```java
import java.io.*;
import java.util.LinkedList;
import java.util.ListIterator;

public class ListaUsuarios implements Serializable{
     private LinkedList lista = new LinkedList();
     int valor;

     ListaUsuarios(String[] usuarios, String[] passwords){
          for (int i = 0; i < usuarios.length; i++)
                lista.add(new Usuario(usuarios[i], passwords[i]));
     }

     public void muestraUsuarios(){
          ListIterator li = lista.listIterator(0);
          Usuario u;
          while(li.hasNext()){
                u = (Usuario) li.next();
                u.muestraUsuario();
          }
     }
}
```

**DemoExternalizable.java:**

```java
import java.io.*;

public class DemoExternalizable {
     public static void main(String[] args) throws IOException, ClassNotFoundException{
          System.out.println("Creando el objeto");
          String[] usuarios = {"Inazio", "Chuse", "Claver"};
          String[] passwords = {"1111", "2222", "3333"};
          ListaUsuarios lp = new ListaUsuarios(usuarios, passwords);
          System.out.println("Almacenando objeto");
          ObjectOutputStream o = new ObjectOutputStream(new FileOutputStream("D:\\objetos.out"));
          o.writeObject(lp);
          o.close();
          System.out.println("Recuperando objeto");
          ObjectInputStream in = new ObjectInputStream(new FileInputStream("D:\\objectos.out"));
          lp = (ListaUsuarios)in.readObject();
          lp.muestraUsuarios();
     }
}
```

Salida:
```
Creando el objeto
Creanado usuario (Inazio, 1111)
Creanado usuario (Chuse, 2222)
Creanado usuario (Claver, 3333)
Almacenando objeto
Usuario.WriteExternal
Usuario.WriteExternal
Usuario.WriteExternal
Recuperando objeto
Creando usuario vacío
Usuario.readExternal
Creando usuario vacío
Usuario.readExternal
Creando usuario vacío
Usuario.readExternal
Usuario: Inazio Password: No disponible
Usuario: Chuse Password: No disponible
Usuario: Claver Password: No disponible
```

Nótese que al usar `Externalizable`, solo se serializa el campo `usuario` (lo que se escribe explícitamente en `writeExternal()`), y el campo `password` no se recupera.
