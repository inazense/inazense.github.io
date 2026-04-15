---
title: Programación. Estructuras de datos dinámicas en C (II)
description:
date: 2014-10-31 00:29:00 +0800
categories: [Programación]
tags: [programacion, c, cadenas, registros, structs, ctype]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Cadenas de caracteres en C

Una cadena de caracteres en C es un vector de caracteres que termina con el carácter especial `'\0'`, indicando el final de la cadena.

Se puede acceder a cada componente como en vectores simples, respetando que termine con ese carácter nulo.

Las cadenas van entre comillas dobles:

```c
char v[6]="lunes";
```

El compilador añade automáticamente el carácter nulo al final de las constantes de cadena.

**Lectura y escritura de cadenas:**

```c
char cadena[255];
scanf("%s",cadena); /* No hay que usar & porque cadena ya es un puntero */
printf("%s",cadena);
```

## Conversión de cadenas. stdlib.h

- `double atof(cadena)` – Convierte cadena a double
- `int atui(cadena)` – Convierte cadena de dígitos a int
- `long atol(cadena)` – Convierte cadena a long int

## Manipulación de cadenas. string.h

- `strcpy(s1,s2)` – Copia s2 a s1
- `strncpy(s1,s2,n)` – Copia n caracteres de s2 a s1
- `strcat(s1,s2)` – Añade s2 a s1
- `strncat(s1,s2,n)` – Añade n caracteres de s2 a s1
- `strcmp(s1,s2)` – Compara cadenas

## Búsqueda en cadenas

- `strchr(s1,c)` – Busca primera aparición de carácter c
- `strstr(s1,s2)` – Localiza primera aparición de cadena s2 en s1
- `strtok(s1,s2)` – Divide s1 según delimitadores en s2

## Caracteres

Una variable de tipo caracter almacena internamente el valor ASCII del caracter. Externamente está esperando que le introduzca exactamente ese valor.

```c
char c='a';
char c=47;
char c='\47';
char a='\t', b='\n', c='\v';
```

Al ser esto así, yo puedo sumar y restar enteros y caracteres entre sí, o sólo caracteres, compararlos, etc.

Para comprobar si una letra es mayúscula: `(letra>='A' && letra<='Z');`

## ctype.h

Existe un archivo de cabecera de la biblioteca estándar del lenguaje de programación C diseñado para operaciones básicas con caracteres. Contiene los prototipos de las funciones y macros para clasificar caracteres. Su uso no es necesario en absoluto ya que las cosas que hace son fácilmente programables.

## Registros

Un registro agrupa datos de diferentes tipos asociados a una entidad.

```
tipos
    <nombreTipo> registros
        <nombreCampo1>:<tipo1>;
        <nombreCampo2>:<tipo2>;
        …
        <nombreCampoN>:<tipoN>;
    freg;

variables
    <nombreVariable1>,<nombreVariable2>:<nombreTipo>;
    <nombreVariable>:<nombreTipo>;

principio
    …
    <nombreVariable1>.<nombreCampo3>;
    …
fin
```

## Declaración y uso de registros

```
tipo
    cad20=cadena[20];
    tipoSexo(varon,hembra);
    tipoFecha= registro
        dia 1..31;
        mes 1..12;
        anyo 0..3000;
    freg;
    tipoPersona= registro
        nombre,apellido1,apellido2:cad[20];
        sexo:tipoSexo;
        fechaNacimiento:tipoFecha;
    freg;
    tipoComplejo1= registro
        parteReal,parteImaginaria:real;
    freg;
    tipoComplejo2= registro
        modulo,argumento:real;
    freg;

variables
    ayer,hoy:tipoFecha;
    yo,tu,el:tipoPersona;
    z:tipoComplejo1;
    w:tipoComplejo2;

principio
    …
    ayer.dia:=13;
    ayer.mes:=3;
    ayer.anyo:=1988;
    hoy.dia+1;
    el.sexo:=varon;
    el.fechaNacimiento:ayer;
    z.parteReal:=w.modulo*cos(w.argumento);
    z.parteImaginaria:=w.modulo*sin(w.argumento);
fin
```
