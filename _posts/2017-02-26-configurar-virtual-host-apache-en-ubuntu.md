---
title: Configurar Virtual Host Apache en Ubuntu
description: Guía completa paso a paso para configurar Virtual Host de Apache en Ubuntu 16.04. Aprende a crear múltiples sitios web locales con dominios personalizados, configurar DNS local y gestionar permisos correctamente
author: Inazio Claver
date: 2017-02-26 12:10:00 +0800
categories: [Sistemas]
tags: [apache, ubuntu, virtual-host, linux, dns, servidor-web, configuracion]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Hace poco tiempo se estropeo mi ordenador y decidí que era el momento idóneo para dar el salto a una plataforma **Linux**. He tonteado mucho con ello pero nunca lo había tomado realmente en serio y, por considerarme 'primerizo' opté por la última **versión LTS de Ubuntu**, la **16.04**.

El cambio no ha sido muy grande en rasgos generales, pero cuando te orientas a algo más especializado, como la programación web por ejemplo, si que he tenido ciertas dificultades para dejar todas las configuraciones como yo quería. Aquí voy a explicar como hacer una de ellas, los **host virtuales de Apache**.

**Apache** es el servidor web más popular actualmente y permite una flexibilidad asombrosa a la hora de realizar sus configuraciones. Como tengo varios proyectos en mente, me interesa poder emular varios dominios desde mi propio portátil directamente, trabajando como si de la raíz de la página web se tratase. Ahí es donde entran los **virtual host**.

Un **host virtual** es un mecanismo que permite tener funcionando más de un sitio web en una misma máquina. Estos sitios web podrán estar basados en diferentes direcciones IP o bien en distintos nombres de dominio. Ésta segunda manera es la forma con la que quiero trabajar.

## Pasos previos

Me vas a llamar caprichoso, pero un paso imprescindible para seguir este tutorial (el único paso, de hecho) es tener instalado **Apache2** en nuestro sistema operativo.
Para ello, te recomiendo que sigas este post de [How to forge](https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/).

## Configurando Virtual Host de Apache en Ubuntu 16.04

En este caso, vamos a configurar un nuevo host que sea _indianafotografia.local_, que será utilizado para realizar pruebas desde nuestro servidor local.
Por supuesto, siéntete libre de utilizar el dominio que desees para el virtual host, pero debes ser consciente de que si crear uno como _google.com_ éste primará sobre el acceso a la dirección real de _google.com_, y perderías el acceso a la misma. ¿Todo claro? Bien, prosigamos entonces.

### 1. Crear la estructura de directorios

Los datos de nuestra página web estarán alojados en ```/var/www```, así que deberemos crear dentro de esta ruta un nuevo directorio para nuestro virtual host, y dentro de ésta carpeta, un nuevo directorio llamado ```public_html``` (no es obligatorio, esto simplemente nos daría más flexibilidad a la hora de mantener nuestro servidor en caso de que lo queramos configurar como un servidor real sobre todo).

```bash
sudo mkdir -p /var/www/indianafotografia.local/public_html
```

No lo he comentado antes, pero todos estos pasos se realizarán desde nuestra terminal.

### 2. Permisos

Actualmente los directorios creados son propiedad de **root**, así que debemos cambiarle la propiedad a nuestro usuario actual. La variable ```$USER``` se encargará de ello, tomando el valor del usuario con el que estemos logueados actualmente.
Y también modificaremos los permisos para asegurarnos de que el acceso de lectura está habilitado en la raíz principal del directorio web general.

```bash
sudo chown -R $USER:$USER /var/www/indianafotografia.local/public_html
sudo chmod -R 755 /var/www
```

Perfecto, a partir de ahora ya podemos crear nuestro propio contenido.

### 3. Crear contenido web

Siéntete libre de crear el contenido que desees dentro de tu ```public_html```. Eso será lo que visualizaremos por pantalla. Haz algo sencillo:

```html
<!DOCTYPE html>
<html lang="es">
<head>
 <meta charset="UTF-8">
 <title>Prueba de Virtual Host</title>
</head>
<body>
 <h1>¡Este directorio funciona correctamente</h1>
</body>
</html>
```

### 4. Crear el archivo de configuración de Virtual Host

Estos archivos guardan la configuración actual de los virtual hosts e indican como se comportará el servidor apache cuando le soliciten esa página web.

Apache viene con un archivo de configuración por defecto, ```**000-default.conf**```, que podemos localizar en la ruta /etc/apache2/sites-available.

Podemos copiar este archivo en la misma ruta con el nombre de nuestro virtual host acabado en .conf, o generarlo de nuevo, lo que más se guste.

```bash
sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/indianafotografia.local.conf
```

Ahora editaremos este archivo

```bash
sudo nano /etc/apache2/sites-available/indianafotografia.local.conf
```

El documento deberá acabar teniendo este aspecto:

```xml
<VirtualHost *:80>
 ServerAdmin webmaster@indianafotografia.local
 ServerName indianafotografia.local
 ServerAlias www.indianafotografia.local
 DocumentRoot /var/www/indianafotografia.local/public_html

 ErrorLog ${APACHE_LOG_DIR}/error.log
 CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Vamos por pasos:

- **ServerAdmin**. Deberemos escribir un correo electrónico para que le lleguen los avisos al administrador. Si es para probar en local lo puedes inventar tranquilamente
- **ServerName**. El nombre de nuestro virtual host
- **ServerAlias**. Una segunda forma de acceder a nuestro virtual host. Actuará de "puntero" hacía nuestro ServerName.
- **DocumentRoot**. El directorio raíz de nuestra página web.

### 5. Habilitar el nuevo archivo de configuración 

A continuación habilitaremos nuestro nuevo archivo de configuración para el virtual host y deshabilitaremos el archivo que se incluye por defecto.
Posteriormente, deberemos reiniciar el servidor apache.

```bash
sudo a2ensite indianafotografia.loca.conf
sudo a2dissite 000-default.conf
sudo systemctl restart apache2
```

### 6. Configurando el DNS

Si estos virtual host los vas a utilizar para realizar pruebas en local deberás modificar el archivo de coniguración de tus DNS locales. Para ello, escribe:

```bash
sudo nano /etc/hosts
```

Y agregaremos la siguiente línea:

```
127.0.0.1 indianafotografia.local
```

### Comprobación final

Vamos a nuestro navegador web y escribimos ```http://indianafotografia.local```.
Si todo ha funcionado correctamente veremos nuestra página web.

![indiana fotografia local](/img/posts/20170226_1.png)

No hay ningún limite a la cantidad de virtual hosts que puedas administrar en tu máquina, así que siéntete libre de generar tantos como necesites.

**¡Salud y coding!**