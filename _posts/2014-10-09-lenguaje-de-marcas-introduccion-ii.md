---
title: "Qué son los lenguajes de marcas y cómo es un documento XML"
description: "Qué es un lenguaje de marcas, qué tipos hay según su orientación (presentación, procedimientos o descripción) y cómo se compone un documento XML."
date: 2014-10-09 12:10:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguajes-marcas, xml, html, etiquetas, atributos, sintaxis, markup]
redirect_from:
  - /2014/10/lenguaje-de-marcas-introduccion-ii.html
---

Los lenguajes de marcas son aquellos que "contienen la información, generalmente textual, de un documento y anotaciones en forma de etiquetas y atributos."

## Tipos de lenguaje de marcado

**Lenguajes orientados a presentación:** Utilizados por procesadores de texto para codificar la presentación visual (fuentes, espaciado, márgenes, colores). Los editores WYSIWYG como Word y LibreOffice permiten ver el formato mientras se escribe.

**Lenguajes procedimentales:** Integran etiquetas de presentación dentro de un marco de procedimientos que permite definir macros y rutinas. Ejemplos: LaTeX, PostScript y TeX.

## Composición de un documento XML

- **Elemento**: entidad estructural completa dentro de un documento XML. Consta de etiqueta de inicio y final, además de todo lo que se encuentra entre ambas.
- **Etiqueta**: marca de inicio y final de un elemento.
- **Atributo**: conjunto de pares `nombre="valor"` que se sitúa dentro de la etiqueta, después del nombre de ésta.

```xml
<factura numero="1">
    <fecha>26/09/2014</fecha>
    <cliente id="1">
        <nombre>Tan Dao Bien</nombre>
        <dirección>
            <domicilio tipo="Calle">Mayor</domicilio>
            <cp>22001</cp>
            <localidad prov="22">Huesca</localidad>
        </dirección>
    </cliente>
    <compra>
        <lineaProducto>
            <producto>Memoria USB</producto>
            <cantidad>10</cantidad>
            <precioProducto>8</precioProducto>
        </lineaProducto>
    </compra>
    <descuento>10</descuento>
    <IVA>21</IVA>
</factura>
<!-- El total no se pone como etiqueta porque es un valor calculable -->
```

![lenguaje de marcas introduccion ii](/img/posts/20141009_2.png)

**¡Salud y coding!**
