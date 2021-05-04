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

**¡Salud y coding!**