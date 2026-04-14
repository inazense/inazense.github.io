---
title: Geocodificación con Google Maps API y PHP
description: Aprende a convertir direcciones en coordenadas con Google Maps API y PHP. Tutorial completo sobre geocodificación paso a paso con código, manejo de JSON y ejemplos prácticos para mapas web.
author: Inazio Claver
date: 2016-06-19 12:10:00 +0800
categories: [PHP]
tags: [php, google-maps-api, geocodificacion, coordenadas, json, latitud-longitud]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

La **geocodificación** es el proceso de asignar coordenadas geográficas, como latitud-longitud.

Lo que voy a explicar aquí es como convertir una dirección textual, una calle por ejemplo, en coordenadas ltd-lng, para poder utilizarlas posteriormente en un **mapa de Google**, ya que cuando queremos cargar un **map** en una web debemos echar mano de coordenadas geocodificadas.

¿Me quedó algo redundante el anterior párrafo, verdad? Perdón.

Vayamos al apartado técnico, que es lo que tiene chicha y lo que queremos hacer.
Usaremos la **API de Google Maps** (podéis echarle un ojo [aquí](https://developers.google.com/maps/?hl=es)) y trabajaremos con un lenguaje de parte servidor como PHP realizando una llamada **JSON** y capturando su respuesta.

Puede sonar algo... lioso, intenso, así leído de primeras, pero cuando lo veamos paso por paso veremos que en realidad el procedimiento es tremendamente sencillo.

Para nuestro caso práctico, vamos a convertir la dirección "Calle San Lorenzo, Huesca, Spain".

¿Estáis listos? Empezamos.

Lo primero que debemos tener en claro es nuestra estructura de ficheros. Para mi caso ejemplo voy a crear, en el mismo directorio, dos ficheros. ```Geoposicionamiento.php``` para almacenar la función encargada de devolver la respuesta JSON, y ```miEjemplo.php``` para pasar la calle y extraer las coordenadas.

## Geoposicionamiento.php

Vamos a crear una función a la que le pasaremos por parámetro una dirección y nos retornará o bien un array con tres campos, latitud, longitud y string con la dirección enviada, o bien ```FALSE``` si se produjo algún tipo de error en la conversión.

```php
function geocodificacion($address){}
```

Ahora, dentro de la función, convertiremos la dirección del parámetro en una URL

```php
$address = urlencode($address);
```

Y la URL la apuntaremos, a través de un método POST, a la API de geocodificación de Google Maps

```php
$url = "http://maps.google.com/maps/api/geocode/json?address={$address}";
```

En una variable nueva recogeremos la respuesta JSON

```php
$resp_json = file_get_contents($url);
```

Y procederemos a descodificarla

```php
$resp = json_decode($resp_json, true);
```

Para poder llevar a cabo la geocodificación, el parámetro ```Status``` de la respuesta deberá tener un valor de ```OK```. En caso contrario, retornaremos ```FALSE```.

```php
if ($resp['status'] == 'OK'){
}
else{
    return false;
}
```

¡Recuerda! Estamos dentro del ```if```.

Deberemos capturar sólo los datos que nos interesen. En mi caso, latitud, longitud y la dirección formateada.

```php
$lati = $resp['results'][0]['geometry']['location']['lat'];
$longi = $resp['results'][0]['geometry']['location']['lng'];
$formatted_address = $resp['results'][0]['formatted_address'];
```

Deberemos verificar que los datos estén completos. En caso contrario, volveremos a retornar ```FALSE```.

```php
if ($lati && $longi && $formatted_address){
}
else{
    return false;
}
```

Volvemos a estar dentro del if. En este caso del segundo

Ahora que ya sabemos que los datos son correctos, debemos crear un nuevo array, almacenar en él la información y devolverlo.

```php
$data_arr = array();

array_push(
    $data_arr,
    $lati,
    $longi,
    $formatted_address
);

return $data_arr;
```

¿Sencillo, verdad?

## miEjemplo.php

En el segundo archivo, lo que hacemos simplemente es incluir el archivo anterior

```php
include_once '../lib/geoposicionamiento.php';
```

Crear un string con la dirección

```php
$cadena = "Calle San Lorenzo, Huesca, Spain";
```

Y hacer la llamada a la función

```php
$data_arr = geocode($cadena);
```

Luego solo nos quedará tratar la información como deseemos. Por ejemplo, yo quiero quedarme la latitud y la longitud en dos variables nuevas.

```php
if ($data_arr){
    $latitud = $data_arr[0];
    $longitud = $data_arr[1];
}
else{
    $latitud = NULL;
    $longitud = NULL;
}
```

Y si todo fue correcto, podremos ver que la latitud y la longitud de esa dirección es: 42.135508, -0.405422

Puedes ver el código completo de la clase PHP en [mi repositorio de Github](https://github.com/inazense/scripts/blob/master/scripts/php/GoogleMapsGeo.php).

**¡Salud y coding!**