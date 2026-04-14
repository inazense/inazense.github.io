---
title: Acceso a datos. Aplicaciones web servidor. JSP. Ejemplos (II)
description: Ejemplos prácticos de JSP con includes, sesiones, cookies y acceso a base de datos con MySQL.
author: Inazio Claver
date: 2015-12-09 12:00:00 +0800
categories: [Acceso a datos, Web]
tags: [java, jsp, web, sesiones, cookies, mysql, jdbc]
pin: false
math: false
mermaid: false
---

Continuación de los ejemplos prácticos de JSP, cubriendo includes, manejo de sesiones, cookies y acceso a base de datos.

## Includes

### ejemplo18.html

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<table border="0" width="400" cellspacing="0" cellpadding="0">
<tr>
<td height="150" width="150"> &nbsp; </td> <td width="250">&nbsp;</td>
</tr>
<tr>
<td width="250">&nbsp;</td>
<td align="right" width="350">
<img src="merlin.gif">
</td>
</tr>
</table> <br>
</body>
</html>
```

### ejemplo18a.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<%@ include file="ejemplo18.html" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Página principal</title>
</head>
<body bgcolor="#ffffff" background="background.gif">
<table border="0" width="700">
<tr>
<td width="150"> &nbsp; </td>
<td width="550">
<h1>Mi nombre es Merlin ¿el tuyo?</h1> </td>
</tr>
<tr>
<td width="150">&nbsp;</td>
<td width="550">
<form method="get">
<input type="text" name="usu" size="25"> <br>
<input type="submit" value="Enviar">
</form>
<%if ( request.getParameter("usu") != null ) { %>
<%@ include file="ejemplo18c.jsp" %>
<%}%>
</td>
</tr>
</table>
</body>
</html>
```

### ejemplo18c.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<table border="0" width="700"> 
<tr>
<td width="150">&nbsp;</td>
<td width="550">
<jsp:useBean id="miclase" scope="page" class="Beans.NombreUser" />
<jsp:setProperty name="miclase" property="*"/>
<h1>Hola, <jsp:getProperty name="miclase" property="usu" />! </h1>
</td> 
</tr> 
</table>
</body>
</html>
```

## Sesiones

### Ejemplo 1: información de sesión

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"  import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>trabajando con sesiones</title>
</head>
<body>
<%
HttpSession sesion1 = request.getSession();
out.println("Identificación: " + sesion1.getId() + "<br> <br>");
Date fecha = new Date(sesion1.getCreationTime());
out.println("Creacion: " + fecha + "<br> <br>");
Long duracion = sesion1.getLastAccessedTime() - sesion1.getCreationTime();
Date verDuracion = new Date(duracion);
out.println("Duración: " + verDuracion.getMinutes() + " minutos y " + 
verDuracion.getSeconds() + " segundos");
%>
</body>
</html>
```

### Ejemplo 2: información de sesión (versión simplificada)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"  import="java.util.*"%>
<%
out.println("Identificación: " + session.getId() + "<br> <br>");
Date fecha = new Date(session.getCreationTime());
out.println("Creación: " + fecha + "<br> <br>");
Long duracion = session.getLastAccessedTime() - session.getCreationTime();
Date verDuracion = new Date(duracion);
out.println("Duración: " + verDuracion.getMinutes() + " minutos y " + 
verDuracion.getSeconds() + " segundos");
%>
```

## Sesiones (Validación)

Sistema de autenticación con validación de usuario y contraseña, mantenimiento de sesión y cierre de sesión.

### ejemplo23a.jsp (formulario de identificación)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Página de identificación</title>
</head>
<body>
<%
if (request.getParameter("error") != null) {
    out.println(request.getParameter("error"));
}
%>
<form action="ejemplo23b.jsp" method="post">
usuario.....: <input type="text" name="usuario" size="25"><br>
contraseña: <input type="password" name="clave" size="10"><br>
<input type="submit" value="enviar">
</form>
</body>
</html>
```

### ejemplo23b.jsp (proceso de validación)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>proceso de validación</title>
</head>
<body>
<%
String usuario = null;
String clave = null; 
if (request.getParameter("usuario") != null)
    usuario = request.getParameter("usuario");
if (request.getParameter("clave") != null)
    clave = request.getParameter("clave");
if (usuario.equals("MERLIN") && clave.equals("XXXX")) {
    HttpSession sesion1 = request.getSession();
    sesion1.setAttribute("usuario", usuario);
%>
<jsp:forward page="ejemplo23c.jsp"></jsp:forward>
<%
} else {
%>
<jsp:forward page="ejemplo23a.jsp">
<jsp:param name="error" value="Usuario y/o clave incorrectos<br>Vuelve a teclearlos"/>
</jsp:forward>
<%
}
%>
</body>
</html>
```

### ejemplo23c.jsp (programa principal)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>El programa principal</title>
</head>
<body>
<%
String usuario = null;
HttpSession sesion1 = request.getSession();
if (sesion1.getAttribute("usuario") == null) {
%>
<jsp:forward page="ejemplo23a.jsp">
<jsp:param name="error" value="Hay que identificarse"/>
</jsp:forward>
<% } else {
    usuario = (String) sesion1.getAttribute("usuario");
}
%>
<b>Opciones de la aplicación</b><br>
<b>Usuario conectado</b>
<%=usuario%><p>
<li><a href="altas.jsp">Alta nuevo usuario</a>
<li><a href="bajas.jsp">Baja de un usuario</a>
<li><a href="modificar.jsp">Modificar los datos del usuario</a>
<li><a href="ejemplo23d.jsp">Cerrar sesión</a>
</body>
</html>
```

