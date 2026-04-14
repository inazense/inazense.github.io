---
title: "Acceso a datos. Aplicaciones web servidor. JSP"
description: Introducción a JavaServer Pages (JSP), sus elementos de script, objetos implícitos, acciones con JavaBeans y librerías de tags personalizadas.
date: 2015-11-22 12:00:00 +0800
categories: [Java]
tags: [java, jsp, acceso-a-datos, javabeans, web, servlet]
pin: false
math: false
mermaid: false
---

## ¿Qué es una JSP?

Las **JavaServer Pages** (JSP) permiten separar los componentes dinámicos del contenido estático en páginas web. Los desarrolladores escriben HTML o XML normal e insertan lógica dinámica entre etiquetas especiales que comienzan con `<%` y terminan con `%>`.

Ejemplo básico:

```jsp
<% out.println("Hola mundo"); %>
```

## Elementos de script JSP

### Expresiones

Evalúan una expresión Java e insertan el resultado directamente en la salida:

```jsp
<%= new java.util.Date() %>
```

### Scriptlets

Insertan código Java dentro del método `service()` del servlet generado:

```jsp
<% for (int i = 0; i < 10; i++) { out.println(i); } %>
```

### Declaraciones

Definen métodos y atributos a nivel de clase del servlet (fuera de los métodos):

```jsp
<%! private int accessCount = 0; %>
```

### Directivas

Afectan a la estructura global del servlet generado. Los tres tipos son:

| Directiva | Uso |
|-----------|-----|
| `page` | Configura propiedades de la página (imports, errorPage, etc.) |
| `include` | Incluye otro fichero en tiempo de traducción |
| `taglib` | Declara una librería de tags personalizados |

Ejemplo:

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" %>
<%@ page errorPage="error.jsp" %>
```

### Acciones

Operaciones predefinidas de JSP que se ejecutan en tiempo de petición:

```jsp
<jsp:useBean id="miBean" class="com.ejemplo.MiBean" scope="session" />
<jsp:setProperty name="miBean" property="nombre" value="Juan" />
<jsp:getProperty name="miBean" property="nombre" />
```

## Objetos implícitos

JSP pone a disposición nueve variables predefinidas sin necesidad de declararlas:

| Variable | Tipo | Descripción |
|----------|------|-------------|
| `request` | `HttpServletRequest` | Petición HTTP actual |
| `response` | `HttpServletResponse` | Respuesta HTTP |
| `out` | `JspWriter` | Flujo de salida hacia el cliente |
| `session` | `HttpSession` | Sesión del usuario |
| `application` | `ServletContext` | Contexto de la aplicación |
| `config` | `ServletConfig` | Configuración del servlet |
| `pageContext` | `PageContext` | Contexto de la página |
| `page` | `Object` | Referencia al servlet actual |
| `exception` | `Throwable` | Excepción (solo en páginas de error) |

## JavaBeans en JSP

Las tres acciones para trabajar con JavaBeans son:

**`<jsp:useBean>`** — instancia o recupera un bean:

```jsp
<jsp:useBean id="usuario" class="com.ejemplo.Usuario" scope="session" />
```

**`<jsp:setProperty>`** — establece el valor de una propiedad:

```jsp
<jsp:setProperty name="usuario" property="nombre" param="nombrePila" />
```

**`<jsp:getProperty>`** — recupera el valor de una propiedad:

```jsp
<jsp:getProperty name="usuario" property="nombre" />
```

## Librerías de tags personalizadas

Con la directiva `taglib` se pueden importar librerías de tags propias o de terceros (como JSTL):

```jsp
<%@ taglib uri="/WEB-INF/miTagLib.tld" prefix="mi" %>
<mi:holaMundo />
```

Para crear una librería de tags propia se necesita:

1. Una clase Java que extienda `TagSupport` o `BodyTagSupport`.
2. Un fichero descriptor `.tld` con la definición del tag.
3. Configuración en `web.xml`.
4. La página JSP que usa el tag.
