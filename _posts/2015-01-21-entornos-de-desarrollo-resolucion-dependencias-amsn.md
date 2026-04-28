---
title: Entornos de desarrollo. Resolución de dependencias
description: Cómo instalar un programa compilándolo en la máquina virtual (aMSN) y cómo crear ficheros Makefile para gestionar dependencias de compilación en C.
author: Inazio Claver
date: 2015-01-21 10:09:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, linux, make, c]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Vamos a ver cómo instalar un programa compilándolo en la propia máquina virtual para lograr un mayor rendimiento, es decir, resolución de dependencias. Vamos a hacerlo con el aMSN, por ejemplo.

## MAKE

Pasos a seguir:

- `sudo apt-get install build-essentials`
- Descargar el paquete fuente desde http://www.amsn-project.net/download.php

![Descarga del paquete fuente de aMSN](/img/posts/20150121_7.png)

- Descomprimimos (`tar -xzvf archivo.tar.gz`) y desde la consola de comandos entramos en la carpeta
- Escribimos `./configure` para que compruebe el procesador y las librerías necesarias
- Si algo falta lo instalamos, y volvemos a lanzar `./configure`
- Una vez que muestre el resumen, ya podemos lanzar el programa aMSN
- Pero aún así nos metemos en dicha carpeta y escribimos `sudo make install`, que generará ejecutables y los enlazará al path
- Por fin podemos lanzarlo

![aMSN en ejecución](/img/posts/20150121_8.png)

## MAKEFILE

### Estructura de un makefile

```
VARIABLE=valor
VARIABLE=valor
VARIABLE=valor
VARIABLE=valor
# comentario
objetivo: dependencias
     comando
     comando

objetivo: dependencias
     comando
     comando
```

### Un ejemplo

```
prog.o: prog.c global.h modulo.h
     gcc -c prog.c -o prog.o

modulo.o:modulo.c modulo.h
     gcc -c modulo.c -o modulo.o

programa: modulo.o prog.o biblio.a
     gcc -o programa modulo.o  \
     prog.o biblio.a
```

No sólo sirve para programas, también para cualquier otra cosa:

```
manual.dvi: manual.tex
     latex manual.tex
```

Suponiendo que tenemos estos tres archivos:
- `main.c`
- `libreria.h`
- `libreria.c`

La forma de compilación sería la siguiente:

![Diagrama de compilación de los tres archivos](/img/posts/20150121_9.png)

Los **objetivos** serían lo que extraemos de cada orden, es decir `libreria.o`, `main.o` y `ejecutable.exe`. Las **dependencias** sería de lo que depende (valga la redundancia) cada compilación: `libreria.o` depende de `libreria.c`, `main.o` de `main.c` y `ejecutable.exe` de `main.o` y `libreria.o`.

Ahora creamos un nuevo archivo llamado `Makefile` para hacer el fichero de las dependencias. Tiene que ser con ese nombre literalmente, y no otro. Escribiremos dentro los objetivos y las dependencias de nuestro programa.

![Contenido del Makefile](/img/posts/20150121_10.png)

Es decir, el código de los programas queda tal que así:

`main.c`

![Código de main.c](/img/posts/20150121_11.png)

`libreria.c`

![Código de libreria.c](/img/posts/20150121_12.png)

`libreria.h`

![Código de libreria.h](/img/posts/20150121_13.png)

`Makefile`

![Contenido del Makefile final](/img/posts/20150121_14.png)

Con esto conseguimos hacer un código genérico que nos compile cualquier programa, cambiando tan solo su nombre y las líneas que contienen las dependencias.

**¡Salud y coding!**
