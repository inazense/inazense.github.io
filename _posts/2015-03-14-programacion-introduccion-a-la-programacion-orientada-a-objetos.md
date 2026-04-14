---
title: Programación. Introducción a la programación orientada a objetos
description: Deficiencias de la programación estructurada, los cuatro principios de la POO, diagramas UML y arquitectura en tres capas.
author: Inazio Claver
date: 2015-03-14 12:00:00 +0800
categories: [Programación]
tags: [programacion, poo, objetos, uml, java]
pin: false
math: false
mermaid: false
---

## Deficiencias de la programación estructurada

Un poco de historia:

- **1968:** Crisis del software. Nace la programación estructurada.
- **1985:** C++ se posiciona en el mercado como lenguaje orientado a objetos.
- **1996:** Lanzamiento de Java al mercado.

En el desarrollo de software estructurado, el ladrillo es la subrutina y el módulo agrupa las subrutinas. Un **módulo** es el conjunto de subrutinas y declaraciones de tipos y constantes.

![Esquema del desarrollo de software estructurado](/img/posts/20150314_1.png)

Los datos pasan por distintas subrutinas que los procesan, con total independencia entre datos y procesos.

**Deficiencias del enfoque estructurado:**

- Requiere traducir los problemas al pensamiento de máquina (datos y procesos separados).
- El ser humano piensa en objetos que tienen propiedades y comportamientos, no en datos y procesos separados.
- Limita la comunicación entre cliente y equipo de desarrollo.
- Reduce la capacidad de abstracción y reutilización.

## Principios de la POO

### Primer principio: Todo es un objeto

Cualquier problema puede modelarse como un conjunto de objetos. Un objeto tiene:

- **Propiedades (atributos):** color, tamaño, longitud, peso...
- **Comportamientos (métodos):** escribir, rotar, encender, aterrizar...

Ejemplos:

- Mechero BIC: propiedades (longitud 5 cm, peso, cantidad de gas) y comportamientos (encender, apagar).
- Boeing 747: propiedades (peso, potencia, número de pasajeros) y comportamientos (despegar, aterrizar).

### Segundo principio: Todo objeto es de algún tipo

Una **clase** es la abstracción de las propiedades y comportamientos de un conjunto de objetos. La clase es el molde; los objetos son las instancias.

![Representación de clase en UML](/img/posts/20150314_2.png)

Distinción clave:

- **Clases:** Sin existencia real, estáticas, son el molde.
- **Objetos:** Con existencia real, dinámicos, son instancias de una clase.

### Tercer principio: Los objetos se comunican mediante mensajes

Los mensajes son las peticiones que un objeto realiza a otro para que este último ejecute alguno de sus comportamientos.

![Comunicación entre objetos mediante mensajes](/img/posts/20150314_3.png)

### Cuarto principio

Una aplicación orientada a objetos es una comunidad de objetos que nacen, interactúan entre sí y mueren.

## Diagramas UML

Representación de una clase:

![Diagrama UML de clase](/img/posts/20150314_4.jpg)

Representación de un objeto:

![Diagrama UML de objeto](/img/posts/20150314_5.jpg)

## Arquitectura basada en tres capas

![Arquitectura de tres capas](/img/posts/20150314_6.jpg)

- **Capa de persistencia:** Almacenamiento e interacción con la base de datos.
- **Capa de negocio:** Operaciones del sistema.
- **Capa de presentación:** Interfaz de usuario y diseño.

Flujo típico: el usuario solicita un servicio a la capa de presentación → la capa de negocio lo resuelve → la capa de persistencia gestiona los datos en la base de datos.
