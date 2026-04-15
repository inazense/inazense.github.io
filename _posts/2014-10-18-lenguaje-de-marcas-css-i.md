---
title: Lenguaje de marcas. CSS (I)
description:
date: 2014-10-18 22:37:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguaje de marcas, css, selectores, html, margin, padding]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Visibilidad de los elementos

En la etiqueta CSS que queramos cambiar:

**visibility:hidden** → Oculta el elemento, manteniendo su espacio. Digamos que pone una opacidad del 0%

**display:none** → Oculta el elemento, y el espacio que ocupa

## Selectores CSS

Para aplicar los estilos a determinados elementos, necesitaremos poner estos códigos:

- A un elemento → `a { }` (Se aplica a todas las etiquetas a)
- A varios elementos → `a,aside{ }` (Se aplica a varios elementos)
- A los id → `#panelizquierdo { }` (Para todos los elementos con ese id)
- Por clases → `.enlaceRojo { }` (Es una diferencia a nivel conceptual con los id. Es para aplicar "en masa". Id es para aplicarlos a algo concreto, a un header por ejemplo)
- Para nombrar el class: `<a class="enlaceRojo">`

Veamos un ejemplo. Como mostrar, por ejemplo, en orden los enlaces que están dentro del nav:

`nav a { }`

Si tenemos dos nav:

`nav a { }`

O también:

`nav#azul a { }` (Sólo los enlaces que estén en un nav hijo de azul)

Entonces, para ordenarlos horizontalmente, por ejemplo:

```css
nav a {
    display:inline;
}
```

![Ejemplo de selectores CSS](/img/posts/20141018_1.png)

## Margin y Padding

![Diagrama de margin y padding](/img/posts/20141018_2.png)

Margin despeja un área del elemento, más allá del borde. El margen no tiene un color de fondo, y es siempre completamente transparente.

El padding despeja un área alrededor del contenido (dentro del borde)

![Ejemplo de margin y padding](/img/posts/20141018_3.png)
