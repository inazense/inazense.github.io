---
title: Acceso a datos. Oracle Database. Instalación de Oracle Database Express Edition y SQL Developer
description: Guía de instalación de Oracle Database Express Edition y SQL Developer para empezar a trabajar con bases de datos Oracle.
author: Inazio Claver
date: 2016-02-12 12:00:00 +0800
categories: [Acceso a datos, Bases de datos]
tags: [oracle, sql, bases-de-datos, sql-developer]
pin: false
math: false
mermaid: false
---

Oracle Database es un sistema de gestión de base de datos de tipo objeto-relacional. Destaca por su soporte de transacciones, estabilidad, escalabilidad y compatibilidad multiplataforma.

En esta entrada vamos a instalar **Oracle Database Express Edition** y **SQL Developer** para poder trabajar con bases de datos Oracle.

## Instalación de Oracle Database Express Edition

Descargamos Oracle Database Express Edition desde la web oficial de Oracle. El proceso de instalación es sencillo: únicamente hay que configurar la contraseña del usuario de sistema. Por convención, en entornos de clase se utiliza la contraseña `manager`.

![Instalación de Oracle Database Express Edition](/img/posts/20160212_3.png)

![Configuración de la contraseña del sistema](/img/posts/20160212_4.png)

![Progreso de la instalación](/img/posts/20160212_5.png)

Una vez instalado, para arrancar el servicio de base de datos accedemos a **Todas las aplicaciones → Oracle Database** y seleccionamos **Start Database**.

![Arrancar el servicio de Oracle Database](/img/posts/20160212_6.png)

## Instalación de SQL Developer

SQL Developer es una herramienta portable que no requiere instalación. Simplemente descomprimimos el archivo descargado de la web oficial de Oracle y ejecutamos `sqldeveloper.exe`.

Al ser una aplicación basada en Java, la primera vez nos pedirá que indiquemos la ruta de instalación del JDK.

![Ejecución de SQL Developer](/img/posts/20160212_7.png)

![Configuración de la ruta del JDK](/img/posts/20160212_8.png)

## Crear una conexión

Una vez abierto SQL Developer, creamos una nueva conexión con los siguientes parámetros:

- **Connection Name**: el nombre que queramos dar a la conexión
- **Username / Password**: las credenciales configuradas durante la instalación
- **Hostname**: `localhost` (para conexión local)
- **Port**: el puerto por defecto

![Crear nueva conexión en SQL Developer](/img/posts/20160212_9.png)

Pulsamos **Test** para verificar la conexión y, si es correcta, **Connect** para conectarnos.

![Verificar y establecer la conexión](/img/posts/20160212_10.png)

Una vez conectados, en el panel de **Connections** podemos expandir la conexión para acceder a las distintas categorías del esquema: tablas, tipos de datos, procedimientos, vistas, funciones, etc.

![Panel de conexiones con el esquema de la base de datos](/img/posts/20160212_11.png)

La ventaja de SQL Developer como aplicación portable es que podemos llevarlo en un medio extraíble sin necesidad de instalarlo en cada equipo.

![Vista general de SQL Developer con la conexión activa](/img/posts/20160212_12.png)

![Exploración del esquema de la base de datos](/img/posts/20160212_13.png)
