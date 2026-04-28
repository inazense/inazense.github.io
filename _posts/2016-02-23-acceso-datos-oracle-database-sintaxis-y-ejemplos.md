---
title: Acceso a datos. Oracle Database. Sintaxis y ejemplos
description: Sintaxis de Oracle Database para tipos de objetos, métodos, tablas de objetos, varrays y herencia de tipos con ejemplos prácticos.
author: Inazio Claver
date: 2016-02-23 12:00:00 +0800
categories: [Acceso a datos, Bases de datos]
tags: [oracle, sql, plsql, bases-de-datos, objetos, herencia]
pin: false
math: false
mermaid: false
---

La sintaxis de Oracle está basada en lenguaje SQL, con la puntualización de que permite declarar objetos y almacenarlos como tal, arrays de objetos, etc.

A continuación veremos unos cuantos ejemplos de la sintaxis que emplearemos en esta tecnología:

## Tipos de objetos

![](/img/posts/20160223_1.png)

![](/img/posts/20160223_2.png)

![](/img/posts/20160223_3.png)

![](/img/posts/20160223_4.png)

![](/img/posts/20160223_5.png)

## Métodos

¿Qué sucede? Que hasta ahora, solo hemos estado especificando el esqueleto de estos métodos. Para programar el código que hará las operaciones deberemos agregar un cuerpo al método, con la sentencia CREATE OR REPLACE TYPE BODY.

En el siguiente ejemplo veremos como hacer el cuerpo de una función que actúe como constructor, en el tipo Rectangulo.

![](/img/posts/20160223_6.png)

![](/img/posts/20160223_7.png)

![](/img/posts/20160223_8.png)

![](/img/posts/20160223_9.png)

## Tablas de objetos

Para almacenar los datos y que permanezcan guardados hay que crear tablas, los tipos de objetos no sirven para ello. Lo que sí podremos hacer es tablas que estén basadas en objetos creados previamente.

Pero, ¿Cómo realizo una inserción si dentro del objeto PERSONA tengo un objeto DIRECCION? Como si fuese un constructor como los vistos anteriormente, y haciendo referencia al TIPO de campo que vamos a insertar, y no al nombre del campo como se halla llamado en el objeto que lo almacene. Es decir, insertaremos DIRECCION(…) y no DIREC(…).

Por lo demás, es un INSERT INTO como todos en SQL.

Ahora bien, para hacer referencia a los campos de la dirección de una persona, en acciones como consultar, eliminar o actualizar datos por ejemplo, la cosa se mantiene como si hiciésemos llamadas a las propiedades y métodos públicos de una clase en Java, para que se entienda el símil. Vamos a ver varios ejemplos

![](/img/posts/20160223_10.png)

![](/img/posts/20160223_11.png)

![](/img/posts/20160223_12.png)

![](/img/posts/20160223_13.png)

![](/img/posts/20160223_14.png)

## Varrays

Los varrays son arrays del objeto que nosotros le indicamos y de un tamaño definido previamente.

La pega de los varrays es que no se puede modificar su información en solitario. Es decir, que si actualizo el segundo campo de un array de tres posiciones, deberé volver a guardar también las posiciones 0 y 2 (la segunda posición sería la 1).

![](/img/posts/20160223_15.png)

![](/img/posts/20160223_16.png)

![](/img/posts/20160223_17.png)

![](/img/posts/20160223_18.png)

![](/img/posts/20160223_19.png)

## Herencia de tipos

La herencia de tipos funciona como la herencia de programación de objetos. Podemos crear un objeto base, por ejemplo ANIMALES, con la característica de VIVIR, y de él que desciendan los tipos VERTEBRADOS e INVERTEBRADOS, que además de sus propiedades llevarán incorporada la de VIVIR del tipo que han heredado. Y a su vez estos pueden ser campos que hereden otros subcampos. MAMIFEROS heredará de VERTEBRADOS, por ejemplo, y al final de varias herencias, podríamos tener el tipo PERRO, un tipo final que no podrá otorgar una herencia a ningún tipo más.

Es un ejemplo, pero sirve para hacernos una breve idea.

La forma de implementar la herencia en Oracle es tal que así:

Lo primero es definir el tipo que servirá para la herencia. Persona en mi caso.

![](/img/posts/20160223_20.png)

Y a continuación el tipo que va a heredar. Alumno

![](/img/posts/20160223_21.png)

![](/img/posts/20160223_22.png)

![](/img/posts/20160223_23.png)

![](/img/posts/20160223_24.png)

Podemos hacer algunas declaraciones que sirvan para testear si la herencia se está recibiendo correctamente.

![](/img/posts/20160223_25.png)

![](/img/posts/20160223_26.png)

![](/img/posts/20160223_27.png)
