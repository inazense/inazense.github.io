---
title: Servicios y procesos. Procesos y C (I)
description: Introducción a los procesos en sistemas operativos y cómo trabajar con ellos en C bajo Linux, usando execl, system, fork, wait, getpid y getppid.
author: Inazio Claver
date: 2015-09-29 12:00:00 +0800
categories: [Programación]
tags: [c, procesos, servicios-y-procesos, linux]
pin: false
math: false
mermaid: false
---

## ¿Qué es un proceso?

Un proceso es un **programa en ejecución**. Los procesadores comparten tiempo con todos los procesos cargados en memoria RAM. Cuando un programa cede la CPU, se guarda una instantánea llamada **BCP (Bloque de Control de Procesos)** que almacena el estado del programa para poder retomarlo más adelante.

### Estados de un proceso

- **Ejecución**: el proceso está usando la CPU.
- **Listo**: cargado en RAM, esperando turno en la CPU.
- **Bloqueado**: esperando recursos que otra aplicación está usando.

La **contienda** es la competencia entre procesos por acceder a la CPU. Existen distintos métodos de asignación: Round-Robin, por prioridades, por tiempos estimados de ejecución, etc.

### Visualización de procesos

En **Windows** podemos ver los procesos activos con el Administrador de Tareas o con el comando `tasklist` en CMD, que también muestra el PID de cada proceso.

En **Linux/Ubuntu**, usamos el comando `ps` o `ps -f` para incluir también el PPID (identificador del proceso padre).

## Funciones en C para trabajar con procesos

### execl()

Ejecuta comandos del sistema o programas externos. Si falla, devuelve `-1`. El código que haya a continuación de `execl()` solo se ejecuta si hay error, porque si tiene éxito el proceso actual es reemplazado por el nuevo.

```c
#include <stdio.h>
#include <unistd.h>

void main(){
     printf("Los archivos del directorio son: \n");
     execl("/bin/ls", "ls", "-l", (char *)NULL);
     printf("ERROR!!!");
}
```

![Ejemplo con execl](/img/posts/20150929_1.png)

### system()

Ejecuta comandos del sistema. A diferencia de `execl()`, el proceso actual no se reemplaza y la ejecución continúa tras el comando. Permite redirigir la salida a un fichero.

```c
#include <stdio.h>
#include <stdlib.h>

void main(){
     system("ls -l > ficSalida");
     printf("FIN");
}
```

![Ejemplo con system](/img/posts/20150929_2.png)

### getpid() y getppid()

- `getpid()`: devuelve el PID (identificador) del proceso actual.
- `getppid()`: devuelve el PID del proceso padre.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main(){
     pid_t id_pactual, id_padre;
     id_pactual = getpid();
     id_padre = getppid();
     printf("PID actual: %d \n", id_pactual);
     printf("PID padre: %d \n", id_padre);
}
```

![Ejemplo con getpid y getppid](/img/posts/20150929_3.png)

### fork()

Crea un proceso hijo. Devuelve `0` en el proceso hijo y el PID del hijo en el proceso padre. Si devuelve `-1`, ha ocurrido un error.

### wait()

Pausa el proceso padre hasta que el proceso hijo finalice.

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main(){
     pid_t pid, hijo_pid;
     pid = fork();
     if (pid == -1){
          printf("Ha habido un error");
          exit(-1);
     }
     if(pid == 0){
          printf("soy el proceso hijo \n\t Mi PID es %d. El PID de mi padre es: %d. \n", getpid(), getppid());
     }
     else{
          hijo_pid = wait(NULL);
          printf("Soy el proceso padre: \n\t Mi PID es %d. El PID de mi padre es: %d. \n\t Mi hijo %d terminó. \n", getpid(), getppid(), pid);
     }
}
```

![Ejemplo con fork y wait](/img/posts/20150929_4.png)

## Ejercicio

Crear un programa en el que un proceso padre genere un proceso hijo. La variable `n` tiene el valor `7`. El proceso hijo suma 5 a `n` y el proceso padre resta 5 a `n`. Ambos muestran el resultado junto con su PID y PPID.

### Solución

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main(){
     pid_t pid, hijo;
     int n = 7;
     pid = fork();
     if (pid == -1){
          printf("Error \n");
          exit(-1);
     }
     if (pid == 0){
          n = n + 5;
          printf("Soy el hijo. Valor de n = %d.\n Proceso %d, padre %d \n\n", n, getpid(), getppid());
     }
     else{
          n = n - 5;
          printf("Soy el padre. Valor de n = %i.\n Proceso %d, padre %d \n\n", n, getpid(), getppid());
     }
}
```

![Resultado del ejercicio](/img/posts/20150929_5.png)

![Salida del programa en terminal](/img/posts/20150929_6.png)
