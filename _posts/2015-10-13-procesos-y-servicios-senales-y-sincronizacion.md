---
title: "Procesos y servicios. Señales y sincronización"
description: Concepto de señales en sistemas operativos como mecanismo de comunicación entre procesos, funciones C para manejo de señales y sincronización padre-hijo.
author: Inazio Claver
date: 2015-10-13 12:05:00 +0800
categories: [Sistemas]
tags: [c, procesos, senales, sincronizacion, linux, fork, kill]
pin: false
math: false
mermaid: false
---

En un sistema operativo, los procesos que se ejecutan simultáneamente interactúan entre sí, incluso cuando son independientes. Esta interacción ocurre cuando varios procesos acceden a los mismos recursos, y el SO dispone de un gestor de procesos para determinar el orden de acceso.

## Señales

Las señales son un tipo de mensajes que actúan como mecanismo de comunicación entre procesos. Comparado con otros medios de comunicación (sockets, pipes, etc.), resultan un mecanismo más limitado porque no permiten transmitir datos, pero proporcionan dos servicios fundamentales:

1. **Defensa del proceso frente a incidencias del kernel**: Si las señales no son gestionadas, ignoradas o capturadas por el proceso destinatario, este concluye inmediatamente, causando pérdida irrecuperable de datos.

2. **Comunicación entre procesos para eventos excepcionales**: Por ejemplo, cuando un usuario desea interrumpir un proceso de impresión enviado por error.

Las señales pueden llegar en cualquier momento, por lo que los procesos no pueden simplemente verificar una variable; deben lanzar una rutina de tratamiento que gestione automáticamente su recepción.

![Diagrama de señales entre procesos](/img/posts/20151013_1.png)

## Región crítica y sincronización

La **región crítica** es el trozo de código de un proceso que puede interferir con otro proceso. La sincronización entre dos procesos permite que uno ejecute un conjunto de instrucciones cuando otro se lo indique, o que se paralice la actividad hasta que se cumpla una condición determinada.

### Secuencia de ejecución padre-hijo

La ejecución se realiza en paralelo y puede repetirse indefinidamente:

1. El proceso padre crea un proceso hijo
2. El padre ejecuta un conjunto de acciones
3. Si no hay error:
   - El padre envía señal `SIGUSR1` al hijo para que comience
   - El hijo realiza sus acciones
   - El hijo devuelve señal `SIGUSR1` al padre
   - Se repite desde el paso 2
4. En caso de error:
   - El padre envía `SIGTERM` al hijo para que termine
   - El hijo termina
   - El padre termina

## El comando kill

El comando `kill` en Linux envía una señal a un proceso, indicando primero la señal y luego el PID. Por ejemplo, `kill -9 PID` termina el proceso con ese identificador.

## Funciones en C para manejo de señales

### `signal()`

```c
void (*signal(int señal, void(*Func)(int)))(int);
```

Envía una señal invocando un manejador por puntero para que la reciba y la trate.

### `pause()`

```c
int pause(void);
```

Detiene el proceso hasta recibir una señal.

### `sleep()`

```c
unsigned int sleep(unsigned int seconds);
```

Duerme el proceso durante los segundos indicados. Se interrumpe si recibe una señal.

### `kill()`

```c
int kill(int pid, int señal);
```

Envía una señal para terminar un proceso.

## Ejemplo: padre enviando señales a hijo

```c
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <signal.h>
#include <stdlib.h>

void manejador (int segnal){
     printf("Hijo recibe señal... %d \n", segnal);
}

int main(){
     int pid_hijo;
     pid_hijo = fork(); // creamos hijo

     switch(pid_hijo){
          case -1:
                printf("ERROR AL CREAR EL PROCESO HIJO... \n");
                exit(-1);
                break;
          case 0: // HIJO
                signal(SIGUSR1, manejador); // Invocamos al puntero al que referencia la función
                while(1){};
                break;
          default: // PADRE
                sleep(1);
                kill(pid_hijo, SIGUSR1);
                sleep(1);
                kill(pid_hijo, SIGUSR1);
                sleep(1);
                break;
     }
     return 0;
}
```

En este ejemplo el proceso padre crea un hijo con `fork()`. El hijo registra un manejador para `SIGUSR1` y queda en un bucle infinito esperando señales. El padre envía `SIGUSR1` al hijo dos veces con un segundo de espera entre cada envío, y el hijo imprime un mensaje cada vez que la recibe.
