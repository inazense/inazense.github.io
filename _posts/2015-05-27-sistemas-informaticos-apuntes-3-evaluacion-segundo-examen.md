---
title: Sistemas informáticos. Apuntes 3 evaluación. Segundo exámen
description: Apuntes del segundo examen de la tercera evaluación de sistemas informáticos sobre Windows Server 2008, Active Directory, DHCP, DNS, LAMP y CMS en Ubuntu Server.
author: Inazio Claver
date: 2015-05-27 12:00:00 +0800
categories: [Sistemas informáticos]
tags: [sistemas-informaticos, windows-server, active-directory, ubuntu-server, dhcp, dns, apache, lamp]
pin: false
math: false
mermaid: false
---

## PRIMERA PARTE. SERVER 2008

**Windows Server 2008:** Servidor con interfaz gráfica multitarea, multiusuario, a tiempo real / compartido.

**Dominio:** Agrupación de usuarios y equipos que facilita la administración centralizada.

**Controlador de Dominio:** Centro neurálgico del dominio. Centraliza cuentas, protege información, gestiona copias de seguridad, evita intrusiones.

**ADDS (Servicios de dominio de Active Directory):** BD distribuida que almacena y administra información sobre recursos de red.

**Active Directory:** Servicio de directorio de Microsoft, estructura jerarquizada, basado en estándares X.500. Estructura: Dominio, Unidad organizativa (OU), Grupos, Objetos. Usa DNS para resolver nombres y definir espacios de nombres.

**Gestión de dominios:** Objetos que administra: usuarios globales, grupos, equipos, unidades organizativas.

**Directivas de grupo (GPO):** Conjunto de reglas que controlan el medio ambiente de trabajo de cuentas y equipos. Actualización cada 90 min en clientes, 5 min en CD. Forzar con `gpupdate`. Orden de procesamiento: LGP → Sitio → Dominio → OU.

**Permisos efectivos. Delegación de permisos. Listas de control de acceso (ACL):** fijas y variables.

**Seguridad:** de sistema, de los datos, a nivel de usuario, a nivel de equipo.

**Servidores de ficheros (DFS):** Espacio de nombres DFS y Replicación DFS. Se instala desde Administrador del servidor → Funciones → Sistema de archivos distribuido.

## SEGUNDA PARTE. UBUNTU SERVER

### Servidor DHCP

Establece configuración IP automática. Parámetros mínimos: IP y máscara. Opcionales: gateway, DNS.

Instalación DHCP3:

1. `sudo apt-get install dhcp3-server`
2. Editar `dhcpd.conf` (previo backup).
3. Buscar sección `subnet` y descomentar líneas con subred, rango, DNS, dominio, gateway, broadcast.
4. Reiniciar: `sudo /etc/init.d/dhcp3-server restart`

### Servidor DNS Bind

DNS resuelve nombres de dominio a IP. Estructura básica en árbol. FQDN = host + dominio secundario + dominio primario (ej: `www.google.com`).

**Tipos de servidores DNS:** Maestro, Esclavo, Solo de caché, De reenvío.

**Tipos de registro:** A (Address), MX (correo), CNAME (alias), NS (nameserver), SOA (servidor primario). Zonas de búsqueda directa e inversa.

**Configurar BIND9:** instalar `bind9`, editar `/etc/bind/named.conf.default-zones`, añadir zona, crear archivo `db.nombredominio`, definir SOA/NS/CNAME/A, configurar reenviadores en `named.conf.options`, reiniciar con `sudo service bind9 restart`.

### Apache + MySQL + PHP (LAMP)

Apache implementa HTTP. PHP como intérprete. MySQL como gestor de BD.

**CMS:** phpMyAdmin como gestor. Se accede vía `192.168.137.198/phpmyadmin`.

- **WordPress:** CMS en PHP para blogs. Instalación en `/var/www/wordpress`, permisos, BD en phpMyAdmin, acceso web al instalador.
- **Joomla:** CMS en PHP con licencia GPL. Muy usado para e-commerce. Instalación en `/var/www/joomla`.
- **Drupal:** CMS modular en PHP con licencia GPL. Ideal para comunidades, foros, portales. Instalación en `/var/www/drupal`.

### Sitios virtuales en Apache

Por puerto, por IP, por nombre de dominio (requiere DNS).
