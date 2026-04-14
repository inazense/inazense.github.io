---
title: Lenguaje de marcas. RSS
description: Introducción a RSS (Really Simple Syndication), formato XML para distribuir contenido web actualizado, con sus versiones, estructura y elementos principales.
author: Inazio Claver
date: 2015-03-06 12:00:00 +0800
categories: [Lenguaje de marcas]
tags: [lenguaje-de-marcas, rss, xml]
pin: false
math: false
mermaid: false
---

RSS son las siglas de **Really Simple Syndication**. Es un formato basado en XML que permite distribuir el contenido web actualizado de una página a miles de páginas web diferentes en todo el mundo, facilitando la navegación rápida por noticias y novedades.

## ¿Qué es RSS?

RSS permite la afiliación de contenidos, define un método para compartir titulares, soporta actualizaciones automáticas y posibilita vistas personalizadas de distintos sitios web. Al estar escrito en XML, es ligero y de carga rápida, ideal para dispositivos móviles.

## ¿Para qué se usa?

Es especialmente útil para páginas que se actualizan con frecuencia: noticias, empresas, calendarios, o cualquier sitio con contenido cambiante. Entre sus ventajas:

- Seleccionar las noticias que interesan.
- Evitar información no deseada y spam.
- Aumentar las visitas al sitio web a través de canales de noticias personalizados.

## Versiones de RSS

| Versión   | Características                        |
|-----------|----------------------------------------|
| RSS 1.0   | Usa RDF del W3C para la web semántica  |
| RSS 0.91  | Más simple que la versión 1.0          |
| RSS 2.0   | Más simple que la versión 1.0          |

No existe un estándar oficial. Distribución aproximada de uso: 50% RSS 0.91, 25% RSS 1.0, 25% RSS 2.0 y variantes 0.9x.

## ¿Cómo funciona?

Los usuarios se registran en agregadores RSS, que buscan actualizaciones periódicamente. El proceso de publicación consta de tres pasos:

1. Crear un documento XML con el feed RSS.
2. Subirlo al servidor web.
3. Registrarlo en un agregador RSS.

## Estructura básica de un feed RSS

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Página</title>
    <link>http://programandoapasitos.blogspot.com</link>
    <description>Tutoriales DAM</description>
    <item>
      <title>RSS</title>
      <link>http://programandoapasitos.blogspot.com/rss</link>
      <description>Tutorial RSS</description>
    </item>
  </channel>
</rss>
```

## Elementos principales

### Elementos del canal (`<channel>`)

- **`<title>`** — Título del feed.
- **`<link>`** — URL del sitio web.
- **`<description>`** — Descripción del canal.
- **`<category>`** — Categorización del feed.
- **`<copyright>`** — Aviso de copyright.
- **`<image>`** — Imagen para mostrar en los agregadores.

### Elementos de cada artículo (`<item>`)

- **`<title>`** — Título del artículo.
- **`<link>`** — URL del artículo.
- **`<description>`** — Descripción o resumen del artículo.
- **`<author>`** — Autor del artículo.
- **`<comments>`** — URL de los comentarios.
- **`<enclosure>`** — Adjunto multimedia (audio, vídeo).

## Publicación

Para publicar un feed RSS:

1. Subir el fichero RSS al directorio raíz del servidor web.
2. Validarlo en [feedvalidator.org](http://www.feedvalidator.org).
3. Enlazar las imágenes al fichero RSS.
4. Registrarlo en directorios y motores de búsqueda RSS.
5. Actualizar el feed regularmente (de forma manual o automática).

**¡Salud y coding!**
