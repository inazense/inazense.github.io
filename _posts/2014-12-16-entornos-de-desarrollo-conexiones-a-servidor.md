---
title: Entornos de desarrollo. Conexiones a servidor
description: Conexión SSH a servidor con PuTTY y transferencia de archivos con WinSCP. Cambio de contraseña y verificación de permisos de directorios.
author: Inazio Claver
date: 2014-12-16 13:11:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, putty, winscp, ssh, sftp]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

El profesor nos ha proporcionado credenciales a cada alumno para acceder a un servidor en la dirección IP 192.168.2.25.

## PuTTY

Para establecer una conexión SSH al servidor usaremos PuTTY.

![PuTTY - introducir IP del servidor](/img/posts/20141216_1.png)

Ejecutamos PuTTY, introducimos la dirección IP del servidor y nos autenticamos con usuario y contraseña.

![PuTTY - autenticación](/img/posts/20141216_2.png)

Una vez dentro, cambiamos la contraseña por defecto ejecutando el comando `passwd`.

![Cambio de contraseña con passwd](/img/posts/20141216_3.png)

## WinSCP

Posteriormente usaremos WinSCP para trabajar con conexiones SFTP, permitiendo gestionar archivos en el servidor de forma visual.

![WinSCP - pantalla de conexión](/img/posts/20141216_4.png)

![WinSCP - conexión establecida](/img/posts/20141216_5.png)

![WinSCP - explorador de archivos](/img/posts/20141216_6.png)

## Permisos de directorios

Verificamos los permisos de las carpetas personales para garantizar que "Otros" no tenga acceso.

![Permisos de directorio personal](/img/posts/20141216_7.png)

![Verificación de permisos](/img/posts/20141216_8.png)

**¡Salud y coding!**
