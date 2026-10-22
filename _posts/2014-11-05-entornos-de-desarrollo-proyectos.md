---
title: "Proyectos en C con varios ficheros y una librería propia"
description: "Cómo organizar un proyecto en C en varios ficheros (main.c, cabecera .h e implementación), incluir una librería propia y compilarlo, con el juego Conecta 4."
date: 2014-11-05 00:00:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos de desarrollo, codeblocks, c, proyectos, gcc]
redirect_from:
  - /2014/11/entornos-de-desarrollo-proyectos.html
---

Estamos creando un proyecto en CodeBlocks, el juego de Conecta 4. Posteriormente subiré el código completo, pero ahora voy a centrarme en lo nuevo que hemos visto.

## Estructura de archivos

El proyecto se organiza en tres ficheros:

- **`main.c`** — contiene la función `main` y las llamadas a las bibliotecas
- **`conecta4lib.h`** — fichero de cabecera con los `#define` y las declaraciones de funciones
- **`conecta4lib.c`** — fichero con la implementación (definición) de todas las funciones

## Inclusión de la librería propia

Para incluir una librería creada por nosotros, la sintaxis difiere de las librerías estándar: se usan comillas dobles en lugar de ángulos:

```c
#include "conecta4lib.h"
```

## Compilación con múltiples archivos fuente

Para compilar un proyecto con varios archivos fuente, debemos indicar al compilador todos los ficheros `.c` que necesitemos:

![Compilación con gcc de varios archivos fuente](/img/posts/20141105_1.png)

El fichero `.h` no se compila por separado, ya que tanto `main.c` como `conecta4lib.c` ya lo incluyen directamente.
