---
title: Bases de datos. SQL (X). Índices
description: Tipos de índices en MySQL y las distintas formas de crearlos y eliminarlos.
author: Inazio Claver
date: 2015-02-16 12:00:00 +0800
categories: [Bases de datos]
tags: [bases-de-datos, sql, mysql]
pin: false
math: false
mermaid: false
---

## Tipos de índices

- **Clave primaria.** Se crea automáticamente.
- **Ordinario.** Creado por el usuario para acelerar búsquedas.
- **Únicos.** Mediante la restricción `UNIQUE`. Admiten nulos.
- **De texto completo.** Para campos `CHAR`, `VARCHAR` y `TEXT`.

Los índices de clave primaria y los únicos no admiten repetidos.

El índice está destinado a reducir la cantidad de tiempo, para evitar una lectura secuencial.

Para ver los índices de una tabla:

```sql
show index from clientes;
```

## Creación de índices

### Índices ordinarios

Mediante `CREATE INDEX`:

```sql
CREATE INDEX nombreIndice ON nombreTabla(campo1 [,campo2...]);
```

Dentro de la definición de la tabla:

```sql
CREATE TABLE nombreTabla(
    campo1 tipoDato,
    campo2 tipoDato,
    INDEX [nombreIndice] (campo1 [,campo2...])
);
```

Mediante `ALTER TABLE`:

```sql
ALTER TABLE nombreTabla ADD INDEX [nombreIndice] (campo1[,campo2...]);
```

### Índices únicos

Dentro de la definición de la tabla:

```sql
CREATE TABLE nombreTabla(
    campo1 tipoDato,
    campo2 tipoDato,
    UNIQUE [nombreIndice] (campo1 [,campo2...])
);
```

Mediante `ALTER TABLE`:

```sql
ALTER TABLE nombreTabla ADD UNIQUE [nombreIndice] (campo1,campo2);
```

Mediante `CREATE UNIQUE INDEX`:

```sql
CREATE UNIQUE INDEX nombreIndice ON nombreTabla(campo1[,campo2...]);
```

### Índices de texto completo

Dentro de la definición de la tabla:

```sql
CREATE TABLE nombreTabla(
    campo1 TIPO,
    campo2 TIPO,
    FULLTEXT [nombreIndice] (campo1 [campo2,...])
);
```

Mediante `ALTER TABLE`:

```sql
ALTER TABLE nombreTabla ADD FULLTEXT [nombreIndice] (campo1[,campo2,...]);
```

Mediante `CREATE FULLTEXT INDEX`:

```sql
CREATE FULLTEXT INDEX nombreIndice ON nombreTabla(campo1[,campo2,...]);
```

## Recomendaciones

Los índices deben estar orientados a los campos en los que se realizan búsquedas frecuentemente. Por ejemplo, el campo sexo no sería lógico para realizar un índice, ya que una lectura secuencial de la tabla puede resultar más eficiente que la sobrecarga del índice.
