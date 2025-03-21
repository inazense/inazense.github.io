---
title: Instalación y configuración de Git en Windows
description: Cómo instalar y configurar git en Windows paso a paso
author: inazense
date: 2016-08-21 00:26:00 +0100
categories: [Git]
tags: [git, windows]
image:
  path: /assets/pictures/posts/git_logo.jpeg
  alt: Git post
---

**Git** es un programa de control de versiones diseñado por Linus Torvalds - AKA ese señor creador del kernel Linux - que fue pensado para tener una gran eficiencia y confiabilidad del mantenimiento de versiones de nuestras aplicaciones.

Es decir, **Git** lo usaremos para tener control y registrar los cambios realizados sobre uno o varios archivos a lo largo del tiempo, de modo que si la fastidias o necesitas recuperar alguna versión antigua nos resulte más sencillo que gestionando copias de nuestro código "a pelo".

**Git** está basado en un sistema de control de versiones distribuido (**DVCS** en inglés). En un **DVCS** los clientes, aparte de descargar la última instantánea de los archivos, también pueden replicar completamente el repositorio. De este modo, si un servidor muerte y los sistemas están colaborando a través de él, cualquiera de los repositorios clientes podrá copiarse en el servidor de nuevo y restaurarlo.<br>
Es decir, cada vez que hacemos una instantánea realmente estamos haciendo una copia de seguridad completa. Eso, mezclado con la enorme velocidad de **Git**, hace que trabajar sea mucho más seguro, eficiente y mantengamos siempre un control sobre nuestro software.

Para hacernos una mejor idea, observa la siguiente imagen que lo resume.

![instalación de git en windows 1](/assets/pictures/posts/git_install_1.png)

## ¿Cómo instalo Git en Windows?

Lo primero será acceder a la página oficial de Git para Windows [(https://git-for-windows.github.io/)](https://git-for-windows.github.io/) y descargarnos el ejecutable pulsando en Download.

Cuando se lance la instalación y después de haber aceptado la licencia de términos de uso y haber elegido una ruta donde instalarlo, veremos la pantalla de los componentes a instalar.

![instalación de git en windows 2](/assets/pictures/posts/git_install_2.png)

Deja todo por defecto. De esta manera se instalará **Git** en dos formatos, consola e interfaz gráfica (aunque personalmente esta última no me gusta mucho) y se asociarán los archivos de configuración `.git` a el editor de texto por defecto, además de poder ejecutar los .sh con la consola de Bash. Sí, aunque no tengamos Linux **Git** lo trabajaremos con **Bash**.

Pulsamos Next y pasaremos a la sección donde configuraremos como usar la consola de comandos de **Git**.

![instalación de git en windows 3](/assets/pictures/posts/git_install_3.png)

En este caso yo quiero usar **Git** tanto desde **Bash** como desde **CMD**, así que elijo la segunda opción. Si quieres usarlo únicamente desde **Bash**, deberás marcar la primera.

De nuevo le damos a Next y procederemos a configurar como tratará Git los finales de línea en los archivos de texto.

![instalación de git en windows 4](/assets/pictures/posts/git_install_4.png)

Dejamos la opción por defecto simplemente, para no complicarnos. Pulsamos `Next` para elegir que emulador queremos para poder usar Bash.

![instalación de git en windows 5](/assets/pictures/posts/git_install_5.png)

Elijo MinTTY, la terminal por defecto. Es más sencillo de configurar y no tiene tantas limitaciones.

Y por último habilito las dos opciones extra que me ofrece **Git**, habilitar el cache en los archivos de sistema y el administrador de credenciales.

![instalación de git en windows 6](/assets/pictures/posts/git_install_6.png)

Con estos pasos, y después de pulsar Install, ya tendremos listo en nuestra máquina **Git**. Vayamos a la segunda parte, su configuración básica.

## Cómo configurar Git

Una vez que tenemos instalado **Git**, vamos a querer hacer algunas configuraciones para personalizar su entorno. Sólo necesitamos configurarlo una vez, aunque podremos cambiarlo en cualquier momento simplemente volviendo a ejecutar los mismos comandos.

La herramienta que usaremos se llama `git config`, que nos permitirá obtener y establecer variables de configuración para el aspecto y funcionamiento de *Git*.
Dichas variables se almacenarán en sistemas Windows en _C:\Users\$USUARIO_ en un archivo llamado _.gitconfig_.

Yo me voy a centrar en configurar mi identidad, pero hay otras muchas cosas que se pueden modificar.

Lo primero será abrir nuestro **Git Bash** recién instalado.

![instalación de git en windows 7](/assets/pictures/posts/git_install_7.png)

Se nos abrirá una nueva terminal, y ya que estamos vamos a comprobar que versión de **Git** tenemos instalada escribiendo `git --version`

```bash
$ git --version
git version 2.9.3.windows.1
```

Bien, hecho esto vamos a indicarle nuestro nombre y correo electrónico. Esta parte es importante porque todos los **commits** de **Git** usarán esta información.

Escribiremos lo siguiente

```bash
git config --global user.name "Inazio Claver"
git config --global user.email inazio@programando.apasitos
```

Con la variable `--global` **Git** usará esta información para todo el sistema. Si en un momento determinado necesitas cambiar esta información para un proyecto en concreto, basta con lanzar el mismo comando sin esa variable cuando estés dentro del proyecto.

Aparte de eso también puedes configurar tu editor de texto por defecto con el siguiente comando:

```bash
git config --global core.editor MiEditor
```

Y la herramienta para diferencias por defecto, que usaremos para resolver los conflictos en los merge (cuando unamos las ramas). Se hace así

```bash
git config --global merge.tool MiHerramienta
```

Ahora sólo nos queda comprobar la configuración. Escribe el siguiente comando

```bash
git config --list
```

Veremos algo así

```bash
credential.helper=osxkeychain
init.defaultbranch=main
user.name=Inazio Claver
user.email=inazio@programando.apasitos
```

Y esto sería una configuración básica para Git. Ya estamos listos para usar nuestra herramienta de control de versiones.

Aquí no vas a aprender a manejar Git, no es el fin de este blog porque no soy un experto y, sobre todo, porque hay un libro facilitado por la propia plataforma que lo explica a las mil maravillas, **Pro Git**. Es gratuito, traducido al español, y podéis visitarlo pulsando [aquí](https://git-scm.com/book/es/v2).

**¡Salud y coding!**
