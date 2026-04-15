---
title: Sistemas Informáticos. Sistemas Numéricos
description:
date: 2014-10-11 12:10:00 +0800
categories: [Sistemas]
tags: [sistemas-informaticos, sistemas-numericos, binario, complemento, coma-flotante, representacion-informacion]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Complementación de binarios

La complementación permite representar números binarios negativos. Existen dos métodos equivalentes:

- Invertir todos los bits (unos por ceros y viceversa) y sumar 1 al resultado.
- Mantener los bits desde el bit menos significativo hasta el primer `1` inclusive, e invertir el resto.

Ejemplo con 6 bits:

```
 40 en binario →  101000
 30 en binario →  011110

-30 en binario:
  011110  →  invertir bits  →  100001
                               +     1
                            --------
                               100010
```

Comprobación: 40 - 30 = 10

```
  101000
+ 100010
--------
  000110  →  6 en decimal  ✓
```

## Ejercicios de conversión de sistemas numéricos

![Tabla de ejercicios de conversión entre sistemas numéricos](/img/posts/20141011_1.png)

## Representación de la información

**Números enteros:**

- **Coma fija**: los dígitos se representan en formato `xxx,nn`
- **Coma flotante**: se utilizan mantisa y exponente. Ejemplo: `1000,57` en coma fija equivale a `0,1 × 10⁴` en coma flotante

**Números reales:**

El orden de los bits es: símbolo → exponente → mantisa (con desplazamiento)

## Tamaño de datos

Los datos se almacenan usando anchos específicos según el tipo. Las cadenas de caracteres se representan mediante rangos de ocho bits consecutivos, cada uno correspondiendo a un símbolo en tablas de caracteres estándar (como ASCII).

**¡Salud y coding!**
