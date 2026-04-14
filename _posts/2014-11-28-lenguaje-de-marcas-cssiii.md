---
title: Lenguaje de marcas. CSS(III)
description: Creación de botones redondeados, efectos hover, transiciones CSS y estilos para tablas con ejemplos de código HTML y CSS.
author: Inazio Claver
date: 2014-11-28 13:42:00 +0800
categories: [Lenguaje de marcas]
tags: [css, lenguaje-de-marcas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

En esta entrada vamos a ver cómo crear botones redondeados, efectos hover y transiciones en CSS, además de cómo estilizar tablas.

El HTML de partida es el siguiente:

```html
<!DOCTYPE html>
<html>
     <head>
         <title>Botones redondeados</title>
         <link rel="stylesheet" type="text/css" href="css/estilos.css" media="screen" />
         <meta charset="UTF-8" />
     </head>
     <body>
         <nav>
              <a href="www.finofilipino.org" target="_blank">FinoFilipino</a>
              <a href="www.forocoches.com" target="_blank">Forocoches</a>
              <a href="series.ly" target="_blank">Series.ly</a>
         </nav>
         <section>
              <table>
                   <tr><td>1</td><td>2</td><td>3</td></tr>
                   <tr><td>4</td><td>5</td><td>6</td></tr>
                   <tr><td>7</td><td>8</td><td>9</td></tr>
              </table>
         </section>
     </body>
</html>
```

Y el CSS:

```css
body { background-color: grey; }
a {
     background-color: black;
     color: white;
     padding: 5px;
     border-color: #000000;
     border-style: solid;
     border-width: 2px;
     border-radius: 35px;
     opacity: 1;
}
nav:hover a:hover {
     background-color: yellow;
     border-radius: 0px;
     color: black;
     opacity: 1;
     transition-duration: 1s;
}
nav:hover a:not(:hover) { opacity: 0.5; }
section { position: absolute; top: 50px; }
table { border: solid orange 3px; border-radius: 10px; }
table td:hover { background-color: white; }
td {
     border: 2px solid white;
     padding: 5px;
     border-radius: 10px;
}
```

El resultado inicial con los botones redondeados:

![Botones redondeados](/img/posts/20141128_1.png)

Al hacer hover sobre la navegación, los enlaces no enfocados reducen su opacidad:

![Efecto hover - opacidad reducida en enlaces no activos](/img/posts/20141128_2.png)

El enlace sobre el que hacemos hover cambia de color con transición de 1 segundo:

![Efecto hover - enlace activo](/img/posts/20141128_3.png)

La tabla con bordes redondeados y celdas estilizadas:

![Tabla con bordes redondeados](/img/posts/20141128_4.png)

Efecto hover sobre las celdas de la tabla:

![Tabla con hover en celda](/img/posts/20141128_5.png)

**¡Salud y coding!**
