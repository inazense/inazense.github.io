---
layout: post
title: Tutorial Maven en Eclipse
---

De normal, cuando realizamos un proyecto Java si es pequeño nosotros mismos podemos hacer las actividades típicas de la construcción de software.

- Instalar las librerías necesarias para nuestro proyecto en el classpath
- Correr los casos de test
- Crear la documentación del código fuente
- Compilar código fuente
- Empacar el código compilado en JAR

Pero, ¿qué sucede conforme nuestro proyecto va creciendo y se va agregando más gente a él? Pues que podemos perder el control del mismo y es más plausible cometer errores humanos en la construcción del programa. Para eso está **Maven**.

## ¿Qué es Maven?

**Maven** es una herramienta para la gestión de proyectos, que nos permitirá administrar completamente el ciclo de vida de la misma. Comúnmente se conoce a **Maven** como un gestor de dependencias Y YA. Y eso no es del todo cierto. Podemos considerarlo como una herramienta de construcción con muchas características, que nos ayuda a gestionar las dependencias, test, documentación, compilaciones, distribuciones e incluso los mailing list.
<br><br>

Si quieres una explicación más profesional de lo que es Maven puedes seguir el enlace hacía **Maven** en **Wikipedia**.
<br><br>

Bien, centrémonos. ¿Qué es, entonces, lo que **Maven** puede hacer por nosotros? Así, en muy resumidas cuentas, lo siguiente:

- Build. Construye nuestro código fuente del proyecto
- Test. Ejecuta los casos de prueba
- Gestiona las dependencias de nuestro proyecto. Es cierto que no es sólo un gestor, pero para mi es de lo mejor que tiene **Maven**. Importa las librerías automáticamente desde un repositorio remoto. Nos podemos olvidar de hacer esa tarea manualmente.
- Permite la creación y descarga de plantillas de proyectos para tener la estructura ya creada. Por ejemplo si nos vamos a dedicar a hacer páginas web, o conectores, nos interesará para ahorrarnos el trabajo de tener que empezar desde cero una y otra vez
- Crea una web con la documentación del proyecto
- Desplega el proyecto (AKA **artefacto**) en servidor
- Y por supuesto, perfecta integración con **Git**, **SVN**, **Jira**...

Imagina hacer todo esto manualmente, y más de una persona que trabaje en nuestro proyecto. ¡Es para volverse loco!
<br><br>

Un par de cosas que conviene conocer antes de empezar:

- **artefacto**. Es un proyecto que lo gestiona **Maven** y que incluye un fichero llamado **pom.xml**.
- **POM**. Son las siglas de **Project Object Model**. Es un **fichero XML** que contiene la configuración del artefacto. Más adelante trabajaremos con él. Si has programado en **Android** anteriormente, un símil adecuado sería el **AndroidManifest**.
- **groupId**. El identificador único para crear nuestro artefacto. Se suele poner el mismo que en un paquete java. com.programandoapasitos

## Maven en Eclipse

Tenéis que saber que Maven es perfectamente posible usarlo desde la consola de comandos. Si es el caso que estáis interesados en esa forma os recomiendo [éste artículo de Jarroba.com](https://jarroba.com/maven/){:target="blank"} que lo explica perfectamente.
<br><br>

Pero en nuestro caso vamos a usar la comodidad que nos da Eclipse con las herramientas que ya vienen integradas por defecto en su versión **Java EE Developers** que es la que incluye el plugin de **Maven**, aunque ojo que puede no ser la última versión de **Maven** disponible.
<br><br>

Lo primero será crear un nuevo proyecto **Maven** yendo a __File → New → Other__.

![eclipse new maven project]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-1.png)

Elegimos __**Maven** → **Maven Project**__ y pulsamos Next.

![eclipse new maven project 2]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-2.png)

Ahora deberemos elegir la configuración de nuestro proyecto Maven. En la siguiente ventana podemos marcar el check de __Create a simple Project (skip archetype selection)__, lo que nos creará un proyecto completamente simple sin más configuración, o bien podemos desmarcarla, que será nuestro caso, y elegiremos un arquetipo de las opciones que nos muestre el asistente.

