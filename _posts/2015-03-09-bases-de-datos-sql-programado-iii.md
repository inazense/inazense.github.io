---
title: Bases de datos. SQL programado (III)
description: Sentencias preparadas y SQL dinámico en MySQL para mejorar el rendimiento y prevenir inyecciones SQL.
author: Inazio Claver
date: 2015-03-09 09:29:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql, procedimientos]
pin: false
math: false
mermaid: false
---

## Sentencias preparadas

¿Esto qué es? Pues dejar esta sentencia ya preparada. Las sentencias preparadas aceleran la ejecución de consultas repetidas y previenen inyecciones SQL, ya que la validación de tipos se realiza antes de procesar los datos del usuario.

Para preparar una consulta se usa `PREPARE`, indicando los parámetros con `?`:

```sql
PREPARE alumnosInsertDinamic FROM "INSERT INTO alumnos VALUES (?,?)";
```

Para ejecutarla, se usa `EXECUTE` con las variables correspondientes:

```sql
EXECUTE alumnosInsertDinamic USING @id, @nombre;
```

Y cuando ya no la necesitemos, liberamos la memoria:

```sql
DEALLOCATE PREPARE alumnosInsertDinamic;
```

Cabe destacar que los procedimientos almacenados ya son en sí mismos sentencias preparadas. Aun así, dentro de un procedimiento podemos usar sentencias preparadas adicionales para manejar SQL dinámico de forma segura.

## SQL dinámico

El SQL dinámico son instrucciones que se ejecutan en tiempo de ejecución, a diferencia de las sentencias estáticas que se compilan previamente.

![Ejemplo de SQL dinámico](/img/posts/20150309_1.png)

Sin embargo, hay que tener mucho cuidado con la seguridad. Si no se valida correctamente la entrada del usuario, alguien podría ejecutar algo como:

```sql
call sqlDinamico('delete from alumnos where id >= 1000');
```

¿Menuda putada, eh? Si el usuario tiene los permisos suficientes, podría eliminar registros masivamente. Por eso es fundamental validar siempre los datos antes de ejecutar SQL dinámico.
