---
title: "Procesos y servicios. Programación concurrente"
description: Conceptos de programación concurrente, paralela y distribuida, con sus ventajas, inconvenientes y modelos de comunicación entre procesos.
author: Inazio Claver
date: 2015-10-13 12:10:00 +0800
categories: [Sistemas]
tags: [procesos, concurrencia, paralelismo, distribuido, sockets, rpc, rmi]
pin: false
math: false
mermaid: false
---

## Definiciones

**Programa**: Conjunto de instrucciones que se aplican a un conjunto de datos de entrada para obtener una salida.

**Proceso**: Un programa en ejecución. La actividad asíncrona susceptible de ser asignada a un procesador. Una unidad de actividad que se caracteriza por la ejecución de una secuencia de instrucciones, un estado actual y un conjunto de recursos del sistema asociados.

## Programación Concurrente

La programación concurrente es la existencia simultánea de varios procesos en ejecución. Es la disciplina que se encarga del estudio de las notaciones que permiten especificar la ejecución concurrente de las acciones de un programa, así como las técnicas para resolver los problemas inherentes a la ejecución concurrente (comunicación y sincronización).

### Beneficios

- Mejor aprovechamiento de la CPU mientras un proceso realiza operaciones de entrada/salida
- Mayor velocidad de ejecución mediante distribución entre procesadores
- Solución natural a problemas concurrentes:
  - **Sistemas de control**: captura de datos, análisis y actuación
  - **Tecnologías web**: servidores atendiendo múltiples peticiones simultáneas
  - **Aplicaciones GUI**: interacción del usuario mientras se ejecutan otras tareas
  - **Simulación**: programas que modelan sistemas físicos autónomos
  - **Gestores de bases de datos**: múltiples usuarios interactuando a la vez

### Problemas inherentes

**Exclusión mutua**: Varios procesos que acceden simultáneamente a una variable compartida pueden causar inconsistencia. Solo un proceso debe actualizar dentro de una "región crítica" mientras los demás esperan.

**Condición de sincronización**: Necesidad de coordinar procesos para que uno espere a que otro alcance un estado específico antes de continuar.

## Programación Paralela

El procesamiento paralelo permite que muchos elementos de procesos independientes trabajen simultáneamente para resolver un problema. Estos elementos pueden ser un número arbitrario de equipos conectados por una red, un único equipo con varios procesadores o una combinación de ambos.

### Ventajas

- Ejecución simultánea de tareas
- Disminución del tiempo total de ejecución
- Resolución de problemas complejos
- Utilización de recursos remotos distribuidos
- Reducción de costos

### Inconvenientes

- Compiladores y entornos más complejos
- Programas más difíciles de escribir
- Mayor consumo de energía
- Mayor complejidad en el acceso a datos
- Dificultades en comunicación y sincronización

## Programación Distribuida

Un sistema distribuido es aquel en el que los componentes hardware o software, localizados en computadores unidos mediante una red, comunican y coordinan sus acciones mediante el paso de mensajes.

### Consecuencias

- Concurrencia normal en redes de ordenadores
- Inexistencia de reloj global (la coordinación se realiza por paso de mensajes)
- Fallos independientes: un componente puede fallar sin afectar a los demás

### Modelos de comunicación

- **Sockets**: Puntos externos para comunicación entre procesos. Bajo nivel de abstracción.
- **RPC (Remote Procedure Call)**: Permite a un cliente llamar a procedimientos en un servidor remoto como si fueran locales.
- **RMI (Remote Method Invocation)**: Los objetos en diferentes procesos se comunican invocando métodos remotos. CORBA ofrece independencia de lenguaje.

### Ventajas

- Compartición de recursos y datos
- Capacidad de crecimiento incremental
- Mayor flexibilidad en la distribución de carga
- Alta disponibilidad
- Soporte a aplicaciones distribuidas inherentes
- Carácter abierto y heterogéneo

### Inconvenientes

- Mayor complejidad que requiere nuevo software
- Problemas de red: pérdida de mensajes, saturación
- Problemas de seguridad (ataques de denegación de servicio)
