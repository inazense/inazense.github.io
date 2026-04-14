---
title: "Instalación y configuración de Hibernate en Eclipse"
description: Guía completa para instalar y configurar Hibernate ORM en Eclipse, incluyendo el plugin de JBoss Tools, el driver de MySQL, la ingeniería inversa y la generación de código.
date: 2016-01-26 12:00:00 +0800
categories: [Java]
tags: [java, hibernate, eclipse, orm, mysql, acceso-a-datos, jboss]
pin: false
math: false
mermaid: false
---

**Hibernate** es una herramienta de mapeo objeto-relacional (ORM) que facilita el mapeo de atributos entre una base de datos relacional y el modelo de objetos de una aplicación, mediante ficheros XML o anotaciones. Soluciona la brecha entre el modelado orientado a objetos en memoria y el esquema relacional de la base de datos.

## Fase 1: Instalar el plugin de Hibernate en Eclipse

Desde Eclipse, ir a:

```
Help → Install New Software...
```

Añadir el repositorio de JBoss Tools (la URL varía según la versión de Eclipse):

- **Eclipse Mars**: `http://download.jboss.org/jbosstools/updates/stable/mars`
- **Eclipse Neon**: `http://download.jboss.org/jbosstools/neon/stable/updates/`

En la lista de software disponible, seleccionar:

```
JBoss Data Services Development → Hibernate
```

Instalar y reiniciar Eclipse cuando se solicite.

## Fase 2: Configurar el driver de MySQL

1. Descargar el conector JDBC de MySQL (`mysql-connector-java-X.X.XX.jar`) y colocarlo en la carpeta de Eclipse.
2. Ir a:
   ```
   Window → Preferences → Data Management → Connectivity → Driver Definitions
   ```
3. Añadir un nuevo driver seleccionando la versión de MySQL 5.1 y configurando la referencia al JAR descargado.

## Fase 3: Configurar el proyecto Java

1. Crear un nuevo proyecto Java.
2. Añadir la librería **Connectivity Driver Definition** (el driver de MySQL configurado anteriormente) al proyecto mediante:
   ```
   Project → Properties → Java Build Path → Libraries → Add Library
   ```
3. Crear una carpeta `/lib` en el proyecto y añadir los JARs de Hibernate descargados desde [http://hibernate.org/orm/](http://hibernate.org/orm/).
4. Añadir todos los JARs de `/lib` al Build Path del proyecto.

## Fase 4: Crear los ficheros de configuración de Hibernate

### Hibernate Configuration File

Hacer clic derecho sobre el proyecto y seleccionar:

```
New → Hibernate Configuration File (cfg.xml)
```

Configurar los parámetros principales:

| Parámetro | Valor |
|-----------|-------|
| Session Factory name | (nombre de la factoría) |
| Database dialect | MySQL |
| Connection URL | `jdbc:mysql://localhost:3306/nombre_bd` |
| Username | root |
| Password | root |

### Hibernate Console Configuration

Desde la perspectiva **Hibernate**, crear una nueva configuración de consola que apunte al fichero `hibernate.cfg.xml` generado y al proyecto actual.

### Hibernate Reverse Engineering File

Hacer clic derecho sobre el proyecto y seleccionar:

```
New → Hibernate Reverse Engineering File (reveng.xml)
```

En el asistente, seleccionar las tablas de la base de datos que se quieren convertir a clases Java. Este fichero guía la ingeniería inversa de base de datos a objetos.

### Hibernate Code Generation

Desde la perspectiva **Hibernate**, ejecutar la generación de código configurando los siguientes exportadores:

- **Domain code**: genera las clases Java (POJOs) correspondientes a las tablas.
- **XML Mappings**: genera los ficheros `.hbm.xml` de mapeo.
- **XML Configuration**: actualiza el fichero `hibernate.cfg.xml` con los mapeos generados.

Una vez completado el proceso, el proyecto contará con las clases de dominio y los ficheros de mapeo necesarios para trabajar con Hibernate.

## Requisitos

- Java 8 o superior
- JDBC 4.2
- MySQL 5.1 o superior
- Eclipse Mars / Neon (u otras versiones con el repositorio JBoss correspondiente)
