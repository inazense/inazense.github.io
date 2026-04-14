---
title: Entornos de desarrollo. SVN con Assembla y Tortoise
description: Introducción a SVN como sistema de control de versiones, con tutorial paso a paso para crear un repositorio en Assembla y conectarlo con TortoiseSVN.
author: Inazio Claver
date: 2015-04-29 12:00:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, svn, control-de-versiones, assembla, tortoisesvn]
pin: false
math: false
mermaid: false
---

SVN es el control de versiones. Nos permite compaginar diferentes programadores, ramas de desarrollo y versiones finales.

Tiene un ciclo de vida conocido como **Trunk** (tronco), del que salen distintas **branches** (ramas). Los pasos a seguir serían bajarse el proyecto entero, y generar mi propia rama con las funciones que me han sido encargadas. Mientras tanto, el proyecto principal puede seguir avanzando.

![Diagrama Trunk/Branches en SVN](/img/posts/20150429_1.png)

Cuando se ha conseguido una versión estable se crearán **tags** (etiquetas), que son versiones finales dentro de un mismo proyecto. Es decir, que no se modificarán.

## Operaciones principales

**Operaciones de descarga:**
- **Checkout** — Descargarse el proyecto completo.
- **Update** — Descarga sólo los archivos que han sido modificados o los nuevos.

**Operaciones de carga:**
- **Commit** — Sube los ficheros que han sido creados o modificados al servidor.

## Crear un repositorio en Assembla

Vamos a crear un nuevo proyecto. Nos registramos en assembla.com.

![Página de Assembla](/img/posts/20150429_2.png)

Nos vamos a la sección de crear espacio.

![Sección de nuevo espacio en Assembla](/img/posts/20150429_3.png)

Pulsamos en **START MY 15 DAYS FREE TRIAL**.

![Botón Start My 15 Days Free Trial](/img/posts/20150429_4.png)

Asignamos un nombre al nuevo espacio.

![Nombre del espacio en Assembla](/img/posts/20150429_5.png)

Seleccionamos **Add a Subversion Repository**.

![Selección de Add a Subversion Repository](/img/posts/20150429_6.png)

Por último pulsamos **Go To My Space**.

![Botón Go To My Space](/img/posts/20150429_7.png)

Página principal del proyecto:

![Página principal del proyecto en Assembla](/img/posts/20150429_8.png)

La URL de checkout se obtiene aquí:

![URL de checkout en Assembla](/img/posts/20150429_9.png)

Menú con las opciones disponibles:

![Menú de opciones del repositorio](/img/posts/20150429_10.png)

## Conectar con TortoiseSVN

Para realizar un checkout, descargamos TortoiseSVN desde http://tortoisesvn.net/downloads.html. En su instalación marcamos la opción de instalar la consola de comandos.

![Instalación de TortoiseSVN con opción de consola](/img/posts/20150429_11.png)

Nos creamos una carpeta local a la que volcar el proyecto.

![Carpeta local para el proyecto](/img/posts/20150429_12.png)

Dentro de esta carpeta hacemos **Botón derecho > SVN CheckOut**.

![Menú contextual SVN CheckOut](/img/posts/20150429_13.png)

Escribimos la URL obtenida al crear nuestro sitio en Assembla.

![URL de Assembla en TortoiseSVN](/img/posts/20150429_14.png)

Nos identificamos introduciendo usuario y contraseña y se generará la estructura de la web de Assembla dentro de nuestra carpeta en local. Ya podemos trabajar con estos archivos.
