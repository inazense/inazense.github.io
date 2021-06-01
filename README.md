# Programando a pasitos 

### ¿Qué es?

Esta página es la traducción de mi antiguo blog, Programando a pasitos, a lenguaje Jekyll para desplegar dentro de Github pages.

Este repositorio existe gracias a la creación de la increíble herramienta [Jekyll-now](https://github.com/barryclark/jekyll-now), y sobre ella va a estar construida toda nuestra estructura.

Jekyll-now hace mucho más sencillo el crear un blog basado en Jekyll, eliminando un montón de configuraciones tediosas.

### Incio rápido

Para agregar nuevos posts debemos generar un nuevo fichero en la carpeta ___posts__, y esta deberá comenzar con la fecha que deseemos para ordenarla de más reciente a más antigua. Un ejemplo sería ```2021-05-28-new-entry.md```.
<br>

Posteriormente, en __sections.md__ referenciaremos la entrada al índice de la siguiente manera:

```- [New entry]({{ site.baseurl }}/new-entry/){:target="blank"}```

### Despliegue en localhost

1. Installar Jekyll y el plugin github pages. Esto copiará los plugins usados por Github Pages en tu máquina local, incluyendo Jekyll, Sass, etc.

```gem install github-pages```

2. Clona el repositorio
3. Sirve el sitio para cargar los cambios de markup/sass con 

```jekyll serve```

4. Visita el sitio en https://127.0.0.1:4000/

<br><br>

### Credits

- [Jekyll-now](https://github.com/barryclark/jekyll-now) - The genius creator of Jekyll-now
- [Jekyll](https://github.com/jekyll/jekyll) - Thanks to its creators, contributors and maintainers.
- [SVG icons](https://github.com/neilorangepeel/Free-Social-Icons) - Thanks, Neil Orange Peel. They're beautiful.
- [Solarized Light Pygments](https://gist.github.com/edwardhotchkiss/2005058) - Thanks, Edward.
- [Joel Glovier](http://joelglovier.com/writing/) - Great Jekyll articles. I used Joel's feed.xml in this repository.
- [David Furnes](https://github.com/dfurnes), [Jon Uy](https://github.com/jonuy), [Luke Patton](https://github.com/lkpttn) - Thanks for the design/code reviews.
- [Bart Kiers](https://github.com/bkiers), [Florian Simon](https://github.com/vermluh), [Henry Stanley](https://github.com/henryaj), [Hun Jae Lee](https://github.com/hunjaelee), [Javier Cejudo](https://github.com/javiercejudo), [Peter Etelej](https://github.com/etelej), [Ben Abbott](https://github.com/jaminscript), [Ray Nicholus](https://github.com/rnicholus), [Erin Grand](https://github.com/eringrand), [Léo Colombaro](https://github.com/LeoColomb), [Dean Attali](https://github.com/daattali), [Clayton Errington](https://github.com/cjerrington), [Colton Fitzgerald](https://github.com/coltonfitzgerald), [Trace Mayer](https://github.com/sunnankar) - Thanks for your [fantastic contributions](https://github.com/barryclark/jekyll-now/commits/master) to the project!
