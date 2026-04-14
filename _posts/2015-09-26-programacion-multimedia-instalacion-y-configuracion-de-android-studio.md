---
title: Programación multimedia. Instalación y configuración de Android Studio
description: Guía paso a paso para instalar y configurar Android Studio, crear un emulador Android y optimizar el rendimiento con Intel HAXM.
author: Inazio Claver
date: 2015-09-26 12:00:00 +0800
categories: [Programación]
tags: [android, android-studio, programacion-multimedia, emulador]
pin: false
math: false
mermaid: false
---

En el módulo de programación multimedia y dispositivos móviles aprenderemos a programar aplicaciones para dispositivos móviles y videojuegos. Utilizaremos **Android Studio**, la herramienta oficial y gratuita de Google para el desarrollo de aplicaciones Android, que ha ido ganando estabilidad y ha reemplazado al antiguo método basado en plugins de Eclipse.

## Instalación

Ejecutamos el instalador. La primera pantalla nos muestra los componentes que se van a instalar.

![Pantalla inicial del instalador de Android Studio](/img/posts/20150926_1.png)

Seleccionamos los componentes necesarios.

![Componentes a marcar](/img/posts/20150926_2.png)

Aceptamos el acuerdo de licencia.

![Acuerdo de licencia](/img/posts/20150926_3.png)

Elegimos la ruta de instalación.

![Selección de ruta de instalación](/img/posts/20150926_4.png)

Creamos la entrada en el menú de inicio.

![Entrada en el menú de inicio](/img/posts/20150926_5.png)

## Configuración inicial

Al lanzar el programa por primera vez, marcamos la opción para nuevos usuarios ya que no tenemos configuraciones previas que importar.

![Opción para nuevos usuarios](/img/posts/20150926_6.png)

El firewall nos pedirá permiso; lo permitimos para redes privadas.

![Advertencia del firewall](/img/posts/20150926_7.png)

A continuación podemos elegir el tema de la interfaz. Recomiendo el tema oscuro para reducir la fatiga visual en sesiones largas de programación.

![Selección de tema de la interfaz](/img/posts/20150926_8.png)

El programa comenzará a descargar los componentes necesarios. Tened paciencia: según la velocidad de conexión puede tardar un buen rato (en clase llegó a unos 30 minutos, en casa fueron menos de 5).

![Descarga de componentes en progreso](/img/posts/20150926_9.png)

![Descarga completada](/img/posts/20150926_10.png)

![Finalización de la configuración inicial](/img/posts/20150926_11.png)

## Creación de un proyecto de prueba

Desde la pantalla de bienvenida, seleccionamos **Start a New Android Studio Project**.

![Pantalla de bienvenida de Android Studio](/img/posts/20150926_12.png)

Introducimos el nombre y la ubicación del proyecto.

![Datos del proyecto](/img/posts/20150926_13.png)

Marcamos **Phone and Tablet** y elegimos la versión mínima del SDK.

![Selección de dispositivo y versión mínima del SDK](/img/posts/20150926_14.png)

Elegimos **Blank Activity** como plantilla de actividad.

![Selección de actividad](/img/posts/20150926_15.png)

Le damos nombre a la actividad principal.

![Nombre de la actividad](/img/posts/20150926_16.png)

## Descarga de versiones del SDK

El firewall puede volver a pedir permiso al arrancar el entorno; lo permitimos de nuevo.

![Permiso del firewall](/img/posts/20150926_17.png)

Puede aparecer una pantalla con consejos al inicio. Podemos ocultarla desmarcando la opción en la parte inferior.

![Pantalla de tips al inicio](/img/posts/20150926_18.png)

Para descargar versiones específicas del SDK (Lollipop, KitKat, etc.), pulsamos el icono del muñeco Android con la flecha descendente en la barra superior.

![Ubicación del botón de gestión del SDK](/img/posts/20150926_19.png)

Recomiendo descargar Android 4.2 y Android 5.0 para tener variedad de dispositivos de prueba.

![Versiones seleccionadas para descargar](/img/posts/20150926_20.png)

![Descarga de componentes del SDK](/img/posts/20150926_21.png)

![Confirmación de descarga completada](/img/posts/20150926_22.png)

## Configuración del emulador (AVD Manager)

Para configurar el smartphone que queremos emular, pulsamos el icono del muñeco Android con una pantalla en la barra superior, que abre el **AVD Manager**.

![Ubicación del botón AVD Manager](/img/posts/20150926_23.png)

Seleccionamos **Create Virtual Device** para crear una configuración personalizada.

![Opción de crear máquina virtual](/img/posts/20150926_24.png)

Si el dispositivo que queremos no aparece en la lista, elegimos **New Hardware Profile**.

![Selección de hardware del dispositivo](/img/posts/20150926_25.png)

Rellenamos las características del smartphone. Podéis buscar las especificaciones del dispositivo en internet.

![Formulario de características del hardware](/img/posts/20150926_26.png)

Seleccionamos el dispositivo que acabamos de crear y pulsamos **Next**.

![Selección del dispositivo personalizado](/img/posts/20150926_27.png)

Elegimos el SDK correspondiente. Se ofrecen dos tipos de procesador: **x86** (mejor rendimiento en la emulación) y **ARM** (la arquitectura real de la mayoría de smartphones). Os recomiendo crear un emulador de cada tipo para hacer pruebas. El procesador x86 requiere que la virtualización Intel esté activada en la BIOS.

![Selección de SDK y tipo de procesador](/img/posts/20150926_28.png)

Se instalan los componentes requeridos.

![Instalación de componentes del emulador](/img/posts/20150926_29.png)

Pulsamos **Finish** cuando termine.

![Finalización de la creación del emulador](/img/posts/20150926_30.png)

Verificamos la configuración del dispositivo virtual.

![Verificación de la configuración del emulador](/img/posts/20150926_31.png)

![Confirmación de configuración del emulador](/img/posts/20150926_32.png)

## Optimización con Intel HAXM

Para obtener el mejor rendimiento posible al emular dispositivos x86, instalamos el módulo **Intel x86 Emulator Accelerator (HAXM)**. Desde la ventana principal accedemos a la gestión del SDK.

![Gestión del SDK desde la ventana principal](/img/posts/20150926_33.png)

En la pestaña **SDK Tools** marcamos **Intel x86 Emulator Accelerator (HAXM Installer)** y aplicamos los cambios.

![Ubicación de HAXM en SDK Tools](/img/posts/20150926_34.png)

![Descarga del instalador de HAXM](/img/posts/20150926_35.png)

Si la emulación sigue sin arrancar, podéis descargar el instalador directamente desde la web de Intel. Es imprescindible que la virtualización Intel esté activada en la BIOS.

![Instalador de Intel HAXM](/img/posts/20150926_36.png)

Una vez instalado, volvemos al **AVD Manager** para arrancar el dispositivo virtual configurado.

![Inicio del dispositivo virtual desde AVD Manager](/img/posts/20150926_37.png)

![Emulador arrancando](/img/posts/20150926_38.png)

![Emulador en funcionamiento](/img/posts/20150926_39.png)
