---
title: "Programación multimedia. Botones personalizados"
description: Cómo crear botones personalizados en Android usando imágenes y un selector XML con estados (normal, pulsado, con foco) para dar sensación de movimiento.
author: Inazio Claver
date: 2015-10-18 23:50:00 +0800
categories: [Android]
tags: [android, botones, drawable, selector, onclick, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Vamos a ver cómo se pueden personalizar los botones de nuestra aplicación, pero no modificando bordes del botón, tamaño y demás, estoy hablando de crear botones a partir de imágenes que consigan sensación de movimiento al realizar determinada acción. Veamos cómo.

Sobre un nuevo proyecto, creamos el fichero **boton.xml** en el directorio **res/drawable** y escribimos el siguiente código:

![boton.xml](/img/posts/20151018_76.png)

Este XML define un recurso único gráfico (_drawable_) que cambiará en función del estado del botón. El primer `<item>` define la imagen usada cuando se pulsa el botón, el segundo `<item>` define la imagen usada cuando el botón tiene el foco (cuando el botón está seleccionado con la rueda de desplazamiento o las teclas de dirección), el tercero la imagen en estado normal.

El orden de los `<item>` es importante. Cuando se va a dibujar se recorren los ítems en orden hasta que se cumpla una condición. Debido a que "_botonnormal_" es el último, sólo se aplica cuando las condiciones `state_pressed` y `state_focused` no se cumplen.

Las imágenes usadas para crear el botón son las siguientes

![botonnormal.png](/img/posts/20151018_77.png)

![botonpulsado.png](/img/posts/20151018_78.png)

![botonconfoco.png](/img/posts/20151018_79.png)

Al escribir el código así de primeras saldrá error al escribir la ruta de las imágenes. Eso se arregla agregándolas a la carpeta **res/drawable** del proyecto.

Ahora en el diseño del **Layout** eliminamos el **TextView** existente (como siempre) y especificamos que el **RelativeLayout** tenga la propiedad _Background_ blanca (#FFFFFF en hexadecimal).

![Layout con fondo blanco](/img/posts/20151018_80.png)

Dentro del RelativeLayout arrastramos un Button y le indicamos que su propiedad _Background_ sea _Drawable/boton_. Esa opción la encontraremos entrando en el selector de recursos (los puntos suspensivos)

![Selector de recursos](/img/posts/20151018_81.png)

Modificamos el atributo _Text_ para que no tenga ningún valor

![Atributo Text vacío](/img/posts/20151018_82.png)

Ve al fichero con las funciones programables java e introduce al final, antes de la última llave, el siguiente código

![Código Java sePulsa](/img/posts/20151018_83.png)

Vuelve al diseño del Layout y modifica la propiedad _onClick_ dándole el valor _sePulsa_.

![Propiedad onClick](/img/posts/20151018_84.png)

Y al ejecutar el programa podremos ver cómo se comporta nuestro botón, animándose y mostrando un mensaje cuando es pulsado.

![Aplicación ejecutándose](/img/posts/20151018_85.png)
