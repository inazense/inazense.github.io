---
title: Procesos y servicios. Prioridad de los hilos
description: Explicación de la prioridad de hilos en Java con setPriority() y getPriority(), y cuatro ejercicios del problema productor-consumidor.
author: Inazio Claver
date: 2015-12-14 12:00:00 +0800
categories: [Java, Programación de servicios y procesos]
tags: [java, hilos, threads, concurrencia, productor-consumidor, prioridad]
pin: false
math: false
mermaid: false
---

En el lenguaje de programación Java, cada hilo tiene una prioridad. Por defecto un hilo hereda la prioridad del hilo padre que lo crea.

Los métodos principales son `setPriority()` para modificar la prioridad y `getPriority()` para obtenerla. Los valores de prioridad oscilan entre 1 y 10:

- `Thread.MIN_PRIORITY` = 1
- `Thread.MAX_PRIORITY` = 10
- `Thread.NORM_PRIORITY` = 5

Cuando múltiples hilos comparten la misma prioridad, la máquina virtual va cediendo la prioridad de forma cíclica (round-robin).

El comportamiento varía según la plataforma: Windows utiliza contadores dependientes de la prioridad, mientras que Linux (Ubuntu) no. Un **hilo egoísta** es aquel que no cede voluntariamente el control, algo que Windows mitiga mediante su estrategia de planificación por división de prioridad.

La conclusión práctica es que **casi nunca hay que establecer a mano las prioridades** debido a la falta de garantías entre plataformas.

## Ejercicios del problema productor-consumidor

### Ejercicio 1: PING PONG

**Cola.java**

```java
public class Cola {
    private int numero;
    private boolean disponible = false;
    
    public synchronized int get() {
        while (disponible == false) { 
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        System.out.println("PONG");
        disponible = false;
        notifyAll();
        return numero;
    }
    
    public synchronized void put() {
        while (disponible == true) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        System.out.println("PING");
        disponible = true;
        notifyAll();
    }
}
```

**Productor.java**

```java
public class Productor extends Thread {
    private Cola cola;
    private int n;
    
    public Productor(Cola c, int n) {
        cola = c;
        this.n = n;
    }
    
    public void run() {
        while (true) {
            cola.put();
            try {
                sleep(100);
            } catch (InterruptedException e) {}
        }
    }
}
```

**Consumidor.java**

```java
public class Consumidor extends Thread {
    private Cola cola;
    private int n;
    
    public Consumidor(Cola c, int n) {
        cola = c;
        this.n = n;
    }
    
    public void run() {
        int valor = 0;
        while (true) {
            valor = cola.get();
        }
    }
}
```

**Produc_Consum.java**

```java
public class Produc_Consum {
    public static void main(String[] args) {
        Cola cola = new Cola();
        Productor p = new Productor(cola, 1);
        Consumidor c = new Consumidor(cola, 1);
        p.start();
        c.start();
    }
}
```

### Ejercicio 2: TIC TAC

**Cola.java**

```java
public class Cola {
    private int numero;
    private boolean turnoConsumidor = false;
    private Stack<String> contenido = new Stack<String>();
    private String resultado;
    
    public synchronized String get() {       
        while (turnoConsumidor == false) { 
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        resultado = contenido.pop();
        turnoConsumidor = false;
        notifyAll();
        return resultado;
    }
    
    public synchronized void put(String cadena) {
        while (turnoConsumidor == true) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        contenido.push(cadena);
        turnoConsumidor = true;
        notifyAll();
    }
}
```

**Productor.java**

```java
public class Productor extends Thread {
    private Cola cola;
    private int n;
    private String cadena;
    
    public Productor(Cola c, int n, String cadena) {
        cola = c;
        this.n = n;
        this.cadena = cadena;
    }
    
    public void run() {
        while (true) {
            cola.put(cadena);
            try {
                sleep(100);
            } catch (InterruptedException e) {}
        }
    }
}
```

**Consumidor.java**

```java
public class Consumidor extends Thread {
    private Cola cola;
    private int n;
    private String r;
    
    public Consumidor(Cola c, int n) {
        cola = c;
        this.n = n;
    }
    
    public void run() {
        while (true) {
            r = cola.get();
            System.out.println(r);
        }
    }
}
```

**Produc_Consum.java**

```java
public class Produc_Consum {
    public static void main(String[] args) {
        Cola cola = new Cola();
        Productor p1 = new Productor(cola, 1, "TIC");
        Productor p2 = new Productor(cola, 1, "TAC");
        Consumidor c = new Consumidor(cola, 1);
        p1.start();
        c.start();
        p2.start();
    }
}
```

### Ejercicio 3: Días de la semana

**Monitor.java**

