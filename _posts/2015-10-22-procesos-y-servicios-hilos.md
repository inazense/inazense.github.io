---
title: "Procesos y servicios. Hilos"
description: Concepto de hilo en Java, diferencias con los procesos, implementación extendiendo Thread o implementando Runnable, y métodos principales como start(), run() y sleep().
author: Inazio Claver
date: 2015-10-22 17:18:00 +0800
categories: [Java]
tags: [java, hilos, threads, runnable, concurrencia, procesos-y-servicios]
pin: false
math: false
mermaid: false
---

Un **hilo** (_thread_) es una secuencia de código en ejecución dentro del contexto de un proceso.

## Diferencias con los procesos

A diferencia de los procesos hijo, que duplican el espacio de direcciones del padre y compiten en igualdad de condiciones por la CPU, los hilos operan dentro del espacio de direcciones del proceso padre y compiten en desventaja frente a él.

| | Procesos | Hilos |
|--|----------|-------|
| Espacio de memoria | Propio (duplicado del padre) | Compartido con el padre |
| Competencia por CPU | En igualdad con el padre | En desventaja frente al padre |
| Compartir variables | Complejo (IPC) | Sencillo (memoria compartida) |

**Ventaja**: fácil compartición de variables entre hilos.  
**Desventaja**: reciben menos tiempo de CPU que los procesos padre-hijo.

![Esquema de hilos en Java](/img/posts/20151022_1.png)

## Implementación en Java

Hay dos formas de crear hilos en Java:

1. **Extendiendo la clase `Thread`**
2. **Implementando la interfaz `Runnable`**

### Métodos principales

| Método | Descripción |
|--------|-------------|
| `start()` | Crea el hilo y llama a `run()` |
| `run()` | Contiene la lógica de ejecución del hilo |
| `sleep(long milisegundos)` | Pausa el hilo el tiempo indicado |
| `yield()` | Cede el turno para que otros hilos puedan ejecutarse |

## Ejemplo: extendiendo Thread

**HiloEjemplo.java:**

```java
public class HiloEjemplo extends Thread {
    private int c;
    private int hilo;

    public HiloEjemplo(int hilo){
        this.hilo = hilo;
        System.out.println("CREANDO HILO: " + hilo);
    }

    public void run(){
        c = 0;
        while (c <= 5){
            System.out.println("Hilo: " + hilo + " C = " + c);
            c++;
        }
    }
}
```

**Main.java:**

```java
public class Main {
    public static void main(String[] args){
        HiloEjemplo h = null;
        for (int i = 0; i < 3; i++){
            h = new HiloEjemplo(i+1);
            h.start();
        }
        System.out.println("3 HILOS CREADOS...");
    }
}
```

Al ejecutar este programa se crean 3 hilos que cuentan de 0 a 5. El orden de salida no está garantizado porque el planificador del sistema operativo decide cuándo ejecuta cada hilo.

## Ejercicio: TIC-TAC con sleep()

Crear dos clases hilo que impriman "TIC" y "TAC" alternativamente usando `sleep()` dentro de bloques `try-catch` para manejar la `InterruptedException`:

```java
public class HiloTic extends Thread {
    public void run(){
        for (int i = 0; i < 5; i++){
            System.out.println("TIC");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class HiloTac extends Thread {
    public void run(){
        for (int i = 0; i < 5; i++){
            System.out.println("TAC");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```
