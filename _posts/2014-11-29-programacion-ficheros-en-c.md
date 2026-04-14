---
title: Programación. Ficheros en C
description: Operaciones sobre ficheros en C. fopen, fprintf, fscanf, fread, fwrite, fclose y feof con ejemplos de código y ejercicios resueltos.
author: Inazio Claver
date: 2014-11-29 22:34:00 +0800
categories: [Programación]
tags: [programacion, c, ficheros]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## Operaciones sobre ficheros

Abrir, leer, escribir y cerrar ficheros.

## Abrir fichero

Consiste en asociar un nombre de fichero a una variable e indicar la operación que se va a realizar sobre él (leer, escribir o añadir).

Necesitamos una variable que nos permita manejar el fichero:

```c
FILE *fichero
```

Esto es un puntero a una estructura con información sobre el fichero. Se pasa a las funciones para trabajar con ficheros.

Para abrir un fichero usamos la función `fopen()`, tanto para ficheros de texto como para binarios.

### Función fopen()

```c
FILE *fopen(const char *nombreFichero, const char *modo)
```

- **nombreFichero**: Cadena con el nombre del fichero.
- **modo**: Cadena que indica el modo:
  - `r` – Lectura. El fichero ha de existir. Si no, da error.
  - `w` – Escritura. Si el fichero no existe se crea uno nuevo. Si existe, se borra todo su contenido.
  - `a` – Añadir al final del fichero. Si no existe se crea uno nuevo.

Devuelve puntero de `FILE` y `NULL` si la apertura falla.

```c
FILE *fich;
fich = fopen("ejemplo.txt", "r");
if (fich == NULL)
    printf("Error en la apertura del fichero \n");
else {
    …
}
```

## Lectura y escritura en modo texto

Se usan `fprintf` y `fscanf` en lugar de `printf` y `scanf`, con un parámetro adicional indicando el fichero.

```c
fprintf(fich, "%i", &numero);
fscanf(fich, "%i", &numero);
```

## Lectura y escritura en modo binario

Los datos se vuelcan como están en memoria. Adecuado para datos complejos (structs y matrices).

```c
fread(ptDato, N, k, fichero);
fwrite(ptDato, N, k, fichero);
```

Parámetros:
- **ptDato**: Puntero a los datos.
- **N**: Tamaño del elemento.
- **k**: Número de elementos.
- **fichero**: Puntero de tipo `FILE`.

Ambas devuelven el número de elementos leídos/escritos correctamente.

### Ejemplo fread y fwrite

```c
FILE *fich;
struct medida {
    int hora;
    int minuto;
    float valor;
} *dato;
…
fread(dato, sizeof(struct medida), 1, fich);
…
fwrite(dato, sizeof(struct medida), 1, fich);
```

## Cierre de un fichero

Operación importante que asegura que se han escrito todos los datos en el disco:

```c
fclose(fich);
```

## feof()

Para saber cuándo se llega al final del fichero:

- Devuelve CIERTO cuando ya hemos leído todos los datos.
- Devuelve FALSO cuando aún quedan datos por leer.

```c
leer(fichero, dato);
while (!feof(fich)) {
    procesarDato();
    leer(fich, dato);
}
```

## Ejercicios de práctica

### 1. Lectura de medias de 10 en 10

Leer enteros de un fichero de texto (cantidad múltiplo de 10) y mostrar la media cada 10 números.

**Solución:**

```c
#include <stdio.h>

main() {
    FILE *f;
    int dato, suma, i;
    f = fopen("fichero.txt", "r");
    if (f == NULL)
        printf("Error en la apertura");
    else {
        fscanf(f, "%i", &dato);
        while (!feof(f)) {
            suma = 0;
            for (i = 0; i < 10; i++) {
                suma += dato;
                fscanf(f, "%i", &dato);
            }
            printf("La media es %d \n", suma / 10);
        }
        fclose(f);
    }
}
```

### 2. Migración de estructura de fichero

Cambiar estructura de registros, pasando de `ANTES` a `DESPUES`, inicializando nuevo campo en 0.

**Solución:**

```c
ANTES antes;
DESPUES despues;
FILE *old, *new;
old = fopen("fichero.dat", "r");
new = fopen("nuevo.dat", "w");
fread(&antes, sizeof(antes), 1, old);
while (!feof(old)) {
    strcpy(despues.partido, antes.partido);
    strcpy(despues.localidad, antes.localidad);
    despues.candidatos = antes.candidatos;
    despues.elegidos = 0;
    fwrite(&despues, sizeof(despues), 1, new);
    fread(&antes, sizeof(antes), 1, old);
}
fclose(old);
fclose(new);
```

**¡Salud y coding!**
