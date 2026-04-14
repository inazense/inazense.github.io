---
title: Bases de datos. Teoría
description: Apuntes teóricos de bases de datos sobre tipos de ficheros, organización, arquitectura ANSI/X3/SPARC y comparativa de SGBD libres y comerciales.
author: Inazio Claver
date: 2015-05-13 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, teoría, ficheros, sgbd, arquitectura]
pin: false
math: false
mermaid: false
---

Ignorantón de mí, pensaba que en bases de datos haríamos, ya en el tercer trimestre, sólo práctica. ¡Pues no! también hay que estudiar teoría para el examen.

El profesor nos ha pasado varios PDFs con apuntes (que he tenido que resumir) y ejercicios para realizar.

## Ficheros según su función

### Tipos de ficheros. Clasificación según importancia y vigencia de la información

**Ficheros de alta disponibilidad y durabilidad:** Sometidos a fuerte protección para evitar cualquier alteración accidental de contenido. Obliga a disponer de copia de seguridad con actualizaciones periódicas. Tres grandes grupos:

- **Ficheros de situación.** Contiene en todo momento el estado actual. Frecuencia de actualización y consulta alta.
- **Ficheros históricos.** Información elaborada de tratamientos anteriores. Crecimiento elevado, tasas de consulta muy débil.
- **Ficheros de constantes o de indicativos.** Información consultable pero sin resultados. Tasa de renovación pequeña. Tasa de consulta alta.

**Ficheros de movimientos o de transacciones:** Refleja situaciones puntuales. Su existencia finaliza cuando se efectúan las actualizaciones correspondientes al maestro.

**Ficheros de trabajo o de maniobra:** Creados para almacenar transitoriamente resultados intermedios. Son ficheros puente para no saturar la memoria principal.

## Organización de ficheros

Tipos de organización: **Secuenciales** (lineales, no lineales), **Directos** (por posición, por clave), **Indexados** (ISAM, C-ISAM).

**SEQUENTIAL LINED:** El orden físico coincide con el orden lógico. Operaciones: añadir (sólo al final), consulta en orden secuencial, actualización.

![Organización secuencial de ficheros](/img/posts/20150513_1.png)

**ORGANIZACIÓN DIRECTA ALEATORIA:** Transformación que genera la dirección de cada registro a partir de una clave. Métodos de direccionamiento: Directo, Asociado (por clave), Calculada (por Hashing).

![Organización directa](/img/posts/20150513_2.png)

## Introducción a bases de datos

**Definiciones clave:** Informática, archivo, sistema de ficheros, procesamiento tradicional (redundancia, inconsistencia, dificultad de acceso), Sistemas de bases de datos.

**Ventajas de BD:**
- Orientación a datos
- Independencia de datos
- Disminución de redundancias
- Mayor integridad
- Disponibilidad
- Seguridad y privacidad
- Compartición de datos

**Desventajas:**
- Instalación costosa
- Ausencia de estándares
- Falta de rentabilidad a corto plazo
- Necesidad de personal especializado

### Arquitectura ANSI/X3/SPARC — Niveles de abstracción

- **Físico o interno.** Describe cómo se almacenan los datos físicamente.
- **Conceptual.** Describe qué datos se almacenan y las relaciones e integridad.
- **De visión o externo.** Describe la visión que tiene cada usuario o aplicación.

![Niveles de abstracción ANSI/X3/SPARC](/img/posts/20150513_3.png)

**Componentes del SGBD:** DDL (definición), DML (manipulación), DCL (control), Diccionario de datos, Gestor de bases de datos, Arquitectura cliente–servidor.

![Arquitectura de cuatro capas](/img/posts/20150513_4.png)

## BDA libre – comercial – centralizada – distribuida

**SGDB comerciales:** Oracle, MySQL, DB2, Informix, Microsoft SQL Server, SYBASE.

**SGBD libres:** MySQL, PostgreSQL, FireBird, Apache Derby, SQLite.

**BD centralizadas vs. distribuidas (BDD, SBDD, SGBDD).**

## Ejercicios

### Ficheros según su función

Ejemplo de clasificación para una biblioteca:
- Editoriales → Fichero de constantes
- Catálogo → Fichero de situación
- Libros obsoletos → Fichero histórico

### Introducción a bases de datos

Ejercicios de 21 preguntas con respuestas sobre los conceptos básicos de bases de datos.

### BDA libre–comercial–centralizada–distribuida

Ventajas e inconvenientes de BD centralizadas y distribuidas, y comparativa entre fragmentación horizontal y vertical.
