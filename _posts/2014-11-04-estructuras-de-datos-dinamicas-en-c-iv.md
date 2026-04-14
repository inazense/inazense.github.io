---
title: Estructuras de datos dinámicas en C (IV)
description:
date: 2014-11-04 19:13:00 +0800
categories: [programacion]
tags: [programacion, c, estructuras de datos, registros, vectores]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Vectores con registros. Registros con vectores

Los tipos y los mecanismos de definición de tipos pueden combinarse libremente según las necesidades. Podemos crear vectores donde cada componente es un registro que almacena múltiples datos de distintos tipos. A su vez, esos campos podrían ser también vectores o registros anidados.

De la misma manera, un registro puede contener campos que sean vectores, siendo cada componente lo que mejor sirva al problema.

**Ejemplo:** Un sistema de gestión hospitalaria podría incluir un vector de hospitales, donde cada hospital es un registro con nombre, dirección, un vector de médicos, un vector de pacientes y un vector de habitaciones. Cada uno de estos sería a su vez un registro con la información relevante.

Para acceder a estructuras anidadas se encadenan los operadores. Por ejemplo:

_hospitales[36].médicos[17].especialidad_

accede a la especialidad del médico 17 del hospital 36.

## Registros en C: paso de parámetros por referencia

Cuando se pasa un `struct` como parámetro por referencia a una función, el acceso a sus campos se hace con el operador `->` en lugar de `.`:

```c
typedef struct{
    int i;
    float f;
} MITIPO;

void miFuncion(MITIPO *miParametro) {
    …
    miParametro->i = 3;
    miParametro->f = 6.0;
}

main() {
    …
    MITIPO miVariable;
    …
    miFuncion(&miVariable);
    …
}
```
