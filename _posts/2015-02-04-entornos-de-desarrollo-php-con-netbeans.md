---
title: Entornos de desarrollo. PHP con NetBeans
description: Cómo crear una primera página PHP con NetBeans conectada a un servidor remoto y a una base de datos MySQL mediante mysqli.
author: Inazio Claver
date: 2015-02-04 12:00:00 +0800
categories: [Entornos de desarrollo]
tags: [php, netbeans, mysql, mysqli]
pin: false
math: false
mermaid: false
---

Vamos a crear nuestra primera página en PHP con NetBeans. Lo primero, si no lo tenemos instalado, será instalar el pluggin de PHP.

Hecho eso, nos vamos a `File` - `New Project` y elegimos `PHP Application from Remote Server`.

![PHP Application from Remote Server](/img/posts/20150204_2.png)

![Siguiente pantalla](/img/posts/20150204_3.png)

En la siguiente pantalla, elegimos un nombre de proyecto. Por defecto saldrá el de a continuación, yo elegí `proyecto1`.

![Nombre de proyecto](/img/posts/20150204_4.png)

Pulsamos Next y en `Project URL` escribimos la dirección donde guardaremos nuestro proyecto. Pulsamos en `Manage` para crear una nueva conexión remota.

![Project URL y Manage](/img/posts/20150204_5.png)

Escribimos la dirección IP del servidor, usuario y contraseña.

![IP, usuario y contraseña](/img/posts/20150204_6.png)

Ok, Siguiente y saldrá el siguiente mensaje.

![Mensaje de confirmación](/img/posts/20150204_7.png)

Abrimos y/o nos descargamos el Putty, nos conectamos con el servidor con usuario y contraseña y, dentro de la carpeta `proyecto1` que se nos ha debido crear anteriormente, creamos un `index.php`.

![Putty creando index.php](/img/posts/20150204_8.png)

Nos vamos a NetBeans, retrocedemos pulsando Back y volvemos a pulsar Next. Se nos creará el proyecto.

![Proyecto creado en NetBeans](/img/posts/20150204_9.png)

En `index.php` escribimos el siguiente código:

![Código en index.php](/img/posts/20150204_13.png)

He aquí el código:

```php
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Mi primera página PHP</title>
    </head>
    <body>
    <?php
        phpinfo();
    ?>
    </body>
</html>
```

Y comprobamos, pulsando el botón play.

![Botón play](/img/posts/20150204_14.png)

Para comprobar la página. Veremos algo similar a esto:

![Resultado phpinfo()](/img/posts/20150204_15.png)

El siguiente paso es conectarnos a la base de datos para crear una nueva tabla llamada usuarios.

![Conexión a BD](/img/posts/20150204_10.png)

Nos vamos a mi usuario, pulsamos en nueva y configuramos la nueva tabla de la siguiente manera:

![Configuración de la tabla](/img/posts/20150204_16.png)

![Campos de la tabla](/img/posts/20150204_12.png)

Y rellenamos las tablas con dos valores de nombre y edad.

![Datos de la tabla](/img/posts/20150204_11.png)

Vamos a escribir nuestro primer código, en el que primero nos conectaremos a la base de datos:

![Código conexión BD](/img/posts/20150204_17.png)

Y veremos lo siguiente:

![Resultado conexión correcta](/img/posts/20150204_18.png)

A continuación haremos una consulta:

![Código consulta](/img/posts/20150204_17.png)

Viéndose de la siguiente manera:

![Resultado consulta](/img/posts/20150204_21.png)

El código completo utilizado hasta este punto:

```php
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Mi primera página PHP</title>
    </head>
    <body>
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
            
            $consulta="SELECT * FROM usuario;";
            
            $resultado=mysqli_query($conector,$consulta);
            $fila=mysqli_fetch_assoc($resultado); // Capturo fila de consulta en $fila
            
            while ($fila != NULL){ // Hasta que no queden más filas
                echo "<br />"; // Salto de linea en HTML
                print_r($fila);
                $fila=mysqli_fetch_assoc($resultado);
            }
        }
    ?>
    </body>
</html>
```

El problema es que montado así queda un poquito bastante feo la visualización de la consulta. ¿Qué hacemos? Montarlo en una tabla.

Lo primero será capturar las claves de nuestra consulta, para capturar los nombres de los arrays.

Por tanto, vamos a utilizar la función `foreach`.

A `foreach` le tenemos que pasar como parámetros la fila llamándolo como `$campo` el nombre de la clave y como `$valor` los valores contenidos en las mismas.

```php
foreach ($fila as $campo => $valor)
```

Básicamente lo que haremos será generar la estructura de una tabla y automatizar el mostrado tanto del nombre de la columna como de los campos. Tal que así:

![Código tabla con foreach](/img/posts/20150204_1.png)

Visualizando así el resultado:

![Resultado tabla](/img/posts/20150204_2.png)

Código de nuevo completo, utilizado hasta este momento y que reemplaza al anterior mostrado:

```php
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Mi primera página PHP</title>
    </head>
    <body>
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
            
            $consulta="SELECT * FROM usuario;";
            
            $resultado=mysqli_query($conector,$consulta);
            $fila=mysqli_fetch_assoc($resultado); // Capturo fila de consulta en $fila
            echo "<table>"
                    . "<thead>"
                        . "<tr>";
                            foreach($fila as $campo => $dato){ // Capturamos el nombre del campo
                                echo "<th>$campo</th>";
                            }
                        echo "</tr>"
                    . "</thead>"
                    . "<tbody>";
            
            while ($fila != NULL){ // Hasta que no queden más filas
                echo "<tr>";
                foreach($fila as $dato){ // Imprime uno a uno los campos de la fila
                    echo "<td>$dato</td>";
                }
                echo "</tr>";
                $fila=mysqli_fetch_assoc($resultado);
            }
            echo "</tbody></table>";
        }
    ?>
    </body>
</html>
```

Y por supuesto si insertas posteriormente más datos en la tabla, los mostrará simplemente recargando la página.

![Tabla con más datos](/img/posts/20150204_3.png)
