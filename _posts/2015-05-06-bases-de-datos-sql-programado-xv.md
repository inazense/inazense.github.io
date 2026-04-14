---
title: Bases de datos. SQL programado (XV). Ejercicios (VI)
description: Ejercicios avanzados de SQL programado en MySQL con cursores de actualización, transacciones, manejadores de error y estrategia optimista.
author: Inazio Claver
date: 2015-05-06 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, cursores, transacciones]
pin: false
math: false
mermaid: false
---

Ejercicios correspondientes a la hoja número siete. Se han realizado sobre el script `primerospasos.sql`, que puedes descargar haciendo clic [aquí](https://drive.google.com/open?id=0Bz9hbleXTdM-UTFOOWVBTEE1b2M&authuser=0).

## Ejercicio 27

Realizar un procedimiento que actualice el salario de los empleados, con una cantidad por hijo que se pase al procedimiento, para aquellos trabajadores que su comisión es nula. Durante el proceso de actualización debe garantizarse que ningún otro usuario pueda cambiar los datos que están siendo modificados. Utilizar un manejador de tipo `SQLEXCEPTION` (que incluya la operación `ROLLBACK`) para tratar cualquier situación de error distinta de la excepción `NOT FOUND` que también deberá manejarse. Al final del proceso, confirmar la transacción si la ejecución ha sido correcta.

```sql
delimiter $$

drop procedure if exists veintisiete $$

create procedure veintisiete(in subidaSueldo int, out numError int, out textoError varchar(100))
modifies sql data
begin
     declare ultimaFila int default 0;
     declare vEmpleado int;
     declare vHijos int;
     declare emp cursor for
         select numem, numhi
         from empleados
         where comision is null and numhi > 0
         for update;
     declare continue handler for not found
         begin
              set ultimaFila = 1;
              rollback;
         end;
     declare continue handler for sqlexception
         begin
              set numError = -1;
              set textoError = 'Ocurrió un error durante la consulta';
              rollback;
         end;
     set numError = 0;
     start transaction;
     open emp;
         empleadosCursor: loop
              fetch emp into vEmpleado, vHijos;
              if ultimaFila = 1 then
                   leave empleadosCursor;
              end if;
              update empleados
              set salario = salario + (subidaSueldo * vHijos)
              where numem = vEmpleado;
         end loop empleadosCursor;
     close emp;
     if numError = 0 then
         set textoError = 'Consulta de actualización realizada correctamente';
         commit;
     end if;
end $$

delimiter ;
```

## Ejercicio 28

"Representación gráfica de los salarios de los empleados". Realizar un procedimiento que utilice un cursor de actualización para rellenar la columna `estrellas` de la tabla empleados con un asterisco por cada 100 unidades de salario. Antes de realizar el ejercicio añade la columna `estrellas` a la tabla empleados con `ALTER TABLE empleados ADD COLUMN estrellas VARCHAR(10)`. Incluir los dos manejadores de error del ejercicio anterior.

```sql
alter table empleados add column estrellas varchar(10);

delimiter $$

drop procedure if exists veintiocho $$

create procedure veintiocho(out numError int, out textoError varchar(100))
begin
     declare ultimaFila int default 0;
     declare vEmpleado int;
     declare vSalario int;
     declare vEstrellas int;
     declare contador int;
     declare calidad varchar(10);
     declare emp cursor for
         select numem, salario
         from empleados
         for update;
     declare continue handler for not found
         set ultimaFila = 1;
     declare continue handler for sqlexception
         begin
              set numError = -1;
              set textoError = 'Ocurrió un error al lanzar procedimiento';
              rollback;
         end;
     set numError = 0;
     start transaction;
     open emp;
         salarioEmpleados: loop
              fetch emp into vEmpleado, vSalario;
              if ultimaFila = 1 then
                   leave salarioEmpleados;
              end if;
              set vEstrellas = vSalario / 100;
              if vEstrellas > 10 then
                   set vEstrellas = 10;
              end if;
              set contador = 0;
              while contador < vEstrellas do
                   if calidad is null then
                        set calidad = '*';
                   else
                        set calidad = concat(calidad, '*');
                   end if;
                   set contador = contador + 1;
              end while;
              update empleados
              set estrellas = calidad
              where numem = vEmpleado;
              set calidad = null;
         end loop salarioEmpleados;
     close emp;
     if numError = 0 then
         set textoError = 'Operación completada';
         commit;
     end if;
end $$

delimiter ;
```

## Ejercicio 29

Realizar un procedimiento que implemente la estrategia optimista de transacciones (asume que es muy poco probable que el valor de una fila que se acaba de leer cambie antes de modificarla; si ha cambiado, hacer `ROLLBACK`).

```sql
delimiter $$

drop procedure if exists veintinueve $$

create procedure veintinueve(pId int, pAlumno varchar(30), out numError int, out textoError varchar(100))
modifies sql data
begin
     declare vAlumno varchar(30);
     declare vAlumno2 varchar(30);
     declare continue handler for sqlexception
         begin
              set numError = -1;
              set textoError = 'Ocurrió un error';
              rollback;
         end;
     set numError = 0;
     start transaction;
         select alumno into vAlumno from alumnos where id = pId;
         select sleep(15) into sleep;
         select alumno into vAlumno2 from alumnos where id = pId for update;
         if vAlumno = vAlumno2 then
              update alumnos set alumno = pAlumno where id = pId;
              if numError = 0 then
                   commit;
              else
                   rollback;
              end if;
         else
              rollback;
         end if;
end $$

delimiter ;
```
