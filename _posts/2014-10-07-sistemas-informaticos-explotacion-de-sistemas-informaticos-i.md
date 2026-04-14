---
title: Sistemas informáticos. Explotación de sistemas informáticos I
description: "Aprende arquitectura de computadoras: procesador, memoria, buses y periféricos. Guía completa sobre UC, ALU, registros, canales de comunicación, tipos de instrucciones y componentes fundamentales de sistemas informáticos."
date: 2014-10-07 13:10:00 +0800
categories: [Sistemas informáticos]
tags: [arquitectura, procesador, memoria, buses, sistemas-informaticos, hardware]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## ARQUITECTURA DE UN ORDENADOR

Describe los elementos funcionales de un computador. Compuesto de unidades funcionales, que son las partes diferenciales de un sistema.

Se distribuyen en tres niveles:

- Procesador y memoria central
- Canales de comunicación
- Periféricos de entrada / salida

Para comunicar los distintos elementos entre sí tenemos los canales de comunicación, y para interactuar con ellos tenemos las unidades de entrada y salida.

Los componentes transmiten conocimientos entre sí mediante señas eléctricas

## Procesador.

Es el elemento fundamental que lleva toda la parte del proceso. Consta de la unidad de control (UC) y unidad aritmeticológica (UAL / ALU).
               
### UC

La unidad de control supervisa y controla las diferentes funciones del sistema. Las instrucciones llevan un proceso de compilación, condificación y descodificación.

Funciones:

- Interpretar el contenido de distintas posiciones de memoria
- Ordenar la ejecución de las operaciones precisas en cada instrucción
- Atender y decidir sobre posibles interpretaciones que se pueden producir en la ejecución de un programa

Elementos:

- RELOJ. La parte elemental. Marca el cronograma, que a su vez es quien nos indica que hacer en cada ciclo (un Hz es un ciclo). Usado para la sincronización.
- REGISTRO. Es una consecución ordenada de bits. Hay diferentes tipos. Unos instruccionales y otros contadores. La velocidad de lectura es muy rápida, pero en tamaño es mínimo (por el calor, entre otros motivos).

### UAL

La unidad aritmético lógica se encarga de realizar operaciones numéricas o alfanuméricas. Tiene tres tipos de circuitos:

- Diáticos
- Sumador
- Complementador
- Lógicos
- Registros generales o bancos de datos:
	- Registros acumuladores
	- Registro de desplazamiento. Apilamiento de instrucciones. Una técnica de sistemas de proceso interesante en programación
	- Registros de estado o Banderitas, que suelen ser de un bit.

## Canales (Buses)

Son unidades de realización de E/S de datos entre periféricos y la memoria central.
Tipos de buses:

- Bus de datos
- Bus de direcciones
- Canal selector
	- Canal multiplexor
- Bus de control

## Instrucciones

Tipos de instrucción según su función:

- De transferencia de datos
- De ruptura de secuencias
	- Salto condicional
	- Salto incondicional
- Aritméticas y lógicas
- De entrada y salida
- De control

Según su contenido se componen de un código de operación y de uno o varios operandos.

**¡Salud y coding!**