---
title: "Programación multimedia. Botones personalizados"
description: Cómo crear botones personalizados en Android usando imágenes y un selector XML con estados (normal, pulsado, con foco) para dar sensación de movimiento.
author: Inazio Claver
date: 2015-10-18 23:55:00 +0800
categories: [Android]
tags: [android, android-studio, button, drawable, selector, estados, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Los botones personalizados en Android se crean mediante un fichero XML de tipo **selector** que define diferentes imágenes según el estado del botón (normal, pulsado, con foco), generando así una sensación visual de movimiento al pulsarlo.

## Imágenes de estados

Se necesitan tres imágenes que se colocan en `res/drawable/`:

- `botonnormal.png` — estado por defecto
- `botonpulsado.png` — cuando el botón está siendo pulsado
- `botonconfoco.png` — cuando el botón tiene el foco (seleccionado con teclado/D-pad)

![Imágenes de los tres estados del botón](/img/posts/20151018_77.png)

## Crear el selector (boton.xml)

Se crea el fichero `res/drawable/boton.xml` con la siguiente estructura:

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="true" android:drawable="@drawable/botonpulsado" />
    <item android:state_focused="true" android:drawable="@drawable/botonconfoco" />
    <item android:drawable="@drawable/botonnormal" />
</selector>
```

El orden importa: Android evalúa los estados de arriba hacia abajo y usa el primero que coincide. El último `item` sin condición es el estado por defecto.

![Estructura del fichero boton.xml](/img/posts/20151018_76.png)

## Configurar el layout

En el layout se coloca un `RelativeLayout` con fondo blanco (`#FFFFFF`) y un `Button`:

- Propiedad `background`: `@drawable/boton`
- Propiedad `text`: vacía (la imagen ya actúa como texto visual)
- Propiedad `onClick`: nombre del método Java que se ejecutará al pulsar

![Configuración del layout con el botón personalizado](/img/posts/20151018_78.png)

## Configurar el onClick

En el panel de propiedades del botón se asigna el nombre del método al atributo `onClick`. Este método debe declararse en la actividad con firma `public void nombreMetodo(View v)`.

![Asignación del método onClick en propiedades](/img/posts/20151018_79.png)

## Código Java

```java
public void sePulsa(View v) {
    Toast.makeText(getApplicationContext(), "¡Botón pulsado!", Toast.LENGTH_SHORT).show();
}
```
