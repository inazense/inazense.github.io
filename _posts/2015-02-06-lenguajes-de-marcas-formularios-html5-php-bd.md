---
title: Lenguajes de marcas. Formularios HTML5+PHP+BD
description: Cómo crear formularios HTML5 conectados a PHP y a una base de datos MySQL mediante mysqli, usando los métodos GET y POST.
author: Inazio Claver
date: 2015-02-06 12:00:00 +0800
categories: [Lenguajes de marcas]
tags: [html5, php, formularios, mysql]
pin: false
math: false
mermaid: false
---

Sintaxis:

```html
<form action="formulario.php" method=" ">
     <input ...>
     <input type="submit">
</form>
```

En el `action`, pasaremos los datos del formulario a `formulario.php`, pero tenemos dos modos de realizar el método:

- `get` - Se verá en la URL. Habrá que usar la variable `$_GET`
- `post` - Viaja enmascarado. Hay que usar `$_POST`

**NOTA:** `br`, `hr`, `img`, `input`, `link` y `meta`, entre otras etiquetas, no hace falta cerrarlos en HTML5.

Vamos a usar el NetBeans para esta práctica. Creamos un proyecto en PHP remoto (tal y como explicaba en la entrada anterior) de nombre, por ejemplo, `formulario`.

Necesitaremos dos archivos, `index.php` y `tratarFormulario.php`.

Hacemos primero una sencilla prueba, escribimos en `index.php` el código para generar un simple botón y un cuadro de texto:

![Código index.php básico](/img/posts/20150206_1.png)

Y veremos en el navegador esto:

![Resultado en navegador](/img/posts/20150206_2.png)

Cuando pulsemos enviar nos llamará a `tratarFormulario`. Si miramos atentamente a la URL...

![URL con parámetro GET visible](/img/posts/20150206_3.png)

¿Veis? Podemos ver lo que contiene el campo nombre. Por eso se dice que el método GET es inseguro, por ejemplo permitiría realizar un ataque de SQL injection. Eso lo solucionaremos usando método `post`.

En este ejemplo trabajaremos con `get`.

En `tratarFormulario.php` escribimos lo siguiente:

![Código tratarFormulario.php](/img/posts/20150206_4.png)

Lo que hacemos en la línea 8 es mostrar por pantalla un Hola y el texto capturado del formulario de `index.php`.

![Resultado](/img/posts/20150206_5.png)

Podemos hacer varias cosas con los cuadros de texto y los botones. Por ejemplo, si queremos insertar un valor por defecto, usaremos el parámetro `value`. Ej:

```html
<input type="text" name="nombre" value="Escribe aquí...">
<input type="submit" value="Ok">
```

Si queremos limitar el número de caracteres que pueden escribir en las cajas, usaremos el parámetro `maxlength`:

```html
<input type="text" name="nombre" value="Escribe aquí..." maxlength="5">
```

También tenemos distintos tipos de input. Por ejemplo, para la fecha, o para indicar código hexadecimal de un color:

```html
<input type="date" name="fecha" value="<?php echo date("Y-m-d");?>">
<input type="color" name="color">
```

El código php en el `value` es para mostrar el día actual.

Vamos a hacer una calculadora, a ver como queda:

Código en `index.php`:

```html
<form action="tratarFormulario.php" method="get">
     <p>Calculadora</p>
     <input type="text" name="uno">
     <p>+</p>
     <input type="text" name="dos">
     <input type="submit" value="Ok">
</form>
```

Código en `tratarFormulario.php`:

```php
<?php
     echo 'La suma de '.$_GET['uno'].' y '.$_GET['dos'];
     $resultado=$_GET['uno']+$_GET['dos'];
     echo ' es '.$resultado;
?>
```

De modo que el código completo, hasta el momento, sería el siguiente:

