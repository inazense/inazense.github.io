---
title: Bases de datos. SQL programado (XIV). Abrazo mortal
description: Explicación del DeadLock o abrazo mortal en MySQL y cómo evitarlo usando cursores de actualización CURSOR FOR UPDATE.
author: Inazio Claver
date: 2015-04-27 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, deadlock, transacciones, cursor]
pin: false
math: false
mermaid: false
---

Lo primero de todo, dejar claro que con DeadLock no me refiero a ellos:

![Death Metal Band](/img/posts/20150427_1.jpg)

Así que si entraste buscando **Death Metal**... bueno, supongo que serás un poco especial, que el título del blog ya da alguna pista del temario a tratar.

## ¿Qué es un abrazo mortal?

Un **abrazo mortal** (o **DeadLock**) se produce cuando una transacción A intenta modificar los datos que están siendo modificados por una transacción B, y a su vez ésta última intenta modificar los datos que están siendo modificados por la primera transacción A.

![Diagrama de DeadLock](/img/posts/20150427_2.png)

Al producirse el **DeadLock** una de las dos transacciones hará un **ROLLBACK**, lo que llevará a provocar una situación de error. Normalmente la información actualizada se guardará para que la visualice el usuario que pidió los datos primero.

## CURSOR FOR UPDATE

Una de las soluciones para evitar los abrazos mortales son los cursores de actualización (**CURSOR FOR UPDATE**).

Imagina un ejemplo en el que se quiere modificar los datos de una tabla de alumnos. Podría darse el caso de que se quiera modificar dos alumnos a la vez. Lo evitamos de la siguiente manera:

![Ejemplo de CURSOR FOR UPDATE](/img/posts/20150427_3.png)

Eso sí, hay que tener en cuenta que si bloqueas más de una fila, el comportamiento de MySQL es de bloquear todo el bloque físico al que pertenecen esas dos (o más) filas que quieres bloquear. Pero a efectos prácticos, la idea que debemos asimilar es que se bloquean las filas que necesitamos.
