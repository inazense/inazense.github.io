---
title: Acceso a datos. Neodatis
description: "Tutorial completo de Neodatis ODB: base de datos orientada a objetos para Java. Aprende instalación, configuración, inserción, consultas, modificación y borrado con ejemplos prácticos de código."
date: 2016-03-06 12:10:00 +0800
categories: [Java]
tags: [acceso-datos, neodatis, odbms, bases-datos, persistencia, poo]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

**Neodatis ODB** es una **base de datos orientada a objetos** con licencia GNU muy simple que actualmente corre en los lenguajes **Java**, **.Net**, **Google Android**, **Groovy** y **Scala**.

Con **Neodatis** podemos evitar la falta de impedancia entre los mundos orientados a objetos y los relacionales, ya que actúa como una capa de persistencia transparente para **Java**, **.Net** y **Mono**.

**Neodatis ODB** soporta consultas nativas, es decir, podemos lanzar una consulta directamente desde **Java**, por ejemplo.
Además es bastante simple e intuitivo. Los objetos pueden ser añadidos fácilmente a la base de datos, lo que requiere clases no repetitivas y que las clases ya existentes no puedan modificarse.


También cuenta con un **explorador ODB**, una herramienta gráfica para navegar, consultar, actualizar y borrar objetos, así como la importación / exportación de bases de datos desde y hacía archivos XML.

## Sintaxis

La sintaxis para trabajar con **Neodatis** vamos a verla en Java. Desconozco como funciona en otros lenguajes como .Net o Groovy, por ejemplo, pero nos servirá para hacernos una aproximación a esta base de datos.

Lo primero, debemos tener en cuenta que es muy importante que después de haber abierto una conexión a la base de datos y realizar las operaciones que deseemos, cerremos dicha conexión, si no nos fallará en futuras ocasiones.

### Conexión / Desconexión

La conexión la realizamos con un objeto de clase **ODB**, en la que indicaremos la ruta donde tenemos nuestra base de datos. Esto servirá tanto para abrirla como para crear una nueva, en caso de que en la ruta indicada aún no exista ninguna. En mi caso, vamos a generar una nueva en la ruta ```D:\``` y se llamará ```neodatis.test```.

```java
ODB odb = ODBFactory.open("d:\\neodatis.test");
```

Y para cerrar la conexión, simplemente indicaremos que queremos cerrar el objeto ODB creado.

```java
odb.close();
```

### Inserción de objetos

No necesitamos definir en la base de datos como queremos guardar los objetos, éstos lo harán automáticamente, creándose las “tablas” respecto a las clases que vayamos almacenando. Lo que sí deberemos tener creada es una clase en Java (en mi caso) que indique las propiedades y métodos a guardar en la base de datos. Es decir, si queremos almacenar un registro de jugadores de varios deportes, deberemos crear una clase Jugadores, con sus propiedades, métodos, getters y setters correspondientes. Tal que así, por ejemplo.

```java
@Getter
@Setter
public class Jugadores {
     
      // Propiedades
      private String nombre;
      private String deporte;
      private String ciudad;
      private int edad;
     
      // Constructores
      public Jugadores(){};
     
      public Jugadores(String nombre, String deporte, String ciudad, int edad) {
            super();
            this.nombre = nombre;
            this.deporte = deporte;
            this.ciudad = ciudad;
            this.edad = edad;
      }
}
```

Creada la clase, la siguiente fase es generar los objetos Jugadores que queramos almacenar en la BD e insertarlos. Tambíen bastante intuitivo.

```java
// Creo los jugadores
Jugadores j1= new Jugadores ("María", "voleibol", "Madrid", 14);
Jugadores j2= new Jugadores ("Miguel", "tenis", "Madrid", 15);
Jugadores j3= new Jugadores ("Mario", "baloncesto", "Guadalajara", 15);
Jugadores j4= new Jugadores ("Alicia", "tenis", "Madrid", 14);
// Inserto los objetos
odb.store(j1);
odb.store(j2);
odb.store(j3);
odb.store(j4);
```

Y listo. Neodatis detectará que tipo de objeto son y los insertará en una u otra “tabla”.

### Mostrar datos

Para mostrar los datos crearemos un conjunto de objetos genéricos parametrizado al tipo de objeto que queremos traernos. En este caso, ```Objects<Jugadores>```. En él cargaremos todos los objetos del tipo Jugadores que nos traeremos desde la base de datos.
Posteriormente recorreremos el conjunto hasta el final y accederemos a las propiedades que queramos imprimir con los getters anteriormente configurados.

```java
// Genero un conjunto de objetos y los traigo del ODB conectado
Objects<Jugadores> objects=odb.getObjects(Jugadores.class);

