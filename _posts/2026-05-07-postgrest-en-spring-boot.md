---
title: PostRest + Spring boot. API Rest sin escribir controladores
description: Aprende qué es PostgREST y cómo integrarlo con Spring Boot para exponer PostgreSQL como API REST, consumir endpoints con WebClient y mantener una arquitectura más simple.
author: Inazio Claver
date: 2026-05-07 16:17:00 +0200
categories: [Java]
tags: [spring-boot, postgrest, postgresql, api-rest, webclient, jwt, backend, sql, java]
pin: false
featured: true
math: false
mermaid: false
---

# PostRest + Spring boot. API Rest sin escribir controladores

![PostRest + Spring boot](/img/posts/20260505_1.png)

Hay muchas formas de montar una API en Spring Boot. La más habitual es crear controladores, servicios, repositorios, entidades y toda la capa intermedia que ya conocemos. Funciona bien, pero no siempre hace falta construir tanto cuando lo único que queremos es exponer datos de PostgreSQL de forma rápida, consistente y sin demasiada ceremonia.

Ahí es donde entra **PostgREST**. Si ya trabajas con PostgreSQL y no quieres escribir media aplicación solo para servir CRUD, PostgREST puede ahorrarte bastante tiempo. Y si lo combinas con Spring Boot de forma sensata, puedes separar muy bien responsabilidades: PostgreSQL expone los datos, PostgREST los convierte en una API REST y Spring Boot se encarga de la lógica que realmente aporta valor.

## Qué es PostgREST

PostgREST es una herramienta que genera una API REST a partir de un esquema de PostgreSQL. No inventa un modelo intermedio ni obliga a definir controladores por cada recurso. Lee tablas, vistas, funciones y permisos, y con eso construye endpoints automáticamente.

En la práctica, eso significa que una tabla puede convertirse en un recurso, una vista puede actuar como una consulta ya preparada y una función puede usarse para operaciones más específicas. Todo ello respetando los permisos de base de datos, que es una de las partes más interesantes del enfoque.

La idea no es nueva, pero sí muy útil cuando tienes un dominio bastante claro y quieres evitar repetir lógica trivial en la capa Java.

## Cuándo tiene sentido usarlo

No lo usaría para todo. Si tu aplicación necesita reglas de negocio complejas, agregados, workflows o integración pesada con otros sistemas, Spring Boot seguirá siendo el corazón de la solución.

Pero PostgREST encaja muy bien en estos casos:

- CRUDs bastante directos.
- Backends internos.
- Prototipos serios que luego quieres mantener.
- APIs donde PostgreSQL ya concentra buena parte de la lógica.
- Sistemas donde prefieres empujar permisos y acceso a datos al propio motor.

En otras palabras: cuando la API está muy pegada a datos y poco a comportamiento, PostgREST tiene mucho sentido.

## Cómo encaja con Spring Boot

Aquí viene la parte importante. Spring Boot no sustituye a PostgREST ni PostgREST sustituye a Spring Boot. Lo útil es combinarlos con cabeza.

La arquitectura típica sería esta:

- PostgreSQL como base de datos principal.
- PostgREST como capa REST automática sobre el esquema.
- Spring Boot como aplicación que consume esa API, añade lógica de negocio, autenticación, orquestación o integración con otros servicios.

Eso te permite separar bastante bien responsabilidades. Spring Boot deja de actuar como simple intermediario de datos y pasa a hacer lo que mejor sabe hacer: coordinar procesos, validar reglas, integrar servicios y ofrecer endpoints propios cuando hace falta.

## Preparar PostgreSQL

Antes de montar nada, conviene tener claro qué tablas, vistas o funciones vas a exponer. No todo debería salir por la API por defecto.

Un ejemplo simple podría ser una tabla de pedidos:

```sql
create table pedidos (
    id bigserial primary key,
    cliente varchar(100) not null,
    total numeric(10,2) not null,
    creado_en timestamp not null default now()
);
```

Si PostgREST va a exponer esto, también debes pensar en permisos y roles. La gracia de PostgREST es que no se basa solo en “abrir” una tabla, sino en exponer lo que PostgreSQL permita realmente consultar o modificar.

## Configurar PostgREST

PostgREST suele configurarse con un fichero bastante simple. Ahí defines conexión, esquema expuesto, rol anónimo y algunas opciones más.

Un ejemplo mínimo:

```ini
db-uri = "postgres://app_user:secret@localhost:5432/tienda"
db-schema = "public"
db-anon-role = "anon"
server-port = 3000
```

