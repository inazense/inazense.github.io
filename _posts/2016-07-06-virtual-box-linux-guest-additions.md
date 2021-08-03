---
layout: post
title: VirtualBox, Lubuntu y sus Guest Additions
categories: Sistemas
---

Desde siempre me ha gustado trastear con Linux, más concretamente con Fedora y, por motivos de trabajo, con Ubuntu. Como en mi portatil tengo un Windows y no me apetece hacer una instalación dual, siempre he funcionado con máquinas virtuales, pero odio que aunque le asigne 2GB de RAM vayan absurdamente lentas, y más con las nuevas versiones de estos dos sistemas (aunque bueno, Fedora 24 es bastante pasable en cuanto a requisitos se refiere).<br><br>

El caso es que en la ONG donde estoy como voluntario, Reciclaje Tecnológico, quería enseñar a un chico a hacer una instalación desde cero con un Ubuntu, pero los equipos que disponemos son de bajas prestaciones (rondan los 512MB de RAM y Pentium IV de procesador), así que nos decantamos por una distro que consumiera pocos recursos.<br><br>

Probé varias en mi máquina virtual y la que más me enamoró fue Lubuntu, que puede funcionar con un Pentium II y 128MB de RAM y cuenta con un escritorio LXDE.
Me he descargado la última versión liberada, la 16.04 LTS y la he montado en VirtualBox para trastear con ella antes de llevarsela al chico. Curiosidad profesional.<br><br>

Es una distro ligera, funciona muy bien en una emulación con 512MB de RAM y usando un único núcleo de mi CPU (Intel I5), pero hay que decir que así de entrada, viene muy pelada de software sobre todo en comparación con su bien nutrido hermano Ubuntu. Eso me viene al pelo porque así aprovecharé y le puedo enseñar al chico a instalar software necesario desde la terminal, pero hubo una cosa que me molestó mucho al realizar la virtualización.<br><br>

Las Guest Additions.<br><br>

Por defecto, en mi portatil el SO se veía tal que así

![Linux guest additions]({{ site.baseurl }}/images/posts/linux-guest-additions-1.png)

Si os fijais no puedo visualizar el escritorio completo, tengo que usar los scrollbars tanto verticales como horizontales. Es una porquería, pero basta con instalar las Guest Additions de VirtualBox yendo a Dispositivos - Instalar Guest Additions y la cosa queda solucionada.<br><br>

El problema viene cuando tu sistema operativo está tan pelado que no incluye los paquetes necesarios para instalarlas.<br><br>

Y ahí es donde quería llegar yo.

## ¿Cómo instalar Guest Additions en Virtual Box con una máquina virtual de Lubuntu?

Lo primero es irnos a *Dispositivos - Instalar Guest Additions* (¡sin instalarlas!)

![Linux guest additions]({{ site.baseurl }}/images/posts/linux-guest-additions-2.png)

Después de eso, deberemos abrir una terminal e instalar el compilador C++ y el paquete Make.<br>
Eso se hace con los siguientes comandos

{% highlight bash %}
sudo apt-get install gcc
sudo apt-get install make
{% endhighlight %}

Una vez que estén instalados, solo nos quedará ejecutar el paquete de las Guest Additions desde la terminal, en mi caso. Debemos acceder a la ruta /media/nombreDeTuUsuario/VBoxAdditions... <br>
y ejecutaremos el paquete de instalación de la siguiente forma

{% highlight bash %}
sudo ./VBoxLinuxAdditions.run
{% endhighlight %}

En mi máquina virtual por ejemplo quedaría tal que así (click para ampliar)

{% highlight bash %}
sudo ./VBoxLinuxAdditions.run
{% endhighlight %}

Hecho ese último paso, solo nos queda reiniciar la máquina virtual y podremos disfrutar del resultado final a pantalla completa

![Linux guest additions]({{ site.baseurl }}/images/posts/linux-guest-additions-3.png)

Esta entrada no tiene mucho que ver con las anteriores de programación, pero considero basatnte útil saber personalizar y estar a gusto en tu máquina virtual. <br>
Espero que os haya servido

### Editado:

Hay alguna vez que también es necesario instalar los fuentes del kernel para poder usar las Guest Additions correctamente.<br>
Para ello debemos escribir en la terminal la siguiente línea

{% highlight bash %}
sudo apt-get install linux-source
{% endhighlight %}

**¡Salud y coding!**