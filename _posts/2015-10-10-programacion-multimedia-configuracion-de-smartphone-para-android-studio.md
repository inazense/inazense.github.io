---
title: "Programación multimedia. Configuración de smartphone para Android Studio"
description: Cómo conectar un smartphone físico Android a Android Studio para ejecutar aplicaciones directamente en el dispositivo en lugar de usar el emulador.
author: Inazio Claver
date: 2015-10-10 12:00:00 +0800
categories: [Android]
tags: [android, android-studio, smartphone, depuracion-usb, programacion-multimedia]
pin: false
math: false
mermaid: false
---

Para ejecutar nuestras aplicaciones Android en un dispositivo físico en lugar del emulador, necesitamos configurar el smartphone correctamente. A continuación se explica el proceso usando un Samsung Galaxy Trend Plus con Android 4.2.2.

## Paso 1: Habilitar las Opciones de desarrollador

Para habilitar las Opciones de desarrollador en un Samsung Galaxy Trend Plus (versión 4.2.2):

- Navegar a: **Ajustes → Más → Acerca del dispositivo**
- Pulsar repetidamente sobre **Número de compilación** hasta que aparezca un mensaje de confirmación (normalmente entre 5 y 7 pulsaciones, con una cuenta atrás)

![Menú Acerca del dispositivo](/img/posts/20151010_1.png)

![Pulsando Número de compilación](/img/posts/20151010_2.png)

![Confirmación de Opciones de desarrollador activadas](/img/posts/20151010_3.png)

- Retroceder para acceder a la nueva sección **Opciones de desarrollador** en el menú de Ajustes

![Opciones de desarrollador en el menú](/img/posts/20151010_4.png)

## Paso 2: Activar la Depuración USB

Dentro de **Opciones de desarrollador**, habilitar como mínimo **Depuración de USB**. Opcionalmente, activar **Permitir ubicaciones falsas** si se trabaja con GPS.

![Activar depuración USB](/img/posts/20151010_5.png)

## Paso 3: Instalar el software de comunicación

Instalar la aplicación correspondiente según la marca del teléfono:

| Marca | Software |
|-------|----------|
| Samsung | Samsung Kies |
| HTC | HTC Sync |
| LG | LG PC Suite |
| Sony | PC Companion |

Hay que tener en cuenta que existen versiones diferentes según si la versión del SDK es inferior o superior a la 4.3.

![Samsung Kies](/img/posts/20151010_6.png)

## Paso 4: Conectar y ejecutar desde Android Studio

Ejecutar la aplicación instalada (Samsung Kies en este caso) y conectar el smartphone mediante USB. Una vez detectado el dispositivo, desde Android Studio:

- Pulsar el botón de ejecución
- Seleccionar **Choose a running device**
- Elegir el smartphone de la lista de dispositivos disponibles

![Selección de dispositivo en Android Studio](/img/posts/20151010_7.png)

La aplicación se instalará y ejecutará directamente en el dispositivo físico, lo que proporciona una experiencia de prueba mucho más real que el emulador.

![Aplicación ejecutándose en el smartphone](/img/posts/20151010_8.jpg)
