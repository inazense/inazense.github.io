---
title: "Programación multimedia. Recursos alternativos. Orientación"
description: Cómo crear layouts alternativos en Android para que la interfaz se adapte automáticamente al cambiar la orientación del dispositivo entre vertical y horizontal.
author: Inazio Claver
date: 2015-10-18 23:05:00 +0800
categories: [Android]
tags: [android, android-studio, orientacion, layout, landscape, portrait, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Cuando se gira el dispositivo, Android recarga la actividad y busca el layout más adecuado según la orientación actual. Si solo existe un layout (el de portrait), la interfaz puede quedar mal distribuida en horizontal.

![Actividad con un TextView y botones en portrait](/img/posts/20151018_29.png)

![La misma actividad al girar a landscape sin layout alternativo](/img/posts/20151018_30.png)

## Crear un layout alternativo para landscape

### Paso 1: Crear la carpeta `layout-land`

En la vista de proyecto, dentro de la carpeta `res/`, creamos una nueva carpeta llamada `layout-land`. Android la utilizará automáticamente cuando el dispositivo esté en orientación horizontal.

![Crear carpeta layout-land en res/](/img/posts/20151018_31.png)

![Estructura de carpetas con layout-land creada](/img/posts/20151018_32.png)

### Paso 2: Copiar el XML del layout

Copiamos el fichero XML del layout vertical (`activity_main.xml`) a la nueva carpeta `layout-land`.

![Copiar el fichero XML al layout-land](/img/posts/20151018_33.png)

### Paso 3: Modificar el layout para landscape

Modificamos el layout copiado para aprovechar mejor el espacio horizontal. Por ejemplo, usando un `TableLayout` con `stretchColumns="*"` para distribuir los botones en dos columnas.

![Modificar el layout en modo landscape](/img/posts/20151018_34.png)

![Layout landscape con botones en dos columnas](/img/posts/20151018_35.png)

![Previsualización del layout landscape en el editor](/img/posts/20151018_36.png)

## Resultado

Android selecciona automáticamente el layout correcto sin necesidad de escribir código adicional: usa `layout/` para portrait y `layout-land/` para landscape.

![Resultado final en portrait](/img/posts/20151018_37.png)

![Resultado final en landscape](/img/posts/20151018_38.png)

## Convenciones de carpetas

Las carpetas de recursos alternativos pueden combinar calificadores de tamaño y orientación:

| Carpeta | Descripción |
|---------|-------------|
| `layout-small` | Pantallas pequeñas |
| `layout-normal` | Pantallas normales |
| `layout-large` | Pantallas grandes |
| `layout-xlarge` | Pantallas extra grandes |
| `layout-land` | Orientación landscape |
| `layout-large-land` | Pantallas grandes en landscape |

![Tabla de convenciones de carpetas](/img/posts/20151018_39.png)

![Ejemplo de carpetas en el proyecto](/img/posts/20151018_40.png)

![Vista final del proyecto con recursos alternativos](/img/posts/20151018_41.png)
