---
title: Programación. Resolución de problemas (V)
description:
date: 2014-10-20 18:05:00 +0800
categories: [Programación]
tags: [programacion, algoritmos, invariante, bucle]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Evitando errores. Invariante del bucle

El invariante es una condición (relación matemática entre las variables involucradas) que se tiene que cumplir:

- Antes de empezar a ejecutarse el bucle
- Después de cada vez que se ejecuta el bucle
- Una vez terminada la ejecución del bucle

Si obtengo el invariante del bucle puedo comprobar si se va a cumplir en todas esas situaciones.

**Ejemplo 1:**

```
i:=1;
s:=1;

mientras que i<n hacer
    i:=i+1;
    s:=s+1;
fmq
```

En este ejemplo, el invariante es s=1+…+i;

Tras la primera ejecución: i=2, s=1+2=3;
Tras la segunda ejecución: i=3, s=1+2+3=6;
Tras la tercera ejecución: i=4, s=1+2+3+4=10;
Al terminar el mientras que: i=n, s=1+2+…+n;

**Ejemplo 2:**

```
i:=1;
s:=1;

mientras que i<n hacer
    s:=s+1;
    i=i+1;
fmq
```

El invariante es s=1+…+(i-1);

Antes del bucle: i=2, s=1;
Tras la primera ejecución: i=3, s=1+2=3;
Tras la segunda ejecución: i=4, s=1+2+3=6;

Al terminar el mientras que: i=n+1, s=1+…+n;
