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

> Todo el código de esta entrada está en GitHub: [inazense/spring-boot-testcontainers-tdd](https://github.com/inazense/spring-boot-testcontainers-tdd). Está probado con **Java 21, Spring Boot 4.1.1, Testcontainers 2.0.5, JUnit Jupiter 6.0.3 y PostgreSQL 18**. Para ejecutarlo solo necesitas Docker y lanzar `./mvnw test`.

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

## Dependencias básicas

Con Spring Boot 4 no tienes que indicar versiones: el `spring-boot-starter-parent` ya gestiona las de JUnit, Mockito, AssertJ y Testcontainers.

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
</parent>

<dependencies>
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

## Un ejemplo práctico

Supongamos que tienes una entidad `Customer` con un email único y un repositorio JPA:

```java
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);
}
```

Lo razonable es escribir un test que compruebe que guardar y leer funciona de verdad con PostgreSQL, y que la restricción de unicidad del esquema está donde debe:

```java
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

`@DataJpaTest` arranca solo la capa JPA, no la aplicación entera, y deshace la transacción al acabar cada test, así que cada prueba empieza con la tabla limpia. Desde Spring Boot 3.4 tampoco intenta sustituir tu `DataSource` por una base de datos en memoria cuando viene de `@ServiceConnection`. En versiones anteriores tenías que añadir `@AutoConfigureTestDatabase(replace = Replace.NONE)`.

`@DynamicPropertySource` sigue siendo útil para servicios que Spring Boot no sabe conectar solo, como un `GenericContainer` con una imagen propia. Para PostgreSQL, MySQL, Redis, Kafka, MongoDB y compañía, `@ServiceConnection` es más corto y más difícil de equivocar.

La parte importante no es solo que el test pase. Lo importante es que estás usando la misma clase de base de datos que usarás en producción o en un entorno muy parecido.

## Reutilizar el contenedor en varios tests

Declarar el contenedor en cada clase de test funciona, pero en cuanto tienes varias acabas copiando lo mismo. Lo más limpio es definirlo una vez como bean:

```java
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
    void noPermiteRegistrarDosVecesElMismoEmail() {
        customerService.register("Ana", "ana@mail.com");

        assertThatThrownBy(() -> customerService.register("Ana", "ANA@mail.com"))
                .isInstanceOf(EmailAlreadyRegisteredException.class);
    }
}
```

Al ser un bean, Spring arranca el contenedor con el contexto y lo para cuando lo cierra. Como Spring cachea los contextos entre clases de test con la misma configuración, todas las que importen `TestcontainersConfiguration` comparten el mismo PostgreSQL en lugar de levantar uno por clase.

Fíjate también en el `@BeforeEach`: a diferencia de `@DataJpaTest`, `@SpringBootTest` no envuelve cada test en una transacción, así que la limpieza es cosa tuya.

## Tests de servicio

No todo debe probarse con base de datos. Los servicios suelen ser buenos candidatos para tests unitarios con mocks, sobre todo cuando la lógica está más en el comportamiento que en el almacenamiento. Ahí entra Mockito, que suele encajar muy bien con JUnit y Spring Boot.

Y aquí es donde TDD se ve más claro. Queremos un servicio que registre clientes y rechace emails repetidos, así que empezamos por el test:

```java
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

Al principio ni compila, porque `CustomerService` no existe: ese es el rojo. Escribimos lo mínimo para que pase (el verde) y, con un segundo test que pide guardar el email en minúsculas, acabamos en esto:

```java
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

Este test no arranca Spring ni Docker y tarda milisegundos. El de integración de antes comprueba lo mismo, pero contra PostgreSQL de verdad.

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

La cuarta es más tonta, pero pasa: llamar a la clase `CustomerRepositoryIT`. Surefire, el plugin que ejecuta `mvn test`, solo recoge por defecto las clases `*Test`, `*Tests`, `Test*` y `*TestCase`. Los `*IT` los ejecuta Failsafe en `mvn verify`, y solo si lo has declarado en el `pom.xml`. Si no, el test no se ejecuta nunca y no te enteras.

## Una forma sensata de empezar

Si el proyecto ya existe y no tiene tests, no intentaría cubrirlo todo de golpe. Empezaría por las piezas críticas: lógica de negocio, repositorios importantes y flujos que más riesgo tengan.

A partir de ahí, iría subiendo poco a poco. Primero un test unitario bien hecho, luego un test de integración con PostgreSQL real, y después ampliaría según vaya haciendo falta.

Ese enfoque suele ser mucho más sostenible que intentar montar una suite enorme el primer día.

## Cierre

Testear en Spring Boot no va solo de usar JUnit o de levantar contenedores Docker. Va de construir una aplicación en la que puedas confiar cuando haces cambios.

TDD ayuda a pensar mejor el diseño. JUnit te da una base muy sólida para expresar comportamiento. Y Testcontainers, con `@ServiceConnection`, te permite comprobar cosas importantes con servicios reales sin pelearte con la configuración.

Si quieres trastear con todo esto, clona [el repositorio del ejemplo](https://github.com/inazense/spring-boot-testcontainers-tdd), arranca Docker y lanza `./mvnw test`.

Si lo haces con un poco de orden, las pruebas dejan de ser una carga y pasan a ser una de las mejores partes del proyecto.

**¡Salud y coding!**
