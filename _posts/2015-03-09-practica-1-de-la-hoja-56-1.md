---
title: Bases de datos. SQL programado (IV) - Ejercicios
description: Ocho ejercicios prácticos de procedimientos almacenados en MySQL, desde operaciones básicas hasta desglose de moneda.
author: Inazio Claver
date: 2015-03-09 09:30:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos, ejercicios]
pin: false
math: false
mermaid: false
redirect_from:
  - /2015/03/practica-1-de-la-hoja-56-1.html
---

Ejercicios de procedimientos almacenados en MySQL.

## Ejercicio 1: Suma de dos números

```sql
delimiter $$
drop procedure if exists uno $$
create procedure uno(in x integer, in y integer)
begin
     select a+b;
end $$
delimiter ;
```

## Ejercicio 2: Invertir una cadena

```sql
delimiter $$
drop procedure if exists dos $$
create procedure dos (in cadena varchar(255))
begin
     select reverse(cadena);
end $$
delimiter ;
```

## Ejercicio 3: Extraer el año de una fecha

```sql
delimiter $$
drop procedure if exists tres $$
create procedure tres (in fecha date)
begin
     select year(fecha);
end $$
delimiter ;
```

## Ejercicio 4: Usar el procedimiento anterior

```sql
delimiter $$
drop procedure if exists cuatro $$
create procedure cuatro (in fecha date)
begin
     select dayname(fecha), monthname(fecha), tres(fecha);
end $$
delimiter ;
```

## Ejercicio 5: Años entre dos fechas

```sql
delimiter $$
drop procedure if exists cinco $$
create procedure cinco (in fecha1 date, in fecha2 date)
begin
     if fecha1 >= fecha2 then
         select year(fecha1)-year(fecha2);
     else
         select year(fecha2)-year(fecha1);
     end if;
end $$
delimiter ;
```

## Ejercicio 6: Trienios entre dos fechas

```sql
delimiter $$
drop procedure if exists seis $$
create procedure seis (in fecha1 date, in fecha2 date)
begin
     if fecha1 >= fecha2 then
         select (year(fecha1)-year(fecha2))/3;
     else
         select (year(fecha2)-year(fecha1))/3;
     end if;
end $$
delimiter ;
```

## Ejercicio 7: Mostrar solo caracteres alfabéticos

Recorre la cadena carácter a carácter; si el carácter es alfabético (ASCII 65-90 mayúsculas, 97-122 minúsculas) lo añade al resultado, si no, añade un espacio.

```sql
delimiter $$
drop procedure if exists sieteD $$
create procedure sieteD(in cadena varchar(255), out oCadena varchar(255))
begin
     declare letra int;
     declare contador int;
     set contador = 0;
     bucleCadena: while contador <= length(cadena) do
         set letra = ascii(mid(cadena,1,1));
         if (letra >= 65 and letra <=90) || (letra >= 97 and letra <= 122) then
                   if oCadena = null then
                        set oCadena = mid(cadena,contador,1);
                   else
                        set oCadena = concat(oCadena,mid(cadena,contador,1));
                   end if;
         else
              if oCadena = null then
                   set oCadena = ' ';
              else
                   set oCadena = concat(oCadena,' ');
              end if;
         end if;
         set contador = contador+1;
     end while bucleCadena;
end $$
delimiter $$;
```

## Ejercicio 8: Desglose de cambio en moneda

Descompone una cantidad decimal en billetes de €50, €20, €10, €5, €2, €1 y monedas de céntimos, usando divisiones enteras y `MOD`.

```sql
delimiter $$
drop procedure if exists ocho $$
create procedure ocho(valor decimal(5,2))
begin
     declare unCent, dosCent, cincoCent, diezCent, veinteCent, cincuentaCent, unE, dosE, cincoE, diezE, veinteE, cincuentaE integer;
     set unCent = 0;
     set dosCent = 0;
     set cincoCent = 0;
     set diezCent = 0;
     set veinteCent = 0;
     set cincuentaCent = 0;
     set unE = 0;
     set dosE = 0;
     set cincoE = 0;
     set diezE = 0;
     set veinteE = 0;
     set cincuentaE = 0;
     if valor >= 50 then
         set cincuentaE = valor / 50;
         set valor = MOD(valor,50);
     end if;
     if valor >= 20 then
         set veinteE = valor / 20;
         set valor = MOD(valor,20);
     end if;
     if valor >= 10 then
         set diezE = valor / 10;
         set valor = MOD(valor,10);
     end if;
     if valor >= 5 then
         set cincoE = valor / 5;
         set valor = MOD(valor,5);
     end if;
     if valor >= 2 then
         set dosE = valor / 2;
         set valor = MOD(valor,2);
     end if;
     if valor >= 1 then
         set unE = valor / 1;
         set valor = MOD(valor,2);
     end if;
     if valor >= 0.50 then
         set cincuentaCent = valor / 0.50;
         set valor = MOD(valor,0.50);
     end if;
     if valor >= 0.20 then
         set veinteCent = valor / 0.20;
         set valor = MOD(valor,0.20);
     end if;
     if valor >= 0.10 then
         set diezCent = valor / 0.10;
         set valor = MOD(valor,0.10);
     end if;
     if valor >= 0.05 then
         set cincoCent = valor / 0.05;
         set valor = MOD(valor,0.05);
     end if;
     if valor >= 0.02 then
         set dosCent = valor / 0.02;
         set valor = MOD(valor,0.02);
     end if;
     if valor >= 0.01 then
         set unCent = valor / 0.01;
         set valor = MOD(valor,0.01);
     end if;
     select unCent, dosCent, cincoCent, diezCent, veinteCent, cincuentaCent, unE, dosE, cincoE, diezE, veinteE, cincuentaE;
end $$
delimiter ;
```
