---
title: Entornos de desarrollo. Desarrollo de software (IV)
description:
date: 2014-10-15 23:27:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos de desarrollo, codeblocks, c, compilacion, compilador, gcc]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Compilaciones

![Subfases de la compilación](/img/posts/20141015_1.jpg)

Entre el código fuente y el código ejecutable está el CÓDIGO OBJETO. Tiene todas las instrucciones que necesita el compilador pero no tiene las librerías necesarias.

Del código fuente al código objeto es la compilación propiamente dicha.

Después hay un proceso llamado enlazado, que no lo hace el compilador sino el enlazador, que aúna las librerías predefinidas en el sistema con el código objeto de nuestro programa.

Las librerías también tienen su código fuente, por lo que son compilables.

Eso en los lenguajes compilados

En los lenguajes como JAVA el proceso se queda en la compilación propiamente dicha, no pasa del código abierto.

## Subfases de la compilación

- Análisis léxico (léxico gráfico). Analiza los caracteres de nuestro código fuente analizando las palabras reservadas. Ej: `inta=3;`
- Análisis sintáctico (sintáctico semántico). Ej: `int a=3` (falta ;)
- Código intermedio
- Optimizador de código fuente
- CÓDIGO OBJETO
- Enlazado con las librerías
- Creación del ejecutable

## CodeBlocks

Es un entorno de desarrollo gratuito para C, C++ y Fortran IDE

![CodeBlocks instalación](/img/posts/20141015_2.png)

En el ejecutable, instalar las opciones por defecto.

Y lo ejecutamos.

![Ejecutando el instalador](/img/posts/20141015_3.png)

Nos aparecerá la siguiente pantalla.

![Pantalla de detección del compilador](/img/posts/20141015_4.png)

Ha detectado el compilador de GCC que tenemos instalado, así que perfecto (si no lo descargamos con el MinGW, por ejemplo).

Nos abrirá el programa y preguntará la acción a realizar por defecto con las extensiones de archivos.

![Pregunta sobre extensiones de archivos](/img/posts/20141015_5.png)

Y este es el aspecto del programa en sí.

![Aspecto de CodeBlocks](/img/posts/20141015_6.png)

Creamos un fichero nuevo, vacío. Para ello, vamos a **File → New → Empty File**

![Crear fichero nuevo vacío](/img/posts/20141015_7.png)

Y lo guardamos.

![Guardar fichero](/img/posts/20141015_8.png)

Al empezar a escribir vemos que nos autocompletará los comandos.

![Autocompletado de comandos](/img/posts/20141015_9.png)

Vamos a escribir nuestro primer programa, el "hola mundo" de toda la vida.

Vamos a **Settings → Compiler**

![Settings Compiler](/img/posts/20141015_10.png)

Vamos a la opción de **global compiler settings → Toolchain executables** y modificamos la linea de **Linker for dynamic libs** por la misma de **C compiler**

![Toolchain executables](/img/posts/20141015_11.png)

Compilamos el código pulsando F9 o dándole a éste botón.

![Resultado de compilación](/img/posts/20141015_12.png)

Nos aparece el tiempo de ejecución que le ha costado.
