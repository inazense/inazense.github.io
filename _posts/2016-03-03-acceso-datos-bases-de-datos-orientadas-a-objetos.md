---
title: Acceso a datos. Bases de datos orientadas a objetos
description: Orígenes de los SGBDOO, estándar ODMG-93, lenguajes ODL y OQL, consultas con Criteria y Nativas, ORM con Hibernate y el patrón DAO.
author: Inazio Claver
date: 2016-03-03 12:00:00 +0800
categories: [Acceso a datos, Java]
tags: [java, bases-de-datos, oo, hibernate, orm, dao, odmg, oql]
pin: false
math: false
mermaid: false
---

## Condiciones en las que nacen los SGBDR (años 60-70)

Los sistemas gestores de bases de datos relacionales nacieron para un contexto muy concreto:

![Características de los SGBDR originales](/img/posts/20160303_1.png)

- Uniformidad: los datos estaban estructurados de forma similar.
- Orientación a registros de longitud fija.
- Datos pequeños, de máximo 80 bytes.
- Campos atómicos, cortos e indivisibles.
- Transacciones cortas medidas en fracciones de segundo.
- Esquemas conceptuales estáticos con pocas modificaciones.

![Modelo relacional clásico](/img/posts/20160303_2.png)

## Nuevas necesidades y aplicaciones

Con la mayor capacidad de cómputo surgieron nuevas aplicaciones: CAD, CASE, bases de datos multimedia, sistemas de información empresarial y sistemas expertos.

![Nuevas aplicaciones y sus requerimientos](/img/posts/20160303_3.png)

Esto generó la necesidad de capas de aplicación más complejas y mayor interacción entre usuario y aplicación, requiriendo reducir la **impedancia** entre las nuevas capas de aplicación (Objetos) y el almacenamiento persistente.

![Impedancia objeto-relacional](/img/posts/20160303_4.png)

## Sistemas de Gestión de BD Orientados a Objetos

Un SGBDOO "integra de forma transparente características de las bases de datos con características de los lenguajes de programación orientados a objetos". Se presenta como una extensión que añade persistencia a objetos, o bien añade características OO a un SGBD tradicional.

![Arquitectura SGBDOO](/img/posts/20160303_5.png)

### El problema del acoplamiento: JDBC vs Hibernate

Con JDBC tradicional, insertar un objeto requiere construir la SQL manualmente:

```java
Class.formName("com.mysql.jdbc.Driver");
Connection connection = DriverManager.getConnection(
  "jdbc:mysql://localhost:3306/persona", "root", "");
Statement statement = connection.createStatement();

Persona p = new Persona();
p.setCedula("13556901");
p.setNombre("Pedro Perez");

String sql = "INSERT INTO t_persona VALUES(" + getNextId(connection)
  + ", '" + p.getCedula() + "', '" + p.getNombre() + "')";
statement.execute(sql);
connection.close();
```

![Código JDBC con acoplamiento manual](/img/posts/20160303_6.png)

Y para consultar hay que transformar manualmente el `ResultSet` en objetos:

```java
Class.formName("com.mysql.jdbc.Driver");
Connection connection = DriverManager.getConnection(
  "jdbc:mysql://localhost:3306/persona", "root", "");
Statement statement = connection.createStatement();

ResultSet rs = statement.executeQuery(
  "SELECT * FROM t_persona WHERE cedula='13556901'");

Persona p = null;
if (rs.next()) {
  p = new Persona(rs.getString("cedula"),
    rs.getString("nombre"));
  p.setId(rs.getInt("id"));
}
```

![Consulta JDBC con transformación manual](/img/posts/20160303_7.png)

Con **Hibernate** el mismo proceso queda mucho más limpio:

```java
Session session = CledaConnector.getInstance().getSession();
session.beginTransaction();

Persona p = new Persona();
p.setCedula("13556901");
p.setNombre("Pedro Peréz");

session.saveOrUpdate(p);
session.getTransaction().commit();
session.close();
```

Y para consultar con HQL:

```java
Session session = CledaConnector.getInstance().getSession();
session.beginTransaction();

Query q = session.createQuery(
  "FROM Persona WHERE cedula=:cedula");
q.setString("cedula", "13556901");

Persona p = (Persona) q.uniqueResult();
System.err.println(p.getId() + ";" + p.getCedula() + ";" + p.getNombre());

session.getTransaction().commit();
session.close();
```

![Comparativa JDBC vs Hibernate](/img/posts/20160303_8.png)

## Estándar ODMG-93

Desarrollado entre 1993-1994 por el Object Database Management Group. Define:

![Componentes del estándar ODMG-93](/img/posts/20160303_9.png)

- Modelo de objetos (interfaces, tipos, instancias).
- Atributos y métodos.
- Vínculos entre tipos (colecciones, referencias).
- Herencia y especialización.
- Polimorfismo y encapsulamiento.
- Identidad de objetos (OID).
- Persistencia y transacciones.

