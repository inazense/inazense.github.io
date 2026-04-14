---
title: "Programación multimedia. Vistas de entrada de texto"
description: Componentes de entrada de texto en Android Studio (TextFields), sus tipos y cómo el teclado se adapta según el tipo de campo en un dispositivo físico.
author: Inazio Claver
date: 2015-10-18 12:10:00 +0800
categories: [Android]
tags: [android, android-studio, textfield, edittext, teclado, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Para este ejercicio se parte del proyecto creado anteriormente, eliminando todos los componentes del layout excepto el `LinearLayout` base.

![Proyecto con el layout limpio](/img/posts/20151018_25.png)

## Componentes de entrada de texto (TextFields)

Los componentes de entrada de texto se encuentran en la sección **Text Fields** de la paleta de componentes. Hay varios tipos según el contenido esperado:

- **Plain Text**: campo de texto libre
- **Person Name**: para nombres
- **Password**: oculta los caracteres introducidos
- **E-mail**: muestra la arroba en el teclado
- **Phone**: teclado numérico de teléfono
- **Number**: solo permite números y el punto decimal
- **Multiline Text**: campo de múltiples líneas

![Sección TextFields en la paleta](/img/posts/20151018_26.png)

Se arrastran los componentes al área de diseño y se modifica la propiedad `layout:width` para que ocupen todo el ancho disponible (`match_parent`).

![Componentes de texto añadidos al diseño](/img/posts/20151018_27.png)

## Diferencias en dispositivo físico

Aunque en el emulador las diferencias entre tipos de campo son mínimas (salvo el campo de contraseña que oculta los caracteres), en un dispositivo físico el teclado se adapta automáticamente según el tipo:

- **E-mail**: muestra la tecla `@` directamente accesible
- **Number**: muestra únicamente números y el punto decimal
- **Password**: oculta la entrada con asteriscos o puntos

![Teclado adaptativo en dispositivo físico](/img/posts/20151018_28.png)
