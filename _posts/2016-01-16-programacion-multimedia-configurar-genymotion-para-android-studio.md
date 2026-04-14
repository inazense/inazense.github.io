---
title: "Programación multimedia. Configurar GenyMotion para Android Studio"
description: Tutorial paso a paso para instalar y configurar GenyMotion como emulador de Android alternativo al de Android Studio, con integración mediante plugin.
date: 2016-01-16 12:00:00 +0800
categories: [Android]
tags: [android, genymotion, android-studio, emulador, programacion-multimedia]
pin: false
math: false
mermaid: false
---

El emulador de smartphones de Android Studio va bastante lento. Una alternativa mucho más rápida es **GenyMotion**, una máquina virtual basada en VirtualBox que ofrece dispositivos Android preconfigurados con un rendimiento notablemente superior.

## ¿Qué es GenyMotion?

GenyMotion es un emulador de Android basado en VirtualBox. Proporciona dispositivos virtuales preconfigurados y se integra directamente con Android Studio mediante un plugin. La diferencia de velocidad respecto al emulador nativo es brutal.

## Pasos de instalación y configuración

### 1. Descargar GenyMotion

Acceder a la web oficial de GenyMotion en [https://www.genymotion.com](https://www.genymotion.com) y crear una cuenta gratuita para poder descargar la versión personal.

### 2. Seleccionar un dispositivo virtual

Una vez instalado GenyMotion, abrir el panel de control y pulsar el botón **"+"** para añadir un nuevo dispositivo. Iniciar sesión con la cuenta creada anteriormente para acceder al catálogo de dispositivos Android preconfigurados y descargar el que se necesite.

### 3. Instalar el plugin de GenyMotion en Android Studio

Desde Android Studio, ir a:

```
File → Settings → Plugins → Browse repositories
```

Buscar **"GenyMotion"** e instalar el plugin. Reiniciar Android Studio cuando se solicite.

### 4. Configurar la ruta de instalación

Tras reiniciar, ir a:

```
File → Settings → Other Settings → Genymotion
```

Indicar la ruta donde está instalado GenyMotion, por ejemplo:

```
C:\Program Files\Genymobile\Genymotion
```

### 5. Lanzar la emulación

Una vez configurado, aparecerá un icono de smartphone rosa en la barra de herramientas de Android Studio. Al pulsarlo, se puede seleccionar el dispositivo GenyMotion y arrancarlo con el botón **"Start"**. Desde ese momento se puede desplegar la aplicación sobre el emulador de GenyMotion igual que se haría con cualquier otro dispositivo.

## Conclusión

La diferencia de rendimiento respecto al emulador nativo de Android Studio es muy significativa, haciendo que el ciclo de desarrollo sea mucho más ágil. GenyMotion es especialmente útil cuando se necesita probar la aplicación con frecuencia durante el desarrollo.
