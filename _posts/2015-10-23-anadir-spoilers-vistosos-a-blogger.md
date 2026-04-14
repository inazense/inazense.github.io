---
title: "Añadir spoilers vistosos a Blogger"
description: Cómo implementar botones mostrar/ocultar (spoilers) en Blogger usando jQuery para mejorar la legibilidad de entradas largas con mucho código.
author: Inazio Claver
date: 2015-10-23 12:00:00 +0800
categories: [CMS]
tags: [blogger, jquery, html, css, spoiler, cms]
pin: false
math: false
mermaid: false
---

Cuando las entradas del blog son muy largas y contienen muchos bloques de código, la lectura se vuelve tediosa. Una solución es usar botones de tipo spoiler que muestran u ocultan el contenido al pulsar, mejorando la legibilidad sin eliminar información.

## Implementación con jQuery

### Paso 1: Añadir la librería jQuery

Si la plantilla del blog no incluye jQuery, hay que añadir esta línea en la sección `<head>` de la plantilla HTML:

```html
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'/>
```

### Paso 2: Código del spoiler

En el editor HTML de la entrada del blog se añade el siguiente código para cada spoiler:

```html
<input type="button" id="Spoiler1" value="Mostrar | Ocultar"/>
<div class="Mostrar1" style="display: none;">
    ...contenido oculto aquí...
</div>
<script>
jQuery.noConflict();
jQuery(document).ready(function(){
    jQuery('#Spoiler1').click(function(){
        jQuery('.Mostrar1').slideToggle("slow");
    });
});
</script>
```

El botón con `id="Spoiler1"` controla la visibilidad del `div` con `class="Mostrar1"`. Al pulsar el botón, `slideToggle("slow")` anima la aparición u ocultación del contenido con una transición suave.

### Paso 3: Múltiples spoilers

Para añadir más de un spoiler en la misma entrada basta con incrementar los identificadores:

| Spoiler | id del botón | class del div |
|---------|-------------|---------------|
| 1º | `Spoiler1` | `Mostrar1` |
| 2º | `Spoiler2` | `Mostrar2` |
| 3º | `Spoiler3` | `Mostrar3` |

```html
<input type="button" id="Spoiler2" value="Mostrar | Ocultar"/>
<div class="Mostrar2" style="display: none;">
    ...segundo bloque oculto...
</div>
<script>
jQuery.noConflict();
jQuery(document).ready(function(){
    jQuery('#Spoiler2').click(function(){
        jQuery('.Mostrar2').slideToggle("slow");
    });
});
</script>
```

Existen alternativas usando CSS puro, JavaScript vanilla o la librería Scriptaculous, aunque el enfoque con jQuery es sencillo de implementar y visualmente elegante.
