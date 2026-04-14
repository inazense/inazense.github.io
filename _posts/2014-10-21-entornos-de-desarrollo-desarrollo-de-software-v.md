---
title: Entornos de desarrollo. Desarrollo de software (V)
description:
date: 2014-10-21 23:36:00 +0800
categories: [entornos de desarrollo]
tags: [entornos de desarrollo, codeblocks, c, debugger, proyectos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Proyectos en Code Blocks

Los proyectos son agrupaciones de hojas en C que facilitan la organización cuando estamos elaborando un programa complejo.

Para hacer uso de ellos, nos vamos a **New File → Project**

![New File → Project](/img/posts/20141021_1.png)

En la ventana que se desplegará, seleccionamos la opción de **Console application**

![Console application](/img/posts/20141021_2.png)

Y lanzaremos el menú de configuración para crear el nuevo proyecto. La primera imagen es simplemente un aviso de lo que vamos a realizar, la saltamos.

![Aviso de nuevo proyecto](/img/posts/20141021_3.png)

A continuación se nos pedirá que elijamos el lenguaje de programación del proyecto. Elegimos C, ya que es lo que estamos aprendiendo de momento.

![Selección de lenguaje C](/img/posts/20141021_4.png)

También nos pide que añadamos un título y el directorio donde se va a almacenar el proyecto. Los dos últimos campos se rellenaran por defecto.

![Título y directorio del proyecto](/img/posts/20141021_5.png)

En la siguiente ventana trataremos los parámetros de la compilación. Deberemos dejarlos tal y como se están en la siguiente imagen.

![Parámetros de compilación](/img/posts/20141021_6.png)

Y ya tenemos nuestro proyecto creado. Si ahora nos vamos al panel de la izquierda y desplegamos el Workspace veremos que nos aparece. Le damos al botón de +, desplegamos también Sources y nos aparecerá main.c, la hoja principal de nuestro proyecto.

![Proyecto creado en el Workspace](/img/posts/20141021_7.png)

Para trabajar escribimos un código que nos permita realizar pruebas.

![Código de prueba](/img/posts/20141021_8.png)

## Debugger en CodeBlocks

Vamos a emplear la herramienta de debugging que trae CodeBlocks. Para ello, seleccionamos una línea y pulsamos la tecla F5. Nos aparecerá un pirindolo rojo en esa fila.

![Breakpoint en el debugger](/img/posts/20141021_9.png)

Pulsamos sobre el botón de Debugger y elegimos las opciones de **CPU Registers** y **Watches**

![Opciones de CPU Registers y Watches](/img/posts/20141021_10.png)

Para ejecutar esa línea, pulsaremos en el botón de play **ROJO**, a la derecha de Debug.

Nos aparecerá una advertencia indicando que los valores por defecto de CodeBlocks han cambiado. Elegimos Yes y continuamos a lo nuestro.

![Advertencia de valores por defecto](/img/posts/20141021_11.png)

![Panel de Watches](/img/posts/20141021_12.png)

![Panel de CPU Registers](/img/posts/20141021_13.png)

Para detener la ejecución pulsaremos sobre el aspa roja, a la derecha del botón que inicia el debugger.

![Detener ejecución](/img/posts/20141021_14.png)

Nos volverá a indicar que los valores cambiaron. De nuevo Yes y podemos seguir compilando y haciendo debugging a nuestro antojo.

![Segunda advertencia de valores](/img/posts/20141021_15.png)
