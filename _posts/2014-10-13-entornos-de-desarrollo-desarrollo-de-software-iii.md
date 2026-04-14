---
title: Entornos de desarrollo. Desarrollo de software (III)
description: Lenguajes compilados vs interpretados, Java y la JVM, instalación de MinGW para compilar C en Windows, y configuración de la variable de entorno PATH.
date: 2014-10-13 14:44:00 +0800
categories: [Entornos de desarrollo]
tags: [desarrollo-software, compiladores, java, jvm, mingw, path, windows, gcc, entornos-desarrollo]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Lenguajes

Los lenguajes compilados necesitan un transformador para poder ejecutar el programa.

Los lenguajes interpretados no necesitan compilarse, se interpretan. El lenguaje HTML lo es, siendo el navegador su intérprete.

**Compilados.** Son mucho más cercanos al procesador. Habría que compilar el código fuente al ejecutable.

**Interpretados.** Siempre que tengamos el intérprete va a funcionar.

Entre medio está **Java**. Es un lenguaje tanto compilado como interpretado. Se compila una vez y se pasa por el intérprete.

Del lenguaje fuente, pasando por su compilación, conseguimos el **BYTECODE**, un código que sólo entiende el intérprete de Java: la **JVM** (Java Virtual Machine). Y posteriormente se ejecuta.

Esto significa que con una sola compilación consigue ser multiplataforma.

Estos lenguajes se llaman lenguajes de máquina virtual.

## MinGW (Minimal GNU for Windows)

Un emulador que permite compilar C en Windows.

Para una instalación básica, marcaremos las opciones de **Instalación básica de MinGW** y **Sistema base**.

![Instalación de MinGW - paso 1](/img/posts/20141013_5.png)

![Instalación de MinGW - paso 2](/img/posts/20141013_6.png)

## PATH: Variable de entorno

Alberga una serie de carpetas que nos permite ejecutar un programa estemos donde estemos.

Si lanzamos Ejecutar (`Windows+R`) y escribimos `calc`, lanzará el programa calculadora, por ejemplo.

Sin embargo, si escribimos `VirtualBox` no lo lanzará por no estar en el PATH.

### ¿Qué hay en el PATH?

Para verlo, en línea de comandos escribir:

```
echo %PATH%
```

![Resultado de echo %PATH%](/img/posts/20141013_7.png)

Si nos vamos a **Propiedades del Sistema** (`Windows+Pause`) → **Configuración avanzada del sistema** → **Variables de Entorno**:

![Variables de entorno del sistema](/img/posts/20141013_8.png)

Por ejemplo, la variable `PATHEXT` provoca que no necesitemos escribir la extensión de los archivos a ejecutar.

`%PATH%` → `%SystemRoot%` → `C:\Windows`

![Contenido de %PATH%](/img/posts/20141013_9.png)

Para poder lanzar el `gcc` y compilar es necesario crear una nueva variable del sistema.

![Crear nueva variable del sistema](/img/posts/20141013_10.png)

Hay que concatenar el PATH con la nueva variable. Para ello, vamos a editar la variable PATH y al final escribimos `;%mingw%`

![Editar variable PATH](/img/posts/20141013_11.png)

Para probar si funciona correctamente, vamos a la consola de comandos y escribimos `echo %PATH%`

![Comprobación del PATH actualizado](/img/posts/20141013_12.png)

Y la comprobación "de fuego" sería intentar realizar un `gcc -v` para ver la versión instalada.

![Resultado de gcc -v](/img/posts/20141013_13.png)

Sabemos que ha funcionado porque aparece un error pero reconociendo el programa. Si estuviese mal veríamos algo así:

*'gcc' no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.*

**¡Salud y coding!**
