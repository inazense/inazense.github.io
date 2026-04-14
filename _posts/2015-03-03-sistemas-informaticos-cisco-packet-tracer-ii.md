---
title: Sistemas informáticos. Cisco Packet Tracer (II)
description: Práctica de subnetting y configuración de DHCP relay en Cisco Packet Tracer con cinco redes conectadas a través de un router central.
author: Inazio Claver
date: 2015-03-03 12:00:00 +0800
categories: [Sistemas informáticos]
tags: [sistemas-informaticos, cisco, redes, dhcp, subnetting]
pin: false
math: false
mermaid: false
---

En esta práctica de Cisco Packet Tracer hemos montado una red con cinco segmentos conectados a través de un router central, configurando un servidor DHCP centralizado con relay para todas las subredes.

## Requisitos de la red

| Red   | Hosts necesarios         |
|-------|--------------------------|
| Red A | 13 hosts                 |
| Red B | 6 hosts                  |
| Red C | 30 hosts                 |
| Red D | 1 servidor DHCP (Internet) |
| Red E | 60 hosts                 |

## Tabla de subnetting

A partir de los requisitos anteriores se calcula la tabla de direccionamiento con sus respectivas máscaras de subred y rangos de IPs para cada segmento.

## Configuración del servidor DHCP

El servidor DHCP recibe una IP estática `192.168.0.161` en su interfaz 0 (conectada al router).

## Configuración del DHCP relay en el router

Para que el servidor DHCP centralizado pueda asignar IPs a los equipos de todas las redes, hay que configurar el relay en cada interfaz del router. Los comandos CLI son los siguientes (se repite para cada interfaz):

```
enable
configure terminal
interface FastEthernet9/0
ip helper-address 192.168.0.161
```

El comando `ip helper-address` redirige las peticiones DHCP broadcast de cada subred hacia la IP del servidor DHCP.

## Resultado

Tras la configuración, las pruebas de ping entre equipos de distintas redes se resuelven correctamente, confirmando que la conectividad entre subredes funciona bien.

El fichero de práctica está disponible para descargar en Google Drive.

**¡Salud y coding!**
