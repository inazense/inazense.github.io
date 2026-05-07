---
title: Testing en Spring Boot. TDD con JUnit 5 y Testcontainers
description: Aprende a probar aplicaciones Spring Boot con JUnit 5 y Testcontainers, usando TDD, tests de integración reales y una base de datos PostgreSQL en contenedor.
author: Inazio Claver
date: 2026-05-08 17:43:00 +0200
categories: [Java]
tags: [spring-boot, java, junit5, testcontainers, tdd, testing, integration-testing, postgresql]
pin: false
featured: true
math: false
mermaid: false
---

# Testing en Spring Boot. TDD con JUnit 5 y Testcontainers

![Testing en Spring boot. Tdd con Junit y Testcontainers](/img/posts/20260508_1.png)

Cuando uno empieza a programar con Spring Boot, es bastante fácil centrarse solo en que el código funcione. Haces el controlador, el servicio, el repositorio y tiras millas. El problema viene después, cuando algo cambia, cuando corriges un detalle y se rompe otra cosa, o cuando vuelves al proyecto semanas más tarde y ya no recuerdas qué hacía exactamente cada parte.

Ahí es donde las pruebas empiezan a dejar de ser “algo opcional” y pasan a ser una herramienta básica de trabajo. Y si además las acompañas de **TDD**, JUnit 5 y Testcontainers, puedes montar una base bastante sólida para desarrollar con más tranquilidad.

## Por qué merece la pena testear

Las pruebas no están para decorar el proyecto ni para rellenar carpetas. Están para darte confianza. Si tienes tests buenos, puedes tocar código sin estar cruzando los dedos cada vez que ejecutas la aplicación.

En Spring Boot esto es especialmente útil porque suelen mezclarse varias capas: controladores, servicios, acceso a datos, validaciones, seguridad y llamadas externas. Cuanto más crece la aplicación, más fácil es romper algo sin darte cuenta.

Los tests te ayudan a detectar eso antes de llegar a producción. Y si los escribes con cabeza, también te obligan a diseñar mejor.

## Qué aporta TDD

TDD, o *Test Driven Development*, consiste en escribir primero el test, luego el código mínimo para que pase y después refactorizar. No siempre se aplica de forma estricta en el día a día, pero como forma de pensar ayuda bastante.

La ventaja principal es que te obliga a definir el comportamiento antes de implementarlo. Eso evita meter lógica improvisada y hace que el diseño salga un poco más limpio desde el principio.

No hace falta convertir todo en religión. Pero sí conviene quedarse con la idea de fondo: primero entiendes qué debe hacer algo, luego lo pruebas y después lo construyes.

## JUnit 5 en Spring Boot

JUnit 5 es la base más cómoda para escribir tests en proyectos Java modernos. Spring Boot lo integra muy bien y, con unas cuantas anotaciones, puedes cubrir tanto tests unitarios como de integración.

Los tests unitarios sirven para comprobar piezas pequeñas, normalmente aisladas. Los de integración validan cómo encajan varias capas reales entre sí. Y en un proyecto serio, necesitas las dos cosas.

Un ejemplo sencillo de test unitario podría ser este:

```java
class CalculadoraServiceTest {

    @Test
    void sumaDosNumeros() {
        CalculadoraService service = new CalculadoraService();

        int resultado = service.sumar(2, 3);

        assertEquals(5, resultado);
    }
}
```

No tiene mucha historia, pero sirve para recordar la idea básica: una prueba debe comprobar un comportamiento claro, no una lista de detalles internos.

## Testcontainers para pruebas reales

Aquí es donde la cosa se pone interesante. Muchas veces se usan bases de datos en memoria para hacer pruebas rápidas, pero eso no siempre refleja el comportamiento real del sistema. Y con SQL un poco serio, la diferencia entre “parecido” y “igual” importa bastante.

Testcontainers resuelve eso levantando servicios reales dentro de contenedores Docker durante la ejecución de los tests. Spring Boot lo soporta de forma bastante natural, y la propia documentación oficial muestra integración directa con contenedores y pruebas de arranque completo.

