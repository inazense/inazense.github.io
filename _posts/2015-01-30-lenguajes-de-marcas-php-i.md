---
title: Lenguajes de marcas. PHP (I)
description: Introducción a PHP. Instalación de LAMP y WAMP, variables, echo, estructuras de control (if, while, for, foreach) y arrays.
author: Inazio Claver
date: 2015-01-30 18:00:00 +0800
categories: [Lenguajes de marcas]
tags: [lenguajes-de-marcas, php, mysql, linux]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

PHP se combinará con HTML5, CSS3, JavaScript y MySQL.

HTML, CSS y JS se ejecutarán en la parte **cliente** (el navegador), mientras que PHP y MySQL lo harán en la parte **servidor**.

Es decir, que tendremos que montarnos un servidor.

## Instalación de LAMP

Abrimos Linux y escribimos:

```
sudo apt-get install lamp-server^
```

![Install LAMP server](/img/posts/20150130_3.png)

Una vez hecho eso configuramos la contraseña para MySQL.

![Lamp server password](/img/posts/20150130_4.png)

Y volverá a pensar otro rato. Cuando finalice la instalación probamos a ingresar desde el navegador a la dirección IP de la máquina donde hemos montado el servidor:

![Lamp server web](/img/posts/20150130_5.png)

Si aparece un cartel como el de arriba, está funcionando correctamente.

## Instalación de WAMP

Primero instalaremos la librería necesaria, `vcredist`.

![Pasos de instalación de WAMP](/img/posts/20150130_6.png)

Posteriormente lanzamos el instalador del WAMP.

![Pasos de instalación de WAMP](/img/posts/20150130_7.png)

![Pasos de instalación de WAMP](/img/posts/20150130_8.png)

![Pasos de instalación de WAMP](/img/posts/20150130_9.png)

![Pasos de instalación de WAMP](/img/posts/20150130_10.png)

Y lo comprobamos accediendo a `localhost`.

![Comprobación de WAMP en localhost](/img/posts/20150130_11.png)

## Comandos PHP

Las variables se escriben siempre con `$`:

```php
$variable
```

Para escribir cadenas se hará con apóstrofes, y para imprimir usaremos el comando `echo`:

```php
<?php 
	$cadena = "Hola";
	$entero = 3;
	$decimal = 2.5;

	echo $cadena;
	echo $entero;
	echo $decimal;
	echo "Hello world!";
?>
```

Para concatenar lo impreso por pantalla, usaremos el punto.

```php
<?php 
	$cadena = "Hola";
	$entero = 3;
	$decimal = 2.5;

	echo $cadena . ' ' . $entero . ' ' . $decimal;
?>
```

Si imprimimos con comillas simples nos imprimirá exactamente lo que escribimos, pero si lo hacemos con comillas dobles irá a buscar las variables. 

```php
<?php 
	$cadena = "Hola";
	$entero = 3;
	$decimal = 2.5;

	echo '$cadena \n $entero \n $decimal';
	echo "$cadena \n $entero \n $decimal";
?>
```

La diferencia sería de ver esto: 

`$cadena \n $entero \n $decimal` 

a ver esto: 

`Hola 3 2.5`.

### If

```php
<?php 
	$entero = 3;
	if ($entero % 2 == 0) {
		echo "el número $entero es par";
	}
	else {
		echo "el número $entero es impar";
	}
?>
```

### While

```php
<?php 
	$entero = 3;
	while ($entero >= 0) {
		echo $entero;
		$entero--;
	}
?>
```

### Arrays

### While

```php
<?php 
	$entero = 3;
	$decimal = 2.5;

	while ($entero >= 0) {
		echo "$entero...";
		$lista[$entero] = $decimal
		$entero--;
	}

	while ($entero <= 5) {
		echo $lista[$entero].",";
		$entero++;
	}
?>
```

Visualizando por pantalla lo siguiente: `3...2...1...0..., 2.5, 2.5, 2.5, 2.5, , ,`

También podemos, dentro de un documento `index.php`, mezclar código HTML y PHP, por ejemplo, para hacer un listado del 0 al 100.

```php
<html>
	<head>
		<meta charset="UTF-8"></meta>
	</head>
	<body>
		<ol>
			<?php 
				$numero = 0;

				while ($numero < 100) {
					echo "<li>$numero</li>";
					$numero++;
				}
			?>
		</ol>
	</body>
</html>
```

### For

```php
<?php 
	$for ($i=0; $i<100; $i++) {
		echo "<li>$i</li>";
	}
?>
```

### Definir un array

```php
<?php 
	$info = array(
		"asignatura" => "lenguajes",
		"aula" => "B.01",
		"alumno" => "Inazio"
	);

	print_r($info)
?>
```

### Foreach (for especial para vectores)

```php
<?php 
	$info = array(
		"asignatura" => "lenguajes",
		"aula" => "B.01",
		"alumno" => "Inazio"
	);

	$foreach ($info as $etiqueta => $dato) {
		echo "$etiqueta -----> $dato \n";
	}
?>
```

**¡Salud y coding!**