// Imprimo cuantos objetos me he traido de la BD
System.out.println(objects.size() + " jugadores:");

int i = 1; // Meramente estético. Así muestra listados los objetos

// Mientras haya objetos, los capturo y muestro
while(objects.hasNext()){

      // Creo un objeto Jugadores y almaceno ahí el objeto
      Jugadores jug= objects.next();
     
      // Imprimo las propiedades que me interes de ese objeto
      System.out.println((i++) + "\t: " + jug.getNombre() + "*" + jug.getDeporte() + "*" + jug.getCiudad() + "*" + jug.getEdad());
}
```

### Consultas

Claro, puede darse el caso de que no queramos listar todos los objetos de un tipo determinado, sino que queramos sólos los que tengan X propiedad o cumplan tal condición.

Para ello deberemos crear un objeto ```IQuery```, que a su vez será un objeto CriteriaQuery, donde recibirá dos parámetros. El primero será el tipo de objeto que queramos consutar, y el segundo la condición impuesta. Un Where en toda regla, básicamente.

Hecho esto, nos traeremos todos los objetos igual que en ejemplo anterior, pero pasando como parámetro del ODB nuestra consulta. Y ya imprimiríamos los resultados como vimos en el anterior punto.

Veamos un ejemplo

```java
/* Genero la consulta. Llamo a la clase Jugadores
 * La condición será que la propiedad deporte sea igual a tenis
 */
IQuery query = new CriteriaQuery(Jugadores.class, Where.equal("deporte", "tenis"));

// Y ya, por capricho persona, ordeno el resultado por nombre y edad
query.orderByDesc("nombre,edad");

// Cargo los objetos pasando como parámetro del odb nuestra consulta
Objects<Jugadores> objects = odb.getObjects(query);
```

También podemos separar este proceso un poco más, por si nos resulta más claro verlo de otra forma. El único cambio que haremos será crear un objeto ```ICriterion``` donde realizaremos la consulta, y pasaremos ese objeto como segundo parámetro de nuestro objeto ```CriteriaQuery```. Tal que así.

```java
// Realizo la condición sobre la propiedad edad
ICriterion criterio = Where.equal("edad",14);

/* Creo el objeto para realizar la consulta y mando el ICriterion
 * como segundo parámetro
 */
CriteriaQuery query = new CriteriaQuery(Jugadores.class, criterio);

// Y cargo todo en un objeto, como siempre
Objects<Jugadores> objects = odb.getObjects(query);
```

Y tenemos varias formas de lanzar un where. Por ejemplo

```java
// Jugadores que empiezan por M
ICriterion criterio2 = Where.like("nombre","M%");

// Jugadores mayores de 14
// Where.ge --> mayor o igual, Where.lt --> menor que, Where.le ---> menor o igual
            // Where.Not --> Distinto
            //Where.isNull("atributo") si un atributo es nulo
            //Where.isNotNull("atributo") si un atributo es nulo
ICriterion criterio3 = Where.gt("edad",14);
```

Hago un inciso para aclarar la consulta anterior. Where.gt es para indicar mayor que. También podemos usar :

- ```Where.gt``` -> mayor o igual
- ```Where.lt``` -> menor que
- ```Where.le``` -> menor o igual
- ```Where.not``` -> Distinto a
- ```Where.isNull(“atributo”)``` si un atributo es nulo
- ```Where.isNotNull(“atributo”)``` si un atributo es no nulo

```java
// Jugadores que no empiezan por M
ICriterion criterio4 = Where.not(Where.like("nombre","M%"));

