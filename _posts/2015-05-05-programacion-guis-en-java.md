---
title: Programación. GUIs en Java
description: Introducción al desarrollo de interfaces gráficas en Java con AWT y Swing, incluyendo layouts, eventos y look and feel.
author: Inazio Claver
date: 2015-05-05 12:00:00 +0800
categories: [Java, Programación]
tags: [java, programación, swing, awt, gui]
pin: false
math: false
mermaid: false
---

La API de Java tiene dos librerías para desarrollar aplicaciones con interfaz gráfica.

- **AWT (Abstract Window Toolkit).** Forma parte de la JFC (Java Foundation Classes). Los componentes se encuentran en la librería `java.AWT`.
- **SWING.** Componentes programados con código no nativo, lo cual los hace más portables. Son componentes más potentes, y se identifican con una J antes del nombre del componente. Los componentes se encuentran en la librería `javax.swing` y son todo subclases de la clase `JComponent.Swing`. Forma parte de Java2.

Ejemplo básico de ventana Swing:

```java
import javax.swing.*;

public class PruebaGUI{
   public static void main(String [] args){
     JFrame frame = new JFrame("Ventana Hola mundo");
     frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
     JLabel label = new JLabel("Hola mundo");
     frame.add(label);
     frame.pack();
     frame.setLocationRelativeTo(null);
     frame.setVisible(true);
   }
}
```

## Contenedores de alto nivel

- `JFrame` — Ventana principal.
- `JDialog` — Diálogo secundario.
- `JApplet` — Applet en navegador.

## Componentes Swing más comunes

`JButton`, `JLabel`, `JTextField`, `JTextArea`, `JCheckBox`, `JRadioButton`, `JComboBox`, `JScrollBar`.

## Layout Managers

- **FlowLayout** — Coloca los componentes de izquierda a derecha. Es el layout por defecto.
- **BorderLayout** — Divide el contenedor en cinco zonas: norte, sur, este, oeste y centro.
- **CardLayout** — Apila los componentes como cartas de una baraja.
- **GridLayout** — Distribuye los componentes en una cuadrícula.
- **GridBagLayout** — Similar a GridLayout pero con más flexibilidad.
- **BoxLayout** — Apila los componentes en una fila o columna.

## Apariencia (Look and Feel)

Se controla con `UIManager`. Opciones disponibles:

- Multiplataforma: `MetalLookAndFeel`
- Windows
- Solaris (Motif)
- Mac
- GTK (Unix/Linux)

Se configura con `UIManager.setLookAndFeel(...)` dentro de un bloque `try/catch`.

## Eventos (Listeners)

Los eventos permiten responder a las acciones del usuario. Se añaden con `addActionListener(...)`.

Listeners disponibles: `ActionListener`, `AdjustmentListener`, `FocusListener`, `ItemListener`, `KeyListener`, `MouseListener`, `MouseMotionListener`, `WindowListener`.

Ejemplo con dos botones y un `WindowAdapter` para el cierre:

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class EjemploEventos extends JFrame {

    private JButton btnLimpia;
    private JButton btnEscribe;
    private JLabel lblMensaje;

    public EjemploEventos() {
        setTitle("Ejemplo Eventos");
        setLayout(new FlowLayout());

        btnLimpia = new JButton("Limpia");
        btnEscribe = new JButton("Escribe");
        lblMensaje = new JLabel("Aquí aparecerá el texto");

        btnLimpia.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                lblMensaje.setText("");
            }
        });

        btnEscribe.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                lblMensaje.setText("¡Hola!");
            }
        });

        add(btnLimpia);
        add(btnEscribe);
        add(lblMensaje);

        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    public static void main(String[] args) {
        new EjemploEventos();
    }
}
```

## Exportar a .jar ejecutable

En Eclipse: File → Export → "Runnable jar file".
