---
title: Entornos de desarrollo / Lenguaje de marcas. PHPMyAdmin (I)
description: Configuración inicial de PHPMyAdmin en Hostinger y Ubuntu. Creación de base de datos MySQL, importación de datos y conexión desde C con la API de MySQL.
author: Inazio Claver
date: 2014-12-09 13:34:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, phpmyadmin, mysql, c, ubuntu]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Vamos a ver como conectar una base de datos con un programa hecho en C. Pero primero, necesitamos algunos pasos previos.

## Configuración en Hostinger

Lo primero que haremos será ingresar en nuestro panel de administración del sitio web, en mi caso montado en Hostinger.

![Panel de administración de Hostinger](/img/posts/20141209_1.png)

Veremos entre otras, estas opciones.

![Opciones del panel](/img/posts/20141209_2.png)

Bajamos hasta la sección de bases de datos y seleccionamos MySQL Bases de datos de MySQL.

![Sección bases de datos MySQL](/img/posts/20141209_3.png)

Iremos a la siguiente página, donde crearemos una nueva base de datos. En mi caso, con4, con usuario con4 (la contraseña no la digo, desolé).

![Creación de nueva base de datos](/img/posts/20141209_4.png)

Pulsamos en Crear y veremos que en el panel lateral izquierdo, en la sección de bases de datos, tenemos una categoría llamada phpMyAdmin. Pulsamos sobre ella.

![phpMyAdmin en el panel lateral](/img/posts/20141209_5.png)

Nos llevará a la sección del administrador de PHP de nuestro host, y pulsamos en Ingresar phpMyAdmin.

![Ingresar phpMyAdmin](/img/posts/20141209_6.png)

Después de lo cual veremos esta pantalla.

![Pantalla del administrador phpMyAdmin](/img/posts/20141209_7.png)

Esto es el panel de administración. ¡Al tajo!

![Panel de administración phpMyAdmin](/img/posts/20141209_8.png)

Ya estamos aquí. Vamos a importar y subimos un `.sql` para poder trabajar usando un ejemplo. He usado el archivo `.sql` del post anterior.

Para importar, pulsaremos ¿adivinas? Importar.

![Sección Importar](/img/posts/20141209_9.png)

Importamos, y si ha sido correcta saldrá el siguiente mensaje.

![Mensaje de importación correcta](/img/posts/20141209_10.png)

Si por un casual queremos hacer consultas, vamos a la sección de SQL.

![Sección SQL](/img/posts/20141209_11.png)

Y si te das cuenta, en el menú lateral izquierdo vemos las tablas creadas.

![Menú lateral con tablas creadas](/img/posts/20141209_12.png)

## Conexión desde C a MySQL

Bien, una vez hecho esto, tenemos que saber ciertas cosas. Para conectarnos a una base de datos desde C, necesitaremos la API de C para MySQL, con lo que deberemos cargar ciertas librerías, y usar determinadas funciones.

Las librerías a incluir son:

```c
#include <my_global.h>
#include <mysql.h>
```

**Funciones:**

**`mysql_init()`** — Inicializa los parámetros para poder conectarse a la base de datos.

**`mysql_real_connect()`** — Nos conecta a la base de datos. Deberemos pasarle, como parámetros, un nombre de host, un usuario y una contraseña, como obligatorios, más luego X parámetros voluntarios, como puerto, por ejemplo.

## Configuración en Ubuntu

Ahora, para comenzar practicando, lo haremos desde Ubuntu.

Deberíamos instalar el LAMP, para tener Apache y demás, pero realmente sólo necesitamos estos dos paquetes:

- `build-essential`
- `mysql-server`

Cuando instalemos `mysql-server`, nos pedirá una contraseña. Por defecto, yo he elegido la misma para todas, root.

![Instalación de build-essential y mysql-server](/img/posts/20141209_13.png)

![Contraseña de mysql-server](/img/posts/20141209_14.png)

Una vez instalados estos dos paquetes, instalaremos el administrador de PHP:

- `phpmyadmin`

Marcamos apache como servidor predeterminado.

![Selección de Apache como servidor](/img/posts/20141209_15.png)

![Confirmación de selección](/img/posts/20141209_16.png)

Accedemos a que se configure la base de datos por defecto para empezar a trabajar.

![Configuración de base de datos](/img/posts/20141209_17.png)

Y volvemos a escribir las contraseñas de usuario, root, para variar.

![Contraseña de usuario](/img/posts/20141209_18.png)

![Confirmación de contraseña](/img/posts/20141209_19.png)

![Instalación completada](/img/posts/20141209_20.png)

Hasta aquí nos hemos quedado. Mañana seguiremos ya una vez que tenemos la configuración inicial.

**¡Salud y coding!**
