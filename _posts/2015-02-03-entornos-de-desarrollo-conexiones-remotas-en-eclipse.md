---
title: Entornos de desarrollo. Conexiones remotas en Eclipse
description: Cómo configurar conexiones remotas SSH en Eclipse y NetBeans mediante plugins
author: Inazio Claver
date: 2015-02-03 12:00:00 +0800
categories: [Entornos de desarrollo]
tags: [eclipse, netbeans, ssh]
pin: false
math: false
mermaid: false
---

Vamos a escribir código que nos conecte remotamente a la carpeta de nuestro servidor.
Para ello, hay que instalar ciertos plugins en Eclipse.

Lo primero vamos a probar a conectarnos a nuestra carpeta en el servidor, que será el sitio de nuestra página web.

![Conexión al servidor](/img/posts/20150203_1.png)

Comprobada la conexión, abrimos el Eclipse y vamos a `Help` - `Install New Software`

![Install New Software en Eclipse](/img/posts/20150203_2.png)

Elegimos `Work with: Luna` y marcamos, buscando `remote system`, los dos primeros resultados.

![Búsqueda de remote system en Eclipse](/img/posts/20150203_3.png)

Lo instalamos y reiniciamos Eclipse cuando lo solicite.

![Instalación del plugin](/img/posts/20150203_4.png)

Y marcamos `Remote System Explorer`

![Remote System Explorer](/img/posts/20150203_5.png)

Vamos y pulsamos en Nueva Conexión (círculo rojo), marcando SSH

![Nueva Conexión SSH](/img/posts/20150203_6.png)

Escribimos la dirección IP

![Dirección IP](/img/posts/20150203_7.png)

## En NetBeans

Vamos a `Tools` - `Plugins`

![Tools - Plugins en NetBeans](/img/posts/20150203_8.png)

En `Available Plugins` buscamos `ssh` e instalamos `ssh mounts`

![Instalación de ssh mounts](/img/posts/20150203_9.png)

Lo instalamos y reiniciamos.
A continuación instalamos los plugins de PHP

![Plugins de PHP en NetBeans](/img/posts/20150203_10.png)
