---
title: "Acceso a datos. JDBC (II). Diseño de una aplicación con BD"
description: Diseño de una aplicación Java con base de datos aplicando el patrón DAO (Data Access Object) para separar la lógica de acceso a datos del resto de la aplicación.
author: Inazio Claver
date: 2015-10-24 12:30:00 +0800
categories: [Java]
tags: [java, acceso-a-datos, jdbc, mysql, dao, patron-diseno, base-de-datos]
pin: false
math: false
mermaid: false
---

## Patrón DAO (Data Access Object)

El patrón **DAO** consiste en separar los detalles de comunicación con la base de datos en clases o módulos dedicados. La información se gestiona como objetos Java (`Libro`, `Autor`...) mientras que la capa de persistencia puede cambiarse sin afectar al resto de la aplicación.

Ventajas:
- Separación de responsabilidades: la lógica de negocio no conoce los detalles de acceso a datos
- Flexibilidad para cambiar el SGBD sin reescribir la aplicación
- Facilita la distribución del trabajo en equipo

## Aplicación de ejemplo: gestión de libros

La aplicación permite:
- Listar todos los libros
- Buscar libros por título o precio
- Mostrar los autores asociados a cada libro

## Arquitectura de clases

![Diagrama de clases de la aplicación con DAO](/img/posts/20151024_3.png)

La arquitectura propuesta separa las clases en capas:

- **Clases de modelo** (`Libro`, `Autor`): representan las entidades de la base de datos como objetos Java con sus atributos y métodos `get`/`set`.
- **Clases DAO** (`LibroDAO`, `AutorDAO`): contienen toda la lógica de acceso a la base de datos (consultas SQL, conexión, `ResultSet`...).
- **Clase de utilidad** (`Conexion`): centraliza la creación y cierre de la conexión a la base de datos.
- **Interfaz de usuario** (`Main`): usa las clases DAO sin conocer los detalles de la base de datos.

Esta separación permite, por ejemplo, sustituir MySQL por PostgreSQL simplemente modificando las clases DAO y la cadena de conexión, sin tocar el resto del código.
