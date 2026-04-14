---
title: Bases de datos. SQL programado (IX). Ejercicios (IV)
description: Ejercicios 21 y 22 de SQL programado en MySQL, con manejadores de errores definidos por el usuario mediante condiciones nombradas.
author: Inazio Claver
date: 2015-03-26 20:06:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, errores, ejercicios]
pin: false
math: false
mermaid: false
---

Práctica 4 del tema 6/7.

## Ejercicio 21: Alta de alumno con manejadores de error nombrados

Procedimiento basado en el apartado 7.6 de los materiales. Añade un manejador de error con condición definida por el usuario para tabla inexistente, junto a los manejadores de clave nula y clave repetida:

```sql
delimiter $$
drop procedure if exists veintiuno $$
create procedure veintiuno(p_id int, p_alumno varchar(30), out p_error_num int, out p_error_text varchar(100))
modifies sql data
begin
     declare clave_repetida_error condition for 1062;
     declare clave_nula_error condition for 1048;
     declare tabla_inexistente_error condition for 1146;
     declare continue handler for clave_repetida_error
         begin
              set p_error_num = 1062;
              set p_error_text = 'Clave duplicada';
         end;
     declare continue handler for clave_nula_error
         begin
              set p_error_num = 1048;
              set p_error_text = 'Clave nula';
         end;
     declare continue handler for tabla_inexistente_error
         begin
              set p_error_num = 1146;
              set p_error_text = 'Tabla inexistente';
         end;
     declare continue handler for sqlexception
         begin
              set p_error_num = -1;
              set p_error_text = 'Ocurrió un error';
         end;
     set p_error_num = 0;
     insert into alumnos values(p_id, p_alumno);
     if p_error_num = 0 then
          set p_error_text = 'Alta de alumno realizada';
     end if;
end $$
delimiter ;
```

## Ejercicio 22: Alta de empleado con cuatro manejadores de error

Procedimiento que recibe todos los datos de un empleado e inserta el registro. Incluye manejadores para clave repetida, clave nula, tabla inexistente, integridad referencial y excepción genérica:

```sql
delimiter $$
drop procedure if exists veintidos $$
create procedure veintidos(vNumem int, vNumde int, vExtel int, vFecna date, vFecin date, vSalario int, vComision int, vNumhi int, vNomem varchar(18), out p_error_num int, p_error_text varchar(100))
modifies sql data
begin
     declare clave_repetida_error condition for 1062;
     declare clave_nula_error condition for 1048;
     declare tabla_inexistente_error condition for 1146;
     declare integridad_referencial_error condition for 1452;
     declare continue handler for clave_repetida_error
         begin
              set p_error_num = 1062;
              set p_error_text = 'Clave duplicada';
         end;
     declare continue handler for clave_nula_error
         begin
              set p_error_num = 1048;
              set p_error_text = 'Clave nula';
         end;
     declare continue handler for tabla_inexistente_error
         begin
              set p_error_num = 1146;
              set p_error_text = 'Tabla inexistente';
         end;
     declare continue handler for integridad_referencial_error
         begin
              set p_error_num = 1452;
              set p_error_text = 'Error en la integridad referencial de los datos con la tabla departamentos';
         end;
     declare continue handler for sqlexception
         begin
              set p_error_num = -1;
              set p_error_text = 'Ocurrió un error';
         end;
     set p_error_num = 0;
     insert into empleados values (vNumem, vNumde, vExtel, vFecna, vFecin, vSalario, vComision, vNumhi, vNomem);
     if p_error_num = 0 then
          set p_error_text = 'Alta de empleado realizada';
     end if;
end $$
delimiter ;
```
