---
title: VirtualBox, Lubuntu y sus Guest Additions
description: Como manejar las guest additions de virtual box con sistemas Linux
author: inazense
date: 2016-07-06 15:54:00 +0100
categories: [Sistemas Operativos]
tags: [virtualbox, linux]
image:
  path: /assets/pictures/posts/sistemasoperativos_logo.jpeg
  alt: Sistemas Operativos post
---

Desde siempre me ha gustado trastear con Linux, más concretamente con Fedora y, por motivos de trabajo, con Ubuntu. Como en mi portatil tengo un Windows y no me apetece hacer una instalación dual, siempre he funcionado con máquinas virtuales, pero odio que aunque le asigne 2GB de RAM vayan absurdamente lentas, y más con las nuevas versiones de estos dos sistemas (aunque bueno, Fedora 24 es bastante pasable en cuanto a requisitos se refiere).

El caso es que en la ONG donde estoy como voluntario, Reciclaje Tecnológico, quería enseñar a un chico a hacer una instalación desde cero con un Ubuntu, pero los equipos que disponemos son de bajas prestaciones (rondan los 512MB de RAM y Pentium IV de procesador), así que nos decantamos por una distro que consumiera pocos recursos.

Probé varias en mi máquina virtual y la que más me enamoró fue Lubuntu, que puede funcionar con un Pentium II y 128MB de RAM y cuenta con un escritorio LXDE.
Me he descargado la última versión liberada, la 16.04 LTS y la he montado en VirtualBox para trastear con ella antes de llevarsela al chico. Curiosidad profesional.

Es una distro ligera, funciona muy bien en una emulación con 512MB de RAM y usando un único núcleo de mi CPU (Intel I5), pero hay que decir que así de entrada, viene muy pelada de software sobre todo en comparación con su bien nutrido hermano Ubuntu. Eso me viene al pelo porque así aprovecharé y le puedo enseñar al chico a instalar software necesario desde la terminal, pero hubo una cosa que me molestó mucho al realizar la virtualización.

Las Guest Additions.

Por defecto, en mi portatil el SO se veía tal que así

![lubuntu en virtual box 1](/assets/pictures/posts/vbox_1.png)

Si os fijais no puedo visualizar el escritorio completo, tengo que usar los scrollbars tanto verticales como horizontales. Es una porquería, pero basta con instalar las Guest Additions de VirtualBox yendo a Dispositivos - Instalar Guest Additions y la cosa queda solucionada.

El problema viene cuando tu sistema operativo está tan pelado que no incluye los paquetes necesarios para instalarlas.

Y ahí es donde quería llegar yo.

## ¿Cómo instalar Guest Additions en Virtual Box con una máquina virtual de Lubuntu?

Lo primero es irnos a `Dispositivos - Instalar Guest Additions` (¡sin instalarlas!)

![lubuntu en virtual box 2](/assets/pictures/posts/vbox_2.png)

Después de eso, deberemos abrir una terminal e instalar el compilador C++ y el paquete Make.
Eso se hace con los siguientes comandos

```bash
sudo apt-get install gcc
sudo apt-get install make
```

Una vez que estén instalados, solo nos quedará ejecutar el paquete de las Guest Additions desde la terminal, en mi caso. Debemos acceder a la ruta `/media/nombreDeTuUsuario/VBoxAdditions`... 
y ejecutaremos el paquete de instalación de la siguiente forma

```bash
sudo ./VBoxLinuxAdditions.run
```

En mi máquina virtual por ejemplo quedaría tal que así:

```bash
inazio@lubuntuVirtual:/media/inazio/VBOXADDITIONS_%.0.24_108355$ sudo ./VBoxLinuxAdditions.run
```

Hecho ese último paso, solo nos queda reiniciar la máquina virtual y podremos disfrutar del resultado final a pantalla completa

![lubuntu en virtual box 3](/assets/pictures/posts/vbox_3.png)

Esta entrada no tiene mucho que ver con las anteriores de programación, pero considero basatnte útil saber personalizar y estar a gusto en tu máquina virtual. Espero que os haya servido

**Editado:**

Como ha dicho Anónimo en los comentarios, hay alguna vez que también es necesario instalar los fuentes del kernel para poder usar las Guest Additions correctamente.<br>
Para ello debemos escribir en la terminal la siguiente línea

```bash
sudo apt-get install linux-source
```

**¡Salud y coding!**
