---
layout: post
title: Zen coding con Emmet
categories: HTML
---

Cada vez que desarrollo una página web lo que más pesado se me hace es escribir siempre la estructura básica de la misma, y tener que abrir y cerrar etiquetas constantemente. Puede parecer una tontería, pero siento como que se pierde un montón de tiempo en algo tan banal como crear dos listas anidadas en **HTML**, definir la estructura de un **HTML5**, etc.<br><br>

Dispuesto a encontrar una manera de agilizar ese proceso, hace unos meses, mientras desarrollaba mi proyecto final de ciclo, descubrí el **Zen coding**, y junto a él, **Emmet**.<br><br>

¿Y qué es el **Zen coding**? Es la mejora de la productividad en la creación de páginas web, a base de la generación de abreviaturas para escribir código **HTML** y **CSS**. Y en **Emmet** encontré su máximo exponente.<br><br>

**Emmet** son sintaxis de abreviaturas ya predefinidas que nos permite, en una sola línea, escribir estructuras complejas **HTML**, añadiendole atributos, clases, identificadores y contenido.<br><br>

Imaginemos, por un suponer, que queremos generar el siguiente contenido en **HTML**:

{% highlight html %}
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Programando a pasitos</title>
</head>
<body>
 
</body>
</html>
{% endhighlight %}

Pues bien, con **Emmet** podemos generar esta sintaxis escribiendo esta única línea y después pulsar la tecla de tabular.

{% highlight html %}
html:5
{% endhighlight %}

¿Rápido y sencillo, verdad? Entonces, entremos un poco más al trapo

## ¿Dónde y como usar Emmet?

Emmet lo encontraremos como plugin para multitud de **editores de código** e **IDEs**. Es tan sencillo como buscar la extensión e instalarla, a poco que sea un programa que se precie el que emplee, seguro lo tendrá. **Brackets** (el que yo empleo), **Atom**, **Sublime Text**, **Notepad++**, **Eclipse** y **Netbeans**, todos ellos, cuentan con el susodicho paquete para ser instalado. Pero recuerda, no viene por defecto.<br><br>

**Edit:** A día de actualizar esta entrada (Agosto 2021) uso **VS Code** que incluye Emmet por defecto<br><br>

Para usar **Emmet** tendremos que aprendernos las sintaxis de sus atajos. Son muy sencillas, y simplemente con practicar un poco no tendremos problemas en recordar los métodos más sencillos.<br>
Y para generar el elemento simplemente escribiremos el atajo pertinente y pulsaremos la tecla tabular. Sencillo y eficaz.

## Atajos

La lista completa de **atajos** la podemos encontrar en la documentación oficial de **Emmet**, que aparte de multitud de explicaciones contiene una sección que actúa como chuleta, muy eficaz cuando quieres consultar algún atajo.<br><br>

[Documentación oficial de Emmet.](https://docs.emmet.io/){:target="blank"}
<br>
[Chuleta de atajos](https://docs.emmet.io/cheat-sheet/){:target="blank"}
<br><br>

Aquí voy a tratar de incluir los casos más comunes. Si tienes cualquier consulta que no encuentras en la documentación o deseas alguna explicación concreta o atajo, puedes usar los comentarios para ello.<br>
En la primera línea encontraremos el atajo **Emmet** y en las siguientes la estructura que generará en **HTML**.<br><br>

Para generar una etiqueta basta con escribir su nombre, sin agregar paréntesis, y nos creará tanto la etiqueta de apertura como la de cierre

{% highlight html %}
div

<div></div>
{% endhighlight %}

Si, por ejemplo, queremos crear una etiqueta dentro de otra, bastará concatenar las dos etiqueta con el símbolo mayor que.

{% highlight html %}
div>p

<div>
	<p></p>
</div>
{% endhighlight %}

Podremos hacer tantos anidamientos como deseemos, no hay límite para ello. Además, podemos crear varios elementos en el mismo nivel. Si quieremos construir un párrafo y una imagen dentro del mismo div, por ejemplo, haremos lo siguiente

{% highlight html %}
div>p+img

<div>
	<p></p>
	<img src="" alt="">
</div>
{% endhighlight %}

¿Y si ahora quisieramos volver a un nivel superior? Tenemos dos formas de actuar en este caso. La primera es hacer grupos de etiquetas entre paréntesis y luego crear fuera de él un elemento en el mismo nivel. O la segunda opción, subir un nivel con el símbolo ^ y escribir directamente la etiqueta. El resultado es igual en ambos casos. Veámoslos<br><br>

{% highlight html %}
(div>p+img)+h1

div>p+img^h1

<div>
	<p></p>
	<img src="" alt="">
</div>
<h1></h1>
{% endhighlight %}

**Emmet** también nos permite duplicar elementos sin necesidad de volver a escribirlos agregándolos con el +. Si queres escribir una lista de cinco elementos, podemos usar el operando * para hacer referencia a la cantidad de elementos que deseemos.

{% highlight html %}
ul>li*5

<ul>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
{% endhighlight %}

Empezándonos a adentrar en las propiedades de las etiquetas debemos ver las dos fundamentales, clases e id.<br><br>

Las clases las asignaremos escribiendo la etiqueta, un punto y a continuación la clase que queramos. Podemos agregar tanto como nos apetezca, concatenando una detrás de otra con puntos, y siempre sin espacios.

{% highlight html %}
div.container
div.container.container-fluid

<div class="container"></div>
<div class="container container-fluid"></div>
{% endhighlight %}

Y con los id el proceder es muy similar. Concatenar etiqueta, símbolo # y el id

{% highlight html %}
div#principal

<div id="principal"></div>
{% endhighlight %}

Si deseamos agregar el resto de atributos, deberemos hacerlo entre corchetes, definiendo la propiedad, igual a, y posteriormente entre dobles comillas su valor.

{% highlight html %}
img[src="/path/miImagen.jpg" alt="Programando a pasitos" title="Programando a pasitos"]

<img src="/path/miImagen.jpg" alt="Programando a pasitos" title="Programando a pasitos">
{% endhighlight %}

Y no todo es **HTML**, el texto a mostrar dentro de las etiquetas también es importante. Si queremos escribir texto dentro de una etiqueta, con **Emmet** podemos hacerlo después del nombre de la etiqueta y sus atributos, entre llaves {}.

{% highlight html %}
p{Programando a pasitos rocks!}

<p>Programando a pasitos rocks!</p>
{% endhighlight %}

**Emmet** también nos permite generar numeradores automáticos, útiles por ejemplo para diferenciar entre clases, personalizar enlaces, diferenciar texto... Por ejemplo, vamos a generar una lista en la que el contenido de sus elementos sean distintos uno de otro.

{% highlight html %}
ul>li{Elemento $}*5

<ul>
	<li>Elemento 1</li>
	<li>Elemento 2</li>
	<li>Elemento 3</li>
	<li>Elemento 4</li>
	<li>Elemento 5</li>
</ul>
{% endhighlight %}

Hay muchos más ejemplos, para ello recomiendo mirarse la documentación que he ofrecido más arriba. Esto es una introducción que te permitirá funcionar en gran parte del trabajo de tus páginas web, pero se queda en eso, en una breve explicación. Puedes profundizar mucho más si lo deseas, o conforme te vayan surgiendo necesidades y dudas.<br><br>

Como he dicho, **Emmet** se consigue dominar a base de práctica constante, llegará un momento que sale más natural que abrir y cerrar etiquetas. Pruébalo y notarás como podrás codificar **HTML** y **CSS** mucho más rapida y eficazmente que antes.<br><br>

**¡Salud y coding!**