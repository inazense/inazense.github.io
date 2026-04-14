---
title: Envío de emails en Python
description: Aprende a enviar emails automáticamente con Python usando smtplib. Tutorial completo con código para automatizar correos electrónicos, formatear fechas, configurar servidores SMTP y gestión de errores paso a paso
author: Inazio Claver
date: 2016-12-20 12:10:00 +0800
categories: [Python]
tags: [python, emails, smtplib, automatizacion, smtp, scripting]
pin: false
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

Ésta será una entrada rápida.

Os pongo en situación. A partir de hoy en el trabajo debemos fichar diariamente a base de enviar un correo electrónico cuando empecemos cada jornada, tanto por la mañana como por la tarde. Los mails deberán llevar como cabecera nuestro nombre de usuario, la fecha actual en formato DDMMAA y la letra M o T dependiendo si es por la mañana o por la tarde, y en el cuerpo del mensaje deberá llevar un texto en concreto.

Bien, el caso es que soy un poco perro y, como pretendo quedarme bastante tiempo en esta empresa, no me apetece mucho tener que estar escribiendo todos los días, dos veces al día, el mismo correo. Es una tarea repetitiva que se puede automatizar fácilmente.

Y aprovechando que estoy intentando aprender **Python**, ¿qué lenguaje mejor para programar ese **script** que el de la serpiente? Leyendo un poquito vi que **enviar mails con Python** es tremendamente sencillo, enseguida lo veréis.

El **script** debía constar de dos partes, una que extrajera la fecha del sistema y la formateara como yo quisiera, y la segunda que creara un mail y lo mandase.

## El código

El código completo es el siguiente:

```python
# -*- coding: utf-8 -*-
import smtplib
import time

'''
Calcular la hora
'''
if (time.strftime("%p") == "AM"):
 tipoHora = "M"
else:
 tipoHora = "T"

'''
Crear datos de envío
'''
remitente   = "Inazio <remitente@mail.com>"
destinatario  = "destinatario@mail.com"
asunto    = "xxxxxxxxxx" + time.strftime("%d%m%y") + tipoHora
mensaje   = "Aquí va el contenido de nuestro mensaje"

'''
Preparo el mail y agrego campos
'''
email = """From: %s 
To: %s 
MIME-Version: 1.0 
Content-type: text/html 
Subject: %s 
 
%s
""" % (remitente, destinatario, asunto, mensaje)

try:
 smtp = smtplib.SMTP('smtp.mail.com')
 smtp.login('inazio.claver@mail.com', '*******')
 smtp.sendmail(remitente, destinatario, email)
 smtp.quit()
except Exception as e:
 print(e)
```

Vamos a verlo paso a paso para comprender bien lo que hace.

## ¿Qué información necesitamos conocer?

Antes de nada, debemos tener claro qué es lo que necesitamos.

1. Correo electrónico del remitente
2. Correo electrónico del destinatario
3. Dirección del servidor SMTP para envíar el mensaje
4. Asunto y cuerpo de nuestro mensaje

Sabiendo eso, lo primero que haremos será importar las librerías necesarias, que afortunadamente se incluyen en el paquete por defecto. Son time para trabajar con tiempos, y smtplib para envío de correos electrónicos. Además agregaremos nuestra consabida cabecera de utf-8

```python
# -*- coding: utf-8 -*-
import smtplib
import time
```

Ahora viene la parte en la que trabajaremos con la fecha y hora.
La hora se captura con la función ```time.strftime()``` pudiendo pasarle varios parámetros para imprimirla en cadena de texto como deseemos. A saber:

![time.strftime params](/img/posts/20161220_1.png)

Por lo tanto, como quiero construir una cadena que sea DDMMAA y si es por la tarde o por el día, primero averiguaré si es AM o PM y luego concatenaré el resultado en un String.

```python
if (time.strftime("%p") == "AM"):
 tipoHora = "M"
else:
 tipoHora = "T"

'''
El asunto debe ser mi nombre de usuario, más la fecha y si es mañana o tarde. Ej: xxxxxxxxxxxx201216M
'''
asunto    = "xxxxxxxxxx" + time.strftime("%d%m%y") + tipoHora
```

Solo nos queda crear la información que insertaremos en el mail. Lo podemos hacer de la siguiente manera, a través de la sustitución de parámetros indicados en una cadena de texto.

```python
email = """From: %s 
To: %s 
MIME-Version: 1.0 
Content-type: text/html 
Subject: %s
 
%s
""" % (remitente, destinatario, asunto, mensaje)
```

Y ahora trabajaremos configurando nuestro servidor, siempre dentro de una sección try / except.

```python
try:
 smtp = smtplib.SMTP('smtp.mail.com')
 smtp.login('ignacio.claver@mail.com', 'XXX')
 smtp.sendmail(remitente, destinatario, email)
 smtp.quit()
except Exception as e:
 print(e)
```

Lo primero es establecer la dirección de nuestro **servidor SMTP** para posteriormente usar. Después nos loguearemos usando el correo electrónico y la contraseña, y posteriormente usamos la función ```sendmail``` pasandole los parámetros de remitente, destinatario y el **email** a enviar, que establecimos anteriormente.
**Nota**: Según la configuración del servidor **SMTP** a veces no es necesario establecer usuario y contraseña.

Con todo eso ya estamos listos para generar el **mail**. Bastará con lanzar la aplicación desde la consola de **Python** e ir a revisarlo a nuestro cliente de correo electrónico. Si ha habido algún error se mostrará en la consola desde la que hemos lanzado el programa.

![envio de email con python](/img/posts/20161220_2.png)

Si a vosotros no os llega a la bandeja de entrada deberíais revisar la sección de SPAM.

**¡Salud y coding!**