---
title: "Gestión empresarial. Configurar Eclipse para OpenERP"
description: Pasos para configurar Eclipse con PyDev, herramientas XML y plantillas para desarrollar módulos de OpenERP en Python y XML.
date: 2015-11-04 13:00:00 +0800
categories: [Python]
tags: [openerp, eclipse, pydev, python, xml, gestion-empresarial]
pin: false
math: false
mermaid: false
---

En esta entrada se explica cómo configurar **Eclipse Mars EE** para desarrollar módulos de **OpenERP** usando Python y XML.

## 1. Instalación de PyDev

PyDev es el plugin de Eclipse para desarrollo en Python.

1. Ir a **Help → Install New Software...**
2. Añadir el repositorio: `http://pydev.org/updates`
3. Seleccionar e instalar **PyDev for Eclipse**
4. Aceptar los certificados cuando se solicite
5. Reiniciar Eclipse

## 2. Configuración de Python

Una vez instalado PyDev, es necesario indicarle la ruta del intérprete Python:

1. Ir a **Window → Preferences**
2. Seleccionar **PyDev → Interpreters → Python Interpreter**
3. Hacer clic en **Quick Auto-Config**

Requiere tener Python 2.7 o superior instalado en el sistema.

## 3. Instalación de herramientas XML

Para trabajar con los ficheros XML de OpenERP:

1. **Help → Install New Software...**
2. Seleccionar el repositorio de Mars
3. Instalar **Eclipse XML Editors and Tools**
4. Seleccionar también **WST Common UI** y **WST Common Core**

## 4. Instalación de plantillas

Las plantillas facilitan la creación de ficheros Python y XML con la estructura correcta para módulos OpenERP.

- Descargar las plantillas desde: `http://code.google.com/p/openerp-eclipse-template/`

**Para las plantillas Python:**

1. **Window → Preferences → PyDev → Editor → Templates → Import**
2. Seleccionar el fichero de plantillas Python descargado

**Para las plantillas XML:**

1. **Window → Preferences → XML → XML Files → Editor → Templates → Import**
2. Seleccionar el fichero de plantillas XML descargado

Con esta configuración, Eclipse quedará listo para desarrollar módulos de OpenERP con soporte para Python y XML, autocompletado y plantillas de código.
