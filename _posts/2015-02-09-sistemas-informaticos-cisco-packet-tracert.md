---
title: Sistemas informáticos. Cisco Packet Tracert
description: Introducción al uso de Cisco Packet Tracer para hacer planeamientos de red con switches, hosts y routers.
author: Inazio Claver
date: 2015-02-09 12:00:00 +0800
categories: [Sistemas]
tags: [cisco, packet tracer, redes, router, switch]
pin: false
math: false
mermaid: false
---

Vamos a comenzar a usar el Packet Tracert, para hacer planeamientos de red.

Instalamos el programa y al iniciarlo, veremos esta pantalla principal:

![Pantalla principal de Packet Tracer](/img/posts/20150209_1.png)

Vamos a agregar un switch y un par de equipos. En la parte inferior, nos vamos a:

![Panel inferior de dispositivos](/img/posts/20150209_2.png)

Y elegimos cualquiera de los que hay, arrastrándolo a la parte superior.

Hacemos lo mismo con los dispositivos finales, hasta conseguir este aspecto:

![Switch y equipos en el lienzo](/img/posts/20150209_3.png)

Ahora le pones cables.

![Herramienta de cables](/img/posts/20150209_4.png)

Elegimos el cableado automático, y unimos los tres hosts al switch.

![Hosts conectados al switch](/img/posts/20150209_5.png)

Ahora vamos a configurar los hosts. Doble clic sobre los equipos, y nos vamos a `Config`.

![Configuración de host](/img/posts/20150209_6.png)

Configuramos el resto de equipos con las direcciones 0.2 y 0.3.

Para comprobar que conectan, cogemos el sobre de la parte derecha.

![Herramienta de envío de mensajes](/img/posts/20150209_7.png)

Y pulsamos primero sobre un host y luego sobre otro.

En la esquina inferior derecha podemos comprobar si los envíos funcionan correctamente:

![Comprobación de envíos exitosos](/img/posts/20150209_8.png)

Et voilà!

Ahora añadimos otro switch junto a tres hosts en la red 2.0 y un router entre ambos, conectando los switch al router con cable directo al router.

![Red con dos switches y un router](/img/posts/20150209_9.png)

Nos vamos a configurar las direcciones del router por ambas interfaces.

![Configuración interfaz router lado 1](/img/posts/20150209_10.png)

![Configuración interfaz router lado 2](/img/posts/20150209_11.png)

En los hosts configuramos en `Global` - `Configuraciones` la Gateway con la dirección IP del router.

![Configuración de Gateway en hosts](/img/posts/20150209_13.png)

Evidentemente cada host unido a la interfaz de router que le corresponda. Los de la red 0 a la 192.168.0.254 y los de la red 2 a la 192.168.2.254 (que si no la jodemos).

Esperamos un rato y comprobamos el envío de mensajes.

![Comprobación de envío entre redes](/img/posts/20150209_12.png)
