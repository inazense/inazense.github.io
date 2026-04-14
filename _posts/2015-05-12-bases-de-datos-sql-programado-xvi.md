---
title: Bases de datos. SQL programado (XVI). Ejercicios (VII)
description: Examen de práctica del tercer trimestre de bases de datos con funciones, procedimientos con transacciones y triggers en MySQL.
author: Inazio Claver
date: 2015-05-12 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, funciones, triggers, transacciones]
pin: false
math: false
mermaid: false
---

Para practicar previa realización del examen, vamos a realizar el del tercer trimestre del año pasado. Para ello hay que cargar el `.sql eval3`, que puedes descargar desde [aquí](https://drive.google.com/file/d/0Bz9hbleXTdM-eVZlR2NtUXZ5NGc/view?usp=sharing).

## Pregunta 1 *(3 puntos)*

Realiza una función de nombre `pregunta1` que devuelva el porcentaje de municipios cuya población no ha disminuido a lo largo de los años que figuran en la tabla municipios.

**Solución 1** (con cursor):

```sql
delimiter $$

drop function if exists pregunta1 $$

create function pregunta1()
returns double
reads sql data
begin
     declare ultimaFila int default 0;
     declare v2003 int;
     declare v2001 int;
     declare v1996 int;
     declare v1991 int;
     declare totalPueblos int default 0;
     declare pueblosRequisito int default 0;
     declare porcentaje double;
     declare pueblos cursor for
         select poblacion2003, poblacion2001, poblacion1996, poblacion1991
         from municipio;
     declare continue handler for not found
         set ultimaFila = 1;
     open pueblos;
         verPueblos: loop
              fetch pueblos into v2003, v2001, v1996, v1991;
              if ultimaFila = 1 then
                   leave verPueblos;
              end if;
              set totalPueblos = totalPueblos + 1;
              if v1996 >= v1991 and v2001 >= v1996 and v2003 >= v2001 then
                   set pueblosRequisito = pueblosRequisito + 1;
              end if;
         end loop verPueblos;
     close pueblos;
     set porcentaje = (pueblosRequisito * 100) / totalPueblos;
     return porcentaje;
end $$

delimiter ;
```

**Solución 2** (con subconsultas):

```sql
delimiter $$

drop function if exists pregunta1 $$

create function pregunta1()
returns double
reads sql data
begin
     declare totalPueblos int;
     declare pueblosRequisito int;
     declare porcentaje double;
     set totalPueblos = (select count(*) from municipio);
     set pueblosRequisito = (select count(*) from municipio where poblacion1996 >= poblacion1991 and poblacion2001 >= poblacion1996 and poblacion2003 >= poblacion2001);
     set porcentaje = (pueblosRequisito * 100) / totalPueblos;
     return porcentaje;
end $$

delimiter ;
```

## Pregunta 2 *(3,75 puntos)*

Realiza un procedimiento que reciba los datos de un municipio (excepto el identificador) y los inserte en la tabla municipio. Usa transacciones. El id será una unidad más que el mayor existente. Retorna `-1` si la comunidad no existe, `-2` si algún valor es nulo, `-3` ante error, `1` si correcto.

```sql
delimiter $$

drop procedure if exists pregunta2 $$

create procedure pregunta2(vNombre varchar(70), v2003 int, v2001 int, v1996 int, v1991 int, vSuperficie int, cAutonoma int, out resultado int)
modifies sql data
begin
     declare id int;
     declare exit handler for sqlexception
         begin
              set resultado = -3;
              rollback;
         end;
     start transaction;
     if vNombre is null or v2003 is Null or v2001 is null or v1996 is null or v1991 is null or vSuperficie is null or cAutonoma is null then
         set resultado = -2;
         rollback;
     elseif cAutonoma not in(select ca_id from comunidad) then
         set resultado = -1;
         rollback;
     else
         set id = (select m_id from municipio order by m_id desc limit 1) + 1;
         insert into municipio values(id, vNombre, v2003, v2001, v1996, v1991, vSuperficie, cAutonoma);
         set resultado = 1;
         commit;
     end if;
end $$

delimiter ;
```

## Pregunta 3 *(3,25 puntos)*

Realiza un trigger que no permita realizar modificaciones en la tabla municipio los fines de semana (sábados o domingos).

```sql
delimiter $$

drop trigger if exists problema3 $$

create trigger problema3
     before update on municipio
     for each row
begin
     if dayofweek(curdate()) = 1 or dayofweek(curdate()) = 7 then
         signal sqlstate '20000';
     end if;
end $$

delimiter ;
```
