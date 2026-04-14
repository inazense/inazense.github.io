---
title: Lenguajes de marcas. CSS (IV)
description: Cómo incrustar fuentes personalizadas en páginas web usando la regla @font-face de CSS.
author: Inazio Claver
date: 2015-01-09 13:33:00 +0800
categories: [Lenguajes de marcas]
tags: [css, lenguajes-de-marcas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Vamos a ver cómo podemos incrustar texto con diversas fuentes en nuestra página web. Antes se usaban "fuentes seguras", como Helvética, Arial, y en todo caso a lo mejor `sans-serif`:

```css
font-family: arial, helvetica, sans-serif;
```

Ahora, con `@font-face`, podemos hacer que el navegador descargue esa fuente y la muestre correctamente. En primer lugar, podemos buscar fuentes gratuitas en [dafont.com](https://www.dafont.com).

![Pantalla de dafont.com](/img/posts/20150109_1.png)

Una vez descargada la fuente, la declaramos en nuestro CSS con `@font-face`:

```css
@font-face {
  font-family: 'Akronim';
    src: url('fonts/Akronim-Regular.eot'); /* Internet Explorer */
    src: local('Akronim'),
         url('fonts/Akronim-Regular.ttf') format('truetype'),
         url('fonts/Akronim-Regular.woff') format('woff'),
         url('fonts/Akronim-Regular.svg') format('svg')
}

p {
    font-family: 'Akronim', cursive;
    font-size:1.5em;
}
```

![Estructura de carpetas del proyecto](/img/posts/20150109_2.png)

Incluimos el archivo de la fuente en el directorio `fonts/` de nuestro proyecto e indicamos las rutas en la declaración `@font-face`. Se proporcionan varios formatos para garantizar compatibilidad con distintos navegadores: `.eot` para Internet Explorer, `.ttf` para TrueType, `.woff` y `.svg`.

![Editor de código con la declaración @font-face](/img/posts/20150109_3.png)

Para aplicar la fuente a un elemento, simplemente usamos la propiedad `font-family` con el nombre que le hayamos dado:

```css
font-family: 'Akronim';
```

![Resultado en el navegador](/img/posts/20150109_4.png)

![Comparación de fuentes](/img/posts/20150109_5.png)

![Resultado final con fuente personalizada](/img/posts/20150109_6.png)

**¡Salud y coding!**
