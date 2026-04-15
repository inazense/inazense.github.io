---
title: Programación. Codificación de Programas en C (I)
description:
date: 2014-10-09 16:10:00 +0800
categories: [Programación]
tags: [programacion, c, tipos-de-datos, variables, conversion-tipos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Advertencias

El lenguaje C distingue entre mayúsculas y minúsculas. Además, todas las instrucciones deben terminar con punto y coma (`;`), siendo su omisión un error de programación.

## Tipos de datos

Los datos en C se clasifican en:

**No estructurados:**
- `void` (tipo vacío)
- Escalares: enumerados, punteros, aritméticos
  - `char` (8 bits)
  - Enteros: `int`, `short` (16 bits), `long` (32 bits)
  - Reales: `float` (4 bytes), `double` (8 bytes), `long double` (16 bytes)

**Estructurados:**
- `array`, `struct`, `union`, `file`

## Definición de variables

```c
long int v;
long int v,i,j;
float v=0.5,w=5,x=0.0,y=0;
char c='a';
char a='\t',b='\n',d='\v'; /* tabulador, salto de línea, tabulador vertical */
unsigned char c;
```

El modificador `unsigned` indica que la variable sólo puede tomar valores naturales (sin signo).

## Conversión de tipos

**Implícita:** El compilador realiza conversiones automáticas, a veces generando avisos. Por ejemplo, en la operación `1/2` con dos enteros el resultado es `0` (entero), que luego se convierte a `float`.

**Explícita:** Se fuerza la conversión usando el tipo deseado entre paréntesis:

```c
(float) 1/2  /* Resultado: 0.5 */
```

En este caso sólo se convierte el primer operando, por lo que la división ya se realiza entre tipos reales.

**¡Salud y coding!**
