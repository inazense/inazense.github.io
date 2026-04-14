---
title: Procesos y servicios. Procesos concurrentes
description: Requisitos de exclusión mutua, algoritmos de Dekker y Peterson para sincronización de procesos concurrentes, con ejercicio práctico en Java.
author: Inazio Claver
date: 2015-12-15 12:00:00 +0800
categories: [Java, Programación de servicios y procesos]
tags: [java, concurrencia, exclusion-mutua, dekker, peterson, hilos, sincronizacion]
pin: false
math: false
mermaid: false
---

## Requisitos para la exclusión mutua

Todo mecanismo de exclusión mutua debe cumplir seis requisitos fundamentales:

1. Solo un proceso puede estar en su sección crítica para un recurso compartido en un instante dado.
2. Un proceso interrumpido fuera de su sección crítica no debe afectar a otros procesos.
3. Hay que evitar el interbloqueo y la inanición indefinida.
4. Un proceso debe poder acceder sin demora cuando ningún otro está en su sección crítica.
5. No se deben hacer suposiciones sobre las velocidades relativas de los procesos.
6. Un proceso debe permanecer en su sección crítica solo un tiempo finito.

## Exclusión mutua: Soluciones por software

Las soluciones software son implementables en máquinas mono y multiprocesador con memoria compartida, asumiendo exclusión mutua elemental en el acceso a memoria.

### Algoritmo de Dekker

Dijkstra presentó este algoritmo desarrollado en etapas, ilustrando los errores comunes que se van cometiendo y corrigiendo:

**Primer intento:** Una variable `turno` de tipo 0..1 controla el acceso. Metáfora del iglú: solo una persona puede entrar a la vez y escribir en la pizarra. Problema: provoca alternancia forzada y bloqueo permanente si un proceso falla.

![Metáfora del iglú para la exclusión mutua](/img/posts/20151215_1.jpg)

**Segundo intento:** Array `señal: array[0..1] of booleano`, donde cada proceso tiene su propia "cabaña" y puede observar el estado del otro. Problema: no garantiza exclusión mutua (ambos pueden entrar simultáneamente).

![Segundo intento - array de señales](/img/posts/20151215_2.png)

![Metáfora del segundo intento con dos cabañas](/img/posts/20151215_3.png)

**Tercer intento:** Se intercambian las líneas de asignación. Problema: provoca interbloqueo.

![Cuarto intento - metáfora con árbitro](/img/posts/20151215_4.jpg)

**Cuarto intento:** Los procesos pueden ceder la preferencia. Problema: la "cortesía mutua" provoca un ciclo indefinido sin interbloqueo formal.

![Tercer intento con señales modificadas](/img/posts/20151215_5.png)

![Cuarto intento con cesión de preferencia](/img/posts/20151215_6.png)

**Solución correcta de Dekker:** Combina la variable `señal` con la variable `turno`. Cuando un proceso activa su señal, el otro no puede entrar. Si ambos desean acceder, la variable `turno` determina la prioridad.

![Solución correcta con árbitro y variable turno](/img/posts/20151215_7.jpg)

![Algoritmo de Dekker completo en pseudocódigo](/img/posts/20151215_8.png)

### Algoritmo de Peterson

Solución más simple y elegante que la de Dekker. Utiliza dos variables:
- `señal`: indica la posición del proceso
- `turno`: resuelve los conflictos cuando ambos procesos quieren acceder

La demostración garantiza:
- **Exclusión mutua**: después de activar su señal, el otro proceso no puede acceder.
- **Sin bloqueo mutuo**: el análisis exhaustivo de casos demuestra que siempre hay liberación.

![Algoritmo de Peterson en pseudocódigo](/img/posts/20151215_9.png)

## Ejercicio práctico

Implementar un sistema de gestión de cuenta bancaria con acceso concurrente desde varios hilos.

### Cuenta.java

Clase que gestiona el saldo aplicando el algoritmo de Peterson para el acceso a la sección crítica:

```java
public class Cuenta {
    private static final int MAXIMO = 10000;
    private static final int MINIMO = 0;
    private int saldo = 5000;
    private boolean[] bandera = {false, false};
    private int turno = 0;

    public void ingresar(int cantidad, int id) {
        bandera[id] = true;
        turno = 1 - id;
        while (bandera[1 - id] && turno == (1 - id)) {}  // espera activa
        // sección crítica
        if (saldo + cantidad <= MAXIMO) {
            saldo += cantidad;
            System.out.println("Ingreso: " + cantidad + " | Saldo: " + saldo);
        }
        bandera[id] = false;
    }

    public void retirar(int cantidad, int id) {
        bandera[id] = true;
        turno = 1 - id;
        while (bandera[1 - id] && turno == (1 - id)) {}  // espera activa
        // sección crítica
        if (saldo - cantidad >= MINIMO) {
            saldo -= cantidad;
            System.out.println("Retirada: " + cantidad + " | Saldo: " + saldo);
        } else {
            System.out.println("Error: saldo insuficiente");
            System.exit(0);
        }
        bandera[id] = false;
    }
}
```

### Persona.java

```java
public class Persona extends Thread {
    private static final int CANTIDADMAX = 1000;
    private static final int CANTIDADMIN = 100;
    private static final int TIEMPOMAX = 5;
    private static final int TIEMPOMIN = 1;
    private static final int PORCENTAJE_AHORRADOR = 60;

    private Cuenta cuenta;
    private int id;

    public Persona(Cuenta cuenta, int id, String nombre) {
        super(nombre);
        this.cuenta = cuenta;
        this.id = id;
    }

    public void run() {
        while (true) {
            int cantidad = (int)(Math.random() * (CANTIDADMAX - CANTIDADMIN) + CANTIDADMIN);
            int tiempo = (int)(Math.random() * (TIEMPOMAX - TIEMPOMIN) + TIEMPOMIN) * 1000;
            int porcentaje = (int)(Math.random() * 100);
            if (porcentaje < PORCENTAJE_AHORRADOR) {
                cuenta.ingresar(cantidad, id);
            } else {
                cuenta.retirar(cantidad, id);
            }
            try {
                sleep(300);
            } catch (InterruptedException e) {}
        }
    }
}
```

### Main.java

```java
public class Main {
    public static void main(String[] args) {
        Cuenta cuenta = new Cuenta();
        Persona p1 = new Persona(cuenta, 0, "Inazio");
        Persona p2 = new Persona(cuenta, 1, "Claver");
        p1.start();
        p2.start();
    }
}
```
