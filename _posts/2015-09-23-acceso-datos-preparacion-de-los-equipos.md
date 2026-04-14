---
title: Acceso a datos. Preparación de los equipos
description: Lista de herramientas necesarias para el módulo de Acceso a datos, con instrucciones de instalación para XAMPP, MySQL Workbench, JDK, Eclipse Mars y NetBeans.
author: Inazio Claver
date: 2015-09-23 12:30:00 +0800
categories: [Bases de datos]
tags: [acceso-a-datos, xampp, mysql, jdk, eclipse, netbeans]
pin: false
math: false
mermaid: false
---

El primer día de clase del módulo de Acceso a datos lo hemos dedicado a conocer los contenidos que veremos durante los próximos seis meses y a preparar las herramientas que vamos a necesitar. Todo el software es gratuito y debe instalarse en el orden indicado.

## XAMPP

Distribución de Apache que incluye MySQL, PHP y Perl. Durante la instalación hay que asegurarse de que los componentes necesarios están marcados.

![Instalación de XAMPP](/img/posts/20150923_2.png)

## dotNet

Clases .NET necesarias para que funcione correctamente MySQL Workbench.

## vCredist

Librerías de Visual C++ redistributable, también requeridas por Workbench.

## MySQL Workbench

Cliente para gestionar bases de datos MySQL. Para que funcione bien hay que tener instalados previamente dotNet y vCredist.

## JDK

Kit de desarrollo de Java. Instalar la versión 8, que es la que necesitan tanto Eclipse como NetBeans.

## Eclipse Mars

IDE en su edición Enterprise, que incluye las herramientas integradas que vamos a utilizar a lo largo del módulo.

## NetBeans

IDE que utilizaremos más adelante para trabajar con Beans e Hibernate. Durante la instalación pulsamos en **Customize** y desmarcamos GlassFish, ya que usaremos Apache Tomcat en su lugar.

![Opciones de instalación de NetBeans - Customize](/img/posts/20150923_3.png)

Cuando nos pregunte si queremos instalar JUnit, lo rechazamos.

![Rechazo de instalación de JUnit](/img/posts/20150923_4.png)

Con esto ya tenemos el equipo preparado para empezar a trabajar con el módulo.
