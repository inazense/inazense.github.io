---
title: Testing en Spring Boot. TDD con JUnit y Testcontainers
description: Aprende a probar aplicaciones Spring Boot 4 con JUnit, Mockito y Testcontainers, usando TDD, @ServiceConnection y una base de datos PostgreSQL real en contenedor.
author: Inazio Claver
date: 2026-05-08 17:43:00 +0200
categories: [Java]
tags: [spring-boot, java, junit, mockito, testcontainers, tdd, testing, integration-testing, postgresql]
featured: true
---

![Spring Boot agobiado por tests que fallan frente a un contenedor Docker liberado y tests en verde: «Tests: porque el caos sin ellos duele más»](/img/posts/20260508_1.png)

Cuando uno empieza a programar con Spring Boot, es bastante fácil centrarse solo en que el código funcione. Haces el controlador, el servicio, el repositorio y tiras millas. El problema viene después, cuando algo cambia, cuando corriges un detalle y se rompe otra cosa, o cuando vuelves al proyecto semanas más tarde y ya no recuerdas qué hacía exactamente cada parte.

Ahí es donde las pruebas empiezan a dejar de ser “algo opcional” y pasan a ser una herramienta básica de trabajo. Y si además las acompañas de **TDD**, JUnit y Testcontainers, puedes montar una base bastante sólida para desarrollar con más tranquilidad.

> El código de esta entrada está completo y probado con **Java 21, Spring Boot 4.1.1, Testcontainers 2.0.5, JUnit Jupiter 6.0.3 y PostgreSQL 18**. Si copias cada fichero en su sitio y tienes Docker arrancado, `./mvnw test` debería salir en verde.

## Por qué merece la pena testear

Las pruebas no están para decorar el proyecto ni para rellenar carpetas. Están para darte confianza. Si tienes tests buenos, puedes tocar código sin estar cruzando los dedos cada vez que ejecutas la aplicación.

En Spring Boot esto es especialmente útil porque suelen mezclarse varias capas: controladores, servicios, acceso a datos, validaciones, seguridad y llamadas externas. Cuanto más crece la aplicación, más fácil es romper algo sin darte cuenta.

Los tests te ayudan a detectar eso antes de llegar a producción. Y si los escribes con cabeza, también te obligan a diseñar mejor.

## Qué aporta TDD

TDD, o *Test Driven Development*, consiste en escribir primero el test, luego el código mínimo para que pase y después refactorizar. No siempre se aplica de forma estricta en el día a día, pero como forma de pensar ayuda bastante.

La ventaja principal es que te obliga a definir el comportamiento antes de implementarlo. Eso evita meter lógica improvisada y hace que el diseño salga un poco más limpio desde el principio.

No hace falta convertir todo en religión. Pero sí conviene quedarse con la idea de fondo: primero entiendes qué debe hacer algo, luego lo pruebas y después lo construyes.

## JUnit en Spring Boot

JUnit es la base más cómoda para escribir tests en proyectos Java modernos. Spring Boot 4 trae JUnit 6, pero no te asustes: la API que usas a diario (`@Test`, `@BeforeEach`, las aserciones…) es la misma de JUnit 5, porque las dos versiones comparten el modelo Jupiter. Si vienes de Spring Boot 3, tus tests siguen compilando igual.

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

Testcontainers resuelve eso levantando servicios reales dentro de contenedores Docker durante la ejecución de los tests. Spring Boot lo integra con su módulo `spring-boot-testcontainers` y la anotación `@ServiceConnection`, que conecta la aplicación al contenedor sin que tengas que copiar a mano URLs, usuarios ni contraseñas.

Eso te permite probar con PostgreSQL real, Redis real o cualquier otro servicio que necesites, sin depender de una instalación manual en tu máquina de desarrollo.

## El proyecto de ejemplo

Vamos a montar una mini aplicación de clientes con un email único, y a probarla en tres niveles: un test unitario del servicio, un test del repositorio contra PostgreSQL y un test de integración de la aplicación completa.

