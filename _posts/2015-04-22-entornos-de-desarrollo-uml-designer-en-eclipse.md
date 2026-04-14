---
title: Entornos de desarrollo. UML Designer en Eclipse
description: Cómo instalar y usar el plugin UML Designer en Eclipse para crear diagramas de clases UML, con explicación de asociaciones, herencia, atributos y métodos.
author: Inazio Claver
date: 2015-04-22 12:00:00 +0800
categories: [Entornos de desarrollo]
tags: [entornos-de-desarrollo, eclipse, uml, diagramas, clases]
pin: false
math: false
mermaid: false
---

Para trabajar con diagramas UML en Eclipse necesitaremos instalar el plugin UML Designer. Enlace al marketplace: http://marketplace.eclipse.org/content/uml-designer-eclipse-luna-version

Arrastramos el botón Install hacia Eclipse y comenzará la instalación.

![Instalación de UML Designer desde Eclipse Marketplace](/img/posts/20150422_1.png)

Nos pedirá reiniciar Eclipse.

![Ventana tras reiniciar Eclipse](/img/posts/20150422_2.png)

## Crear un proyecto UML

Para crear un nuevo proyecto: **File > New > Project > UML Designer > UML Project**.

![Nuevo proyecto UML en Eclipse](/img/posts/20150422_3.png)

Se abre el Dashboard del proyecto.

![Dashboard de UML Designer](/img/posts/20150422_4.png)

Elegimos **Class Diagram**.

![Selección de Class Diagram](/img/posts/20150422_5.png)

Los elementos UML se arrastran desde el menú de la derecha.

![Menú de elementos UML](/img/posts/20150422_6.png)

## Tipos de elementos

- **Types**: paquete, interfaz, clase...
- **Features**: configuraciones de los tipos

### Association

La sección **Association** contiene las distintas relaciones entre clases.

![Opciones de Association](/img/posts/20150422_7.png)

Incluye **Composition** y **Aggregation**. La diferencia entre ambas:

![Diferencia entre Aggregation y Composition](/img/posts/20150422_8.png)

Más información en: http://www.seas.es/blog/informatica/agregacion-vs-composicion-en-diagramas-de-clases-uml/

- **Association Class**: clase intermedia entre dos clases relacionadas.

### Generalization

La **Generalization** se usa para las herencias entre clases.

![Generalization en UML](/img/posts/20150422_9.png)

## Configurar una clase

Al hacer doble clic sobre una clase importada se abre la ventana de configuración.

![Ventana de configuración de clase](/img/posts/20150422_10.png)

### Attributes

En la pestaña **Attributes** configuramos las propiedades de la clase.

![Pestaña Attributes](/img/posts/20150422_11.png)

Pulsamos `+` para añadir un atributo nuevo.

![Añadir atributo](/img/posts/20150422_12.png)

La estructura de un atributo es: `nombreDelAtributo: TipoDelAtributo`

### Operations

En la pestaña **Operations** configuramos los métodos de la clase.

![Pestaña Operations](/img/posts/20150422_13.png)

Pulsamos `+` para añadir un método nuevo.

![Añadir método](/img/posts/20150422_14.png)

## Visibilidad

La visibilidad de los atributos y métodos se indica en el diagrama con los siguientes símbolos:

- `-` : private
- `+` : public
- `#` : protected

Ejemplo de clase completamente configurada:

![Ejemplo de clase finalizada en UML](/img/posts/20150422_15.png)