Eso te permite probar con PostgreSQL real, Redis real o cualquier otro servicio que necesites, sin depender de una instalación manual en tu máquina de desarrollo.

## Dependencias básicas

Para trabajar con JUnit 5 y Testcontainers en Spring Boot, normalmente necesitas dependencias como estas:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>junit-jupiter</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>postgresql</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

Con eso ya puedes empezar a levantar una base de datos de verdad en tus tests de integración.

## Un ejemplo práctico

Supongamos que tienes una entidad `Customer` y un repositorio JPA. Lo razonable es escribir un test de integración que compruebe que guardar y leer funciona de verdad con PostgreSQL.

Con Testcontainers, el enfoque sería algo parecido a esto:

```java
@SpringBootTest
@Testcontainers
class CustomerRepositoryIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void shouldSaveCustomer() {
        Customer customer = new Customer(null, "John", "john@mail.com");

        Customer saved = customerRepository.save(customer);

        assertNotNull(saved.getId());
    }
}
```

La parte importante no es solo que el test pase. Lo importante es que estás usando la misma clase de base de datos que usarás en producción o en un entorno muy parecido.

## Tests de servicio

No todo debe probarse con base de datos. Los servicios suelen ser buenos candidatos para tests unitarios con mocks, sobre todo cuando la lógica está más en el comportamiento que en el almacenamiento.

Por ejemplo, si tienes un servicio que valida y luego guarda un cliente, puedes aislar el repositorio y comprobar que la lógica de negocio hace lo que debe. Ahí entra Mockito, que suele encajar muy bien con JUnit 5 y Spring Boot.

La idea es simple: si el test necesita una base de datos, probablemente sea un test de integración. Si solo necesitas comprobar decisiones lógicas, mejor un test unitario.

## Cómo organizar la pirámide

Aquí conviene no pasarse de listo. A veces se intenta probar absolutamente todo con integración, y al final la suite tarda demasiado y se vuelve incómoda. O al revés, se abusa de mocks y terminas con tests que validan casi nada.

Yo lo dejaría así:

- **Muchos tests unitarios** para lógica pequeña y reglas concretas.
- **Algunos tests de integración** para comprobar que JPA, SQL y configuración real funcionan bien.
- **Muy pocos tests end-to-end** para validar flujos completos.

Ese equilibrio suele funcionar bastante mejor que intentar cubrirlo todo con un único tipo de prueba.

## Cosas que suelen dar problemas

La primera es usar contenedores sin aislar bien el estado. Si no limpias datos entre tests, acabas con errores raros y pruebas que solo pasan en cierto orden.

La segunda es mezclar demasiado el contexto de Spring en tests que no lo necesitan. Si puedes probar una clase sin arrancar toda la aplicación, mejor. Más rápido, más limpio y menos frágil.

La tercera es confiar demasiado en una base de datos en memoria cuando el comportamiento SQL real importa. Para proyectos con PostgreSQL, Testcontainers suele dar una imagen mucho más realista del sistema.

## Una forma sensata de empezar

Si el proyecto ya existe y no tiene tests, no intentaría cubrirlo todo de golpe. Empezaría por las piezas críticas: lógica de negocio, repositorios importantes y flujos que más riesgo tengan.

A partir de ahí, iría subiendo poco a poco. Primero un test unitario bien hecho, luego un test de integración con PostgreSQL real, y después ampliaría según vaya haciendo falta.

Ese enfoque suele ser mucho más sostenible que intentar montar una suite enorme el primer día.

## Cierre

Testear en Spring Boot no va solo de usar JUnit 5 o de levantar contenedores Docker. Va de construir una aplicación en la que puedas confiar cuando haces cambios.

TDD ayuda a pensar mejor el diseño. JUnit 5 te da una base muy sólida para expresar comportamiento. Y Testcontainers te permite comprobar cosas importantes con servicios reales, que al final es donde más se nota la diferencia.

Si lo haces con un poco de orden, las pruebas dejan de ser una carga y pasan a ser una de las mejores partes del proyecto.

**¡Salud y coding!**