// Jugadores de 15 años de Madrid
ICriterion criterio = new And().add(Where.equal("ciudad", "Madrid")).add(Where.equal("edad",15));

// Jugadores >= de 15 años y de Madrid
ICriterion criterio2 = new And().add(Where.equal("ciudad", "Madrid")).add(Where.ge("edad",15));
```

Y también podemos realizar consultas complejas, todo lo que queramos complicarnos es posible. Las voy a pasar un poco rápido porque esto es una breve aproximación.

Por ejemplo, veamos las siguientes:

```java
// Suma de edades
Values val = odb.getValues(new ValuesCriteriaQuery(Jugadores.class).sum("edad"));
ObjectValues ov= val.nextValues();
BigDecimal value = (BigDecimal)ov.getByAlias("edad");
// también valdría BigDecimal value = (BigDecimal)ov.getByIndex(0);

// Cuenta de jugadores
Values val2 = odb.getValues(new ValuesCriteriaQuery(Jugadores.class).count("nombre"));
ObjectValues ov2= val2.nextValues();
BigInteger value2 = (BigInteger)ov2.getByAlias("nombre");

// Media de edades
Values val3 = odb.getValues(new ValuesCriteriaQuery(Jugadores.class).avg("edad"));
ObjectValues ov3= val3.nextValues();
BigDecimal value3 = (BigDecimal)ov3.getByAlias("edad");

// Edad máxima y mínima
Values val4 = odb.getValues(((ValuesCriteriaQuery) new ValuesCriteriaQuery(Jugadores.class.max("edad", "edad_max")).min("edad", "edad_min"));
ObjectValues ov4= val4.nextValues();
BigDecimal maxima = (BigDecimal)ov4.getByAlias("edad_max");
BigDecimal minima = (BigDecimal)ov4.getByAlias("edad_min");
```

### Borrado de objetos

Para borrar un objeto crearemos un objeto ```IQuery``` para traernos a memoria los objetos a borrar. Nos posicionamos en el primero objeto y lo borramos usando el **ODB**.

```java
// Hacemos la consulta para borrar a María
IQuery query = new CriteriaQuery(Jugadores.class, Where.equal("nombre", "María"));

// Cargamos los objetos que coincidan con esa consulta
Objects<Jugadores> objects = odb.getObjects(query);

// Nos posicionamos en el primer resultado
Jugadores jug=(Jugadores) odb.getObjects(query).getFirst();

// Y lo borramos
odb.delete(jug);
```

### Modificación de objetos

Como viene siendo habitual, creamos con un ```IQuery``` con los objetos que queramos modificar, cargaremos el objeto en la clase Jugadores de Java, le cambiaremos la propiedad que deseemos usando los setters que programamos al principio y volveremos a almacenar el objeto en la base de datos.

```java
IQuery query = new CriteriaQuery(Jugadores.class, Where.equal("nombre", "María"));

// A María le ponemos Tiro de barra aragonesa como deporte
Objects<Jugadores> objects = odb.getObjects(query);
Jugadores jug=(Jugadores) odb.getObjects(query).getFirst();
jug.setDeporte("Tiro de barra Aragonesa");
odb.store(jug);
```

## Instalación y configuración

¿Ya dije que íbamos a trabajarla con Java, cierto? Bien, la buena noticia es que instalarla es lo más fácil que hay. Basicamente que no requiere una instalación. Simplemente nos descargamos el [paquete NeoDatis ODB de sourceforge](https://sourceforge.net/projects/neodatis-odb/), lo descomprimimos y nos quedamos con el .jar para nuestro proyecto Java y con el odb-explorer para usar el explorador de la base de datos (.bat si usamos Windows, .sh si usamos Linux)

**Edición después de varios años:** Aunque ya está bastante desactualizada esta base de datos a mi me encantaba, así que para vuestra información también la podemos descargar desde [Maven Repository -> neodatis-odb](https://mvnrepository.com/artifact/org.neodatis.odb/neodatis-odb).

Y listo, ya podemos trabajar con NeoDatis ODB .

**¡Salud y coding!**