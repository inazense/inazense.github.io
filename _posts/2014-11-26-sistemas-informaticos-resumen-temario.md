---
title: Sistemas informáticos. Resumen temario para examen teórico
description: Resumen del temario teórico de sistemas informáticos. Arquitectura Von Neumann, disco duro, tipos de ordenadores, ciclo de vida de procesos, estructura de directorios Ubuntu, comandos Windows y permisos NTFS.
author: Inazio Claver
date: 2014-11-26 21:32:00 +0800
categories: [Sistemas informáticos]
tags: [sistemas-informaticos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Componentes de un sistema informático

Es el conjunto de recursos interrelacionados, hardware, software y de recursos humanos que permite almacenar y procesar información.

## Arquitectura del ordenador

### Esquema de Von Neumann

Claves de arquitectura Von Neumann:
- En la memoria del ordenador se almacenan simultáneamente datos e instrucciones.
- Se puede acceder a la dirección específica en memoria indicando donde se encuentra almacenada.
- La ejecución de un programa se realiza de forma secuencial pasando de una instrucción a la que sigue inmediatamente.

![Esquema de Von Neumann](/img/posts/20141126_1.png)

### Partes

- **Periféricos.** Sirven para introducir/extraer datos del ordenador.
- **Canales.** Coordina los periféricos con el sistema.
- **Memoria central.** Encargada de almacenar instrucciones de programa, datos y resultados.
- **Unidad de control.** Supervisa y controla las operaciones internas.
- **Unidad aritmético lógica.** Ejecuta todas las operaciones de tipo aritmético y lógico.

## Procesador

### Unidad de control

Controla y supervisa los distintos componentes del sistema y establece el orden y ejecución de instrucciones.

**Fases de trabajo:**
- Leer las instrucciones de memoria central tal como fueron almacenadas.
- Interpretar las instrucciones.
- Ordena y establece conexiones con las demás unidades para operar.
- Lee datos necesarios de memoria central para ejecutar la instrucción.
- Opera con esos datos.
- Almacena resultado en memoria central.

**Elementos UC:**
- **Reloj.** Marca tiempos de actuación de dispositivos controlados.
- **Registros:**
  - De instrucción. Instrucción que se está ejecutando.
  - Contador. Dirección de memoria de la próxima instrucción a ejecutar.
  - Decodificador. Extrae y analiza el código de operación de la instrucción en curso.

### ALU. Partes

**Circuitos operacionales:**
- Sumador. Realiza cualquier operación aritmética.
- Complementador. Necesario para las restas de números.
- Lógicos. Compara campos bit a bit y cambia la dirección de la siguiente instrucción si el resultado coincide o no con el de la comparación.

**Registros generales:**
- Acumuladores. Guarda resultados parciales.
- Desplazamiento. Desplaza X posiciones a izquierda o derecha una posición de memoria.
- Estado. Indica el resultado de la última operación ejecutada.

## Canales (Buses)

Unidades de realización de entrada/salida de periféricos y memoria central.

Tipos:
- **Bus de datos.** Circulan datos que intercambian procesador y periféricos. De doble sentido.
- **Bus de direcciones.** Circula la dirección de memoria central donde se quiere acceder. Sentido único hacia memoria central. Se clasifica en:
  - Canal selector. Dispositivos rápidos a la CPU.
  - Canal multiplexor. Dispositivos lentos a la CPU.
- **Bus de control.** Circulan señales que marcan interrelaciones con la CPU.

## Memoria central

Debe contener en todo momento los datos introducidos, los resultados intermedios y finales, las instrucciones y los programas.

## Periféricos

Unidades físicas que permiten introducir/extraer información del/al ordenador:
- Unidades de entrada.
- Unidades de salida.
- Unidades de entrada/salida.

## Discos magnéticos

Sirven como soporte de almacenamiento para archivos de información, almacenados en uno o varios sectores de pistas circulares.

### Disco duro

Dispositivo de almacenamiento no volátil que emplea un sistema de grabación magnética (MAGNETORESISTENCIA).

Se compone de uno o varios platos unidos por un mismo eje que gira a gran velocidad dentro de una caja metálica sellada.

Sobre cada plato, y en cada una de sus caras, se sitúa un cabezal de lectura/escritura que flota sobre una lámina de aire que genera la rotación de los discos.

Para poder emplearlo hay que aplicar un formateo a bajo nivel que defina las particiones, que requerirá una fracción de espacio libre, según el formato empleado.

![Estructura del disco duro](/img/posts/20141126_2.png)

**Características:**
- **Tiempo de acceso.** Tiempo que tarda la aguja en situarse en pista y sector determinado.
- **Tiempo de búsqueda.** Tiempo de aguja en pista.
- **Tiempo de lectura y escritura.** Tiempo medio en escribir/leer información.
- **Latencia.** Tiempo en situarse en sector indicado.
- **Velocidad de rotación.** Revoluciones por minuto de los platos.
- **Tasa de transferencia.** Velocidad a la que se puede transferir datos a la computadora.

**Direccionamiento:**
- **Plato.** Cada uno de los discos del disco duro.
- **Cara.** Cada lado del plato.
- **Cabeza.** Número de cabezales.
- **Cilindro.** Conjunto de varios platos.
- **Sector.** Cada divisor de una pista.

### Discos ópticos

Están constituidos por pistas en espiral para aprovechar mejor el medio y no desperdiciar espacio.

La espiral se genera a velocidad lineal constante, por lo que conforme el láser se aleja del centro reduce velocidad.

El CD gira a velocidad angular variable.

## Ordenadores

### Mainframe

Computadora central. CPU muy veloz, gran cantidad de memoria y de almacenamiento externo. Permite miles de usuarios simultáneos.

Diseñada para funcionar sin interrupción durante años y ser reparada sin apagarse.

Usada por grandes empresas y gobiernos.

### Minicomputador

Equipo multiusuario que funciona como servidor gracias a su mayor memoria de sistema, que le permite repartir mejor los recursos.

### Microcomputadora

Ordenador de muy reducidas dimensiones pensado para tareas muy específicas. Puede usarse como PC pero sin su potencia. Ej: Arduino.

## Ciclo de vida de los procesos

![Ciclo de vida de los procesos](/img/posts/20141126_3.png)

### Criterio de planificación

- **Uso de CPU.** Tratar de usar al 100% la CPU todo el tiempo posible.
- **Tasa de procesamiento.** Cantidad de procesos que se pueden ejecutar por unidad de tiempo.
- **Tiempo de ejecución.** Intervalo entre orden de ejecución y finalización.
- **Tiempo de espera.** Suma de periodos de espera en cola de procesos.
- **Tiempo de respuesta.** Intervalo entre que se envía solicitud hasta la primera respuesta.

## Estructura de directorios Ubuntu

| Directorio | Descripción |
|---|---|
| BIN | Comandos binarios especiales para usuarios del sistema |
| BOOT | Configuración de arranque |
| DEV | Configuración periféricos del sistema |
| HOME | Directorios de usuarios salvo root |
| LIB | Bibliotecas compartidas de programas |
| MNT | Sistemas de archivos montados temporalmente |
| SRV | Datos servidos por el sistema |
| TMP | Archivos temporales |
| VAR | Archivos variables (logs y bases de datos, por ejemplo) |

## Comandos Panel de Control de Windows

| Comando | Descripción |
|---|---|
| `services.msc` | Administrador de servicios |
| `secpol.msc` | Configuración de seguridad local |
| `perfmon` | Monitor de rendimiento |
| `mmc` | Nueva consola de administración |
| `regedit` | Editor de registros |
| `msconfig` | Utilidad de configuración del sistema |

## Sistema de archivos

Componente encargado de administrar y facilitar el uso de memoria periférica.

## Permisos NTFS

- Concede permisos a carpetas y archivos para controlar nivel de acceso.
- Comprimir archivos y crear cuentas de almacenamiento.
- Cifrar archivos usando EFS.

**¡Salud y coding!**
