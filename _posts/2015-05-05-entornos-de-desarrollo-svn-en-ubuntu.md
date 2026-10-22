---
title: "Subversion (SVN) en Ubuntu desde la terminal"
description: "Cómo instalar Subversion en Ubuntu y trabajar desde la terminal con un repositorio de Assembla: svn checkout, add, commit y update."
author: Inazio Claver
date: 2015-05-05 12:00:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, svn, subversion, ubuntu, control-de-versiones]
redirect_from:
  - /2015/05/entornos-de-desarrollo-svn-en-ubuntu.html
---

*Parte de la serie «SVN» (II).*

Vamos a empezar a trabajar en Ubuntu con las SVN. Para ello necesitamos el paquete subversion:

```
sudo apt-get install subversion
```

![Instalación del paquete subversion](/img/posts/20150505_1.png)

Para trabajar con ello, creamos una nueva carpeta. Yo la he llamado `proyectoSVN`:

```
mkdir proyectoSVN
```

Y escribimos el siguiente comando para acceder al checkout de nuestro proyecto:

```
svn checkout https://subversion.assembla.com/svn/damprueba/
```

Nos pedirá al principio clave de usuario. Pulsamos enter sin escribir nada e ingresamos el usuario y contraseña de nuestro SVN de Assembla.

![Petición de credenciales de Assembla](/img/posts/20150505_2.png)

De este modo comenzará la descarga del proyecto.

![Descarga del proyecto](/img/posts/20150505_3.png)

Creamos un archivo con `touch` por ejemplo, y para añadir un archivo usamos el comando:

```
svn add archivoASubir
```

![Añadir archivo al repositorio](/img/posts/20150505_4.png)

Posteriormente confirmamos la operación con el comando:

```
svn commit
```

![Confirmación del commit](/img/posts/20150505_5.png)

Para evitar que salga el nano indicando los cambios, escribimos un mensaje con el parámetro `-m`:

```
svn commit -m "Nuevo archivo dentro de la carpeta imagenes"
```

Ahora, para actualizar los nuevos cambios si otros usuarios los han subido, hacemos un:

```
svn update
```

![Actualización de los cambios](/img/posts/20150505_6.png)

Y siempre podemos comunicarnos con los cambios. ¡Que felicidad! :)
