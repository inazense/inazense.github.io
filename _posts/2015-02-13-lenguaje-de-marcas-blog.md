---
title: Lenguaje de marcas. Blog
description: Ejercicio de creación de un blog dinámico con PHP y PHPMyAdmin.
author: Inazio Claver
date: 2015-02-13 12:00:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguajes-de-marcas, php, html, blog]
pin: false
math: false
mermaid: false
redirect_from:
  - /2015/02/lenguaje-de-marcas-blog.html
---

Vamos a realizar un blog.

Para ello, nos conectamos a PHPMyAdmin y generamos una tabla con los siguientes valores:

![Tabla en PHPMyAdmin](/img/posts/20150213_1.png)

Abrimos NetBeans y creamos un proyecto nuevo. Necesitaremos los siguientes ficheros:

- `index.php`
- `insertarEntrada.php` (contiene un formulario con campos de título y cuerpo, y un botón de enviar)

El resultado de ejecutar la consulta se mostrará en diferentes artículos. El código de `index.php` seguirá esta estructura:

```html
<article>
     <h1>$titulo</h1>
     <p>$cuerpo</p>
     <p>$fecha</p>
</article>
```

Será contenido dinámico dentro de código estático, usando un bucle para mostrar las distintas entradas.

![Código index.php en NetBeans](/img/posts/20150213_2.png)

Estoy teniendo muchos problemas con el NetBeans. He tenido que reiniciar, me he desenganchado de la explicación, no puedo acceder al FTP para copiar lo que han hecho hasta ahora y ponerme al día y me está entrando muy mala hostia.

Voy a atender a lo que pueda y seguiré con este ejercicio en cuanto pueda conseguir acceso.
