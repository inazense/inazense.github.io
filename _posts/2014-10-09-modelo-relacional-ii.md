---
title: Bases de datos. Modelo relacional (II)
description:
date: 2014-10-09 15:10:00 +0800
categories: [Bases de datos]
tags: [bases-datos, modelo-relacional, dominios, relaciones, valor-nulo, integridad-referencial, claves]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Dominios

Conjunto de valores escalares, todos del mismo tipo.

- **Valores escalares**: la menor unidad semántica de información (valor de un dato individual)

Los atributos se definen sobre un único dominio y toman valores reales del mismo. Se clasifican en:

- **Dominio simple**: dominio de valores escalares
- **Dominio compuesto**: combinación de dominios simples

## Relaciones

Una relación sobre un conjunto de dominios comprende dos partes:

- **Cabecera**: conjunto fijo de pares atributo-dominio (fila de columnas)
- **Cuerpo**: conjunto de tuplas (filas de datos)

Propiedades derivadas:

- No existen tuplas repetidas (la clave primaria lo impide)
- Las tuplas no están ordenadas (relación definida como conjunto)
- Los atributos no están ordenados (cabecera es un conjunto)

## Tipos de relaciones

- **Vistas**: relaciones derivadas con nombre
- **Resultados de consultas**: relaciones finales sin persistencia
- **Resultados intermedios**: relaciones de expresiones anidadas
- **Relaciones temporales**: con nombre, destruidas automáticamente

## Valor nulo

El valor nulo es un dato desconocido cuyo atributo es nulo (`NULL`), representando información desconocida, inaplicable o inexistente.

Motivos de necesidad:
- Tuplas con atributos desconocidos inicialmente
- Nuevos atributos en relaciones existentes
- Atributos inaplicables a ciertas tuplas

Cualquier expresión combinada con `NULL` resulta `NULL`.

## Reglas de integridad relacional

Limitaciones impuestas por el mundo real o por el modelo de datos.

### Claves primarias

- **Superclave**: conjunto de atributos identificadores únicos
- **Clave candidata**: subconjunto minimal identificador único
- **Clave primaria**: clave elegida entre las candidatas
- **Claves alternativas**: resto de claves candidatas

Propiedades: unicidad y minimalidad.

### Integridad de entidades

Ningún atributo que forme parte de la clave primaria debe tener valores nulos.

### Integridad referencial

La base de datos no debe contener valores de clave ajena sin concordancia con ningún valor de clave primaria de la relación referenciada.

**¡Salud y coding!**
