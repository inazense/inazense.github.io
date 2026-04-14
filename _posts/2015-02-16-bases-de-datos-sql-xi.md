---
title: Bases de datos. SQL (XI)
description: Práctica 12 sobre índices en MySQL, creando tablas con distintos tipos de índices y eliminándolos posteriormente.
author: Inazio Claver
date: 2015-02-16 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
---

## Práctica 12. Índices

### Tabla libros

Creamos la tabla `libros` con clave primaria en `codigo` e índice ordinario en `editorial`:

```sql
drop table if exists libros;
create table libros (
     codigo int unsigned auto_increment primary key,
     titulo varchar(40),
     autor varchar(30),
     editorial varchar(15),
     index idx_editorial (editorial)
);
show index from libros;
```

### Tabla libros2

Creamos la misma estructura pero añadiendo los índices después de la creación de la tabla mediante `ALTER TABLE`:

```sql
drop table if exists libros2;
create table libros2 (
     codigo int unsigned auto_increment primary key,
     titulo varchar(40) not null,
     autor varchar(30),
     editorial varchar(15),
     index idx_editorial (editorial)
);
show index from libros2;
```

### Tabla libros3

Creamos la tabla con un índice único compuesto que abarca las columnas `titulo` y `editorial`:

```sql
drop table if exists libros3;
create table libros3 (
     codigo int unsigned auto_increment primary key,
     titulo varchar(40) not null,
     autor varchar(30),
     editorial varchar(15),
     unique idx_editorial (titulo,editorial)
);
show index from libros3;
```

### Eliminación de índices

Eliminamos la clave primaria de `libros`, el índice de `libros2` y el índice único de `libros3`:

```sql
alter table libros drop primary key;
alter table libros2 drop index idx_editorial;
alter table libros3 drop index idx_editorial;
```