Puedes generar el esqueleto con [Spring Initializr](https://start.spring.io) (así te viene ya el `mvnw`) o crearlo a mano. Al final tendrás esta estructura:

```
src
├── main
│   ├── java/com/inazense/customers
│   │   ├── CustomersApplication.java
│   │   ├── Customer.java
│   │   ├── CustomerRepository.java
│   │   ├── CustomerService.java
│   │   └── EmailAlreadyRegisteredException.java
│   └── resources
│       ├── application.properties
│       └── schema.sql
└── test
    └── java/com/inazense/customers
        ├── CustomerServiceTest.java
        ├── CustomerRepositoryTest.java
        ├── TestcontainersConfiguration.java
        └── CustomerServiceIntegrationTest.java
```

`CustomersApplication` es la clase principal de siempre, sin nada especial:

```java
package com.inazense.customers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CustomersApplication {

    public static void main(String[] args) {
        SpringApplication.run(CustomersApplication.class, args);
    }
}
```

## Dependencias

Con Spring Boot 4 no tienes que indicar versiones: el `spring-boot-starter-parent` ya gestiona las de Hibernate, el driver de PostgreSQL, JUnit, Mockito, AssertJ y Testcontainers.

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
    <relativePath/>
</parent>

<properties>
    <java.version>21</java.version>
</properties>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- JUnit, Mockito, AssertJ y @DataJpaTest -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa-test</artifactId>
        <scope>test</scope>
    </dependency>

    <!-- @ServiceConnection -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-testcontainers</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>testcontainers-junit-jupiter</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.testcontainers</groupId>
        <artifactId>testcontainers-postgresql</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

Si vienes de versiones anteriores, ojo con dos cambios:

- **Spring Boot 4** divide los starters de test por tecnología. `spring-boot-starter-test` sigue existiendo, pero para usar `@DataJpaTest` necesitas `spring-boot-starter-data-jpa-test`, que ya lo incluye.
- **Testcontainers 2** añade el prefijo `testcontainers-` a sus módulos (antes eran `junit-jupiter` y `postgresql`) y mueve `PostgreSQLContainer` al paquete `org.testcontainers.postgresql`. Además, la clase ya no es genérica: se acabó el `PostgreSQLContainer<?>`.

Si sigues en Spring Boot 3.x, usa `spring-boot-starter-test`, los artefactos sin prefijo y `org.testcontainers.containers.PostgreSQLContainer<?>`. `@ServiceConnection` funciona desde Spring Boot 3.1.

Y como varios paquetes han cambiado, fíjate bien en los `import` de los ejemplos. Si el IDE te propone el de la versión antigua, el código no compila.

## Configuración y esquema

Este es el paso que más se olvida. Con una base de datos en memoria, Spring Boot crea las tablas por ti, pero con PostgreSQL no: Hibernate no toca el esquema por defecto y los scripts SQL solo se ejecutan solos contra bases de datos embebidas. Si te lo saltas, los tests contra PostgreSQL fallarán con un `ERROR: relation "customers" does not exist`.

En `src/main/resources/application.properties`:

```properties
spring.application.name=customers

spring.sql.init.mode=always
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.open-in-view=false
```

- `spring.sql.init.mode=always` ejecuta `schema.sql` también contra PostgreSQL.
- `spring.jpa.hibernate.ddl-auto=validate` hace que Hibernate compruebe al arrancar que la entidad encaja con la tabla. Así los tests también detectan un mapeo mal hecho.

Y en `src/main/resources/schema.sql`:

```sql
create table if not exists customers (
    id    bigint generated always as identity primary key,
    name  varchar(100) not null,
    email varchar(255) not null unique
);
```

En un proyecto real seguramente gestionarás el esquema con Flyway o Liquibase. La idea es la misma: los tests arrancan contra un PostgreSQL vacío y el esquema se crea igual que en producción.

## La entidad y el repositorio

La entidad `Customer`:

```java
package com.inazense.customers;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    protected Customer() {
    }

    public Customer(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
```

Y su repositorio:

```java
package com.inazense.customers;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);
}
```

## Probar el repositorio con PostgreSQL real

Lo razonable es escribir un test que compruebe que guardar y leer funciona de verdad con PostgreSQL, y que la restricción de unicidad del esquema está donde debe:

```java
package com.inazense.customers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.dao.DataIntegrityViolationException;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

@DataJpaTest
@Testcontainers
class CustomerRepositoryTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18-alpine");

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void guardaYRecuperaUnClientePorEmail() {
        customerRepository.save(new Customer("Ana", "ana@mail.com"));

        assertThat(customerRepository.findByEmail("ana@mail.com"))
                .get()
                .extracting(Customer::getName)
                .isEqualTo("Ana");
    }

    @Test
    void laBaseDeDatosImpideEmailsDuplicados() {
        customerRepository.saveAndFlush(new Customer("Ana", "ana@mail.com"));

        assertThatThrownBy(() -> customerRepository.saveAndFlush(new Customer("Otra Ana", "ana@mail.com")))
                .isInstanceOf(DataIntegrityViolationException.class);
    }
}
```

Fíjate en lo que **no** hay: ni `@DynamicPropertySource` ni propiedades `spring.datasource.*`. `@ServiceConnection` sabe que es un contenedor de PostgreSQL, saca de él la URL JDBC, el usuario y la contraseña, y Spring Boot crea el `DataSource` con esos datos.

`@Testcontainers` y `@Container` se encargan del ciclo de vida: el contenedor arranca antes del primer test de la clase y se para al terminar el último. Al ser un campo `static`, todos los tests de la clase comparten el mismo PostgreSQL.

`@DataJpaTest` arranca solo la capa JPA, no la aplicación entera, y deshace la transacción al acabar cada test, así que cada prueba empieza con la tabla limpia. Desde Spring Boot 3.4 tampoco intenta sustituir tu `DataSource` por una base de datos en memoria cuando viene de `@ServiceConnection`. En versiones anteriores tenías que añadir `@AutoConfigureTestDatabase(replace = Replace.NONE)`.

`@DynamicPropertySource` sigue siendo útil para servicios que Spring Boot no sabe conectar solo, como un `GenericContainer` con una imagen propia. Para PostgreSQL, MySQL, Redis, Kafka, MongoDB y compañía, `@ServiceConnection` es más corto y más difícil de equivocar.

La parte importante no es solo que el test pase. Lo importante es que estás usando la misma clase de base de datos que usarás en producción o en un entorno muy parecido.

## Tests de servicio con TDD

No todo debe probarse con base de datos. Los servicios suelen ser buenos candidatos para tests unitarios con mocks, sobre todo cuando la lógica está más en el comportamiento que en el almacenamiento. Ahí entra Mockito, que suele encajar muy bien con JUnit y Spring Boot.

Y aquí es donde TDD se ve más claro. Queremos un servicio que registre clientes y rechace emails repetidos, así que empezamos por el test:

```java
package com.inazense.customers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerService customerService;

    @Test
    void rechazaUnEmailYaRegistrado() {
        when(customerRepository.existsByEmail("ana@mail.com")).thenReturn(true);

        assertThatThrownBy(() -> customerService.register("Ana", "ana@mail.com"))
                .isInstanceOf(EmailAlreadyRegisteredException.class);

        verify(customerRepository, never()).save(any());
    }
}
```

Al principio ni compila, porque `CustomerService` y `EmailAlreadyRegisteredException` no existen: ese es el rojo. La excepción es lo más sencillo:

```java
package com.inazense.customers;

public class EmailAlreadyRegisteredException extends RuntimeException {

    public EmailAlreadyRegisteredException(String email) {
        super("Ya existe un cliente con el email " + email);
    }
}
```

Con un `register` que solo comprueba si el email existe, el test ya pasa: el verde. Después añadimos un segundo test a `CustomerServiceTest` que pide guardar el email limpio y en minúsculas, aunque llegue con espacios y mayúsculas:

```java
@Test
void registraElClienteConElEmailNormalizado() {
    when(customerRepository.existsByEmail("ana@mail.com")).thenReturn(false);
    when(customerRepository.save(any(Customer.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Customer customer = customerService.register("Ana", "  Ana@Mail.com ");

    assertThat(customer.getEmail()).isEqualTo("ana@mail.com");
}
```

Vuelve a fallar, lo hacemos pasar y refactorizamos. El servicio acaba así:

```java
package com.inazense.customers;

import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Transactional
    public Customer register(String name, String email) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);

        if (customerRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyRegisteredException(normalizedEmail);
        }

        return customerRepository.save(new Customer(name.trim(), normalizedEmail));
    }
}
```

Estos tests no arrancan Spring ni Docker y tardan milisegundos. La idea es simple: si el test necesita una base de datos, probablemente sea un test de integración. Si solo necesitas comprobar decisiones lógicas, mejor un test unitario.

## Test de integración reutilizando el contenedor

Ahora queremos probar lo mismo con la aplicación completa y PostgreSQL de verdad. Podríamos declarar otro `@Container` en la nueva clase, pero en cuanto tienes varias acabas copiando lo mismo. Lo más limpio es definir el contenedor una vez como bean, en `src/test/java`:

```java
package com.inazense.customers;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.postgresql.PostgreSQLContainer;

@TestConfiguration(proxyBeanMethods = false)
public class TestcontainersConfiguration {

    @Bean
    @ServiceConnection
    PostgreSQLContainer postgresContainer() {
        return new PostgreSQLContainer("postgres:18-alpine");
    }
}
```

Y luego importarlo donde lo necesites:

```java
package com.inazense.customers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(TestcontainersConfiguration.class)
class CustomerServiceIntegrationTest {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @BeforeEach
    void limpiarDatos() {
        customerRepository.deleteAll();
    }

    @Test
    void registraUnClienteEnPostgres() {
        Customer customer = customerService.register("Ana", "Ana@Mail.com");

        assertThat(customer.getId()).isNotNull();
        assertThat(customerRepository.findByEmail("ana@mail.com")).isPresent();
    }

    @Test
    void noPermiteRegistrarDosVecesElMismoEmail() {
        customerService.register("Ana", "ana@mail.com");

        assertThatThrownBy(() -> customerService.register("Ana", "ANA@mail.com"))
                .isInstanceOf(EmailAlreadyRegisteredException.class);
    }
}
```

Aquí no hacen falta `@Testcontainers` ni `@Container`. Al ser un bean, Spring arranca el contenedor con el contexto y lo para cuando lo cierra. Como Spring cachea los contextos entre clases de test con la misma configuración, todas las que importen `TestcontainersConfiguration` comparten el mismo PostgreSQL en lugar de levantar uno por clase.

Fíjate también en el `@BeforeEach`: a diferencia de `@DataJpaTest`, `@SpringBootTest` no envuelve cada test en una transacción, así que la limpieza es cosa tuya.

## Ejecutar los tests

Con Docker arrancado:

```bash
./mvnw test
```

La primera vez tardará un poco más porque Testcontainers descarga la imagen `postgres:18-alpine`. En el log verás líneas como `Container postgres:18-alpine started` y, al final, los seis tests en verde: dos unitarios, dos del repositorio y dos de integración.

También verás un `WARN` de Hibernate con `duplicate key value violates unique constraint "customers_email_key"`. No te alarmes: es el test de emails duplicados haciendo su trabajo.

Si en lugar de eso ves un error de que no encuentra un entorno Docker válido, el problema no está en tu código: Docker no está arrancado o Testcontainers no tiene acceso a él.

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

La cuarta es más tonta, pero pasa: llamar a la clase `CustomerRepositoryIT`. Surefire, el plugin que ejecuta `mvn test`, solo recoge por defecto las clases `*Test`, `*Tests`, `Test*` y `*TestCase`. Los `*IT` los ejecuta Failsafe en `mvn verify`, y solo si lo has declarado en el `pom.xml`. Si no, el test no se ejecuta nunca y no te enteras.

## Una forma sensata de empezar

Si el proyecto ya existe y no tiene tests, no intentaría cubrirlo todo de golpe. Empezaría por las piezas críticas: lógica de negocio, repositorios importantes y flujos que más riesgo tengan.

A partir de ahí, iría subiendo poco a poco. Primero un test unitario bien hecho, luego un test de integración con PostgreSQL real, y después ampliaría según vaya haciendo falta.

Ese enfoque suele ser mucho más sostenible que intentar montar una suite enorme el primer día.

## Cierre

Testear en Spring Boot no va solo de usar JUnit o de levantar contenedores Docker. Va de construir una aplicación en la que puedas confiar cuando haces cambios.

TDD ayuda a pensar mejor el diseño. JUnit te da una base muy sólida para expresar comportamiento. Y Testcontainers, con `@ServiceConnection`, te permite comprobar cosas importantes con servicios reales sin pelearte con la configuración.

Si lo haces con un poco de orden, las pruebas dejan de ser una carga y pasan a ser una de las mejores partes del proyecto.

**¡Salud y coding!**
