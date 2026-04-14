---
title: Entornos de desarrollo. Desarrollo de software I
description: "Aprende los fundamentos del desarrollo de software: tipos de software (sistema, aplicación, programación), arquitectura hardware-software, estándares y primeros pasos con PHP. Guía completa para principiantes."
date: 2014-10-08 12:10:00 +0800
categories: [Entornos de desarrollo]
tags: [desarrollo-software, tipos-software, php, programacion, entornos-desarrollo, principiantes]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Ordenador
- Hardware. Parte física y tangible
- Software. Parte lógica, que actúa sobre el software. Hay distintos niveles:
	- Usuario
	- Aplicación
	- Sistema Operativo
	- Drivers
	- Hardware

## ¿Qué es software?

Según la RAE, un conjunto de programas y reglas informáticas para ejecutar ciertas tareas en una computadora

Según IEEE, conjunto de los programas de cómputo, procedimientos, reglas, documentación y datos asociados que forman parte de las operaciones de un sistema de computación.

Son programas y datos almacenados en el ordenador. Permite comunicarse con hardware y con otro software.

### Tipos de software

- Software de sistema
	- Hace funcionar el hardware
	- Administración de recursos
	- Interacción hardware – usuario
	- Control de componentes físicos

Ejemplos: S.O.,  drivers, herramientas de diagnóstico, herramientas de optimización y corrección, etc.

- Software de aplicación
	- Programas para realizar tareas que no pertenecen a la parte física del ordenador
	- Campos susceptibles de ser automatizados
	- Ordenador para no informáticos

Ejemplos: Aplicaciones de usuarios

- Software de programación y desarrollo
	- Herramientas para la programación
	- Ayudar en la corrección sintáctica, semántica y léxica
	- Normalmente herramientas gráficas (GUI, Graphic User Interface)

## Datos varios

**Estándar**: Que sirve de patrón, modelo o punto de referencia para medir o valorar cosas de la misma especia.

**Entornos de desarrollo online**: [http://writecodeonline.com](http://writecodeonline.com)

## EXTRA. Lenguaje PHP

```echo``` -> Mostrar en pantalla. Ejemplo
```php
<?php
	echo ‘Hola mundo’;
?>

<?php
	echo ‘2+3’;
?>

<?php
	echo 2+3;
?>
```

En PHP las variable se introducen con ```$```. Ejemplo:

```php
<?php
	edad=30;
	echo $edad;
?>

<?php
	edad=30;
	jubilado=67-$edad;
	echo ‘Te quedarán ’$jubilado’ años para jubilarte’;
?>
```

**¡Salud y coding!**