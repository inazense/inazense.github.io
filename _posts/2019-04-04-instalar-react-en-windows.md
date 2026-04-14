---
title: ReactJS I. Instalar React en Windows
description: "Guía completa para instalar React en Windows 10 paso a paso: descarga Node.js, configuración de npm, instalación de create-react-app y creación de tu primer proyecto ReactJS con ejemplos prácticos."
author: Inazio Claver
date: 2019-04-04 11:33:00 +0800
categories: [JavaScript]
tags: [react, reactjs, javascript, windows, nodejs, npm, create-react-app, instalacion]
pin: false
math: false
mermaid: false
#image:
#  path: /img/posts/reactjs-install-placeholder.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VLIAAAA
#  alt: ReactJS tutorial para Windows.
---

**ReactJS** (o React a secas) es una **librería JavaScript** de código abierto creada por **Facebook** para diseñar interfaces de usuario. No os voy a aburrir con más teoría porque eso es muy fácil de encontrar, así que os enlazo directamente con [el artículo de Wikipedia](https://es.wikipedia.org/wiki/React) y si os apetece podéis leerlo tranquilamente. 

Aquí nos vamos a centrar en la parte más práctica y, aprovechando que estoy en pleno aprendizaje de esta tecnología, iré escribiendo en una nueva sección de tutoriales lo que vaya consiguiendo aprender.

Esta entrada será muy cortita, así que vamos al grano.

## ¿Cómo instalar ReactJS en Windows?

Para instalar **React en Windows 10** usaremos el gestor de paquetes **npm**, que se incluye en la instalación de **NodeJS** (si bien no estamos supeditados a crear el backend de nuestra app con NodeJS, podemos usar el que más rabia nos dé).

Nos vamos a la web de Node ([https://nodejs.org/es/download/](https://nodejs.org/es/download/)) y descargamos la versión que nos apetezca. En mi caso la de **64 bits**. Una vez descargado simplemente lo instalamos (siguiente - siguiente - siguiente) y al finalizar solo nos quedará comprobar si la instalación se ha llevado a cabo correctamente.

Abrimos la **consola de comandos** y escribimos este comando para que nos devuelva la versión actual de **Node**:

```bash
node --version
```

Y lo mismo para comprobar si está instalado **npm**:

```bash
npm --version
```

Si ha ido todo bien, veremos algo como lo siguiente:

![Versiones de Node y npm](/img/posts/20190404_1.png)

¿Tenemos todo ok? Perfecto. ¿No tenemos algo similar a la imagen? Eso se ha producido debido a que no se han agregado esos comandos a las **variables de entorno**. Podemos solucionarlo siguiendo los pasos que especifican en [ésta pregunta de Stackoverflow](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10).

Una vez que esa parte nos funciona, lo siguiente será hacer la instalación de todos los paquetes necesarios para **ReactJS**.

Escribiremos el siguiente comando:

```bash
npm install -g create-react-app
```

Con este comando lo que hacemos es instalar **ReactJS** en nuestro ordenador de forma **global**. Si no agregásemos el parámetro `-g` sólo podríamos usar ReactJS en la carpeta donde hemos ejecutado el código. 

También podemos comprobar si se ha ejecutado correctamente con el comando:

```bash
create-react-app --version
```

De esta manera lo podremos emplear donde gustemos. Veremos algo tal que así:

![Create React App instalado](/img/posts/20190404_2.png)

¡Conseguido! Estamos listos para el último paso, **crear un nuevo proyecto de ReactJS**.

## ¿Cómo crear un proyecto ReactJS en Windows?

Es harto sencillo y escribimos el siguiente comando:

```bash
create-react-app my-app
```

Este comando generará todo lo necesario para poder empezar a usar la nueva aplicación de **ReactJS**. Veremos lo siguiente por consola:

![Creando proyecto React](/img/posts/20190404_3.png)

Al final de la imagen podemos ver que nos dan las instrucciones necesarias para arrancar nuestra aplicación de **ReactJS**, así comprobamos que todo está funcionando como debiera. 

Ejecutamos los siguientes comandos:

```bash
cd my-app
npm start
```

Y en nuestro navegador por defecto se abrirá la siguiente web:

![ReactJS localhost](/img/posts/20190404_4.png)

Eso sería todo de momento, en futuras entregas iremos ampliando con más cositas.

**¡Salud y coding!**