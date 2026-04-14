---
title: Servicios y procesos. Procesos en C (II). PIPE
description: Comunicación entre procesos padre e hijo en C mediante tuberías (PIPE), incluyendo un ejercicio con tres procesos (abuelo, padre e hijo).
author: Inazio Claver
date: 2015-09-30 12:00:00 +0800
categories: [Programación]
tags: [c, procesos, pipe, servicios-y-procesos]
pin: false
math: false
mermaid: false
---

## ¿Qué es una PIPE?

Las **PIPE** son un mecanismo para poner en comunicación los procesos padre e hijo. Se comportan como un falso fichero en el que ambos pueden leer y escribir.

Internamente se trata de un array de dos posiciones:

- `fd[0]`: permite la **lectura**.
- `fd[1]`: permite la **escritura**.

Es bidireccional pero solo funciona en una dirección de forma simultánea. Si necesitamos comunicación en ambos sentidos, hay que crear dos PIPE. Para usarlas necesitamos incluir la librería ```unistd.h``` y las funciones ```write()``` y ```read()```.

Una buena práctica es cerrar la parte de la tubería que no vamos a utilizar, aunque el programa funcione sin hacerlo.

## Ejemplo básico

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main(){
     int fd[2];
     char buffer[30];
     pid_t pid;

     pipe(fd);
     pid = fork();

     switch(pid){
          case -1:
                printf("No se ha podido crear un hijo \n");
                exit(-1);
                break;
          case 0: // Hijo
                close(fd[0]); // Cierra lectura
                printf("El hijo escribe en el PIPE... \n");
                write(fd[1], "Hola papi", 10);
                break;
          default: // Padre
                close(fd[1]); // Cierra escritura
                wait(NULL);
                printf("El padre lee el PIPE \n");
                read(fd[0], buffer, 10);
                printf("\t Mensaje leido: %s \n", buffer);
     }
}
```

## Ejercicio

Crear tres procesos (abuelo, padre e hijo/nieto) que se comuniquen mediante PIPEs.

### Solución

Se usan dos PIPE distintas: `fd1` para la comunicación entre abuelo y padre, y `fd2` para la comunicación entre padre y nieto.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main(){
     int fd1[2], fd2[2];
     char buffer[30], buffer2[30];
     pid_t pid, pidNieto;

     pipe(fd1);
     pipe(fd2);
     pid = fork();

     switch(pid){
          case -1:
                printf("Ha habido un error \n");
                exit(-1);
                break;
          case 0: // Padre (hijo del abuelo)
                close(fd1[0]);
                printf("Escribe el padre: \n");
                write(fd1[1], "El padre dice hola", 20);
                pidNieto = fork();
                switch(pidNieto){
                     case -1:
                          printf("Ha habido un error \n");
                          exit(-1);
                          break;
                     case 0: // Nieto (hijo del padre)
                          close(fd2[0]);
                          printf("Escribe el nieto \n");
                          write(fd2[1], "Soy el nieto", 13);
                          break;
                     default: // Padre lee del nieto
                          close(fd2[1]);
                          wait(NULL);
                          printf("El padre lee \n");
                          read(fd2[0], buffer2, 13);
                          printf("Mensaje leído: %s", buffer2);
                          break;
                }
                break;
          default: // Abuelo
                close(fd1[1]);
                wait(NULL);
                printf("\nEl abuelo lee: \n");
                read(fd1[0], buffer, 20);
                printf("Mensaje leído: %s \n", buffer);
                break;
     }
}
```
