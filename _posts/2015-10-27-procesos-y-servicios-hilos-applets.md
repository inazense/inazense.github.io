---
title: "Procesos y servicios. Hilos. Applets"
description: Creación de Applets Java con hilos usando Runnable e inner classes Thread, con ejemplos de reloj analógico, contador con botones y contador dual con hilos independientes.
author: Inazio Claver
date: 2015-10-27 19:22:00 +0800
categories: [Java]
tags: [java, procesos-y-servicios, hilos, threads, applet, runnable, awt]
pin: false
math: false
mermaid: false
---

Un Applet es una aplicación Java embebida en una página HTML, aunque los navegadores por defecto no permiten su ejecución por motivos de seguridad.

![Applet de reloj en ejecución](/img/posts/20151027_1.png)

Como los Applets extienden la clase `Applet`, la creación de hilos requiere implementar `Runnable` cuando se gestiona todo en una misma clase.

## Ejemplo 1: Reloj

Applet que muestra la hora actual y la actualiza cada segundo.

```java
import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Reloj extends Applet implements Runnable {

     private Thread hilo = null;
     private Font fuente;
     private String horaActual = "";

     public void init() {
          fuente = new Font("Verdana", Font.BOLD, 26);
     }

     public void start() {
          if (hilo == null) {
               hilo = new Thread(this);
               hilo.start();
          }
     }

     @Override
     public void run() {
          Thread hiloActual = Thread.currentThread();
          while (hilo == hiloActual) {
               SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
               Calendar cal = Calendar.getInstance();
               horaActual = sdf.format(cal.getTime());
               repaint();
               try {
                    Thread.sleep(1000);
               } catch (InterruptedException e) {
                    e.printStackTrace();
               }
          }
     }

     public void paint(Graphics g) {
          g.clearRect(1, 1, getSize().width, getSize().height);
          setBackground(Color.yellow);
          g.setFont(fuente);
          g.drawString(horaActual, 20, 50);
     }

     public void stop() {
          hilo = null;
     }
}
```

## Ejemplo 2: Contador con botones

Applet que implementa `Runnable` y `ActionListener` para controlar un contador con botones de inicio y parada.

```java
import java.applet.Applet;
import java.awt.Button;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ContadorApplet extends Applet implements Runnable, ActionListener {
     private Thread h;
     long CONTADOR = 0;
     private boolean parar;
     private Font fuente;
     private Button b1, b2;

     public void start() {}

     public void init() {
          setBackground(Color.yellow);
          add(b1 = new Button("Iniciar contador"));
          b1.addActionListener(this);
          add(b2 = new Button("Parar contador"));
          b2.addActionListener(this);
          fuente = new Font("Verdana", Font.BOLD, 26);
     }

     public void run() {
          parar = false;
          Thread hiloActual = Thread.currentThread();
          while (h == hiloActual && !parar) {
               try {
                    Thread.sleep(300);
               } catch (InterruptedException e) {
                    e.printStackTrace();
               }
               repaint();
               CONTADOR++;
          }
     }

     public void paint(Graphics g) {
          g.clearRect(0, 0, 400, 400);
          g.setFont(fuente);
          g.drawString(Long.toString((long) CONTADOR), 80, 100);
     }

     public void actionPerformed(ActionEvent e) {
          b1.setLabel("Continuar");
          if (e.getSource() == b1) {
               if (h != null && h.isAlive()) {
               } else {
                    h = new Thread(this);
                    h.start();
               }
          } else if (e.getSource() == b2)
               parar = true;
     }

     public void stop() {
          h = null;
     }
}
```

## Ejemplo 3: Contador doble con clase interna

Applet con dos contadores independientes gestionados por una clase interna `HiloContador` que extiende `Thread`.

![AppletContador con dos hilos en ejecución](/img/posts/20151027_2.png)

```java
import java.applet.Applet;
import java.awt.Button;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AppletContador extends Applet implements ActionListener {

     class HiloContador extends Thread {
          long CONTADOR = 0;
          boolean parada = false;

          public HiloContador(int hilo) {
               CONTADOR = hilo;
          }

          public void pararHilo() {
               parada = true;
          }

          public void activarHilo() {
               parada = false;
          }

          public void run() {
               while (!parada) {
                    try {
                         Thread.sleep(1000);
                    } catch (InterruptedException e) {
                         e.printStackTrace();
                    }
                    CONTADOR++;
                    repaint();
               }
          }
     }

     private Font fuente;
     private Button btn1, btn2;
     HiloContador t1, t2;
     int a, b;

     public void init() {
          t1 = new HiloContador((int) (Math.random() * 100 + 1));
          t2 = new HiloContador((int) (Math.random() * 100 + 1));
          setBackground(Color.orange);
          fuente = new Font("Verdana", Font.BOLD, 26);
          add(btn1 = new Button("Parar contador 1"));
          btn1.addActionListener(this);
          add(btn2 = new Button("Para contador 2"));
          btn2.addActionListener(this);
          t1.start();
          t2.start();
     }

     public void paint(Graphics g) {
          g.clearRect(0, 0, 400, 400);
          g.setFont(fuente);
          g.drawString("Hilo 1: " + Long.toString((long) t1.CONTADOR), 40, 100);
          g.drawString("Hilo 2: " + Long.toString((long) t2.CONTADOR), 40, 150);
     }

     public void actionPerformed(ActionEvent e) {
          if (e.getSource() == btn1) {
               if (t1.isAlive()) {
                    t1.pararHilo();
                    a = (int) t1.CONTADOR;
                    btn1.setLabel("Activar contador 1");
               } else {
                    t1.activarHilo();
                    t1 = new HiloContador(a + 1);
                    t1.start();
                    btn1.setLabel("Parar contador 1");
               }
          } else if (e.getSource() == btn2) {
               if (t2.isAlive()) {
                    t2.pararHilo();
                    b = (int) t2.CONTADOR;
                    btn2.setLabel("Activar contador 2");
               } else {
                    t2.activarHilo();
                    t2 = new HiloContador(b + 1);
                    t2.start();
                    btn2.setLabel("Parar contador 2");
               }
          }
     }
}
```
