---
title: Lenguajes de marcas. PHP (I)
description: Introducción a PHP. Instalación de LAMP y WAMP, variables, echo, estructuras de control (if, while, for, foreach) y arrays.
author: Inazio Claver
date: 2015-01-30 18:00:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguajes-de-marcas, php, mysql, linux]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

PHP se combinará con HTML5, CSS3, JavaScript y MySQL.

HTML, CSS y JS se ejecutarán en la parte **cliente** (el navegador), mientras que PHP y MySQL lo harán en la parte **servidor**.

Es decir, que tendremos que montarnos un servidor.

## Instalación de LAMP

Abrimos Linux y escribimos:

```
sudo apt-get install lamp-server^
```

Una vez hecho eso configuramos la contraseña para MySQL.

Y volverá a pensar otro rato. Cuando finalice la instalación probamos a ingresar desde el navegador a la dirección IP de la máquina donde hemos montado el servidor:

![Página de bienvenida de Apache en LAMP](/img/posts/20150130_3.png)

Si aparece un cartel como el de arriba, está funcionando correctamente.

## Instalación de WAMP

Primero instalaremos la librería necesaria, `vcredist`.

![Instalador de vcredist](/img/posts/20150130_4.png)

Posteriormente lanzamos el instalador del WAMP.

![Instalador de WAMP](/img/posts/20150130_5.png)

![Pasos de instalación de WAMP](/img/posts/20150130_6.png)

![Pasos de instalación de WAMP](/img/posts/20150130_7.png)

![Pasos de instalación de WAMP](/img/posts/20150130_8.png)

![Pasos de instalación de WAMP](/img/posts/20150130_9.png)

Y lo comprobamos accediendo a `localhost`.

![Comprobación de WAMP en localhost](/img/posts/20150130_10.png)

## Comandos PHP

Las variables se escriben siempre con `$`:

```php
$variable
```

Para escribir cadenas se hará con apóstrofes, y para imprimir usaremos el comando `echo`:

```php
echo "Hello world";
```

Para concatenar lo impreso por pantalla, usaremos el punto.

Si imprimimos con comillas simples nos imprimirá exactamente lo que escribimos, pero si lo hacemos con comillas dobles irá a buscar las variables. La diferencia sería de ver esto: `$cadena \n $entero \n $decimal` a ver esto: `Hola 3 2.5`.

![Variables y echo en PHP](/img/posts/20150130_11.png)

![Diferencia entre comillas simples y dobles](/img/posts/20150130_12.png)

### If

![Ejemplo de if en PHP](/img/posts/20150130_13.png)

### While

![Ejemplo de while en PHP](/img/posts/20150130_14.png)

### Arrays

![Ejemplo de arrays en PHP](/img/posts/20150130_15.png)

Visualizando por pantalla lo siguiente: `3...2...1...0..., 2.5, 2.5, 2.5, 2.5, , ,`

También podemos, dentro de un documento `index.php`, mezclar código HTML y PHP, por ejemplo, para hacer un listado del 0 al 100.

![Mezcla de HTML y PHP en index.php](/img/posts/20150130_16.png)

### For

![Ejemplo de for en PHP](/img/posts/20150130_17.png)

### Definir un array

![Definición de un array en PHP](/img/posts/20150130_18.png)

### Definir un array asociativo

![Array asociativo en PHP](/img/posts/20150130_19.png)

![Resultado del array asociativo](/img/posts/20150130_20.png)

### Foreach (for especial para vectores)

![Ejemplo de foreach en PHP](/img/posts/20150130_21.png)

**¡Salud y coding!**
