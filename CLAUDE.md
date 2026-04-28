# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

- `_posts/` — Blog entries in markdown. Filename format: `[YYYY-MM-DD]-[titulo-url].md`
- `img/posts` — Images associated with posts. Filename format: `[YYYYmmDD]_[X]`

## Post Format

Each post uses Jekyll-style YAML frontmatter:

```yaml
---
title: Post title
description: Brief description
author: Inazio Claver
date: 2017-07-19 12:10:00 +0800
categories: [Java]
tags: [java, tag2, tag3]
pin: false
math: false
mermaid: false
---
```

## Conventions

- Post filenames use lowercase kebab-case with the publication date prefix
- Image filenames use the date in `YYYYmmDD` format followed by a sequence number
- All content is written in Spanish

## Instructions to create markdown entries:

Convierte las siguientes entradas en markdown y almacénalas en /posts. Si tienen imagenes relacionadas, muestralas en la entrada y almacenalas en /img. El nombre de fichero debe ser así: año-mes-dia-titulo-separadp-por-guiones. Ejemplo   
de esta entrada: 2014-10-14-programacion-diseno-de-la-programacion-i.md, reemplazando año-mes-dia por el año, mes y día de creación de esa entrada. Si hay parentesis en el título se omiten para el nombre de fichero, las ñ se           
reemplazan por n en el nombre de fichero y no ponemos tildes en el nombre del fichero. Entrada: https://www.programandoapasitos.com/2014/10/programacion-diseno-de-la-programacion-i.html.

Cualquier porción de código o pseudocódigo que haya dentro de las entradas debe mostrarse como bloque de código en markdown o como código directamente.

Ejemplo:

print("hola")

sería escrito como

```python
print("hola")
```

Y una frase como esta:

Para imprimir en Python debemos llamar al método print() con algo de contenido.

Quedaría así:

Para imprimir en Python debemos llamar al método ```print()``` con algo de contenido.