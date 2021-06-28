# Programando a pasitos 

### ¿Qué es?

Esta página es la traducción de mi antiguo blog, Programando a pasitos, a lenguaje Jekyll para desplegar dentro de Github pages.

Este repositorio existe gracias a la creación de la increíble herramienta [Jekyll-now](https://github.com/barryclark/jekyll-now), y sobre ella va a estar construida toda nuestra estructura.

Jekyll-now hace mucho más sencillo el crear un blog basado en Jekyll, eliminando un montón de configuraciones tediosas.

### Incio rápido

Para agregar nuevos posts debemos generar un nuevo fichero en la carpeta ___posts__, y esta deberá comenzar con la fecha que deseemos para ordenarla de más reciente a más antigua. Un ejemplo sería ```2021-05-28-new-entry.md```.
<br>

Posteriormente, en __sections.html__ referenciaremos la entrada al índice de la siguiente manera:

```- [New entry]({{ site.baseurl }}/new-entry/){:target="blank"}```

### Despliegue en localhost

1. Installar Jekyll y el plugin github pages. Esto copiará los plugins usados por Github Pages en tu máquina local, incluyendo Jekyll, Sass, etc.

```gem install github-pages```

2. Clona el repositorio
3. Sirve el sitio para cargar los cambios de markup/sass con 

```jekyll serve```

4. Visita el sitio en https://127.0.0.1:4000/

### Creditos

- [Jekyll-now](https://github.com/barryclark/jekyll-now) - Gracias al creador de Jekyl-now por la facilidad de uso y la explicación del proyecto tan bien documentada
