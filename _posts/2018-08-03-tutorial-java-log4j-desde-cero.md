---
title: Tutorial Java - Log4j desde cero
description: Aprende a ordenar HashMap en Java por clave o valor con streams y lambdas. Tutorial completo con código paso a paso sobre sorting de Map, entrySet, comparingInt y LinkedHashMap con ejemplos prácticos.
author: Inazio Claver
date: 2018-08-03 12:10:00 +0800
categories: [Java]
tags: [java, log4j, logging, appenders, configuracion, maven, properties]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

En el trabajo me ha surgido la necesidad de trabajar con la librería [Log4j](https://logging.apache.org/log4j) en un proyecto y como me he vuelto un poco loco para configurarla que menos que aprovechar para retomar este blog (again).

## ¿Qué es Log4j?

**Log4j** es una librería perteneciente a los **Java Logging Frameworks** desarrollada por **Apache Software Foundation** usada para generar mensajes de **logging** de una forma limpia, sencilla, permitiendo filtrarlos por importancia y pudiendo configurar su **salida** tanto por **consola, fichero** u otras diferentes.

## Niveles de prioridad

Existen diversos niveles de prioridad. Los cinco que más empleo, ordenados por nivel más bajo son:

- **DEBUG**: Usado para escribir mensajes de depuración
- **INFO**: Mensajes de estilo verbose. Puramente informativos de determinada acción
- **WARN**: Para alertar de eventos de los que se quiere dejar constancia pero que no afectan al funcionamiento de la aplicación
- **ERROR**: Usado para los mensajes de eventos que afectan al programa pero lo dejan seguir funcionando. Algún parámetro no es correcto pero se carga el parámetro por defecto, por ejemplo
- **FATAL**: Usado para errores críticos. Normalmente después de guardar el mensaje el programa terminará

## Appenders

Otra parte fundamental de Log4j son los **appenders**. Y tu te preguntarás, **¿qué son los appenders?** Pues básicamente es cada una de las salidas por las que puede ser enviado un mensaje de **log**.

Existen varios **appenders** y todos ellos son configurables, aunque también podemos crear los nuestros propios.

Los appenders más usuales son:

- **FileAppender / RollingFileAppender**: Salida redirigida a un fichero de texto .log
- **SocketAppender**: Hacia un servidor remoto para almacenar los registros
- **SMTPAppender**: A un correo electrónico
- **JDBCAppender**: Hacia una base de datos
- **ConsoleAppender**: Salida por consola. En un entorno de producción no se suele usar esta forma por perder gran parte de su utilidad pero mientras se desarrolla es una forma útil de ver logs in situ.

## ¿Y la parte práctica, qué?

Sí, sé que lo estás pensando. **¿Cuándo va a empezar a explicar cómo hacerlo, que es lo que me interesa a mi?** Pues venga, estás de suerte. Tu hora ha llegado.

Voy a explicar como montar un **sistema logging básico con Log4j** que nos muestre la salida tanto **por consola como en un fichero**.

## Preparándonos

La explicación la voy a realizar con un proyecto **Maven**, así que lo primero que haremos será agregar la dependencia de **Log4j** a nuestro **pom**. La podemos encontrar [aquí](https://mvnrepository.com/artifact/log4j/log4j).

Si no sabes de que te estoy hablando puedes ver [mi anterior entrada sobre **Maven**](http://www.programandoapasitos.com/2017/07/tutorial-maven-en-eclipse.html) o bajarte el **.jar** y configurarla manualmente desde el mismo enlace.

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

## Creando y configurando el archivo log4j.properties

Podríamos configurarlo a través de código o con la configuración básica por defecto, pero lo que vamos a hacer es configurar las opciones de **Log4j** a través de un archivo **properties**.

Para ello nos iremos, dentro de nuestro proyecto, a la carpeta `src/main/resources` y creamos un fichero nuevo que se llame `log4j.properties`.

![default log4j.properties](/img/posts/20180803_1.png)

Lo abrimos y escribimos el siguiente contenido:

```properties
log4j.rootLogger=DEBUG, stdout, file
log4j.logger.infoLogger=DEBUG
log4j.additivity.infoLogger = false

# Redirigir mensajes por consola
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%d{yyyy-MM-dd HH:mm:ss}] [ %-5p] [%c{1}:%L] %m%n

# Redirigir los mensajes a un fichero de texto soportando file rolling
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.File=avisos.log
log4j.appender.file.MaxFileSize=5MB
log4j.appender.file.MaxBackupIndex=10
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%d{yyyy-MM-dd HH:mm:ss}] [ %-5p] [%c{1}:%L] %m%n
```

Vamos a ver más detalladamente que hace cada parte de este fichero:

### Configuración básica

```properties
log4j.rootLogger=DEBUG, stdout, file
log4j.logger.infoLogger=DEBUG
log4j.additivity.infoLogger = false
```

- En la **primera línea** estamos indicando el **nivel mínimo de logging** y los **appenders que vamos a emplear**. En este caso usaremos un nivel de logging establecido en DEBUG y creamos dos appenders, stdout y file.
- La **segunda línea** sirve para configurar en que nivel se empezarán a mostrar las advertencias tanto por consola como a almacenarse en el fichero.
- Y con la **tercera línea** evitamos que los appenders hereden la configuración de sus appenders padres, en caso de que los hubiera (en el nuestro, sería el appender principal así que no tenemos ese problema).

### Configuración por consola

```properties
# Redirigir mensajes por consola
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%d{yyyy-MM-dd HH:mm:ss}] [ %-5p] [%c{1}:%L] %m%n
```

En estas líneas vamos a crear la configuración para imprimir los mensajes por consola:

- En la **primera línea** indicamos que tipo de logger será haciendo referencia a la clase que imprimirá los mensajes (¡recuerda la sección Appenders!).
- En la **segunda** le decimos que queremos imprimirlo directamente por la consola.
- Y las **dos últimas** son para configurar la plantilla que tendrá cada mensaje.

Puedes ver todas las posibles opciones de configuración en la [página de ayuda de Oracle](https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/PatternLayout.html).

El mensaje de salida sería algo tal que así:

```
[2018-08-03 11:48:39] [ INFO ] [App:29] Esto es una prueba desde App class.
```

### Configuración para fichero

```properties
# Redirigir los mensajes a un fichero de texto soportando file rolling
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.File=avisos.log
log4j.appender.file.MaxFileSize=5MB
log4j.appender.file.MaxBackupIndex=10
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%d{yyyy-MM-dd HH:mm:ss}] [ %-5p] [%c{1}:%L] %m%n
```

En estas líneas vamos a hacer exactamente lo mismo que antes pero configurando el appender para que salga a través de un fichero:

- En la **primera línea** configuramos la clase como **RollingFileAppender**, lo que significa que se crearán distintos ficheros al cumplirse determinadas condiciones que tratamos en las siguientes líneas.
- En la **siguiente** indicamos el nombre (con ruta incluida) que queremos que tenga nuestro fichero de log.
- Con **MaxFileSize** establecemos el tamaño máximo que tendrá nuestro fichero, y con **MaxBackupIndex** indicamos cuantos archivos podemos tener usando el mismo log. A partir de llegar al máximo, comenzarán a sobrescribirse empezando por el más antiguo.
- Y por último, al igual que por consola, indicamos que plantilla tendrán nuestros mensajes.

## Código Java para Log4j

La forma que me resulta más fácil de trabajar es **crearme una clase independiente que funcione como un handler para Log4j**.

Lo primero es definirme un enum con los tipos de log que puedo tener. En un alarde de originalidad lo podemos llamar... no sé, `TipoLog.java`:

```java
public enum TipoLog {
    DEBUG, ERROR, FATAL, INFO, WARNING
}
```

Son las opciones de log que os conté en la sección **Niveles de prioridad**.

La siguiente parte es crear la clase Java, tal que así:

```java
import org.apache.log4j.Logger;
import org.apache.log4j.LogManager;

public class UtilesLog {
    
    private static Logger log = Logger.getLogger(UtilesLog.class);
    
    @SuppressWarnings("rawtypes")
    public static void registrarInfo(Class clase, TipoLog tipo, String mensaje) {
        log = LogManager.getLogger(clase);
        
        switch (tipo) {
            case DEBUG:
                log.debug(mensaje);
                break;
            case ERROR:
                log.error(mensaje);
                break;
            case FATAL:
                log.fatal(mensaje);
                break;
            case INFO:
                log.info(mensaje);
                break;
            case WARNING:
                log.warn(mensaje);
                break;
        }
    }
}
```

En esta clase tenemos una **propiedad privada estática** configurada por defecto para ser el Logger de la clase que lo contiene, **UtilesLog**. Podéis poner el nombre que deseéis por supuesto.

Esto se hace porque la **clase Logger tiene que estar apuntando siempre a una clase** sobre la que se crearán los mensajes, así que en vez de tener que declarar este Logger en todas y cada una de las clases de nuestro proyecto, podemos manejarlo en un único fichero de este modo.

**¿Y como mandamos el logger entonces?** Con el método que tenemos debajo, **registrarInfo**.

Si te das cuenta tiene **tres parámetros**:
- La **clase** sobre la que queremos generar los mensajes
- El **tipo** de mensaje
- El **contenido** del mismo

Lo que hacemos simplemente es **establecer el Logger para la clase pasada como parámetro** y, dependiendo del tipo de log, **enviar un tipo de mensaje u otro**.

## Ejemplo de uso

```java
public class App {
    public static void main(String[] args) {
        UtilesLog.registrarInfo(App.class, TipoLog.INFO, "Esto es una prueba desde App class.");
        UtilesLog.registrarInfo(App.class, TipoLog.DEBUG, "Mensaje de debug");
        UtilesLog.registrarInfo(App.class, TipoLog.ERROR, "Ha ocurrido un error");
    }
}
```

Y **¡listo!**, ya tenemos nuestro **sistema de logging con Log4j creado y completamente funcional**.

Puedes visitar el código completo en [mi repositorio de Github](https://github.com/inazense/scripts/tree/master/scripts/java/ManejadorLog4j).

**¡Salud y coding!**