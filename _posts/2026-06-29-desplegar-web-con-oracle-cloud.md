---
title: Desplegar una web con Oracle Cloud. Desde cero y paso a paso
description: Aprender cómo desplegar una web con frontend y backend en Oracle Cloud paso a paso
author: Inazio Claver
date: 2026-06-29 18:00:00 +0200
categories: [Web,Sistemas]
tags: [web,sistemas,oracle,deploy,redes]
pin: false
math: false
mermaid: false
---

# Desplegar una web con Oracle Cloud paso a paso

Durante los últimos meses hemos estado programando un buscador centralizado de gasolineras en España, pudiendo filtrar por distancia, precios de combustibles, nombres de gasolinera, ubicación, ciudad, código postal.

Aprovecho para presentaros __[AhorroGasolina.com](http://ahorrogasolina.com)__

![AhorroGasolina.com](/img/posts/20260629_1.png)

Y claro, una vez programado, testeado, recontracomprobado todo, comprado incluso el dominio... surgió una duda. ¿Dónde narices desplegamos esto? Porque sí, la web funciona de maravilla, es realmente útil... pero tampoco quiero gastarme dinero en un proyecto que no va a recibir, al menos de momento, una retribución económica. Y un conocido presentó la solución, [Oracle Cloud Always Free](https://www.oracle.com/es/cloud/free), la solución de hosting y despliegue 100% gratuita de Oracle para proyectos personales.

¿Es la más rápida? NO. ¿Es la mejor? NO. ¿Hay que pagar por ello? ROTUNDAMENTE NO. Y eso me parece algo maravilloso. 

Así que para rematar toda la odisea que ha sido programar una web como __[AhorroGasolina.com](http://ahorrogasolina.com)__, os dejo un tutorial sobre __como desplegar una web en Oracle Cloud paso a paso__.

# Crear el entorno en Oracle Cloud

## Requisitos previos

Para esta tarea, voy a partir de dos supuestos. El primero, que vuestra aplicación web está dockerizada para poder implementar __Coolify__, tanto el backend como el frontend.

El segundo supuesto, y aún más importante si cabe, que os habéis creado ya una cuenta en __Oracle Cloud Always Free__. Si no la tenéis aún, seguid [este enlace](https://www.oracle.com/es/cloud/free) para crearla.

A partir de ahora, ya podremos trabajar para levantar tranquilamente una máquina virtual en nuestra instancia de Oracle.

## Crear VCN (Virtual Cloud Network)

Lo primero de todo, antes de crear cualquier instancia, va a ser comprobar que tenemos una VCN que sea capaz de suministrarnos posteriormente una IP pública a la que enlazaremos nuestro dominio web.

Para ello, nos vamos, en el menú lateral izquierdo, a `Networking -> Virtual Cloud Networks`.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_2.png)

Pulsamos en __Actions -> Start VCN Wizard__ y elegimos `Create VCN with Internet Connectivity`. Esto creará automáticamente la __VCN__, una __subnet pública__ y las __tablas de enrutamiento__ necesarias

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_3.png)

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_4.png)

En los campos que nos aparezcan, simplemente configuramos nuestro nombre identificativode __VCN__, dejamos el resto por defecto y pulsamos `next`.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_5.png)

Pasaremos a una zona de `Review and Create` donde debemos comprobar que se ha generado todo correctamente y pulsamos sobre `View VCN`. Con esto ya tenemos generada nuestra __VCN__ y podemos proseguir levantando la instancia de la máquina virtual.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_6.png)

## Creación de instancia de máquina virtual

Para el segundo paso, que será crear una __máquina virtual__ donde alojar nuestra aplicación dockerizada.

De nuevo en el menú lateral izquierdo, nos vamos a `Compute -> Instances` y seleccionamos `Create instance`.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_7.png)

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_8.png)

Rellenamos la información básica, como su nombre y el compartimento donde crearlo, que será por defecto nuestro usuario root, y seleccionamos el dominio que nos aparezca disponible, sin modificarlo.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_9.png)

En la sección de `Advanced Options` elegimos `On-demand capacity` que, de nuevo, es la opción gratuita. Si quisieramos algo más serio esta configuración podría llegar a quedarsenos corta, según nuestro flujo de uso posterior.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_10.png)

Hecho esto, vamos a pasar a configurar la parte de requisitos de nuestra __máquina virtual__. Por defecto la __imagen de SO__ es __Oracle Linux__ pero, y esto es muy importante, si al igual que yo quieres desplegar con __Docker__ y __Coolify__, debes cambiarlo a __Ubuntu__/__Debian__/__CentOS__, ya que __Oracle Linux__ no se encuentra entre los sistemas soportados. Dicho lo cual, si te quieres lanzar con ese sistema operativo debes saber que tienes una herramienta equivalente llamada `iptables-services`. 

En mi caso usaremos la imagen de **Ubuntu** en su versión 22.04 **minimal aarch64**. El motivo es sencillo, la versión Always Free de Oracle corre con una arquitecta de shape **Ampere A1** y la versión **minimal aarch64** es la única que lo soporta sin ningún tipo de incompatibilidad registrado.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_11.png)

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_12.png)

En la sección de **Shape**, tal y como hemos comentado, vamos a elegir la opción de **Ampere A1 Flex**, que es la opción de `Always-Free-eligible` e incluye 1 core, 6GB de memoría y **1 Gbps de ancho de banda**.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_13.png)

Configurado esto, pulsamos `Next` en la esquina inferior derecha y vamos a la sección de seguridad. Aquí vamos a dejar los valores por defecto, sin activar, ya que no tienen mucho sentido para nuestra página web, pero aún así me detengo brevemente a explicarte.

Tenemos dos opciones, la primera de **Shield Instance** se dedica a proteger contra malware a nivel de firmware/bootloader, y es demasiado excesiva para una aplicación como ésta. La segunda opción es un **cifrado de memoria RAM** pero que puede llegar a provocar incompatibilidades con **Coolify** y, en el caso de que eso suceda, habrá que volver a levantar desde cero toda la instancia ya que no se permite la edición de éstas configuraciones a posteriori una vez creada la **VM**.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_14.png)

Pasamos a la siguiente opción. `Primary VNIC`(virtual network interface card) es una instancia de la red privada donde vivirá nuestra __máquina virtual__. Digamos que sería el equivalente a una red local pero en el ecosistema de __Oracle Cloud__. De esta manera se consigue aislar los recursos del resto de clientes Oracle (aunque seguro que eso ya lo sabías si has llegado hasta aquí, pero quedan bonitas estas notas aclaratorias, ¿no te parece?).

¿Qué es lo que vamos a hacer nosotros aquí? Basicamente dejarlo todo en automático para intentar romper el menor número posible de cosas.

Como __Primary Network__ vamos a elegir `Create new virutal cloud network`y mantenemos los valores que nos dé por defecto.

![Oracle Cloud Always Free paso a paso](/img/posts/20260629_15.png)

Con la __Subnet__ hacemos lo mismo, que la cree automáticamente (que tampoco tenemos opción, vaya) y, por último, como __asignación de IPv4__ seleccionamos la opción `Automatically assign public IPv4 address`

**¡Salud y coding!**