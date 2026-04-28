---
title: "Programación multimedia. Conociendo el entorno gráfico"
description: Guía del entorno gráfico de Android Studio para empezar el desarrollo multimedia, incluyendo la creación de proyectos, la paleta de componentes, la barra de herramientas y los desplegables de configuración.
author: Inazio Claver
date: 2015-10-18 22:46:00 +0800
categories: [Android]
tags: [android, android-studio, interfaz-grafica, layouts, widgets, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Para empezar a orientarnos con el entorno gráfico, lo primero será generar un nuevo proyecto.

## Crear un nuevo proyecto

Abrimos Android Studio y seleccionamos **Start a new Android Studio project**.

![Pantalla de inicio de Android Studio](/img/posts/20151018_1.png)

Le damos un nombre identificativo a nuestro proyecto (en el ejemplo "Vistas1").

![Nombrar el proyecto](/img/posts/20151018_2.png)

Elegimos para qué plataforma queremos desarrollar (teléfono, Tablet, gafas, televisión, reloj…) e indicamos la versión mínima del SDK.

![Selección de plataforma y versión mínima del SDK](/img/posts/20151018_3.png)

Seleccionamos una plantilla por defecto para la aplicación.

![Selección de plantilla de actividad](/img/posts/20151018_4.png)

Le damos un nombre a nuestra actividad, y un título que será el principal, y finalizamos.

## El entorno principal

Una vez creado el proyecto se nos abre el entorno principal de Android Studio.

![Vista general del entorno principal](/img/posts/20151018_5.png)

Si vamos a la parte central inferior podremos modificar las pestañas para ver el diseño en modo gráfico o con el XML generado.

![Pestañas de vista gráfica y XML](/img/posts/20151018_6.png)

Yendo a la sección derecha podemos ver todos los componentes gráficos que tiene nuestra app, y en el menú inferior sus características configurables (en forma gráfica). `RelativeLayout` es la plantilla sobre la que se cargan todos los componentes.

![Panel de componentes y propiedades](/img/posts/20151018_7.png)

## Crear un nuevo layout

Borramos el `TextView` que aparece por defecto e insertamos un `LinearLayout` Vertical desde la paleta de componentes.

![Insertar un LinearLayout Vertical](/img/posts/20151018_8.png)

Ahora arrastramos desde la paleta los siguientes componentes sobre el `LinearLayout`:

- `ToggleButton`
- `CheckBox`
- `ProgressBar`
- `RatingBar`

![Componentes añadidos sobre el LinearLayout](/img/posts/20151018_9.png)

## Las pestañas de vista

En la parte inferior central tenemos dos pestañas:

- **Design**: vista gráfica con los componentes representados visualmente.
- **Text**: vista del código XML del layout generado.

![Vista Design](/img/posts/20151018_10.png)

![Vista Text (XML)](/img/posts/20151018_11.png)

## Los botones de control superiores

En la barra de herramientas del editor encontramos varios grupos de botones:

![Barra de herramientas completa](/img/posts/20151018_12.png)

**Escala y zoom**: Los dos primeros se encargan de la escala del Smartphone, y los dos últimos de realizar el zoom que nosotros queramos.

![Botones de escala](/img/posts/20151018_13.png)

![Botones de zoom](/img/posts/20151018_14.png)

**Gravedad**: Se ocupa de la gravedad del botón con cuatro posiciones (left, center, right o fill). Esto es, el posicionamiento que tomará el objeto.

![Botón de gravedad](/img/posts/20151018_15.png)

**Expansión**: Estos dos botones se encargan de ensanchar y alargar respectivamente el botón a su máximo posible en pantalla.

![Botones de expansión](/img/posts/20151018_16.png)

**Distribución**: Se encargan de distribuir el tamaño del botón respecto al elemento que lo contiene y/o teniendo en cuenta los elementos que lo rodean.

![Botones de distribución](/img/posts/20151018_17.png)

## La barra de opciones superior

La barra superior dispone de siete desplegables con las siguientes funciones:

![Barra de opciones superior](/img/posts/20151018_18.png)

1. **Previsualización en dispositivos de ejemplo**: podemos elegir entre diferentes dispositivos (Nexus, Galaxy, etc.) para ver cómo quedaría nuestra app.

![Desplegable de dispositivos](/img/posts/20151018_19.png)

2. **Tamaño de pantalla / resolución**: seleccionamos la resolución de pantalla para la previsualización.

![Desplegable de resolución](/img/posts/20151018_20.png)

3. **Orientación del dispositivo**: Portrait, Landscape y modos especiales (Card Dock, Night time).

![Desplegable de orientación](/img/posts/20151018_21.png)

4. **Tema**: aplicamos el tema de la aplicación a la previsualización.

![Desplegable de tema](/img/posts/20151018_22.png)

5. **Actividad**: para navegar entre las distintas actividades del proyecto.
6. **Idioma**: para cambiar el idioma de la aplicación en la previsualización.
7. **Versión del SDK**: seleccionamos la versión del SDK instalada.

## El panel de propiedades

Si nos vamos a la parte derecha de nuevo, seleccionamos un elemento (por ejemplo, el `CheckBox`) y podemos ver sus propiedades.

![Panel de propiedades de un elemento](/img/posts/20151018_23.png)

Las propiedades más habituales son:

- **text**: valor a mostrar por pantalla.
- **textSize**: tamaño de la letra.
- **id**: identificador del elemento para referenciarlo desde el código Java.

## Ejecución de la aplicación

Y por último, aunque ya lo había explicado en los capítulos anteriores, tenemos el botón que nos permite lanzar la previsualización de nuestra app ya sea simulándola en el ordenador o cargándola al Smartphone que tengamos conectado.

![Botón de ejecución y selección de dispositivo](/img/posts/20151018_24.png)
