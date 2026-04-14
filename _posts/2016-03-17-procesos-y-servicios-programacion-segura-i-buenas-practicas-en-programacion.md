---
title: Procesos y servicios. Programación segura I. Buenas prácticas en programación
description: "Aprende buenas prácticas en programación segura: validación de datos, revisión de código, control de acceso y prevención de vulnerabilidades. Guía completa sobre seguridad en desarrollo de software con ejemplos prácticos."
date: 2016-03-17 12:10:00 +0800
categories: [Java]
tags: [procesos-servicios, java, teoria, programacion-segura, buenas-practicas, validacion-datos, seguridad, codigo-limpio]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

## 1. Informarse

- Una forma de evitar fallos es estudiar y comprender los erroes que otros han cometido a la hora de desarrollar software.
Internet es el hogar de una gran variedad de foros públicos donde se debaten con frecuencia problemas de vulnerabilidad de software.
- Leer libros y artículos sobre prácticas de codificación segura, así como análisis de los defectos del software.
- Explorar el software de código abierto, hay cantidad de ejemplos de cómo llevar a cabo diversas acciones, sin embargo, también se pueden encontrar numerosos ejemplos de cómo no se deben hacer las cosas.

## 2. Precaución en el manejo de los datos

- Limpiar datos. Es el proceso de examen de los datos de entrada. Los atacantes a menudo intentan introducir contenido que está más allá de lo que el programador prevé para la entrada de datos del programa, por ejemplo alteración del juego de caracteres, uso de caracteres no permitidos, desbordamiento del buffer de datos…
- Realizar la comprobación de límites. Un problema muy típico es el desbordamiento de búfer. Hemos de asegurarnos de verificar que los datos proporcionados al programa pueden caber en el espacio que se asigna para ello. En los arrays hemos de revisar los índices para garantizar que permanecen dentro de sus límites.
- Revisar los ficheros de configuración. Es necesario validar los datos, como si se tratase de una entrada de datos por teclado, ya que pueden ser manipulados por un atacante.
- Comprobar los parámetros de línea de comandos.
- No fiarse de las URLs Web. Muchos diseñadores de aplicaciones web utilizan URLs para insertar variables y sus valores. El usuario puede alterar la URL directamente dentro de su navegador por variables de ajuste y/o de sus valores a cualquier configuración que elija. Si la aplicación Web no realiza una comprobación de los datos puede ser atacada con éxito.
- Cuidado con los contenidos Web. Muchas aplicaciones web insertar variables en campos HTML ocultos. Tales campos también pueden ser modificados por el usuario en una sesión de navegador.
- Comprobar las cookies web. Los valores pueden ser modificados por el usuario final y no se debe confiar en ellas.
- Comprobar las variables de entorno. Un uso común de las variables de entorno es pasar configuración de preferencias a los programas. Los atacantes pueden proporcionar variables de entorno no previstas por el programador
- Establecer valores iniciales válidos para los datos. Es un buen hábito inicializar correctamente las variables.
- Comprender las referencias de nombre de fichero (rutas de acceso de ficheros y directorios) y utilizarlas correctamente dentro de los programas.
- Especial atención al almacenamiento de información sensible. Es de vital importancia proteger la confidencialidad e integridad de información considerada como confidencial, como contraseñas, números de cuenta de tarjetas de crédito, etc.

## 3. Reutilización de código siempre que sea posible. 

Se refiere a la reutilización del software que ha sido completamente revisado y probado, y ha resistido las pruebas del tiempo y de los usuarios.

## 4. Insistir en la revisión de los procesos. 

Siempre es aconsejable seguir una práctica de revisión de los fallos de seguridad en el código fuente. Si un programa es confiado a varias personas, todas deben participar en la revisión.

- Es recomendable el desarrollo de una lista de cosas que buscar, esta tiene que ser mantenida y actualizada con los nuevos fallos de programación encontrados.
- Realizar una validación y verificación independiente. Algunos proyectos de programación necesitan una revisión más formal que implica revisar el código fuente de un programa, línea por línea, para garantizar que se ajusta a su diseño, así como a otros criterios (por ejemplo, las condiciones de seguridad).
- Identificar y utilizar las herramientas de seguridad disponibles. Hay herramientas de software disponibles para ayudar en la revisión de fallos en el código fuente. Son útiles para la captura de errores comunes pero no tan útiles para detectar otro error.

## 5. Utilizar listas de control de seguridad. 

Estas listas pueden ser muy útiles para asegurarse de que se han cubierto todas las fases durante la ejecución. Por ejemplo:

- Este sistema de aplicación requiere una contraseña para que los usuarios puedan acceder.
- Todos los inicios de sesión de usuario son únicos.
- Esta aplicación utiliza el sistema de control de acceso basado en roles.
- Las contraseñas no se transmiten a través de la red en texto plano.
- El cifrado se utiliza para proteger los datos que se transfieren entre servidores y clientes.

## 6. Ser amable con los mantenedores. 

El mantenimiento del código puede ser de vital importancia para la seguridad del software en el transcurso de su vida útil. Seguiremos estas prácticas de mantenimiento del código:

- Utilizar normas. Con respecto la documentación en línea del código fuente, los nombres de las variables, etc; para que hagan la vida más fácil para aquellos que posteriormente mantendrán el código. El código modular, si está bien documentado, es más fácil de mantener.
- Retirar código obsoleto
- Analizar todos los cambios en el código. Hemos de asegurarnos de probar a fondo los cambios en el código antes de entrar en producción.

## 7. Las cosas que no se deben hacer:

- Escribir código que utiliza nombres de ficheros relativos. La referencia a un nombre de fichero debe ser completa.
- Referirse dos veces en el mismo programa a un fichero por su nombre. Se recomienda abrir el fichero una vez por su nombre y utiliza el identificador a partir de entonces.
- Invocar programas no configuables dentro de los programas.
- Asumir que los usuarios no son maliciosos.
- Dar por sentado el éxito. Cada vez que se realiza una llamada al sistema (por ejemplo, abrir un fichero, leer un fichero, recuperar una variable de entorno), comprobar el valor de retorno por si la llamada falló.
- Invocar un Shell o una línea de comandos.
- Autenticarse en criterios que no sean de confianza.
- Utilizar áreas de almacenamiento con permisos de escritura. Si es absolutamente necesario, hay que suponer que la información pueda ser manipulada, alterada o destruida por cualquier persona o proceso que así lo desee.
- Guardar datos confidenciales en una base de datos sin protección de contraseña.
- Hacer eco de las contraseñas o mostrarlas en la pantalla del usuario.
- Emitir contraseñas vía e-mail
- Distribuir mediante programación información confidencial a través de correo electrónico.
- Guardar las contraseñas sin cifrar (o cualquier otra información confidencial) en disco en un formato fácil de leer (texto sin cifrar).
- Transmitir entre los sistemas contraseñas sin encriptar (o cualquier otra información confidencial). Se debe utilizar como antes certificados, encriptación fuete o transmisión segura entre hosts de confianza.
- Tomar decisiones de acceso basadas en variables de entorno o parámetros de línea de comandos que se pasan en tiempo de ejecución.
- Evitar, en la medida que se pueda, confiar en el software o los servicios de terceros para operaciones críticas.

**¡Salud y coding!**