---
title: Lenguaje de marcas. Etiquetas (III)
description:
date: 2014-10-15 23:41:00 +0800
categories: [lenguaje de marcas]
tags: [lenguaje de marcas, html, html5, audio, video, etiquetas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Etiqueta `<audio>` → HTML5

```html
<audio controls>
    <source src="horse.mp3" type="audio/m3">
    <source src="horse.ogg" type="audio/ogg">
    Tu navegador no soporta este formato
</audio>
```

Para que lo soporten los principales navegadores sería con ogg y mp3.

## Etiqueta `<video>` → HTML5

```html
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    Tu navegador no soporta este formato
</video>
```

Para pasar los videos a los codecs necesarios usar FormatFactory
