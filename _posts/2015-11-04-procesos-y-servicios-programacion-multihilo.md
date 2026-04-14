---
title: "Procesos y servicios. Programación multihilo"
description: Ciclo de vida de los hilos en Java, estados New, Runnable, Dead y Blocked, y ejemplos prácticos con Thread, join, interrupt y patrones de suspensión segura.
date: 2015-11-04 12:00:00 +0800
categories: [Java]
tags: [java, hilos, threads, programacion-de-servicios-y-procesos, concurrencia, runnable]
pin: false
math: false
mermaid: false
---

## Estados de un hilo

El ciclo de vida de un hilo en Java pasa por los siguientes estados:

| Estado | Descripción |
|--------|-------------|
| **New** | Estado inicial tras crear el objeto con `new`, antes de llamar a `start()` |
| **Runnable** | Alcanzado al llamar a `start()`. El sistema operativo puede asignarle tiempo de CPU |
| **Dead** | El hilo ha finalizado por conclusión normal de `run()`, excepción no capturada o llamada a `stop()` (obsoleto) |
| **Blocked** | El hilo no se ejecuta porque está dormido (`sleep()`), esperando E/S, en `wait()`, intentando bloquear un recurso ocupado o suspendido |

## Creación y gestión de hilos

Los hilos se crean extendiendo `Thread` o implementando `Runnable`. Se arrancan con `start()`, que ejecuta el método `run()` en un hilo separado.

**Métodos importantes:**

| Método | Descripción |
|--------|-------------|
| `start()` | Inicia el hilo |
| `join()` | Espera a que otro hilo finalice |
| `interrupt()` | Solicita la interrupción del hilo |
| `isInterrupted()` | Verifica si el hilo ha sido interrumpido |
| `isAlive()` | Comprueba si el hilo sigue activo |
| `sleep(ms)` | Pausa el hilo el número de milisegundos indicado |

## Ejemplo: parar un hilo de forma segura

```java
public class HiloEjemploDead extends Thread {
    private boolean stopHilo = false;

    public void pararHilo() {
        stopHilo = true;
    }

    public void run() {
        while (!stopHilo) {
            System.out.println("En el hilo");
        }
    }

    public static void main(String[] args) {
        HiloEjemploDead h = new HiloEjemploDead();
        h.start();
        for (int i = 0; i < 100000; i++);
        h.pararHilo();
    }
}
```

## Ejemplo: patrón de suspensión segura

```java
class MyThread extends Thread {
    private SuspendRequestor suspender = new SuspendRequestor();

    public void requestSuspend() { suspender.set(true); }
    public void requestResume() { suspender.set(false); }

    public void run() {
        try {
            while (true) {
                suspender.waitForResume();
            }
        } catch (InterruptedException exception) {
            exception.printStackTrace();
        }
    }
}

class SuspendRequestor {
    private boolean suspendRequested;

    public synchronized void set(boolean b) {
        suspendRequested = b;
        notifyAll();
    }

    public synchronized void waitForResume() throws InterruptedException {
        while (suspendRequested)
            wait();
    }
}
```

## Ejemplo: interrupción de un hilo

```java
public class HiloEjemploInterrupt extends Thread {
    public void run() {
        try {
            while (!isInterrupted()) {
                System.out.println("En el hilo");
                Thread.sleep(10);
            }
        } catch (InterruptedException e) {
            System.out.println("Ha ocurrido una excepción");
        }
        System.out.println("Fin de hilo");
    }

    public void interrumpir() {
        interrupt();
    }

    public static void main(String[] args) {
        HiloEjemploInterrupt h = new HiloEjemploInterrupt();
        h.start();
        try {
            Thread.sleep(20);
        } catch (InterruptedException e) {
            h.interrumpir();
        }
    }
}
```

## Ejemplo: join — esperar a que terminen otros hilos

```java
public class HiloJoin extends Thread {
    private int n;

    public HiloJoin(String nom, int n) {
        super(nom);
        this.n = n;
    }

    public void run() {
        for (int i = 1; i <= n; i++) {
            System.out.println(getName() + ":" + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ignore) {}
        }
        System.out.println("Fin bucle " + getName());
    }
}

public class EjemploJoin {
    public static void main(String[] args) {
        HiloJoin h1 = new HiloJoin("Hilo 1", 2);
        HiloJoin h2 = new HiloJoin("Hilo 2", 5);
        HiloJoin h3 = new HiloJoin("Hilo 3", 7);
        h1.start();
        h2.start();
        h3.start();
        try {
            h1.join();
            h2.join();
            h3.join();
        } catch (InterruptedException e) {}
        System.out.println("Final del programa");
    }
}
```

El método `join()` hace que el hilo principal espere a que `h1`, `h2` y `h3` terminen antes de imprimir el mensaje final.
