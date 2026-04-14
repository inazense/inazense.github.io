---
title: Entornos de desarrollo. PHPMyAdmin
description: Creación de base de datos en PHPMyAdmin para el proyecto Conecta4. Tablas Partida y Movimientos, inserción de datos con NOW() y conexión desde C con mysql-connector.
author: Inazio Claver
date: 2014-12-17 09:24:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, phpmyadmin, mysql, c]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Accedemos al servidor phpMyAdmin en `192.168.2.25/phpmyadmin` con las credenciales `dam1:dam1mysql` para crear la base de datos del proyecto Conecta4.

## Estructura de la base de datos

Se crea una base de datos individual para cada alumno. Las tablas necesarias son:

**Tabla Partida:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT autoincremental | Clave primaria |
| jugador1 | VARCHAR(1) | Identificador del jugador 1 |
| jugador2 | VARCHAR(1) | Identificador del jugador 2 |
| fecha | DATETIME | Fecha y hora de la partida |

**Tabla Movimientos:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT autoincremental | Clave primaria |
| turno | VARCHAR(1) | Jugador que realiza el movimiento |
| fila | INT | Fila del movimiento |
| columna | INT | Columna del movimiento |
| id_partida | INT | Clave ajena a Partida |

Para insertar registros de prueba se usa la función `NOW()` para los timestamps.

![Creación de tablas en phpMyAdmin](/img/posts/20141217_1.png)

## Conexión desde C en Windows

Para conectarse desde C en Windows hay que descargar `mysql-connector-c-6.1.5-win32` e incluir los directorios correspondientes en las opciones del compilador de CodeBlocks.

![Configuración de CodeBlocks con mysql-connector](/img/posts/20141217_2.png)

## Código de conexión

```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>

int main()
{
    char *servidor = "192.168.2.25";
    char *usuario  = "dam1";
    char *password = "dam1mysql";
    char *bd       = "dam1_inazio";

    MYSQL     *conexion  = mysql_init(NULL);
    MYSQL_RES *resultado;
    MYSQL_ROW  registro;
    unsigned int num_campos;
    int i;

    char *consulta = "SELECT * FROM movimientos;";

    if (conexion == NULL) {
        fprintf(stderr, "Fallo en inicialización\n");
        return 0;
    }

    if (mysql_real_connect(conexion, servidor, usuario, password, bd, 0, NULL, 0) == NULL) {
        fprintf(stderr, "Error conexión: %s\n", mysql_error(conexion));
        return 0;
    }

    if (mysql_query(conexion, consulta) != 0) {
        fprintf(stderr, "Consulta fallida\n");
        return 0;
    }

    if ((resultado = mysql_use_result(conexion)) == NULL) {
        fprintf(stderr, "Error obtención resultado\n");
        return 0;
    }

    num_campos = mysql_num_fields(resultado);

    while ((registro = mysql_fetch_row(resultado)) != NULL) {
        for (i = 0; i < num_campos; i++) {
            fprintf(stdout, "%s | ", registro[i]);
        }
        fprintf(stdout, "\n");
    }

    mysql_free_result(resultado);
    mysql_close(conexion);
    return 0;
}
```

**¡Salud y coding!**
