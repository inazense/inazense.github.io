---
title: Bases de datos. Modelo relacional (IV)
description: "Introducción al modelo entidad-relación básico: entidades regulares y débiles, tipos de relaciones, cardinalidad, roles y atributos con ejemplos visuales."
date: 2014-10-11 15:41:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, modelo-relacional, entidad-relacion, cardinalidad, atributos]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Modelo entidad-relación básico

**Mundo real** → Problema a informatizar/mecanizar

### Entidades

Representadas en una caja. Todo aquello de lo que se quiere guardar información.

Todo aquel objeto del que quiero guardar información, almacenando sus propiedades. Suelen ser sustantivos comunes.

Según ANSI SPARC: "Una persona, lugar, cosa, concepto, suceso, real o abstracto, de interés por la empresa."

**Ejemplo — Base de datos de un colegio:**

| Entidad | Atributos |
|---|---|
| Alumno | DNI, nombre, apellidos |
| Asignatura | Código, nombre, dirección |
| Profesor | DNI, nombre, ... |
| Notas | Alumno, Asignatura, 1_trimestre, 2_trimestre, 3_trimestre |

![Representación de entidades](/img/posts/20141011_5.png)

#### Tipos de entidades

**Entidad regular:** Aquella que tiene existencia por sí misma. Ejemplos: empleados, alumnos, asignaturas.

**Entidad débil:** Aquella que no tiene existencia si no es dependiendo de otra entidad. Ejemplo: un cuidador requiere de un enfermo.

### Relaciones (Interrelaciones)

Asociación de varias entidades.

#### Grado de una relación

**Interrelación binaria:** Relaciona dos entidades.

**Reflexivos:** Entidades relacionadas consigo mismas.

![Grado reflexivo](/img/posts/20141011_6.png)

**Ternarios:** Grado mayor a dos.

![Grado ternario](/img/posts/20141011_7.png)

#### Cardinalidad máxima (Tipo de correspondencia)

**1 a 1**

![Cardinalidad 1 a 1](/img/posts/20141011_8.png)

**1 a N**

![Cardinalidad 1 a N](/img/posts/20141011_9.png)

**N a M**

![Cardinalidad N a M](/img/posts/20141011_10.png)

#### Papel o rol

Función que cada una de las entidades realiza en la interrelación.

![Roles](/img/posts/20141011_11.png)

### Atributos

Los campos de las relaciones. Se representan con piruletas.

Clasificación por color:

- **Negras:** Clave primaria.
- **Blanca y negra:** Clave alternativa.
- **Blanca:** Resto de campos.

![Atributos por color](/img/posts/20141011_12.png)

**Atributos compuestos:** Descomponibles en subatributos.

![Subatributos](/img/posts/20141011_13.png)

**Atributos multivaluados:** Aquellos que pueden tomar varios valores.

![Atributos multivaluados](/img/posts/20141011_14.png)

**¡Salud y coding!**
