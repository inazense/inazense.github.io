---
title: Programación. Punteros en C
description: Introducción a los punteros en C, operadores de dirección e indirección, gestión dinámica de memoria y uso con vectores, matrices y estructuras.
author: Inazio Claver
date: 2015-01-14 12:00:00 +0800
categories: [Programación]
tags: [programacion, c]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Variables estáticas y dinámicas

Las variables pueden clasificarse en:

- **Variables estáticas**: la memoria se reserva en tiempo de compilación.
- **Variables dinámicas**: la memoria se reserva en tiempo de ejecución. Para acceder a ellas se usan punteros.

## Punteros

Un **puntero** es una variable que almacena la dirección de memoria de otra variable.

Los dos operadores fundamentales son:

- **Operador dirección** (`&`): obtiene la dirección de memoria de una variable.
- **Operador indirección** (`*`): accede al valor almacenado en la dirección apuntada.

```c
int valor;
int *puntero;
puntero=&valor;
valor=5;
*puntero=5;
```

Nótese la diferencia: `puntero=5` modifica la dirección almacenada, mientras que `*puntero=5` modifica el valor apuntado.

## Declaración e inicialización

Al declarar un puntero sin asignarlo a ninguna variable, es recomendable inicializarlo a `NULL` para evitar comportamientos indefinidos:

```c
int *puntero = NULL;
```

## Gestión dinámica de memoria

Para reservar y liberar memoria dinámica se usan las funciones `malloc()` y `free()` del fichero de cabecera `<stdlib.h>`:

```c
#include<stdlib.h>
struct fecha {
    int dia;
    int mes;
    int agno;
};
struct fecha *pFecha;
pFecha=(struct fecha *) malloc (sizeof(struct fecha));
if (pFecha==NULL){
    printf("No hay suficiente memoria \n");
}
else {
    free(pFecha);
};
```

## Paso de parámetros por referencia

Para modificar el valor de una variable desde una función, se pasa su dirección como parámetro:

```c
void circulo (float r, float *p, float *a){
    *p=2*Pl*r;
    *a=Pl*r*r;
}
```

## Punteros con vectores y cadenas

En C, el nombre de un array es en sí mismo un puntero al primer elemento. Las siguientes asignaciones son equivalentes:

```c
char *p, c, v[5];
c=*p;
p=&c;
p=v;
p=&v[0];
```

## Punteros con matrices

Al pasar una matriz a una función, es necesario indicar también el número de columnas, ya que el puntero no tiene información sobre la estructura de la matriz:

```c
void mifuncion(int *m, int f, int c){
    (m+c*2+1)=…
}
```

## Punteros con estructuras

Para acceder a los miembros de una estructura a través de un puntero se puede usar el operador `->` o la notación `(*puntero).campo`:

```c
struct fecha hoy;
struct fecha *phoy;
phoy=&hoy;
hoy.dia=28;
(*phoy).dia=28;
phoy->dia=28;
```

Las tres últimas líneas son equivalentes.

**¡Salud y coding!**
