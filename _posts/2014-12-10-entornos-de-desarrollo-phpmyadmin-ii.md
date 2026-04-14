---
title: Entornos de desarrollo. PHPMyAdmin (II)
description: Conexión a base de datos MySQL desde C en Ubuntu con CodeBlocks y libmysqlclient-dev. Código completo con mysql_init, mysql_real_connect, mysql_query y mysql_fetch_row.
author: Inazio Claver
date: 2014-12-10 09:26:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, phpmyadmin, mysql, c, ubuntu]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Seguimos con la práctica del post anterior. El siguiente paso es instalar el `codeblocks` para escribir más cómodamente en Linux, y también `libmysqlclient-dev`, una librería de desarrollo que es la que incluye `<mysql.h>`.

![Instalación de CodeBlocks y libmysqlclient-dev](/img/posts/20141210_1.png)

Aparte de ello, necesitaremos otros servicios para conectarnos de forma remota, ya que por defecto la conexión no se permitirá.

Los datos de conexión son: Base de datos: `aluBD`, Usuario: `alumno`, Contraseña: `alupass`. Normalmente se tiene el mismo nombre para el usuario y la base de datos, aunque ahora lo hacemos con dos distintos para ver las diferencias.

![Configuración de conexión remota](/img/posts/20141210_2.png)

![Parámetros de la base de datos](/img/posts/20141210_3.png)

Lo siguiente será conectarnos a la base de datos con `mysql_real_connect()`.

![Prueba de conexión](/img/posts/20141210_4.png)

Bueno, ahora que ya hemos comprobado que funciona, quedará ejecutar la consulta en sí.

![Resultado de la consulta](/img/posts/20141210_5.png)

Estéticamente feo de cojones, pero funcional.

![Salida del programa](/img/posts/20141210_6.png)

![Vista de resultados en terminal](/img/posts/20141210_7.png)

![Resultado final](/img/posts/20141210_8.png)

## Código completo

```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>

int main()
{
    char *servidor = "192.168.137.114";
    char *usuario  = "alumno";
    char *password = "alupass";
    char *bd       = "aluBD";

    MYSQL     *conexion  = mysql_init(NULL);
    MYSQL_RES *resultado;
    MYSQL_ROW  registro;
    unsigned int num_campos;
    int i;

    char *consulta = "SELECT * FROM CLIENTES";

    // Inicializamos la estructura
    if (conexion == NULL) {
        fprintf(stderr, "La inicialización de la estructura MYSQL* ha fallado. Posible falta de memoria \n");
        return 0;
    }

    // Conectamos con la base de datos
    if (mysql_real_connect(conexion, servidor, usuario, password, bd, 0, NULL, 0) == NULL) {
        fprintf(stderr, "La conexión con el servidor ha fallado con el siguiente error: %s \n", mysql_error(conexion));
        return 0;
    }

    // Consulta a realizar
    if (mysql_query(conexion, consulta) != 0) {
        fprintf(stderr, "La consulta ha fallado");
        return 0;
    }

    // Almacenar en memoria uno a uno
    if ((resultado = mysql_use_result(conexion)) == NULL) {
        fprintf(stderr, "La obtención del resultado ha fallado \n");
        return 0;
    }

    // Capturar el registro a usar
    num_campos = mysql_num_fields(resultado);
    while ((registro = mysql_fetch_row(resultado)) != NULL) {
        for (i = 0; i < num_campos; i++) {
            fprintf(stdout, " %s |", registro[i]);
        }
    }

    printf("La versión actual del cliente MySQL es %s", mysql_get_client_info());

    // Liberar memoria
    mysql_free_result(resultado);

    mysql_close(conexion);
    return 0;
}
```

**¡Salud y coding!**
