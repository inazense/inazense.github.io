---
title: "Acceso a datos. Aplicaciones web servidor. PHP (Ejercicio)"
description: Ejercicio práctico de acceso a bases de datos en PHP usando PDO, con operaciones CRUD sobre una tabla de items.
date: 2016-01-11 12:00:00 +0800
categories: [PHP]
tags: [acceso-a-datos, php, pdo, crud, mysql]
pin: false
math: false
mermaid: false
---

En esta entrada se presenta un ejercicio práctico de acceso a datos usando la interfaz **PDO** (PHP Data Objects) en PHP. El proyecto se llama **PracticaPDO** y consiste en construir una aplicación web completa con operaciones CRUD sobre una base de datos MySQL.

## Base de datos

Ejecutar el siguiente script SQL para crear la base de datos y la tabla de items:

```sql
DROP DATABASE IF EXISTS practicaPDO;
CREATE DATABASE practicaPDO;
USE practicaPDO;

CREATE TABLE `items` (
  `id_item` int(11) NOT NULL auto_increment,
  `item` varchar(40) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_item`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `items` VALUES
(1, 'PHP'),
(2, 'Mootools'),
(3, 'Google Maps'),
(4, 'Javascript'),
(5, 'Actionscript'),
(6, 'c#');
```

## conexion.php

Fichero de configuración con las credenciales de la base de datos:

```php
<?php
$servidor = 'localhost';
$bd = 'practicapdo';
$usuario = 'root';
$password = 'root';
?>
```

## index.php

La página principal contiene un menú de navegación con enlaces a las diferentes operaciones:

- Consulta común (mostrar todos los items)
- Consulta con parámetros
- Insertar
- Actualizar
- Borrar

## Operaciones CRUD

Todos los scripts usan sentencias preparadas de PDO con bloques `try-catch` para el manejo de errores.

### comun.php — Consulta todos los registros

```php
<?php
include("conexion.php");
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $password);
    $sentencia = $conexion->prepare("SELECT * FROM items");
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();
    foreach ($resultado as $fila) {
        echo $fila['id_item'] . " - " . $fila['item'] . "<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $conexion = null;
}
?>
```

### consultaConParametros.php — Consulta parametrizada

```php
<?php
include("conexion.php");
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $password);
    $sentencia = $conexion->prepare("SELECT * FROM items WHERE id_item = ?");
    $sentencia->execute([$_POST['id']]);
    $resultado = $sentencia->fetchAll();
    foreach ($resultado as $fila) {
        echo $fila['id_item'] . " - " . $fila['item'] . "<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $conexion = null;
}
?>
```

### insertar.php — Insertar un nuevo item

```php
<?php
include("conexion.php");
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $password);
    $sentencia = $conexion->prepare("INSERT INTO items (item) VALUES(?)");
    $sentencia->execute([$_POST['item']]);
    echo "Registro insertado correctamente";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $conexion = null;
}
?>
```

### actualizar.php — Actualizar un item

```php
<?php
include("conexion.php");
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $password);
    $sentencia = $conexion->prepare("UPDATE items SET item = ? WHERE id_item = ?");
    $sentencia->execute([$_POST['item'], $_POST['id_item']]);
    echo "Registro actualizado correctamente";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $conexion = null;
}
?>
```

### borrar.php — Borrar un item

```php
<?php
include("conexion.php");
try {
    $conexion = new PDO("mysql:host=$servidor;dbname=$bd", $usuario, $password);
    $sentencia = $conexion->prepare("DELETE FROM items WHERE id_item = ? OR item = ?");
    $sentencia->execute([$_POST['id_item'], $_POST['item']]);
    echo "Registro eliminado correctamente";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $conexion = null;
}
?>
```

## Notas

- Todas las operaciones usan sentencias preparadas para prevenir inyección SQL.
- La conexión PDO se cierra asignando `null` al objeto de conexión en el bloque `finally`.
- El proyecto incluye un fichero CSS para dar estilo al menú de navegación, las tablas y los formularios.
