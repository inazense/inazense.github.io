---
title: Programación. Ficheros (I)
description:
date: 2014-11-16 00:00:00 +0800
categories: [Programación]
tags: [programacion, ficheros, ficheros secuenciales, ficheros de texto]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,...
#  alt: Image alt text.
---

## Uso de ficheros

Los ficheros surgen de la necesidad de almacenar información una vez que termina el programa y poder usarla en ejecuciones futuras de ese mismo programa o de otros.

Es el único mecanismo que tenemos para guardar información cuando nos quedamos sin suministro eléctrico y poder recuperarla después.

El acceder a la información de los ficheros supone acceder a dispositivos que, al lado de la memoria de un ordenador, resultan excesivamente lentos, ya que supone el desplazamiento mecánico de cabezas lectoras y eso supone un retraso importante en el acceso a la información.

## Tipos básicos de ficheros

### Ficheros secuenciales

Almacenan una secuencia de datos de cualquier tipo (pero todos del mismo tipo). Por ejemplo, puedo tener un fichero que almacena una secuencia de enteros, de reales, de vectores de lo que sea, de registros de cualquier tipo, etc.

No los podemos editar con un editor de textos (o bueno, podemos, pero no vamos a entender nada).

Para crearlos, acceder a la información, o modificarlos lo habitual es hacerlo por programa.

### Ficheros de texto

Almacenan únicamente caracteres codificados en ASCII.

Por consiguiente, para acceder a la información o modificarlos, podría hacer uso indistintamente de un programa o un editor de textos (aunque desde el editor tendré problemas con los caracteres no representables).

Si nos damos cuenta, tanto el uno como el otro son exactamente lo mismo (muchos bytes uno detrás de otro). Por lo tanto, lo único que varía entre un fichero secuencial binario y uno de texto es su contenido lógico. Un fichero, sea del tipo que sea, podemos luego interpretarlo como queramos.

## Ficheros secuenciales

Cuando me refiero a un fichero, la palabra _secuencial_ tiene que ver con el tipo de acceso a la información de que dispongo.

Un fichero secuencial de datos de tipo `tpDato` es una estructura de datos cuyo dominio de valores son las secuencias finitas de datos del tipo `tpDato`, con un conjunto restringido de operadores que fundamentalmente permiten sólo el acceso secuencial a sus componentes.

Lo que significa el acceso secuencial es que, en un momento dado, sólo puede accederse de forma inmediata a uno de los componentes del fichero, y para acceder a un elemento es preciso haber accedido antes a todos los elementos anteriores.

Es decir, con un vector puedo acceder directamente a la componente 1000 si es justo el dato que necesito. Con un fichero secuencial, si quiero el dato 1000 tengo que acceder primero a los 999 anteriores. Por tanto, los accesos son mucho más lentos debido a dos razones:

- El dispositivo de almacenamiento es más lento (los discos duros son más lentos que las memorias).
- El acceso en el caso del fichero es secuencial, mientras que en memoria el acceso es directo.

Es útil para guardar y recuperar información, pero bastante inútil para buscar de manera eficiente información en él.
