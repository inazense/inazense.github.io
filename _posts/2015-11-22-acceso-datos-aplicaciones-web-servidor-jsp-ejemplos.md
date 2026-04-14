---
title: "Acceso a datos. Aplicaciones web servidor. JSP. Ejemplos"
description: Colección de ejemplos prácticos de JSP, desde el Hola Mundo hasta el manejo de parámetros, expresiones, scriptlets, comentarios, contador de accesos y control de errores.
date: 2015-11-22 14:00:00 +0800
categories: [Java]
tags: [java, jsp, acceso-a-datos, web, ejemplos, scriptlet, expresiones]
pin: false
math: false
mermaid: false
---

Colección de ejemplos prácticos de JSP para comprender los distintos elementos del lenguaje.

## Hola Mundo

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Hola Mundo</title>
    </head>
    <body>
        <% out.println("Hola Mundo"); %>
    </body>
</html>
```

## Comentarios

Los comentarios JSP (`<%-- --%>`) no se incluyen en la respuesta enviada al cliente, a diferencia de los comentarios HTML que sí son visibles en el código fuente:

```jsp
<%@ page language="java" %>
<html>
    <head>
        <title>Ejemplo de comentarios ocultos</title>
    </head>
    <body>
        <h2>Ejemplo de comentarios ocultos</h2>
        <%-- Este comentario no se incluye en el response --%>
        <!-- Fecha de compilacion: <%= new java.util.Date()%> -->
    </body>
</html>
```

## Contador de accesos (declaración)

Uso de una declaración (`<%! %>`) para definir un atributo de clase que persiste entre peticiones:

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Contador de accesos</title>
    </head>
    <body>
        <%! private int accessCount = 0; %>
        Número de veces que se consultó a la página:
        <%= ++accessCount %>
    </body>
</html>
```

## Color de fondo (parámetro de petición)

Recupera un parámetro de la URL para cambiar dinámicamente el color de fondo de la página:

```jsp
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    <HEAD>
        <TITLE>Color de Fondo</TITLE>
    </HEAD>
    <%
    String bgColor = request.getParameter("bgColor");
    boolean hasExplicitColor;
    if (bgColor != null) {
        hasExplicitColor = true;
    } else {
        hasExplicitColor = false;
        bgColor = "WHITE";
    }
    %>
    <BODY BGCOLOR="<%= bgColor %>">
        <H2 ALIGN="CENTER">Color de Fondo</H2>
    </BODY>
</HTML>
```

## Scriptlet con bucle

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<HTML>
    <head>
        <title>Página de ejemplo de scriptlet</title>
    </head>
    <body>
        <h1>Página de ejemplo de scriptlet</h1>
        <%
            for (int i = 0; i < 10; i++) {
                out.println("<b>Hola a todos. Esto es un ejemplo de scriptlet " + i + "</b>");
                System.out.println("Esto va al stream System.out: " + i);
            }
        %>
    </body>
</HTML>
```

## Combinando HTML y Java

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
    <head>
        <title>HTML y Java combinado</title>
    </head>
    <body>
        <% if (Math.random() < 0.5) { %>
            Tiene un <B>día</B> feliz!
        <% } else { %>
            Tiene un <B>dia</B> aburrido!
        <% } %>
    </body>
</html>
```

## Expresiones

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<HTML>
    <head>
        <title>Página de ejemplo de expresiones</title>
    </head>
    <body>
        <h1>Página de ejemplo de expresiones</h1>
        Hola a todos, son las <%= new java.util.Date().toString() %>
    </body>
</HTML>
```

## Expresiones avanzadas

```jsp
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    <HEAD>
        <TITLE>Ejemplo: Expresiones</TITLE>
    </HEAD>
    <BODY>
        <H2>Ejemplos de expresiones JSP</H2>
        <UL>
            <LI>Hora actual en el servidor: <%= new java.util.Date() %></LI>
            <LI>Nombre del host: <%= request.getRemoteHost() %></LI>
            <LI>Identificador de sesion: <%= session.getId() %></LI>
            <LI>Valor del parametro testParam: <%= request.getParameter("testParam") %></LI>
        </UL>
    </BODY>
</HTML>
```

## Parámetros y formulario

Muestra el formulario si no se ha enviado el nombre, o el saludo si ya está disponible:

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
    <head>
        <title>Saludo con parámetro</title>
    </head>
    <body>
        <%
            String nombre = request.getParameter("nombrePila");
            if (nombre != null) {
        %>
        <h1>Hola <%= nombre %>, <br/>¡ Bienvenido a la página !</h1>
        <%
            } else {
        %>
        <form action="ejemplo05.jsp" method="get">
            <p>Escriba su nombre y pulse Enviar</p>
            <p>
                <input type="text" name="nombrePila" />
                <input type="submit" value="Enviar" />
            </p>
        </form>
        <%
            }
        %>
    </body>
</html>
```

## Parámetros entre dos páginas JSP

### ejemplo06a.jsp — Formulario

```jsp
<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
        <title>Ejercicios saludos</title>
    </head>
    <body>
        <p>Nos devuelve un saludo con el nombre que le pasemos en el formulario</p>
        <form action="ejemplo06b.jsp" method="post">
            <input type="text" name="nombre">
            <input type="submit" value="enviar">
        </form>
    </body>
</html>
```

### ejemplo06b.jsp — Procesado

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<html>
    <head>
        <title>Respuesta saludo</title>
    </head>
    <body>
        <%
            if (request.getParameter("nombre") != null
                    && request.getParameter("nombre") != "") {
        %>
        Hola <%= request.getParameter("nombre") %>
        <%
            } else {
        %>
        Hola Desconocido
        <%
            }
        %><br/>
        <a href="ejemplo06a.jsp">Volver</a>
    </body>
</html>
```

## Control de errores

### velocidad.jsp — Página principal

```jsp
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    <HEAD>
        <TITLE>Cálculo de velocidad</TITLE>
    </HEAD>
    <BODY>
        <%@ page errorPage="VelocidadError.jsp" %>
        <%!
            private double toDouble(String value) {
                return(Double.valueOf(value).doubleValue());
            }
        %>
        <%
            double espacio = toDouble(request.getParameter("espacio"));
            double tiempo = toDouble(request.getParameter("tiempo"));
            double speed = espacio / tiempo;
        %>
        <UL>
            <LI>Espacio: <%= espacio %>.</LI>
            <LI>Tiempo: <%= tiempo %>.</LI>
            <LI>Velocidad: <%= speed %>.</LI>
        </UL>
    </BODY>
</HTML>
```

### VelocidadError.jsp — Página de error

```jsp
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
    <HEAD>
        <TITLE>Página de error</TITLE>
    </HEAD>
    <BODY>
        <%@ page isErrorPage="true" %>
        <TABLE BORDER="5" ALIGN="CENTER">
            <TR>
                <TH CLASS="TITLE">Error al calcular la velocidad</TH>
            </TR>
        </TABLE>
        <P>
            Hay un error en la página Velocidad.jsp:
            <I><%= exception %></I>.
            <PRE><% exception.printStackTrace(new java.io.PrintWriter(out)); %></PRE>
        </P>
    </BODY>
</HTML>
```

La directiva `<%@ page errorPage="VelocidadError.jsp" %>` redirige automáticamente al fichero de error cuando se produce una excepción no controlada. La página de error debe declarar `isErrorPage="true"` para poder acceder al objeto implícito `exception`.
