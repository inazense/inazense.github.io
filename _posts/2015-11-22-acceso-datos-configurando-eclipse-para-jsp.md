---
title: "Acceso a datos. Configurando Eclipse para JSP"
description: Configuración de Eclipse con Apache Tomcat para desarrollar aplicaciones JSP, incluyendo la instalación del servidor, el plugin de desarrollo web y la creación de proyectos web dinámicos.
date: 2015-11-22 13:00:00 +0800
categories: [Java]
tags: [java, jsp, eclipse, tomcat, acceso-a-datos, web, servlet]
pin: false
math: false
mermaid: false
---

Para desarrollar aplicaciones JSP en Eclipse es necesario configurar el servidor **Apache Tomcat** e instalar las herramientas de desarrollo web.

## 1. Instalar Apache Tomcat

1. Descargar Tomcat desde [https://tomcat.apache.org](https://tomcat.apache.org) (se recomienda la versión 7).
2. Aceptar los términos de licencia.
3. Seleccionar todas las opciones de instalación.
4. Configurar la ruta del JRE.
5. Elegir el directorio de instalación.
6. Lanzar el servidor tras la instalación.
7. Verificar que funciona accediendo a `http://localhost:8080`.

## 2. Instalar el plugin de desarrollo web en Eclipse

1. **Help → Install New Software...**
2. En "Work with", seleccionar el repositorio de Mars (o la versión de Eclipse instalada).
3. Buscar e instalar: **Web, XML, Java EE and OSGi Enterprise Development**
4. Reiniciar Eclipse cuando se solicite.

## 3. Configurar Tomcat como servidor en Eclipse

1. Ir a **Window → Preferences → Server → Runtime Environments**
2. Hacer clic en **Add...**
3. Seleccionar la versión de Apache Tomcat instalada
4. Indicar el directorio de instalación de Tomcat

## 4. Mostrar la vista de servidores

1. **Window → Show View → Other...**
2. Buscar **Server → Servers**
3. Aceptar para mostrar la vista

Desde esta vista se puede arrancar, parar y gestionar el servidor Tomcat directamente desde Eclipse.

## 5. Crear un proyecto web dinámico

1. **File → New → Dynamic Web Project**
2. Asignar un nombre al proyecto
3. En **Targeted Runtimes**, marcar el servidor Tomcat configurado
4. Finalizar el asistente

## 6. Desplegar y ejecutar

Desde la vista de servidores, hacer clic derecho → **Add and Remove...** para asociar el proyecto al servidor. Luego iniciar el servidor y acceder a las páginas JSP del proyecto a través del navegador.

> **Nota importante:** Arrancar Tomcat desde Eclipse (en lugar de como servicio independiente) evita conflictos de puertos, ya que Eclipse gestiona la instancia directamente.
