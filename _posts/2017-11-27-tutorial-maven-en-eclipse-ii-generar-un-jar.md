---
title: Tutorial Maven en Eclipse (II). Generar un JAR
description: Aprende a generar archivos JAR con Maven en Eclipse y copiar recursos automáticamente. Tutorial completo sobre maven-resources-plugin, configuración del POM, mvn install y gestión de dependencias paso a paso.
author: Inazio Claver
date: 2017-11-27 13:00:00 +0800
categories: [Java]
tags: [java, maven, eclipse, jar, maven-resources-plugin, build, pom]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

En la anterior entrada del [**Tutorial Maven en Eclipse**](/posts/2017-07-28-tutorial-maven-en-eclipse.md) aprendimos qué es **Maven**, como **crear un proyecto Maven en Eclipse**, a configurarlo y a manejar las **dependencias de librerías**.

¿Cuál sería el siguiente paso lógico? Aprender como **generar los archivos JAR con Maven** y agregarle todas los recursos necesarias, para poder usar nuestro proyecto en cualquier máquina en que queramos ejecutarlo.

## Generar JAR con Maven

Realmente esta fase ya la vimos en el tutorial anterior, pero voy a entrar un poco más en profundidad en ella.
Para generar un JAR desde Eclipse basta con ponernos sobre la carpeta del proyecto y hacer **botón derecho → Run As → Maven install**.
O también puedes hacerlo desde la consola de comandos situándote en la carpeta principal del proyecto y ejecutar

```bash
mvn install
```

Ambas acciones harán el mismo proceso, generar los archivos necesarios para la ejecución del proyecto dentro de la carpeta **target**.

Para comprobar que el proceso de **maven install** ha funcionado correctamente y la ruta donde se ha generado el **jar** bastará con ver los mensajes que nos aparecen después de la ejecución, tal que así

![new maven project](/img/posts/20171127_1.png)

Aquí podemos ver que el **build** se ha realizado correctamente y en el recuadro en rojo vemos la ruta donde se almacenó nuestro **.jar**.

## ¿Cómo copiar recursos a target en Maven?

Ahora bien, tenemos nuestro proyecto ya compilado, lo ejecutamos y... nos damos cuenta de que en la carpeta **target** no se encuentran los **recursos** a los que hemos hecho referencia en nuestro proyecto. Podemos haber enlazado imagenes, iconos, archivos de configuración... con su ruta relativa referente a donde se encuentre el **jar**, pero claro, no están en **target**. ¿Cómo lo hacemos funcionar entonces? ¿Acaso debemos copiar a mano todos los recursos necesarios? ¿Y si éstos cambian y nos olvidamos un día de hacerlo?

Esta es una parte que me costó algo de tiempo descubrir cómo solucionarla, pero al final encontré con la manera propicia de arreglarlo.

Para ello debernos usar un nuevo **plugin** llamado **maven-resources-plugin**. Lo que hará este **plugin** es precisamente eso, ayudarnos a **copiar las dependencias a la ruta que le indiquemos** nosotros, y lo mejor es que lo hace a tiempo real, no espera a compilar el proyecto. Podemos agregar y remover los recursos que le indiquemos y el se encargará de replicarlos al mismo tiempo.

**¿Cómo configurar maven-resources-plugin?**

Para empezar a usarlo debemos abrir el **pom.xml**, y en la sección de **plugins** dentro de **build** (dónde en el anterior **tutorial** agregamos el plugin para compilar el proyecto), crearemos uno nuevo indicando su **artifactid** y su **versión**. Posteriormente crearemos un grupo de ejecuciones que serán las que contendrán todas las rutas a copiar en nuestro proyecto.
Vamos a ver un ejemplo entero para comprenderlo mejor

```xml
<!-- Copia de recursos a target -->
<plugin>
  <artifactId>maven-resources-plugin</artifactId>
  <version>3.0.2</version>
  <executions>
    <!-- Primera ejecución -->
    <execution>
      <id>copy-configuracion</id>
      <phase>validate</phase>
      <goals>
        <goal>copy-resources</goal>
      </goals>
      <configuration>
        <outputDirectory>${basedir}/target/configuracion</outputDirectory>
        <resources>
          <resource>
            <directory>configuracion</directory>
            <filtering>true</filtering>
          </resource>
        </resources>
      </configuration>
    </execution>

    <!-- Segunda ejecución -->
    <execution>
      <id>copy-recursos</id>
      <phase>validate</phase>
      <goals>
        <goal>copy-resources</goal>
      </goals>
      <configuration>
        <outputDirectory>${basedir}/target/recursos</outputDirectory>
        <resources>
          <resource>
            <directory>recursos</directory>
            <filtering>true</filtering>
          </resource>
        </resources>
      </configuration>
    </execution>
  </executions>
</plugin>
```

Empezando por arriba, el **artifactid** y la **versión** serán algo estático para todos nosotros (si modificamos la versión por otra debemos ser conscientes que las etiquetas y contenido usados pueden variar). Posteriormente abrimos un tag llamado **executions** que será el que englobe todas las acciones a realizar, sin límite aparente en cuanto a **execution tags** permitidos dentro de él.
Y dentro de una **execution** es donde comienza la chicha.

Desgranando todo el contenido de una ejecución, esto es lo que usaremos:

- **id** → Identifica de manera única esa ejecución
- **phase** → Indica la fase del proyecto donde se ejecutará esa ejecución. Como lo hacemos en validación, nos aseguramos que practicamente trabajará en tiempo real.
- **goals** → Serán las metas que establezcamos para esa ejecución
  - **goal** → Cada una de las metas. Aquí escribiremos **copy-configuration** para indicar que queremos copiar determinados recursos en otro sitio
- **configuration** → Será la configuración que le daremos a las metas que hayamos indicado
  - **outputDirectory** → La ruta donde **Maven** copiará los recursos que le indiquemos. Como ruta raíz usaremos la abreviación ```${basedir}``` para empezar dentro del proyecto
  - **resources** → Tag que incluye todas las dependencias que queramos copiar
    - **resource** → Cada una de las dependencias que queramos copiar, ya sean ficheros o carpetas.
      - **directory** → La ruta del recurso a copiar. Parte siempre desde el directorio raíz del proyecto
      - **filtering** → Lo agregaremos por defecto a true para que establezca las rutas del proyecto automáticamente

Así, en el anterior código lo que hago es copiar las carpetas de ```configuracion``` y ```recursos``` de mi proyecto al directorio de **target**, para poder usarlas directamente cuando genere el **jar** sin necesidad de agregarlas manualmente.

![maven project tree](/img/posts/20171127_2.png)

De esta manera puedo olvidarme de gestionar mis dependencias manualmente, que es para lo que sirve **Maven** y a lo que le podemos sacar mucho partido. Cuanto más grande el proyecto, más partido le sacaremos.

**¡Salud y coding!**