Con eso ya puedes arrancarlo y empezar a probar endpoints sobre el esquema configurado. Si hay permisos bien definidos, la API responderá solo con lo que ese rol pueda ver o modificar.

## Exponer vistas y funciones

Aquí es donde PostgREST gana bastante. Si una consulta es compleja o quieres devolver un resultado ya preparado, no hace falta meter esa lógica en Spring Boot.

Puedes crear una vista:

```sql
create view pedidos_resumen as
select
    id,
    cliente,
    total,
    creado_en
from pedidos;
```

O una función:

```sql
create function crear_pedido(p_cliente varchar, p_total numeric)
returns pedidos
language sql
as $$
    insert into pedidos(cliente, total)
    values (p_cliente, p_total)
    returning *;
$$;
```

Eso te da bastante flexibilidad sin ensuciar la capa Java con consultas que en realidad pertenecen a la base de datos.

## Consumir PostgREST desde Spring Boot

Spring Boot puede consumir PostgREST como cualquier otra API REST. La diferencia es que aquí la API no la has escrito tú a mano, sino que la ha generado PostgreSQL a través de PostgREST.

Con `WebClient`, por ejemplo, puedes hacerlo así:

```java
@Service
public class PedidosClient {

    private final WebClient webClient;

    public PedidosClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("http://localhost:3000")
                .build();
    }

    public Mono<PedidoDto[]> obtenerPedidos() {
        return webClient.get()
                .uri("/pedidos")
                .retrieve()
                .bodyToMono(PedidoDto[].class);
    }
}
```

Y si prefieres bloquearte en un flujo tradicional, también puedes usar `RestTemplate`, aunque hoy en día `WebClient` suele encajar mejor si quieres una integración más moderna.

La clave está en no pensar en PostgREST como un atajo raro, sino como una API externa más, igual que tratarías con Stripe, GitHub o cualquier otro servicio [web:76].

## Autenticación y permisos

Aquí es donde muchas implementaciones se hacen bien o mal. PostgREST no debería exponer datos solo porque “están en la base de datos”. Lo correcto es controlar permisos en PostgreSQL y, si hace falta, usar JWT para identificar el rol o el contexto del usuario.

Eso permite algo muy potente: que la base de datos decida qué puede hacer cada perfil. Spring Boot puede encargarse de emitir o validar el token, pero la autorización fina la puede seguir imponiendo PostgreSQL.

Esta separación suele quedar bastante limpia en sistemas medianos. Spring Boot autentica, PostgREST sirve la API y PostgreSQL aplica el filtro real.

## Ventajas reales

Las ventajas más claras de este enfoque son bastante prácticas:

- Menos código repetido.
- Menos capas innecesarias para CRUDs.
- Aprovechar la potencia de PostgreSQL.
- Mejor separación entre acceso a datos y lógica de negocio.
- Control de permisos muy cercano al dato.

Además, si vienes de proyectos donde todo termina en un montón de repositorios casi idénticos, este enfoque se agradece bastante. Hay menos ruido y más intención.

## Lo que debes vigilar

No todo son ventajas. Si abusas de PostgREST, puedes acabar moviendo demasiada responsabilidad a la base de datos y perdiendo claridad. Tampoco conviene esconder lógica de negocio importante dentro de funciones SQL sin criterio.

Yo lo vería así: PostgreSQL debe resolver bien el acceso, las consultas, las validaciones cercanas al dato y las operaciones simples. Spring Boot debe quedarse con la coordinación, la integración, la seguridad de alto nivel y las reglas que de verdad pertenecen a la aplicación.

Cuando separas eso bien, la solución se vuelve más limpia. Cuando lo mezclas todo, aparece el clásico backend que nadie quiere tocar.

## Ejemplo de uso razonable

Un escenario bastante sensato sería este:

- PostgreSQL guarda pedidos, clientes y productos.
- PostgREST expone tablas y vistas.
- Spring Boot usa esa API para construir casos de uso más grandes, mandar correos, aplicar reglas de negocio y conectar con otros sistemas.

Así no obligas a Spring Boot a hacer de simple proxy de base de datos. Y tampoco conviertes PostgreSQL en una especie de aplicación oculta sin control.

## Conclusión

PostgREST no viene a reemplazar Spring Boot. Viene a quitar trabajo mecánico cuando la API está muy ligada a PostgreSQL y no merece la pena escribir toda la capa REST a mano.

Si lo usas con criterio, puede darte una arquitectura bastante elegante: datos bien modelados, permisos cerca del motor y Spring Boot reservado para la lógica que realmente aporta valor. Y eso, al final, es una de las cosas que más agradeces en proyectos que tienen que durar.

**¡Salud y coding!**