---
title: Bases de datos. SQL programado (VII). Ejercicios (II)
description: Ejercicios del 9 al 18 de procedimientos almacenados en MySQL, usando subconsultas, cursores, sentencias preparadas y validación de errores.
author: Inazio Claver
date: 2015-03-17 10:15:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, ejercicios]
pin: false
math: false
mermaid: false
---

Práctica 2 del tema 6/7. Se utilizan las tablas de empleados, departamentos y centros.

## Ejercicio 9: Empleados de un departamento

```sql
delimiter $$
drop procedure if exists nueve $$
create procedure nueve(dep varchar(255))
begin
     select *
     from empleados
     where numde = (
         select numde
         from departamentos
         where nomde like dep
     );
end $$
delimiter ;
```

## Ejercicio 10: Empleados de un centro

```sql
delimiter $$
drop procedure if exists diez $$
create procedure diez(centro varchar(255))
begin
     select *
     from empleados
     where numde in (
         select numde
         from departamentos
         where numce = (
              select numce
              from centros
              where nomce like centro
         )
     );
end $$
delimiter ;
```

## Ejercicio 11: Director y presupuesto de un departamento

```sql
delimiter $$
drop procedure if exists once $$
create procedure once(departamento varchar(255), out director integer, out presupuesto integer)
begin
     select direc, presu
     into director, presupuesto
     from departamentos
     where nomde like departamento;
end $$
delimiter ;
```

## Ejercicio 12: Eliminar una columna de una tabla (SQL dinámico)

```sql
delimiter $$
drop procedure if exists doce $$
create procedure doce(in tabla varchar(255), in columna varchar(255))
begin
     declare sentencia varchar(255);
     set @consulta = concat('alter table ', tabla, ' drop column ', columna, ';');
     prepare consulta from @consulta;
     execute consulta;
     deallocate prepare consulta;
end $$
delimiter ;
```

## Ejercicio 13: Empleados ordenados alfabéticamente

```sql
delimiter $$
drop procedure if exists trece $$
create procedure trece()
begin
     select nomem as 'APELLIDO', fecin as 'FECHA ALTA'
     from empleados
     order by 1;
end $$
delimiter ;
```

## Ejercicio 14: Empleados por departamento

```sql
delimiter $$
drop procedure if exists catorce $$
create procedure catorce()
begin
     select nomde as 'DEPARTAMENTO', count(e.numde) as 'NUMERO DE EMPLEADOS'
     from empleados e, departamentos d
     where e.numde = d.numde
     group by nomde;
end $$
delimiter ;
```

## Ejercicio 15: Buscar empleados por nombre

```sql
delimiter $$
drop procedure if exists quince $$
create procedure quince(in nombre varchar(255))
begin
     select numem, nomem
     from empleados
     where nomem like concat('%', nombre, '%');
     select count(*)
     from empleados
     where nomem like concat('%', nombre, '%');
end $$
delimiter ;
```

## Ejercicio 16: Cinco empleados con mayor sueldo

```sql
delimiter $$
drop procedure if exists dieciseis $$
create procedure dieciseis()
begin
     select nomem AS 'nombre', salario
     from empleados
     order by salario desc
     limit 5;
end $$
delimiter ;
```

## Ejercicio 17: Insertar nuevo centro

```sql
delimiter $$
drop procedure if exists diecisiete $$
create procedure diecisiete(in nomCen varchar(255), in localCen varchar(255))
begin
     declare numDep integer;
     select (numce+10)-(numce%10)
     into numDep
     from centros
     order by numce desc
     limit 1;
     insert into centros(numce, nomce, seas)
     values(numDep, nomCen, localCen);
end $$
delimiter ;
```

## Ejercicio 18: Alta de empleado con validación de errores

```sql
drop procedure if exists dieciocho;
delimiter $$
create procedure dieciocho(numem int(11), numde int(11), extel int(11), fecna date, fecin date, salario int(11), comision int(11), numhi int(11), nomem varchar(18))
begin
     declare valido int(1) default 1;
     declare controlErrores varchar(255);
     if numem is null then
         set valido = 0;
         set controlErrores = 'Número de empleado no puede ser nulo. ';
     end if;
     if numem in (select numem from empleados) then
         set valido = 0;
         set controlErrores = 'Número de empleado repetido';
     end if;
     if numde not in (select numde from departamentos) then
         set valido = 0;
         set controlErrores = concat(controlErrores, 'Número de director no está en tabla departamentos. ');
     end if;
     if datediff(now(), fecna) < 5840 then
         set valido = 0;
         set controlErrores = concat(controlErrores, 'Empleados menores de 16 años es ilegal. ');
     end if;
     if datediff(fecin, fecna) <= 0 then
         set valido = 0;
         set controlErrores = concat(controlErrores, 'La fecha de alta no puede ser menor que la de nacimiento');
     end if;
     if valido = 0 then
         select controlErrores;
     else
         insert into empleados
          values (numem, numde, extel, fecna, fecin, salario, comision, numhi, nomem);
     end if;
end $$
delimiter ;
```
