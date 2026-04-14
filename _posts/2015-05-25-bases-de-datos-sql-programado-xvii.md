---
title: Bases de datos. SQL programado (XVII). Examen de la tercera evaluación
description: Examen práctico del tercer trimestre de bases de datos con SQL dinámico, procedimientos con transacciones y triggers en MySQL.
author: Inazio Claver
date: 2015-05-25 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, triggers, transacciones, sql-dinamico]
pin: false
math: false
mermaid: false
---

Voy a compartir la parte práctica del examen del tercer trimestre de bases de datos. Para la prueba hemos usado el script `mayo15.sql`, que puedes descargarlo pulsando [aquí](https://drive.google.com/open?id=0Bz9hbleXTdM-dUYxUzljSWdhdk0&authuser=0).

## Pregunta 1

Crea un procedimiento que acepte una cadena como argumento y visualice título y editorial que contenga esa cadena en los campos título o resumen. Usa SQL dinámico.

```sql
delimiter $$

drop procedure if exists pregunta1 $$

create procedure pregunta1(in cadena varchar(255))
begin
     set @consulta = concat('select titulo, Editorial from libros where titulo like "','%',cadena,'%" or resumen like "','%',cadena,'%"; ');
     prepare consulta from @consulta;
     execute consulta;
     deallocate prepare consulta;
end $$

delimiter ;
```

## Pregunta 2

Realiza un procedimiento que actualice la tabla usuarios con un comentario para cada usuario. Variables pasadas por parámetro. Usa transacciones. Devuelve en variable `OUT`: `1` (correcta), `-1` (usuario no existe), `-2` (error 1205, fila bloqueada), `-3` (cualquier otro error).

```sql
delimiter $$

drop procedure if exists pregunta2 $$

create procedure pregunta2(in cadena varchar(255), in usuario int, out salida int)
begin
     declare ultimaFila int default 0;
     declare resultado int default 1;
     declare continue handler for not found
         set ultimaFila = 1;
     declare continue handler for 1205
         set resultado = -2;
     declare continue handler for sqlexception
         set resultado = -3;
     if usuario not in (select registro from usuarios) then
         set resultado = -1;
     end if;
     start transaction;
     if resultado = 1 then
         update usuarios set Observaciones = cadena where registro = usuario;
         commit;
     else
         rollback;
     end if;
     set salida = resultado;
end $$

delimiter ;
```

## Pregunta 3

Realiza un trigger que cada vez que se indique que se ha devuelto un libro en la tabla `prestados` se indique en la tabla `libros` que ese libro ya no se encuentra en préstamo.

```sql
delimiter $$

drop trigger if exists pregunta3 $$

create trigger pregunta3
after update
on prestados
for each row
begin
     if old.devuelto = 'N' and new.devuelto = 'S' then
         update libros
         set prestado = 'N'
         where registro = old.reg_libro;
     end if;
end $$

delimiter ;
```
