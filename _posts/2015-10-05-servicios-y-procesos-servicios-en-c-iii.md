---
title: "Servicios y procesos. Servicios en C (III). FIFOs"
description: Comunicación entre procesos mediante FIFOs (tuberías con nombre) en C sobre Linux, con ejemplos de programa lector y escritor usando mknod y open.
date: 2015-10-05 12:00:00 +0800
categories: [Linux]
tags: [c, linux, fifo, pipes, ipc, programacion-de-servicios-y-procesos]
pin: false
math: false
mermaid: false
---

## ¿Qué son los FIFOs?

Los **FIFOs** (First In, First Out), también llamados **tuberías con nombre** (*named pipes*), son mecanismos de comunicación entre procesos independientes que no necesariamente tienen relación padre-hijo. A diferencia de las PIPEs anónimas, los FIFOs son entidades generadas por el sistema operativo que pueden ser utilizadas por cualquier proceso que conozca su nombre.

## Crear un FIFO desde la línea de comandos

```bash
mknod nombreFichero p
```

El parámetro `p` indica que se trata de un FIFO (pipe con nombre).

## Función mknod en C

```c
int mknod(const char *pathname, mode_t modo, dev_t dev);
```

| Parámetro | Descripción |
|-----------|-------------|
| `pathname` | Nombre del fichero FIFO |
| `modo` | Permisos y tipo de nodo. Debe incluir `S_IFIFO` para crear un FIFO |
| `dev` | Ignorado para FIFOs (se pasa `0`) |

## Ejemplo: programa lector (crea el FIFO)

El proceso lector crea el FIFO y se queda en espera hasta que otro proceso escriba datos en él:

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(void) {
    int fp;
    int p, bytesLeidos;
    char buffer[10];

    p = mknod("FIFO3", S_IFIFO | 0666, 0);

    if (p == -1) {
        printf("Ha ocurrido un error \n");
        exit(0);
    }

    while (1) {
        fp = open("FIFO3", 0);
        bytesLeidos = read(fp, buffer, 1);
        printf("Obteniendo información... \n");
        while (bytesLeidos != 0) {
            printf("%s", buffer);
            bytesLeidos = read(fp, buffer, 1);
        }
        close(fp);
    }

    return 0;
}
```

## Ejemplo: programa escritor

El proceso escritor abre el FIFO ya creado por el lector y escribe datos en él:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int fp;
    char saludo[] = "Un saludo!!!\n";

    fp = open("FIFO3", 1);

    if (fp == -1) {
        printf("Error al abrir el fichero...\n");
        exit(1);
    }

    printf("Mandando información al FIFO...\n");
    write(fp, saludo, strlen(saludo));

    close(fp);
    return 0;
}
```

## Flujo de ejecución

1. Compilar y ejecutar primero el **lector**: crea el FIFO `FIFO3` y se queda bloqueado esperando datos.
2. En otra terminal, compilar y ejecutar el **escritor**: abre el FIFO y escribe la cadena.
3. El lector recibe los datos y los imprime por pantalla.
4. El lector vuelve al inicio del bucle esperando la siguiente escritura.

## Ejercicio propuesto

Crear tres procesos:

- Un proceso **escritor** que genera números y los escribe en un FIFO.
- Un proceso **lector par** que lee del FIFO y filtra solo los números pares.
- Un proceso **lector impar** que lee del FIFO y filtra solo los números impares.
