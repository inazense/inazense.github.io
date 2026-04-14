---
title: Bases de datos. Consultas SQL (VIII) - Gestión de usuarios (I)
description: Sentencias SQL para la gestión de usuarios y privilegios en MySQL.
author: Inazio Claver
date: 2015-02-10 12:00:00 +0800
categories: [Bases de datos]
tags: [sql, bases de datos, usuarios, privilegios, mysql]
pin: false
math: false
mermaid: false
---

Sentencias SQL para la gestión de usuarios y privilegios:

```sql
/* Creación de usuarios. A la vez que se crea da permisos de USAGE - para conectar a la base de datos */
create user PEPE identified by 'PEPE';

/* Crear usuario que sólo se conectará desde dicha IP a la base de datos */
create user PEPE2@192.168.137.65 identified by 'PEPE2';

/* Crear usuario que sólo se conectará desde localhost a la base de datos */
create user PEPE3@localhost identified by 'PEPE3';

/* Conocer usuarios y permisos */
/* MYSQL - Diccionario de datos */
SELECT * FROM MYSQL.user;

/* INFORMATION_SCHEMA guarda la relación de almacenamiento de datos */
/* Ver privilegios de los usuarios */
SELECT * FROM INFORMATION_SCHEMA.USER_PRIVILEGES;

/* Ver permisos para un usuario concreto */
show grants for PEPE; /* PEPE pertenece a cualquier sitio. */
show grants for root@localhost; /* root pertenece a localhost*/
show grants for PEPE2@192.168.137.65; /* PEPE2 pertenece a esa dirección IP */

/* Borrar usuario */
drop user PEPE2@192.168.137.65; /* Hay que poner la dirección completa del usuario. Si no deja puede tener permisos colgados */
drop user PEPE3@localhost;

/* Concesión de permisos */
grant select
on *.* to PEPE; /* Primer asterisco referido a bases de datos, el segundo a las tablas */

grant select
on centros.* to PEPE; /* Permisos a la base de datos centros y a todas las tablas que lo contienen */

grant select, insert, delete, update
on *.* to PEPE; /* Seleccionar, insertar, borrar y actualizar cualquier tabla y base de datos */

/* Actualizar privilegios obtenidos */
flush privileges;
```