**index.php:**

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <title>::Formularios::</title>
    </head>
    <body>
        <form action="tratarFormulario.php" method="get">
            <p>Nombre</p>
            <input type="text" name="nombre" value="nombre..." maxlength="5">
            <input type="text" name="apellido" value="apellidos...">
            <input type="date" name="fecha" value="<?php echo date("Y-m-d");?>">
            <input type="color" name="color">
            <p>Calculadora</p>
            <input type="text" name="uno">
            <p>+</p>
            <input type="text" name="dos">
            <input type="submit" value="Ok">
        </form>
    </body>
</html>
```

**tratarFormulario.php:**

```php
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <title>::Formularios::</title>
    </head>
        <?php
            echo 'Hola '.$_GET['nombre'].' '.$_GET['apellido'];
            echo 'Día seleccionado: '.$_GET['fecha'];
            echo ' ';
            echo 'Color '.$_GET['color'];
            echo '<br>';
            echo 'La suma de '.$_GET['uno'].' y '.$_GET['dos'];
            $resultado=$_GET['uno']+$_GET['dos'];
            echo ' es '.$resultado;
        ?>
    <body>
    </body>
</html>
```

Visualizando lo siguiente:

`index.php`

![index.php en navegador](/img/posts/20150206_6.png)

`tratarFormulario.php`

![tratarFormulario.php resultado](/img/posts/20150206_7.png)

Ahora vamos a hacer una conexión al servidor a través de formularios. Creamos un nuevo documento, `introducirEnPHP.php`.

En `index.php`, el código a escribir será el siguiente:

![Nuevo formulario en index.php](/img/posts/20150206_8.png)

Y en `introducirEnPHP.php`:

![Código introducirEnPHP.php](/img/posts/20150206_9.png)

Y comprobamos que nos da el mensaje de la consulta correcta.

![Resultado consulta correcta](/img/posts/20150206_10.png)

Los códigos completos de las prácticas de hoy son:

**index.php:**

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <title>::Formularios::</title>
    </head>
    <body>
        <form action="tratarFormulario.php" method="get">
            <p>Nombre</p>
            <input type="text" name="nombre" value="nombre..." maxlength="5">
            <input type="text" name="apellido" value="apellidos...">
            <input type="date" name="fecha" value="<?php echo date("Y-m-d");?>">
            <input type="color" name="color">
            <p>Calculadora</p>
            <input type="text" name="uno">
            <p>+</p>
            <input type="text" name="dos">
            <input type="submit" value="Ok">
        </form>
        <br><br>
        <form action="introducirEnPHP.php" method="get">
            Nombre:<input type="text" name="nombre" value="nombre.....">
            Edad: <input type="text" name="edad">
            <input type="submit">
        </form>
    </body>
</html>
```

**tratarFormulario.php:**

```php
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <title>::Formularios::</title>
    </head>
        <?php
            echo 'Hola '.$_GET['nombre'].' '.$_GET['apellido'];
            echo 'Día seleccionado: '.$_GET['fecha'];
            echo ' ';
            echo 'Color '.$_GET['color'];
            echo '<br>';
            echo 'La suma de '.$_GET['uno'].' y '.$_GET['dos'];
            $resultado=$_GET['uno']+$_GET['dos'];
            echo ' es '.$resultado;
        ?>
    <body>
    </body>
</html>
```

**introducirEnPHP.php:**

```php
<?php
    $servidor="localhost";
    $usuario="dam1";
    $password="dam1123";
    $bd="dam1_inazio";
        
    $conector=mysqli_connect($servidor,$usuario,$password,$bd);
        
    if (mysqli_connect_errno($conector)){
        echo "Fallo al conectar a MySQL:" . mysqli_connect_error();
    }
    else{
        echo "Conexión correcta";
        $nombre=$_GET['nombre'];
        $edad=$_GET['edad'];
        $consulta="INSERT INTO usuario VALUES (null,'$nombre',$edad)";
        if (mysqli_query($conector,$consulta)) {
            echo 'Consulta correcta';
        }
        else{
            echo 'Error en la consulta';
        }
    }
?>
```
