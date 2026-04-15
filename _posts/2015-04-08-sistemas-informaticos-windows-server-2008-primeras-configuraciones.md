---
title: Sistemas informáticos. Windows Server 2008. Primeras configuraciones
description: Configuraciones básicas de red en Windows Server 2008 recién instalado, incluyendo zona horaria, IPv4 estática y nombre NetBIOS.
author: Inazio Claver
date: 2015-04-08 12:00:00 +0800
categories: [Sistemas]
tags: [sistemas-informaticos, windows-server, red, configuracion, netbios]
pin: false
math: false
mermaid: false
---

Ya tenemos nuestro servidor instalado, limpito y listo para que lo configuremos.

En esta entrada simplemente realizaremos las configuraciones de red más básicas, es decir, zona horaria, interfaz de red y nombre NetBios.

¿Os acordaís donde lo dejamos, no? En la pantalla de bienvenida.

![Pantalla de bienvenida de Windows Server 2008](/img/posts/20150408_21.png)

Simplemente, en la sección de **Proporcionar información al equipo**, vamos a *Establecer zona horaria* y veremos lo siguiente.

![Configuración de zona horaria](/img/posts/20150408_22.png)

Ponemos la configuración horaria que nos pertenezca (aunque por defecto debería extraerla de Internet si tienes conexión), y aceptamos.

Lo siguiente será pulsar sobre *Configurar funciones de red*. Se nos abrirá la ventana de conexiones de red disponibles.

![Ventana de conexiones de red](/img/posts/20150408_23.png)

Le damos a botón derecho - Propiedades, desmarcamos el check de las direcciones IPv6, y sobre el Protocolo de Internet versión 4 (IPv4) pulsamos en propiedades.

![Propiedades de la conexión de red](/img/posts/20150408_24.png)

Le damos la configuración que deseemos.

En mi caso yo trabajaré con la red 10.0.0.0, en el rango de 10.0.13.0 a 10.0.13.255 (hay que compartir direcciones entre todos). Mi puerta de enlace será la 10.0.0.1 y como instalaremos un servidor DNS lo dirigimos a nuestro loopback e indicamos que el secundario sea el de Google.

Es decir, tal que así la configuración.

![Configuración de IP estática IPv4](/img/posts/20150408_25.png)

Hecho esto, aceptamos y volvemos a la ventana de inicio.

Ahora nos vamos a **Proporcionar nombre del equipo y dominio** para cambiar nombre de equipo.

No tiene mayor misterio más que pulsar sobre *Cambiar*.

![Cambiar nombre de equipo](/img/posts/20150408_26.png)

Y escribimos el que nos dé la gana.

![Nuevo nombre del equipo introducido](/img/posts/20150408_27.png)

En la siguiente entrega instalaremos funciones y características.
