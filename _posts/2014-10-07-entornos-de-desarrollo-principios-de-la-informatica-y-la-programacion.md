---
title: Entornos de desarrollo. Principios de la informática y la programación
description: "Aprende los fundamentos de la informática: máquina de Von Neumann, arquitectura de computadoras, operaciones lógicas AND/OR/NOT, registros, memoria y componentes básicos de un ordenador."
date: 2014-10-07 16:10:00 +0800
categories: [Entornos de desarrollo]
tags: [informatica, von-neumann, arquitectura, operaciones-logicas, programacion, entornos-desarrollo]

pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## INTRODUCCIÓN. Principios de la informática y la programación

**La máquina de Von Neumann**. Representación de cómo debería estar diseñado un ordenador para que funcione correcta y eficazmente.

![Maquina de Von Neumann](/img/posts/20141007_1.png)

La informática se basaba en tarjetas perforadas, que contenían las instrucciones a realizar (eran la memoria, el programa) y otras tarjetas que eran las de datos.

Hasta que se diseñó ésta máquina. Su ventaja es poder probar los programas aunque no estén finalizados.

Tiene varias partes:
- **Unidad de control (UC)**. Lleva la señal de reloj que sincroniza todo el proceso.
- **Unidad aritmético lógica (ALU)**. Lleva todas las operaciones, matemáticas y lógicas. **Operaciones lógicas:**

### AND. A elegir entre dos operadores
|X|Y|RESULTADO|
|---|---|---|
|0|0|0|
|0|1|0|
|1|0|0|
|1|1|1|

### OR. Elegirá la opción más favorable (cierto) en caso de diferente opción

|X|Y|RESULTADO|
|---|---|---|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|1|

### NOT. Niega el resultado. Si la entrada es falsa la salida es cierta, y viceversa

|ENTRADA|SALIDA|
|---|---|
|0|1|
|1|0|

- **Registro de instrucciones**. El registro de instrucciones almacena la instrucción que se va a ejecutar
- **Contador de programa**. Sirve para hacer avanzar el programa, que pase de una instrucción / dirección a otra. Incrementando, decrementando o haciendo saltos de línea
- **MDR (Registro de Instrucciones de Datos)**. Comunica con MAR por bus interno
- **MAR (Registro de Direcciones)**. Comunica con MDR por bus interno.
- **Registro de memoria de procesador.**
- **Memoria caché (L1, L2, L3)**
- **Memoria RAM (memoria volátil)**
- **Componentes de entrada / salida**. Comunica con memoria por bus de datos. Cuando se quiere ejecutar un programa se pide a la memoria secundaria. Pasa a la RAM y ahí va leyendo.
**¡Salud y coding!**

Guarda los programas y datos en memoria. También permite dirigir instrucciones y datos en base a direcciones de memoria.

**Instrucciones (Programa)** -> S.O. / PROGRAMA / DATOS
**Lenguaje ensamblador**: Primer lenguaje de alto nivel. Sustitución básica de operaciones a código máquina.

**¡Salud y coding!**