### ejemplo23d.jsp (cerrar sesión)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" 
pageEncoding="ISO-8859-1" session="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>cierra la sesión y vuelve a la identificación</title>
</head>
<body>
<%
HttpSession sesion1 = request.getSession();
if (sesion1 != null)  sesion1.invalidate();
%>
<jsp:forward page="ejemplo23a.jsp"></jsp:forward>
</body>
</html>
```

## Cookies

### ejemplo24a.jsp (crear cookie)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>crear cookies</title>
</head>
<body>
<%
Cookie miCookie = new Cookie("usuario", "merlin");
miCookie.setMaxAge(60 * 60 * 24 * 2);
response.addCookie(miCookie);
%>
</body>
</html>
```

### ejemplo24b.jsp (recuperar cookies)

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" 
pageEncoding="ISO-8859-1" import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>recuperar cookies</title>
</head>
<body>
<%
Cookie[] lasCookies = request.getCookies();
for (int i = 0; i < lasCookies.length; i++) {
    Cookie miCookie = lasCookies[i];
    out.println("Nombre de mi cookie... :" + miCookie.getName() + "<br>");
    out.println("Contenido de la cookie :" + miCookie.getValue() + "<br>");
    out.println("Tiempo de vida........ :" + miCookie.getMaxAge() + "<br>");
}
%>
</body>
</html>
```

## Bases de datos. Inserción

### AccesoBDatos.java

```java
package paquetes;
import java.sql.*;
import java.util.ArrayList;
import java.util.Collection;

public class AccesoBdatos {
    public Connection conecta;

    public void conectar() throws SQLException, ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
        conecta = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/demodb", "root", "");
    }

    public void insertar(Integer clave, String nombre, String localidad) {
        try {
            String sql = "insert into dept values (?,?,?)";
            PreparedStatement inserta = conecta.prepareStatement(sql);
            inserta.setInt(1, clave);
            inserta.setString(2, nombre);
            inserta.setString(3, localidad);
            inserta.executeUpdate();
        } catch (SQLException e) {
            System.out.println("error al insertar en dept" + e.getMessage());
        }
    }

    public void insertarConBean(Depto registro) {
        try {
            String sql = "insert into dept values (?,?,?)";
            PreparedStatement inserta = conecta.prepareStatement(sql);
            inserta.setInt(1, registro.getDeptno());
            inserta.setString(2, registro.getDname());
            inserta.setString(3, registro.getLoc());
            inserta.executeUpdate();
        } catch (SQLException e) {
            System.out.println("error al insertar en dept" + e.getMessage());
        }
    }
}
```

### ejemplo33a.html (formulario de entrada)

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Formulario para la introducción de los datos</title>
</head>
<body>
<form action="ejemplo33b.jsp">
Departamento:<input type="text" name="cod" />
Nombre:<input type="text" name="nom" />
Localidad:<input type="text" name="loc">
<input type="submit" value="enviar"/>
</form>
</body>
</html>
```

### ejemplo33b.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<jsp:useBean id="datos" scope="session" class="paquetes.AccesoBdatos" />
<%
datos.conectar();
try {
    datos.insertar(Integer.parseInt(request.getParameter("cod")),
        request.getParameter("nom"), request.getParameter("loc"));
} catch (Exception e) { 
    out.println("error en datos " + e.getMessage());
}
response.sendRedirect("ejemplo33a.html");
%>
</body>
</html>
```

## Bases de datos. Consulta

### Depto.java

```java
package paquetes;

public class Depto {
    Integer deptno; 
    String dname;
    String loc;

    public Depto() {}

    public Depto(Integer deptno, String dname, String loc) {
        this.deptno = deptno;
        this.dname = dname;
        this.loc = loc;
    }

    public Integer getDeptno() { return deptno; }
    public void setDeptno(Integer deptno) { this.deptno = deptno; }
    public String getDname() { return dname; }
    public void setDname(String dname) { this.dname = dname; }
    public String getLoc() { return loc; }
    public void setLoc(String loc) { this.loc = loc; }
}
```

### ejemplo35.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1" import="java.util.*,paquetes.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<jsp:useBean id="datos" scope="session" class="paquetes.AccesoBdatos" />
<jsp:useBean id="datosTabla" scope="session" class="paquetes.Depto" />
<%
datos.conectar();
Collection departamentos = datos.consultarConBean();
if (departamentos != null) {
    if (departamentos.size() > 0) {
        for (Iterator i = departamentos.iterator(); i.hasNext(); ) {
            Depto departamento = (Depto) i.next();
%>
<li> <%= departamento.getDeptno() %></li>
<li> <%= departamento.getDname() %></li>
<li> <%= departamento.getLoc() %></li>
<br><a>--------------------------------</a>
<%
        }
    }
}
%>
</body>
</html>
```
