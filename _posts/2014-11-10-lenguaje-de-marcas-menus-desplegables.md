---
title: Lenguaje de marcas. Menús desplegables
description:
date: 2014-11-10 00:00:00 +0800
categories: [lenguajes de marcas]
tags: [html, css, menus desplegables, lenguaje de marcas]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

Con CSS3 podemos crear menús desplegables sin necesidad de JavaScript ni jQuery. La idea es ocultar los submenús por defecto y mostrarlos al pasar el cursor (`:hover`).

## Estructura HTML

El menú se construye con listas anidadas `<ul>` y `<li>`. Cada submenú es un `<ul>` hijo de su `<li>` correspondiente.

![Estructura HTML del head](/img/posts/20141110_1.png)

![Estructura HTML del body](/img/posts/20141110_2.png)

```html
<!DOCTYPE html>
<html>
<head>
<title>Menús desplegables html y css</title>
<meta charset="UTF-8">
<link href="estilo.css" type="text/css" rel="stylesheet" media="screen">
</head>
<body>
<nav>
<ul>
  <li>Item1
    <ul>
      <li>Item1.1</li>
      <li>Item1.2</li>
    </ul>
  </li>
  <li>Item2
    <ul>
      <li>Item2.1</li>
      <li>Item2.2
        <ul>
          <li>Item2.2.1</li>
          <li>Item2.2.2</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Item3
    <ul>
      <li>Item3.1
        <ul>
          <li>Item3.1.1</li>
          <li>Item3.1.2</li>
        </ul>
      </li>
      <li>Item3.2</li>
    </ul>
  </li>
  <li>Item4</li>
  <li>Item5</li>
</ul>
</nav>
</body>
</html>
```

## CSS

![CSS parte 1](/img/posts/20141110_3.png)

![CSS parte 2](/img/posts/20141110_4.png)

```css
/* Aplicamos margin y padding a todos los elementos */
* {
  margin: 0;
  padding: 0;
}

/* Estilo a todos los li dentro del nav */
nav li {
  list-style-type: none;
  background-color: yellow;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  color: black;
}

/* Los li hijos de los ul hijos del nav se presentarán a la izquierda */
nav > ul > li {
  float: left;
}

/* Cuando pasemos por los li dentro del nav se pondrán de color naranja */
nav li:hover {
  color: orange;
}

/* Ordenamos los hijos li de los hijos ul de nav para ponerlos en una misma línea */
nav > ul > li {
  margin: 5px;
  display: inline;
}

/* Tamaño de los li que están dentro de los ul hijos */
nav > ul li {
  min-width: 70px;
}

/* Posición fija y eliminar los símbolos de lista de los ul dentro de li dentro de un ul hijo de nav */
nav > ul li ul {
  display: none;
  position: absolute;
}

/* Mostrar el submenú cuando pasemos sobre el li correspondiente */
nav > ul li:hover > ul {
  display: block;
}

/* Dar posición no fija a los ul dentro de li dentro de ul hijo de nav */
nav > ul li ul {
  position: relative;
}

/* Alinear a la derecha del li seleccionado el submenú desplegable */
nav > ul li ul li ul {
  right: -70px;
  position: absolute;
  top: 0;
}
```

## Resultado

![Resultado final del menú desplegable](/img/posts/20141110_5.png)
