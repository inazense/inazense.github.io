---
title: "Programación multimedia. Conociendo el entorno gráfico"
description: Guía del entorno gráfico de Android Studio para empezar el desarrollo multimedia, incluyendo la paleta de componentes, el editor visual, la barra de herramientas y los desplegables de configuración.
author: Inazio Claver
date: 2015-10-18 12:00:00 +0800
categories: [Android]
tags: [android, android-studio, interfaz-grafica, layouts, widgets, programacion-multimedia]
pin: false
math: false
mermaid: false
---

## Crear un nuevo proyecto

Para comenzar, abrimos Android Studio y seleccionamos **Start a new Android Studio project**. Asignamos un nombre al proyecto (por ejemplo, "Vistas1"), elegimos la plataforma destino e indicamos la versión mínima del SDK requerida.

![Pantalla de inicio de Android Studio](/img/posts/20151018_1.png)

![Configuración del nuevo proyecto](/img/posts/20151018_2.png)

![Selección de versión mínima del SDK](/img/posts/20151018_3.png)

![Selección de actividad inicial](/img/posts/20151018_4.png)

## El editor de layouts

Una vez creado el proyecto, se abre el editor visual del layout. En él podemos diseñar la interfaz mediante arrastrar y soltar componentes.

![Editor visual del layout](/img/posts/20151018_5.png)

## La paleta de componentes

La paleta está organizada en secciones: **Layouts**, **Widgets**, **Text Fields**, etc. Desde aquí arrastramos los elementos al área de diseño.

![Paleta de componentes](/img/posts/20151018_6.png)

![Secciones de la paleta](/img/posts/20151018_7.png)

## Añadir componentes

El `LinearLayout` es el contenedor base sobre el cual se cargan los demás componentes. Sobre él podemos añadir elementos como `ToggleButton`, `CheckBox`, `ProgressBar` y `RatingBar`.

![Añadir componentes al layout](/img/posts/20151018_8.png)

![Componentes añadidos sobre LinearLayout](/img/posts/20151018_9.png)

## Las pestañas de vista

En la parte superior del editor hay dos pestañas para cambiar entre:
- **Design**: vista gráfica con los componentes representados visualmente
- **Text**: vista del código XML del layout

![Pestaña Design](/img/posts/20151018_10.png)

![Pestaña Text (XML)](/img/posts/20151018_11.png)

## La barra de herramientas superior

La barra superior del editor contiene botones para:

- Escalado del dispositivo en el editor
- Control del zoom
- Posicionamiento (gravedad)
- Expansión/contracción de elementos
- Distribución del espacio entre elementos

![Barra de herramientas del editor](/img/posts/20151018_12.png)

## Los desplegables de configuración

Hay siete desplegables que permiten configurar la previsualización:

1. **Dispositivo**: previsualizar en diferentes dispositivos (Nexus, Galaxy, etc.)
2. **Tamaño/resolución de pantalla**
3. **Orientación**: Portrait o Landscape
4. **Tema visual**: aplicar el tema de la aplicación
5. **Actividad**: navegar entre actividades del proyecto
6. **Idioma**: cambiar el idioma de la previsualización
7. **Versión del SDK**

![Desplegables de configuración](/img/posts/20151018_13.png)

![Selección de dispositivo](/img/posts/20151018_14.png)

![Selección de orientación](/img/posts/20151018_15.png)

![Selección de tema](/img/posts/20151018_16.png)

## El panel de propiedades

Al seleccionar un componente en el editor, el panel de propiedades de la derecha permite editar sus atributos, como `text`, `textSize` e `id`. El `id` es especialmente importante porque es el identificador que se usa para referenciar el componente desde el código Java.

![Panel de propiedades](/img/posts/20151018_17.png)

![Editar propiedad id](/img/posts/20151018_18.png)

## Ejecución

Para ejecutar la aplicación, pulsamos el botón de ejecución (triángulo verde) y seleccionamos el destino: emulador o dispositivo físico conectado.

![Botón de ejecución](/img/posts/20151018_19.png)

![Selección de dispositivo o emulador](/img/posts/20151018_20.png)

![Resultado en el emulador](/img/posts/20151018_21.png)

![Vista completa del proyecto](/img/posts/20151018_22.png)

![Estructura de carpetas del proyecto](/img/posts/20151018_23.png)

![Proyecto en ejecución](/img/posts/20151018_24.png)
