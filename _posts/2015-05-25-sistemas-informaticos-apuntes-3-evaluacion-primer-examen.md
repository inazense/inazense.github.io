---
title: Sistemas informáticos. Apuntes 3 evaluación. Primer exámen
description: Apuntes del primer examen de la tercera evaluación de sistemas informáticos sobre redes, protocolos TCP/IP, dispositivos de interconexión y seguridad.
author: Inazio Claver
date: 2015-05-25 12:00:00 +0800
categories: [Sistemas informáticos]
tags: [sistemas-informaticos, redes, tcp-ip, seguridad, vpn, iptables]
pin: false
math: false
mermaid: false
---

Son apuntes cogidos de diversas web (Wikipedia principalmente). Cualquier modificación, agregación... se agradecería un comentario para complementarlos.

## Monitorización de redes

Es el uso de un sistema que constantemente vigila una red de computadoras buscando componentes lentos o fallidos para notificarlos al administrador de la red.

**Unidades métricas de medición:** Tiempo de respuesta, Disponibilidad, Tiempo de funcionamiento, Consistencia, Fiabilidad.

**Software de monitorización reconocidos:** Nagios, Pandora FMS, Accelops, Aggregate Network Manager, Barcelona/04 Computing Group, Würth–Phoenix.

## Protocolos TCP / IP

La familia de protocolos de Internet permite la transmisión de datos entre computadoras.

**TCP vs. UDP:**

- **UDP (Transporte no fiable de datagramas).** Usado para audio/vídeo, NFS, RCP. No hay retardos ni seguimiento de paquetes.
- **TCP (Transporte fiable de flujo de bits).** Gestiona retransmisiones, pérdida de paquetes, orden de llegada... VELOCIDAD = UDP / SEGURIDAD = TCP.

**Puertos:** 65536 puertos:
- Bien conocidos (0–1023)
- Registrados (1024–49151)
- Dinámicos/privados (49152–65535)

![Tabla de puertos conocidos](/img/posts/20150525_1.png)

## Configuración de interfaces de red

**Archivo `/etc/network/interfaces`:**

```
# Dinámico:
iface eth0 inet dhcp

# Estático:
iface eth0 inet static
address 192.168.1.10
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.1.255
gateway 192.168.1.1
```

**IPTABLES:** Herramienta de cortafuegos que permite filtrar paquetes y hacer NAT.

**IPROUTE2:** Paquete de utilidades para administrar interfaces. Reemplaza `ifconfig`, `route` y `arp`.

## Dispositivos de interconexión de redes

**Repetidores, Hub, Switch, Bridges, Router, Gateway** — descripción de función, capa del modelo OSI en la que trabajan, características de rendimiento y seguridad.

## Redes cableadas

**Tipos de cables:**
- Coaxial (THICK, THIN)
- Par trenzado (UTP, STP, FTP)
- Fibra óptica (Monomodo, Multimodo con salto de índice o índice gradual)

**Tipos de redes:** LAN, MAN, WAN.

## Seguridad en redes cableadas

**VPN**, **IDS** (TripWire, Snort), **Arranque de servicios** (SSH).

## Seguridad en redes inalámbricas

**WEP** (autenticación de sistema abierto / autenticación mediante clave compartida).

![Diagrama de seguridad WEP](/img/posts/20150525_2.png)

**Claves de encriptación públicas y privadas** (criptografía asimétrica). **Certificados digitales. Firmas digitales.**
