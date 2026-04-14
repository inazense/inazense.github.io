---
title: Entornos de desarrollo. Modelo - Vista - Controlador (con ejemplo de conversor)
description: Explicación del patrón de arquitectura MVC implementado en Java con un ejemplo práctico de conversor de divisas.
author: Inazio Claver
date: 2015-05-20 12:00:00 +0800
categories: [Entornos de desarrollo, Java]
tags: [entornos-de-desarrollo, java, mvc, modelo-vista-controlador, swing]
pin: false
math: false
mermaid: false
---

El **modelo–vista–controlador (MVC)** es un patrón de arquitectura de software que separa los datos y la lógica de negocio de una aplicación de la interfaz de usuario y el módulo encargado de gestionar los eventos y las comunicaciones.

- **El Modelo:** Representa y gestiona la información, implementando la lógica de negocio. Envía a la vista la información solicitada.
- **El Controlador:** Responde a eventos del usuario e invoca peticiones al modelo. Hace de intermediario entre vista y modelo.
- **La Vista:** Presenta el modelo en un formato adecuado para la interacción del usuario.

![Diagrama MVC](/img/posts/20150520_1.jpg)

Vamos a realizar en Java un **conversor de divisas** implementando MVC.

![Captura de la aplicación conversor de divisas](/img/posts/20150520_2.png)

![Estructura de paquetes y clases del proyecto](/img/posts/20150520_3.png)

El código a programar quedaría así:

## ARCHIVO ConversorDivisas.java (paquete `conversorModelo`)

```java
package conversorModelo;
import java.util.*;

public class ConversorDivisas {
    private Hashtable<String, Double> tablaConversion = new Hashtable<String, Double>();

    public ConversorDivisas(){
        insertarDivisa("EUR", 1.0);
        insertarDivisa("USD", 1.180);
        insertarDivisa("JPY", 134.86);
        insertarDivisa("BGN", 1.958);
    }

    private void insertarDivisa(String codigo, Double tipoCambio) {
        tablaConversion.put(codigo, tipoCambio);
    }

    private double obtenerDivisa(String codigoDivisa){
        return tablaConversion.get(codigoDivisa);
    }

    public Double convertir(String codDivOrigen, String codDivDestino, Double importe){
        Double euros = importe / obtenerDivisa(codDivOrigen);
        return euros * obtenerDivisa(codDivDestino);
    }

    public Enumeration<String> obtenerCodigosDivisa(){
        return tablaConversion.keys();
    }
}
```

## ARCHIVO VentanaPrincipal.java (paquete `conversorVista`)

Clase que extiende `JFrame`. Contiene:
- `JTextField txtImporte`
- `JButton btnConvertir`
- Dos `JComboBox<String>` (divisa origen y destino)
- `JLabel lblResultado`

Métodos: `arrancar()`, `obtenerImporte()`, `obtenerDivisaOrigen()`, `obtenerDivisaDestino()`, `actualizarResultado(String importe)`, `setComboDivisas(Enumeration<String>)`, `conectarControlador(ControladorConversor controlador)`. El botón conecta al controlador con `addActionListener`.

## ARCHIVO ControladorConversor.java (paquete `conversorControlador`)

Implementa `ActionListener`. El constructor recibe una `VentanaPrincipal` y un `ConversorDivisas`. En `actionPerformed` obtiene el importe, las divisas origen y destino de la vista, llama a `modelo.convertir(...)` y actualiza la vista con `DecimalFormat("#,###.##")`.

## ARCHIVO ProgramaPrincipal.java (paquete `programaPrincipal`)

Instancia `ConversorDivisas modelo`, `VentanaPrincipal vista` y `ControladorConversor controlador`, llama a `vista.conectarControlador(controlador)` y `vista.arrancar()`.

![Resultado final de la aplicación funcionando](/img/posts/20150520_4.png)
