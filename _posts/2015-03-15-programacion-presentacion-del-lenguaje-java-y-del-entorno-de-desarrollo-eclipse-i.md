---
title: Programación. Presentación del lenguaje Java y del entorno de desarrollo Eclipse (I)
description: Características principales de Java, motivos de su éxito y descripción de la plataforma de desarrollo Java SE con Eclipse.
author: Inazio Claver
date: 2015-03-15 09:00:00 +0800
categories: [Java, Programación]
tags: [java, programacion, eclipse, jvm, jdk, jre]
pin: false
math: false
mermaid: false
---

## Características de Java

- **Orientado a objetos.**
- **Simple y familiar:** Sintaxis basada en C/C++.
- **Robusto:** Gestión automática de memoria, sin punteros.
- **Seguro:** Se eliminan los punteros y se realizan frecuentes comprobaciones de tipo.
- **Multipropósito:** Sus completas librerías gratuitas permiten desarrollar todo tipo de aplicaciones (multihilo, acceso a BBDD, acceso a redes, aplicaciones web, XML...).
- **Independiente de la arquitectura y portable.**
- **Semi-interpretado.**

![Independencia de arquitectura en Java](/img/posts/20150315_1.jpg)

El lema de Java es: **"Write once, run anywhere"** (escríbelo una vez, ejecútalo en cualquier lugar).

![Java semi-interpretado: compilación a bytecode y ejecución en la JVM](/img/posts/20150315_2.jpg)

## ¿Por qué Java tiene éxito?

- Los sistemas son más fáciles de expresar, entender y mantener.
- Independiente de la arquitectura.
- Permite el desarrollo rápido de software.
- Librerías muy completas, multipropósito, multiplataforma, probadas y gratuitas.
- Manejo de errores cómodo y versátil mediante el mecanismo de las excepciones.
- Permite la programación tanto a pequeña como a gran escala.

## La plataforma de desarrollo Java

Java dispone de tres ediciones:

- **Edición micro (Java ME):** Para aplicaciones en sistemas empotrados.
- **Edición estándar (Java SE):** Para aplicaciones web o de escritorio.
- **Edición empresarial (Java EE):** Para aplicaciones con altos requerimientos.

En el curso usamos **Java SE** con el IDE **Eclipse**. La edición estándar incluye dos componentes:

- **JRE (Java Runtime Environment):** Entorno de ejecución, compuesto por la máquina virtual (JVM) y las librerías de la API.
- **JDK (Java Development Kit):** Kit de desarrollo, que incluye el compilador (`javac`), el generador de documentación (`javadoc`), el depurador y otras herramientas.
