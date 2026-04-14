---
title: Galería web responsive. HTML5 + Bootstrap + PHP + Magnific Popup
description: Crea una galería web responsive con HTML5, Bootstrap, PHP y Magnific Popup. Tutorial completo paso a paso con código para crear lightbox interactivo, navegación entre imágenes y diseño adaptativo móvil.
author: Inazio Claver
date: 2016-10-12 13:00:00 +0800
categories: [Web]
tags: [html5, bootstrap, php, magnific-popup, galeria-responsive, lightbox, jquery, web]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Realizando una página web me surgió la necesidad de crear una sección que sirviera de galería para que el cliente pueda mostrar todos sus trabajos.
Los requisitos que buscaba es que fuera responsive y que su carga fuese rápida. No quería perder mucho tiempo desarrollando una galería con esas características desde cero y me puse a buscar hasta que llegué a este proyecto en Git Hub de Dmitry Semenov: [https://github.com/dimsemenov/Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup.).

Es un plugin basado en **jQuery** que permite crear **LightBox** y diálogos de forma rápida, con un script sencillo y ligero y muy facil de utilizar para el usuario final.
Ya estaba empleando **Bootstrap** en el proyecto - incluye **jQuery** - y era exactamente lo que estaba buscando. Me descargue los archivos necesarios, miré un poco la documentación y me puse a realizar el proyecto. El resultado se ajustaba a la página web como anillo al dedo, lo que me ha llevado a crear esta entrada por si os puede resultar de utilidad en vuestros desarrollos.
El código completo del ejemplo puedes bajartelo en [mi repositorio de Git Hub](https://github.com/inazense/gallery-responsive).

## Estructura del proyecto

Lo primero es definir la estructura de nuestro proyecto. La mía la podéis ver en la siguiente imagen.

![web gallery tree structure](/img/posts/20161012_1.png)

- En la carpeta **assets** dejo las imagenes que voy a mostrar en la galería.
- En **css** almaceno los framework necesarios (bootstrap y magnific popup) y en la subcarpeta estilos cargaré las hojas de estilo propias.
- En **fonts** colgaré los archivos para las fuentes que requiere Bootstrap.
- **lib** sirve para la clase en PHP (si quieres hacer la prueba en estático puedes obviar esta sección. Más adelante explico como realizar una carga estática sin PHP).
- En **scripts** tres cuartos de lo mismo que en **css**. Colgaré todos los framework necesarios para hacer funcionar **Bootstrap** y en la subcarpeta scripts dejaré el script propio para que funcione la galería.
- Y como no, un **index.html** por eso de mostrar el contenido, que siempre hace como ilusión.

## ¿Que vamos a conseguir?

La idea última es realizar un ejemplo muy sencillo de galería que al ampliar la imagen se muestre el 100% de la misma en pantalla, permita interactuar cargando imagenes a izquierda a derecha y que todo ello se mantenga en otros dispositivos. En la versión de ordenador, por ejemplo, se nos vería tal que así.

![pop-up gallery](/img/posts/20161012_2.png)

![pop-up gallery 2](/img/posts/20161012_3.png)

## ¡A por el código!

### HTML

Realmente el código HTML no puede ser más sencillo. Simplemente necesitamos un contenedor con la clase popup-gallery y dentro un enlace que contenga una imagen.

Como lo queremos hacer de forma dinámica, el código sería tal que así:

```html
<div class="popup-gallery">
    <?php
        $galeria = new Galeria();
        $arrayImagenes = $galeria->cargarImagenes("assets");

        foreach($arrayImagenes as $path){
            echo '<a href="' . $path . '" title="Reformas de interior"><img src="' . $path . '"/></a>';
        }
    ?>
</div>
```

Si lo quisieramos hacer de forma estática, aún es más sencillo:

```html
<div class="popup-gallery">

    <a href="assets/awesomeFoold.jpg" title="Programando a pasitos">
        <img src="assets/awesomeFoold.jpg" alt="Programando a pasitos">
    </a>
    <a href="assets/dragon.jpg" title="Programando a pasitos">
        <img src="assets/dragon.jpg" alt="Programando a pasitos">
    </a>
    ...
</div>
```

Y nuestro index completo usando Bootstrap quedaría tal que así:

```html
<!DOCTYPE html>

<?php
    include_once 'lib/Galeria.php';
?>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

        <!-- Mis estilos -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/estilos/galeria.css">
        <link rel="stylesheet" href="css/magnific-popup.css">


        <!-- Mis scripts -->
        <script src="scripts/jquery-2.2.3.min.js"></script>
        <script src="scripts/bootstrap.min.js"></script>
        <script src="scripts/jquery.magnific-popup.min.js"></script>
        <script src="scripts/scripts/galeria.js"></script>
    </head>

    <body>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-4 col-md-3">
                    <h2>Presentación</h2>
                    <p>Esta galería HTML5 y responsive está hecha usando el framework <a href="http://dimsemenov.com/plugins/magnific-popup/" target="_blank">Magnific Popup</a> combinando con Bootstrap y jQuery, y la carga la realizo dinámicamente con PHP mostrando todas las imágenes de una carpeta determinada (assets). Es un ejemplo básico pero que resulta muy útil para desarrollar una galería responsive en muy poco tiempo.
                    Para más tutoriales y articulos visitad <a href="http://programandoapasitos.blogspot.com" target="_blank" alt="Programando a pasitos" title="Programando a pasitos">Programando a pasitos</a>.</p>
                </div>

                <div class="col-xs-12 col-sm-8 col-md-9">
                    <div class="popup-gallery">
                        <?php
                            $galeria = new Galeria();
                            $arrayImagenes = $galeria->cargarImagenes("assets");

                            foreach($arrayImagenes as $path){
                                echo '<a href="' . $path . '" title="Programando a pasitos"><img src="' . $path . '"/></a>';
                            }
                        ?>
                    </div>
                </div>
            </div> <!-- Fin row -->
        </div>
    </body>
</html>
```

### PHP

Si nos hemos decantado por la opción dinámica, **PHP** lo usaremos para listar nuestras imagenes de una carpeta concreta. Usted, astuto lector, dirá que eso se puede realizar con Javascript y santas pascuas, y no le faltaría razón, pero es que esta clase en **PHP** ya la tenía hecha y, como he comentado antes, no me apetecía complicarme mucho la cabeza.

Es bastante sencilla. Basicamente abro un gestor de directorios, recorro el directorio y si lo que estoy leyendo es un archivo, lo almaceno en un array que retornaré posteriormente.

El código completo es tal que así:

```php
<?php

/**
 * Librería encargada de las funciones de
 * la galería de imágenes
 *
 * @author Inazio
 */
class Galeria {
    
    /**
     * Carga en un array los ficheros de un directorio pasado por parámetro.
     * @param string $ruta directorio de la carpeta donde extraer los ficheros
     * @return array con la ruta de los ficheros o NULL si directorio inválido
     */
    public function cargarImagenes($ruta){
        
        // Compruebo si el parámetro pasado es una ruta
        if (is_dir($ruta)){
            
            // Abro un gestor de directorios
            $gestor = opendir($ruta);
            
            $imagenes = array();
            
            // Recorro archivos del directorio
            while(($archivo = readdir($gestor)) !== false){
                if (is_file($ruta . "/" . $archivo)){
                    $imagen = $ruta . "/" . $archivo;
                    array_push($imagenes, $imagen);
                }
            }
            
            closedir($gestor);
            
            return $imagenes;
        }
        else{
            return NULL;
        }
    }
}
```

### jQuery

Este archivo es el encargado de mostrar el LightBox como tal y hacerlo interactivo con el resto de imágenes, y en caso de no poder cargarlo nos mostrará un mensaje de error.

En la línea 18 podemos personalizar el título a mostrar en la imagen ampliada y en la 16 el mensaje a mostrar en caso de error. Mientras está cargando nos deja preconfigurar otro mensaje, en la línea 8, pero realmente está tan bien optimizado que muy lenta tendría que ir nuestra página web para llegar a verlo, y en ese caso este framework sería el menor de nuestros problemas.

```javascript
/*jslint browser: true*/
/*global $*/
$(document).ready(function () {
    'use strict';
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Cargando imagen #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">La imagen #%curr%</a> no se ha podido cargar.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Programando a pasitos</small>';
            }
        }
    });
});
```

### CSS

Y por último, simplemente un poco de estilo para dejar nuestra página más presentable.

```css
/*Transparencia menú en galería*/
.container header .navbar{
    background-color: rgba(51, 44, 44, 1);
}

/*Distancia de la galería al menú*/
.popup-gallery{
    padding-top: 1em;
}

/*Tamaño y margen de las imágenes*/
.popup-gallery a img{
    min-height: 7em;
    max-height: 7em;
    margin: .5em .5em;
}
@media (min-width: 768px) and (max-width: 850px){
    .popup-gallery a img{
        min-height: 6em;
        max-height: 6em;
    }
}

@media (max-width: 767px){
    .popup-gallery a img{
        min-height: 10em;
        max-height: 10em;
    }
    .popup-gallery{
        text-align: center;
    }
}
```

Y ya tenemos nuestro ejemplo en pleno funcionamiento. Realmente, con coger la sección de HTML donde vemos como llamar a las imágenes y el script en jQuery ya podemos montarnos nuestra propia galería. El resto es pura paja para presentarlo más bonito.

![pop-up responsive gallery](/img/posts/20161012_4.png)

**¡Salud y coding!**