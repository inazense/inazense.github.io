---
title: Bases de datos. SQL programado (X). Ejercicios (V)
description: Ejercicios 23 y 24 de SQL programado en MySQL, creando funciones para comprobar existencia de departamentos y calcular suma de salarios.
author: Inazio Claver
date: 2015-03-29 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, funciones, ejercicios]
pin: false
math: false
mermaid: false
---

Práctica 5 del tema 6/7. Se utiliza el script `primeros_pasos`.

## Ejercicio 23: Función que comprueba si existe un departamento

Devuelve 1 si existe el número de departamento pasado como argumento, 0 en caso contrario:

```sql
delimiter $$
drop function if exists veintitres $$
create function veintitres(dep int)
returns int
reads sql data
begin
     if dep in (select numde from departamentos) then
         return 1;
     else
         return 0;
     end if;
end $$
delimiter ;
```

## Ejercicio 24: Función que suma salarios de un departamento

Retorna la suma total de salarios de los empleados del departamento indicado. Devuelve -1 si el departamento no existe, usando la función del ejercicio anterior:

```sql
delimiter $$
drop function if exists veinticuatro $$
create function veinticuatro(dep int)
returns int
reads sql data
begin
     declare salarios int;
     if veintitres(dep) = 0 then
         set salarios = -1;
     else
         select sum(salario)
         into salarios
         from empleados
         where numde = dep;
     end if;
     return salarios;
end $$
delimiter ;
```
