---
title: Bases de datos. SQL programado (VIII). Ejercicios (III)
description: Ejercicios 19 y 20 de SQL programado en MySQL, con cursores para listar empleados y actualizar salarios en transacciones.
author: Inazio Claver
date: 2015-03-23 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, cursores, procedimientos, ejercicios, transacciones]
pin: false
math: false
mermaid: false
---

Práctica 3 del tema 6/7. Se utilizan las tablas de la base de datos `primeros_pasos`.

## Ejercicio 19: Listar empleados por rango de departamento

Procedimiento que recibe dos valores y muestra los datos de los empleados cuyos departamentos están en ese rango:

```sql
drop procedure if exists diecinueve;
delimiter $$
create procedure diecinueve(in min integer, in max integer)
begin
     declare ultimaFila integer default 0;
     declare vNumde integer;
     declare vSalario integer;
     declare vComision integer;
     declare vNomem varchar(18);
     declare cEmpleados cursor for
         select nomem, numde, salario, comision
         from empleados
         where numde between min and max;
     declare continue handler for not found set ultimaFila = 1;
     open cEmpleados;
         empleadosCursor: loop
              fetch cEmpleados into vNomem, vNumde, vSalario, vComision;
              if ultimaFila = 1 then
                   leave empleadosCursor;
              end if;
              select vNomem as 'Empleado', vNumde as 'Departamento',
                     vSalario as 'Salario', vComision as 'Comision',
                     vSalario+ifnull(vComision,0) as 'Salario total';
         end loop empleadosCursor;
     close cEmpleados;
end $$
delimiter ;
```

## Ejercicio 20: Subida de sueldo a empleados por debajo de la media de su oficio

Procedimiento que sube el sueldo de los empleados que ganan menos que el promedio de su oficio. La subida equivale al 50% de la diferencia entre su salario y la media, dentro de una transacción:

```sql
delimiter $$
drop procedure if exists veinte $$
create procedure veinte()
begin
     declare sentencia varchar(255);
     declare ultimaFila int default 0;
     declare empleado int;
     declare vOficio varchar(255);
     declare vSalario int;
     declare salarioMedio int;
     declare subida int;
     declare cEmp cursor for
         select emp_no, oficio, salario
         from empleados e
         where salario < (select avg(salario) from empleados
                          where oficio = e.oficio)
         for update;
     declare continue handler for not found set ultimaFila = 1;
     start transaction;
         open cEmp;
              cursorEmpleados: loop
                   fetch cEmp into empleado, vOficio, vSalario;
                   if ultimaFila = 1 then
                        leave cursorEmpleados;
                   end if;
                   set salarioMedio = (select avg(salario) from empleados
                                      where oficio = vOficio);
                   set subida = (salarioMedio - vSalario) / 2;
                   update empleados set salario = salario + subida
                          where emp_no = empleado;
              end loop cursorEmpleados;
         close cEmp;
     commit;
end $$
delimiter ;
```