![eclipse new maven project 3]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-3.png)

En la nueva ventana puedes seleccionar un arquetipo del listado o cargar uno desde una ubicación. En nuestro caso seleccionaremos el de **groupId** __org.apache.maven.archetypes__ y **Artifact id** __maven-archetype-quickstart__ y pulsamos Next.

![eclipse new maven project 4]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-4.png)

Y ahora, por último paso del asistente, tendremos que indicar nuestro propio **groupId** y el **artifactId**. Esto se hace porque los que vimos en la anterior pantalla eran los que usaron los creadores del artefacto. Sobrescribiéndolos lo establecemos como queremos y aparte de la personalización, si algún día se convierte en arquetipo lo podrán buscar con nuestros datos, y reemplazarlos con los suyos.

![eclipse new maven project 5]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-5.png)

Pulsamos __Finish__ y ya tendremos nuestro proyecto. La estructura quedará tal que así

![eclipse new maven project 6]({{ site.baseurl }}/images/posts/eclipse-new-maven-project-6.png)

## Usando Maven

Ahora que ya tenemos nuestro **proyecto Maven** creado es hora de configurar el **POM** para hacerlo funcionar. Para ello hacemos doble click en el archivo pom.xml y en la pestaña inferior elegimos la sección **pom.xml** para poder ver el **código XML** "a pelo".
<br><br>

![pom.xml overview]({{ site.baseurl }}/images/posts/pom-xml-overview.png)

Cuando entremos veremos un **archivo XML** similar a este

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>com.programandoapasitos</groupId>
	<artifactId>nombrePrueba</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>
	
	<name>nombrePrueba</name>
	<url>http://maven.apache.org</url>
	
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>
	
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>3.8.1</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
</project>
{% endhighlight %}

De este código hay trozos que podemos intuir bastante bien con lo mencionado anteriormente. Del resto, el tag de **properties** indicará las propiedades de nuestro proyecto. Por ejemplo la codificación de los ficheros en **UTF-8** como vemos en esa línea.<br>

Y luego tenemos **dependencies**, que es la sección donde gestionaremos... ¿adivinas qué? Exacto, nuestras dependencias. Pero eso lo retomaremos más adelante.<br><br>

De momento lo que tenemos que conseguir es que **Maven** se encargue por nosotros de gestionar el JRE. Esto se hace incluyendo un nuevo plugin en este archivo. Así que nos ponemos debajo de **\<dependencies\>** y escribimos lo siguiente:

{% highlight xml %}
<build>
	<pluginManagement>
		<plugins>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-compiler-plugin</artifactId>
				<configuration>
					<source>1.8</source>
					<target>1.8</target>
				</configuration>
			</plugin>
		</plugins>
	</pluginManagement>
</build>
{% endhighlight %}

¿Qué hemos hecho?<br>

Dentro de **build** hemos creado la etiqueta **pluginManagement** para gestionar los **plugins** de **Maven**. Y dentro de eso hemos creado una llamada **plugins** que será la que los contendrá.<br>

Después hemos procedido a añadir un nuevo **plugin**, en este caso **maven-compiler-plugin**. Y luego le hemos indicado, en su configuración, que el **source** y el **target** apunten a la versión que tengamos del **JRE** en nuestro dispositivo. En mi caso, el 1.8.<br><br>

Ahora guardamos el fichero y no te preocupes si ves un error en el explorador de proyectos, en el siguiente paso se solucionará.<br>

Vamos al proyecto **Maven** y pulsamos **botón derecho → Maven → Update Project**...

![maven update project]({{ site.baseurl }}/images/posts/maven-update-project.png)

En la ventana que se abrirá marcamos con un check nuestro proyecto dejando la siguiente configuración

![maven update project 2]({{ site.baseurl }}/images/posts/maven-update-project-2.png)




**¡Salud y coding!**