---
title: Sistemas informáticos. Windows Server 2008. Instalación
description: Guía paso a paso para crear una máquina virtual con Windows Virtual PC e instalar Windows Server 2008 Enterprise.
author: Inazio Claver
date: 2015-04-08 12:00:00 +0800
categories: [Sistemas]
tags: [sistemas-informaticos, windows-server, virtualizacion, instalacion]
pin: false
math: false
mermaid: false
---

Llegué tarde porque tuve que ir a que me desangrarán un poco (¿banco? no, fueron análisis en el médico) y me tuve que poner al día aprisa y corriendo.

Empezamos nueva unidad, en la que trabajaremos con los servicios que ofrece Windows Server 2008 R2, y claro, el primer paso consiste en instalarlo, que si no mal vamos...

Pensé que lo haríamos con VirtualBox, pero al parecer usamos Windows Virtual PC. Como no recordaba muy bien como se crea una máquina virtual ahí, voy a colgar primero las capturas de ello, y posteriormente paso a la instalación.

## Creación de máquina virtual con VirtualPC

Vamos a Inicio y buscamos Windows Virtual PC.

![Windows Virtual PC en el menú Inicio](/img/posts/20150408_1.png)

Lo abrimos y pulsamos sobre *Crear Máquina Virtual*.

![Botón Crear Máquina Virtual](/img/posts/20150408_2.png)

Le indicamos un nombre y una ubicación para nuestra máquina virtual, que yo dejé por defecto.

![Nombre y ubicación de la máquina virtual](/img/posts/20150408_3.png)

Agregamos la cantidad de memoria RAM que le deseamos poner (sólo 1GB porque el equipo de clase si no irá muy justillo).

![Configuración de memoria RAM](/img/posts/20150408_4.png)

Y ya está hecha nuestra máquina virtual. ¿Rápido, no?

El problema es que no hemos indicado método para instalar el SO. Arrancamos nuestra nueva máquina virtual y vamos a *Herramientas - Configuración*.

![Menú Herramientas - Configuración](/img/posts/20150408_5.png)

Nos vamos a unidad de DVD y le indicamos la ruta de nuestra ISO con el sistema operativo.

![Configuración de la unidad de DVD con la ISO](/img/posts/20150408_6.png)

Aceptamos y reiniciamos la máquina. A continuación comenzará la instalación del SO.

## Instalación del sistema operativo

![Inicio de la instalación de Windows Server 2008](/img/posts/20150408_7.png)

![Selección de idioma y teclado](/img/posts/20150408_8.png)

Bueno, pequeño inciso: la versión que instalaremos será *Windows Server 2008 Enterprise (instalación completa)*.

![Selección de versión Windows Server 2008 Enterprise](/img/posts/20150408_9.png)

![Aceptación de licencia](/img/posts/20150408_10.png)

![Tipo de instalación personalizada](/img/posts/20150408_11.png)

Dejamos todo el tamaño del disco (es dinámico, tranquilos que no gastaré tanto espacio).

![Selección del disco y partición](/img/posts/20150408_12.png)

Y a esperar...

![Progreso de la instalación](/img/posts/20150408_13.png)

![Reinicio durante la instalación](/img/posts/20150408_14.png)

Cuando realicé el primer arranque nos pedirá cambiar la contraseña del administrador. Le damos una nueva y pulsamos sobre la flecha para entrar en el escritorio del Administrador.

![Petición de cambio de contraseña del administrador](/img/posts/20150408_15.png)

![Estableciendo nueva contraseña](/img/posts/20150408_16.png)

![Confirmación del cambio de contraseña](/img/posts/20150408_17.png)

![Inicio de sesión con la nueva contraseña](/img/posts/20150408_18.png)

Y ya está, en cuanto veamos esta pantalla sabremos que lo hemos hecho correctamente.

![Escritorio de Windows Server 2008 con el Administrador del servidor](/img/posts/20150408_19.png)

![Pantalla final de bienvenida del servidor](/img/posts/20150408_20.png)

En siguientes entradas hablaremos de las primeras configuraciones.
