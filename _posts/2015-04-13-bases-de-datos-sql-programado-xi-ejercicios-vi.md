---
title: Bases de datos. SQL programado (XI). Ejercicios (VI)
description: Ejercicios de triggers en MySQL para sincronizar tablas réplica y realizar auditorías de operaciones INSERT, UPDATE y DELETE.
author: Inazio Claver
date: 2015-04-13 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, triggers, ejercicios]
pin: false
math: false
mermaid: false
---

Hoja de ejercicios seis del tema 6/7.

Para estos ejercicios usaremos el script `primeros_pasos.sql` (lo puedes descargar [aquí](https://drive.google.com/open?id=0Bz9hbleXTdM-UTFOOWVBTEE1b2M&authuser=0)).

## Ejercicio 25

Realizar dos triggers que completen la funcionalidad del trigger1 del apartado 9.3 de los materiales, manteniendo sincronizada la tabla `alumnos_replica`, pero para las operaciones de modificación (trigger `ejercicio25a`) y borrado (trigger `ejercicio25b`).

Antes de realizar el ejercicio necesitarás tener creada la tabla:

```sql
CREATE TABLE alumnos_replica
     (id        INT PRIMARY KEY,
      alumno VARCHAR(30))
ENGINE=innodb;
```

```sql
-- Creo tabla alumnos
create table alumnos
(id int primary key, alumno varchar(30))
engine=innodb;

-- Creo la tabla donde realizaré el volcado de datos
create table alumnos_replica
(id int primary key,
alumno varchar(30))
engine=innodb;

delimiter $$

-- Trigger para la inserción de filas (apartado 9.3)
create trigger veinticincoA
     after insert on alumnos
     for each row
begin
     insert into alumnos_replica values(new.id, new.alumno);
end $$

-- Trigger para la eliminación de filas
create trigger veinticincoB
     after delete on alumnos
     for each row
begin
     delete from alumnos_replica where id = old.id;
end $$

-- Trigger para la actualización de filas
create trigger veinticincoC
     after update on alumnos
     for each row
begin
     update alumnos_replica
     set id = new.id, alumno = new.alumno
     where id = old.id;
end $$

delimiter ;
```

## Ejercicio 26

Realizar tres triggers `ejercicio26a`, `ejercicio26b` y `ejercicio26c` que realicen una auditoría similar a la que realiza el trigger2 del apartado 9.3 de los materiales, pero para la tabla `centros`:

- El trigger `ejercicio26a` auditará las operaciones de inserción.
- El trigger `ejercicio26b` auditará las operaciones de modificación.
- El trigger `ejercicio26c` auditará las operaciones de borrado.

Antes de realizar el ejercicio necesitarás tener creada la tabla:

```sql
CREATE TABLE AUDITA (mensaje VARCHAR(200));
```

```sql
-- Creo tabla para la auditoría
create table audita
(mensaje varchar(100));

delimiter $$

-- Trigger de inserción
create trigger ejercicio26a
     after insert on centros
     for each row
begin
     insert into audita
     values (concat('Inserción realizada por ', user(),
                        ' en fecha ', now(),
                        '. Valores insertados: ', new.numce, ', ', new.nomce, ' y ', new.seas));
end $$

-- Trigger de actualización
create trigger ejercicio26b
     after update on centros
     for each row
begin
     insert into audita
     values (concat('Modificación realizada por ', user(),
                        ' en fecha ', now(),
                        '. Valores antiguos: ', old.numce, ', ', old.nomce, ' y ', old.seas,
                        '. Valores nuevos: ', new.numce, ', ', new.nomce, ' y ', new.seas));
end $$

-- Trigger de borrado
create trigger ejercicio26c
     after delete on centros
     for each row
begin
     insert into audita
     values (concat('Borrado realizado por ', user(),
                        ' en fecha ', now(),
                        '. Valores borrados: ', old.numce, ', ', old.nomce, ' y ', old.seas));
end $$

delimiter ;
```
