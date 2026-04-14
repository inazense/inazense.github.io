---
title: Instalar WindowBuilder en Eclipse
description: Guía paso a paso para instalar el plugin WindowBuilder en Eclipse para desarrollar interfaces gráficas Java de forma visual.
author: Inazio Claver
date: 2016-02-07 12:00:00 +0800
categories: [Java]
tags: [java, eclipse, windowbuilder, swing, gui]
pin: false
math: false
mermaid: false
---

WindowBuilder es uno de los plugins preferidos para desarrollar interfaces gráficas Java en Eclipse. Su interfaz es muy intuitiva y nos permite configurar múltiples líneas de código simplemente con clics. Eso sí, hay que tener en cuenta que a veces, según los cambios que realices en el código a mano, al abrir otra vez la perspectiva WindowBuilder ésta puede quedarse atascada.

![WindowBuilder en Eclipse](/img/posts/20160207_1.gif)

## Instalación

Para instalar WindowBuilder en Eclipse, accedemos a la web oficial de descargas:

**http://www.eclipse.org/windowbuilder/download.php**

Seleccionamos la versión que corresponde con nuestra versión de Eclipse (en el ejemplo, Mars) y copiamos la URL del repositorio.

![Selección de versión en la web de WindowBuilder](/img/posts/20160207_2.png)

En Eclipse vamos a **Help → Install New Software**, pegamos la URL en el campo "Work with" y pulsamos **Add** para añadir el nuevo repositorio con el nombre que queramos.

![Añadir repositorio en Eclipse](/img/posts/20160207_3.png)

Esperamos a que cargue el repositorio, seleccionamos todos los componentes disponibles y pulsamos **Next**.

![Seleccionar componentes de WindowBuilder](/img/posts/20160207_4.png)

![Aceptar términos de licencia](/img/posts/20160207_5.png)

Aceptamos los términos de la licencia y esperamos a que finalice la instalación. Eclipse nos pedirá que lo reiniciemos.

![Instalación en progreso](/img/posts/20160207_6.png)

## Verificación

Una vez reiniciado Eclipse, podemos comprobar que WindowBuilder está instalado correctamente creando una nueva clase: **New → Other → WindowBuilder → Swing Designer → Application Window**.

![Crear nueva Application Window con WindowBuilder](/img/posts/20160207_7.png)

Le damos un nombre a la clase y pulsamos **Finish**.

![Nombrar la clase de la ventana](/img/posts/20160207_8.png)

En el editor de código aparecerá una pestaña **Design** junto a la pestaña **Source**. Al pulsar en **Design** se abrirá la perspectiva visual de WindowBuilder con la paleta de componentes, el árbol de componentes y el panel de propiedades.

![Perspectiva Design de WindowBuilder](/img/posts/20160207_9.png)

![Paleta de componentes de WindowBuilder](/img/posts/20160207_10.png)

Aunque el código que genera WindowBuilder puede ser algo aparatoso, siempre podemos editarlo a mano cambiando a la pestaña **Source**.

![Vista Source con el código generado](/img/posts/20160207_11.png)
