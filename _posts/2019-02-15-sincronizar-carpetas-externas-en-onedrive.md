---
title: Sincronizar carpetas externas en OneDrive
description: Cómo sincronizar carpetas de unidades externas con OneDrive
author: inazense
date: 2019-02-15 10:52:00 +0100
categories: [Sistemas Operativos]
tags: [onedrive, red]
image:
  path: /assets/pictures/posts/sistemasoperativos_logo.jpeg
  alt: Sistemas Operativos post
---

Esta será una entrada cortita pero creo que bastante útil.
Es posible que, al igual que yo, uséis **OneDrive** para **sincronizar** vuestros documentos en la nube pero os moleste considerablemente no poder **sincronizar varias carpetas** en concreto que tengáis en vuestro ordenador.

Es decir, mi carpeta de **OneDrive** está localizada en `C:\Users\Usuario\OneDrive` pero tengo otra carpeta en `C:\OtraCarpeta` que me gustaría **sincronizar** también para poder **acceder a los datos desde otros lugares**, tener **backup**... Razones varias.

Pues bien....

## ¿Cómo lo hacemos?

Usaremos **enlaces simbólicos**, que no es más que un "**acceso directo**" a una carpeta (o archivo) que se encuentra en otro directorio. Como iba diciendo crearemos un **enlace simbólico** ejecutando el **símbolo de sistema** (ojo!, que no **Powershell**) como **administrador** y escribiendo el siguiente comando

```bash
mklink /D "rutaOneDrive\nuevaCarpeta" "rutaCarpetaASincronizar"
```

Después de eso si nos vamos a nuestra carpeta de **OneDrive** veremos que se creó un acceso directo a la carpeta anterior y que la **sincronización** comenzará a funcionar.

__Edición:__ Con éste método también es posible mapar una **unidad de red**. Basta con mapear en una **unidad fija** el dispositivo y lo podrás mantener sincronizado sin problemas. Aunque tendrás que tener en cuenta que el tiempo de sincronización puede ser considerablemente mayor al tratarse de una **transferencia externa** a la **unidad del sistema operativo**.

**¡Salud y coding!**
