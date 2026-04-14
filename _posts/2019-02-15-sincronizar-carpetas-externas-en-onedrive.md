---
title: Sincronizar carpetas externas en OneDrive
description: Aprende a sincronizar carpetas externas en OneDrive con enlaces simbólicos usando mklink. Tutorial paso a paso para crear backup automático de cualquier carpeta en Windows con el símbolo del sistema.
author: Inazio Claver
date: 2019-02-15 11:33:00 +0800
categories: [Sistemas]
tags: [onedrive, windows, enlaces-simbolicos, mklink, sincronizacion, backup, cloud]
pin: false
math: false
mermaid: false
#image:
#  path: /img/posts/20190215_onedrive.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VLIAAAA
#  alt: OneDrive sincronización de carpetas externas.
---

Esta será una entrada cortita pero creo que bastante útil.
Es posible que, al igual que yo, uséis **OneDrive** para **sincronizar** vuestros documentos en la nube pero os moleste considerablemente no poder sincronizar varias **carpetas** en concreto que tengáis en vuestro ordenador.


Es decir, mi carpeta de **OneDrive** está localizada en _C:\Users\Usuario\OneDrive_ pero tengo otra carpeta en _C:\OtraCarpeta_ que me gustaría que se **sincronizase** también para poder **acceder a los datos desde otros lugares**, tener **backup**... Razones varias.

Pues bien....

## ¿Cómo lo hacemos?

Usaremos **enlaces simbólicos** que no es más que un **"acceso directo"** a una carpeta (o archivo) que se encuentra en otro directorio. Como iba diciendo, crearemos un **enlace simbólico** ejecutando el **símbolo de sistema** (¡ojo!, que no **PowerShell**) como **administrador** y escribiendo el siguiente comando:

```cmd
mklink /D "rutaOneDrive\nuevaCarpeta" "rutaCarpetaASincronizar"
```

Después de eso, si nos vamos a nuestra carpeta de **OneDrive**, veremos que se creó un acceso directo a la carpeta anterior y que la **sincronización** comenzará a funcionar.

Y eso sería todo. **¡Salud y coding!**