## Lenguaje de Definición de Objetos (ODL)

Utilizado para especificar interfaces de tipos de objetos. Es independiente de lenguajes de programación específicos:

![Diagrama ODL](/img/posts/20160303_10.png)

```
interface Course (extent courses keys name, number) {
  attribute String name;
  attribute String number;
  relationship List<Section> has_sections
    inverse Section::is_section_of;
  relationship Set<Course> has_prerequisites
    inverse Course::is_prerequisite_for;
  Boolean offer (in Unsigned Short semester)
    raises (alredy_offered);
  Boolean drop (in Unsigned Short semester)
    raises (not_offered);
};

interface Student (extent students keys name, student_id) {
  attribute String name;
  attribute String student_id;
  attribute Struct Address {String college, String room_number}
    dorm_address;
  relationship Set<Section> takes inverse Section::is_taken_by;
};

interface Section (extent sections
  key(is_section_of, number)) {
  attribute String number;
  relationship Professor is_taught_by
    inverse Professor::teaches;
  relationship TA has_TA inverse TA::assists;
  relationship Course is_section_of
    inverse Course::has_sections;
  relationship Set<Student> is_taken_by
    inverse Student::takes;
};

interface Professor: Employee (extent professors) {
  attribute Enum Rank {full, associate, assistant} rank;
  relationship Set<Section> teaches
    inverse Section::is_taught_by;
  Short grant_tenure () raises (ineligible_for_tenure);
};
```

## Lenguaje de Consultas de Objetos (OQL)

Declarativo y abstracto, con sintaxis similar a SQL pero orientada a objetos:

![OQL básico](/img/posts/20160303_11.png)

```
select distinct x.edad from x in Personas
  where x.nombre="Pedro"

select distinct struct(e : x.edad, s : x.sexo)
  from x in Personas where x.nombre="Pedro"

select distinct struct(nombre : x.nombre,
  conjunto_subordinados :
    (select y from y in x.subordinados
      where y.salario > 100000))
  from x in Empleados

select struct(e : x.edad, s : x.sexo)
  from x in (select y from y in Empleados
    where y.antiguedad = 10)
  where x.nombre="Pedro"
```

![OQL con subconsultas](/img/posts/20160303_12.png)

## Otros lenguajes de consulta

### Criteria Query

```java
ODB odb = ODBFactory.open(ODB_NAME);

IQuery query = new CriteriaQuery(Sport.class,
  Where.equal("name", "volley-ball"));

Sport volleyball = (Sport) odb.getObjects(query).getFirst();

query = new CriteriaQuery(Player.class,
  Where.equal("favoriteSport", volleyBall));
Objects<Player> players = odb.getObjects(query);

int i = 1;
while (players.hasNext()) {
  System.out.println((i++) + "\t " + players.next());
}
```

![Criteria Query con condiciones múltiples](/img/posts/20160303_13.png)

```java
odb.close();

ODB odb = ODBFactory.open(ODB_NAME);

IQuery query = new CriteriaQuery(Player.class,
  Where.or()
    .add(Where.equal("favoriteSport.name", "volley-ball"))
    .add(Where.like("favoriteSport.name", "%nnis")));

Objects<Player> players = odb.getObjects(query);

int i = 1;
while (players.hasNext()) {
  System.out.println((i++) + "\t:" + players.next());
}

odb.close();
```

### Consultas Nativas

```java
ODB odb = ODBFactory.open(ODB_NAME);

IQuery query = new SimpleNativeQuery() {
  public boolean match(Player player) {
    return player.getFavoriteSport().getName()
      .toLowerCase().startWith("volley");
  }
};

Objects<Player> players = odb.getObjects(query);

int i = 1;
while (players.hasNext()) {
  System.out.println((i++) + "\t: " + players.next());
}

odb.close();
```

![Consultas Nativas](/img/posts/20160303_14.png)

## Alternativas a SGBDOO

### Mapeo Objeto-Relacional (ORM)

Proporciona transformación automática mediante componentes de persistencia. La correspondencia se describe usando XML, XDoclet, anotaciones del lenguaje u otros métodos. Un componente genera automáticamente el SQL necesario para consultas y actualizaciones.

![Arquitectura ORM](/img/posts/20160303_15.png)

### ORM con Hibernate

Permite configuración mediante archivos `.properties`, XML y anotaciones Java. Sincroniza automáticamente el estado de los objetos con la base de datos.

![Configuración Hibernate](/img/posts/20160303_16.png)

![Mapeo con anotaciones Hibernate](/img/posts/20160303_17.png)

## Objetos de Acceso a Datos (DAO)

Patrón que encapsula las operaciones de base de datos:

![Patrón DAO](/img/posts/20160303_18.png)

- **Clase DAO** implementando métodos CRUD.
- **Métodos de consulta** como `findByXXX()` o `listByXXX()`.
- **Transfer Object (TO)** para almacenar información.
- **Clase Factory** para retornar el DAO adecuado según la base de datos.