```java
public class Monitor {
    private int numero;
    private boolean turnoConsumidor = false;
    private int turnoProductor = 1;
    private Stack<String> contenido = new Stack<String>();
    private String resultado;
    private int contador = 0;
    
    public Monitor(int numero) {
        this.numero = numero;
    }
    
    public synchronized String get() {       
        while (turnoConsumidor == false) { 
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        resultado = contenido.pop();
        turnoConsumidor = false;
        notifyAll();
        return resultado;
    }
    
    public synchronized void put(String cadena, int turno) {
        while (turnoConsumidor == true || turno != turnoProductor) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        if (turno == turnoProductor) {
            contenido.push(cadena);
            turnoConsumidor = true;
            if (turnoProductor == 7)
                turnoProductor = 1;
            else
                turnoProductor++;
        }
        notifyAll();
    }
}
```

**Productor.java**

```java
public class Productor extends Thread {
    private Monitor monitor;
    private int n;
    private String cadena;
    
    public Productor(Monitor monitor, int n, String cadena) {
        this.monitor = monitor;
        this.n = n;
        this.cadena = cadena;
    }
    
    public void run() {
        while (true) {
            monitor.put(cadena, n);
            try {
                sleep(100);
            } catch (InterruptedException e) {}
        }
    }
}
```

**Consumidor.java**

```java
public class Consumidor extends Thread {
    private Monitor monitor;
    private int n;
    private String r;
    
    public Consumidor(Monitor monitor, int n) {
        this.monitor = monitor;
        this.n = n;
    }
    
    public void run() {
        while (true) {
            r = monitor.get();
            System.out.println(r);
        }
    }
}
```

**Produc_Consum.java**

```java
public class Produc_Consum {
    public static void main(String[] args) {
        Monitor monitor = new Monitor(7);
        Consumidor c = new Consumidor(monitor, 1);
        Productor p1 = new Productor(monitor, 1, "Lunes");
        Productor p2 = new Productor(monitor, 2, "Martes");
        Productor p3 = new Productor(monitor, 3, "Miercoles");
        Productor p4 = new Productor(monitor, 4, "Jueves");
        Productor p5 = new Productor(monitor, 5, "Viernes");
        Productor p6 = new Productor(monitor, 6, "Sabado");
        Productor p7 = new Productor(monitor, 7, "Domingo");
        c.start();
        p1.start();
        p2.start();
        p3.start();
        p4.start();
        p5.start();
        p6.start();
        p7.start();
    }
}
```

### Ejercicio 4: Meses del año

**Monitor.java**

```java
public class Monitor {
    private int numeroProductores = 0;
    private boolean turnoConsumidor = false;
    private int turnoProductor = 1;
    private Stack<String> contenido = new Stack<String>();
    private String resultado;
    private int contador = 0;
    
    public Monitor(int numeroProductores) {
        this.numeroProductores = numeroProductores;
    }
    
    public void setNumProductores(int n) {
        this.numeroProductores = n;
    }
    
    public synchronized String get() {       
        while (turnoConsumidor == false) { 
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        resultado = contenido.pop();
        turnoConsumidor = false;
        notifyAll();
        return resultado;
    }
    
    public synchronized void put(String cadena, int turno) {
        while (turnoConsumidor == true || turno != turnoProductor) {
            try {
                wait();
            } catch (InterruptedException e) {}
        }
        if (turno == turnoProductor) {
            contenido.push(cadena);
            turnoConsumidor = true;
            if (turnoProductor == numeroProductores)
                turnoProductor = 1;
            else
                turnoProductor++;
        }
        notifyAll();
    }
}
```

**Productor.java** y **Consumidor.java** son idénticos al ejercicio anterior.

**Produc_Consum.java**

```java
import java.util.Vector;

public class Produc_Consum {
    public static void main(String[] args) {
        Monitor monitor = new Monitor(7);
        Vector<Productor> productores = new Vector<Productor>();
        Consumidor c = new Consumidor(monitor, 1);
        productores.addElement(new Productor(monitor, 1, "Enero"));
        productores.addElement(new Productor(monitor, 2, "Febrero"));
        productores.addElement(new Productor(monitor, 3, "Marzo"));
        productores.addElement(new Productor(monitor, 4, "Abril"));
        productores.addElement(new Productor(monitor, 5, "Mayo"));
        productores.addElement(new Productor(monitor, 6, "Junio"));
        productores.addElement(new Productor(monitor, 7, "Julio"));
        productores.addElement(new Productor(monitor, 8, "Agosto"));
        productores.addElement(new Productor(monitor, 9, "Septiembre"));
        productores.addElement(new Productor(monitor, 10, "Octubre"));
        productores.addElement(new Productor(monitor, 11, "Noviembre"));
        productores.addElement(new Productor(monitor, 12, "Diciembre"));
        monitor.setNumProductores(productores.size());
        c.start();
        for (int i = 0; i < productores.size(); i++) {
            productores.elementAt(i).start();
        }
    }
}
```
