# Programando a Pasitos

> *"No es un bug, es una característica no documentada"*

Blog personal de programación de [Inazio Claver](https://github.com/inazense), funcionando desde 2014. Empezó como cuaderno de apuntes durante el grado superior de DAM y acabó convirtiéndose en un archivo con más de 230 entradas sobre desarrollo de software.

**[inazense.github.io](https://inazense.github.io)**

---

## Qué hay dentro

El blog cubre un rango bastante amplio, aunque con clara tendencia hacia Java y backend:

- **Java** — la categoría más prolífica. HashMap, Log4j, Maven, streams, colecciones...
- **Bases de datos** — modelo relacional, SQL, MySQL, Oracle, Hibernate
- **Android** — desarrollo de aplicaciones móviles
- **Python** — scripts, automatización, cosas de terminal
- **Programación general** — algoritmos, estructuras de datos, fundamentos
- **Entornos de desarrollo** — Eclipse, Maven, herramientas del día a día
- **Lenguajes de marcas** — HTML, XML y familia
- **Web** — PHP, JSP y algo de frontend

Aparte de los posts, hay dos secciones que merecen mención especial:

- **[Anecdotario](/anecdotario/)** — recopilación de citas de profesores durante los estudios. Algunas son oro puro.
- **[Descargas](/descargas/)** — manuales de estudio escritos durante DAM1 y DAM2, disponibles gratuitamente. El de programación tiene 980 páginas.

---

## Stack técnico

- **[Jekyll](https://jekyllrb.com/)** — generador de sitios estáticos
- **GitHub Pages** — hosting y despliegue automático
- **SCSS** — estilos organizados por módulos (`_variables`, `_sidebar`, `_content`, etc.)
- **Liquid** — plantillas para layouts y componentes
- Tema propio, sin dependencias externas de CSS

### Estructura del proyecto

```
.
├── _posts/          # Todos los artículos (.md)
├── _layouts/        # Plantillas base (default, home, post, page)
├── _includes/       # Componentes reutilizables (sidebar, head, post-card)
├── _sass/           # Estilos en SCSS
├── pages/           # Páginas estáticas (archivo, anecdotario, descargas)
├── assets/          # CSS compilado, JS, fuentes
└── _config.yml      # Configuración de Jekyll
```

---

## Correr en local

Necesitas Ruby y Bundler instalados.

```bash
git clone https://github.com/inazense/inazense.github.io
cd inazense.github.io
bundle install
bundle exec jekyll serve
```

El sitio arranca en `http://localhost:4000`.

Para que los drafts también sean visibles:

```bash
bundle exec jekyll serve --drafts
```

---

## Escribir un post

Los posts van en `_posts/` con el formato `YYYY-MM-DD-titulo-del-post.md` y este frontmatter mínimo:

```yaml
---
title: Título del post
description: Descripción breve
date: 2024-01-15 10:00:00 +0100
categories: [Java]
tags: [java, collections, streams]
---
```

---

## Licencia

El código del blog (plantillas, estilos, estructura) está disponible para que lo uses como base para el tuyo. El contenido de los artículos pertenece a sus autores.

Si reutilizas algo, una mención siempre se agradece.
