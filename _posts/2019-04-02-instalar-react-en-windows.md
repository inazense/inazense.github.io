---
title: Instalar React en Windows
description: Instalación de React JS en Windows y generación de proyecto nuevo
author: inazense
date: 2019-04-02 11:52:00 +0100
categories: [React JS]
tags: [react, javascript, windows, instalacion]
image:
  path: /assets/pictures/posts/reactjs_logo.jpeg
  alt: ReactJS post
---

**ReactJS** (o **React** a secas) es una librería **Javascript** de **código abierto** creada por **Facebook** para diseñar interfaces de usuario en aplicaciones de una sola página. No os voy a aburrir con más teoría porque eso es muy fácil de encontrar, así que os enlazo directamente con pensada el artículo de Wikipedia y si os apetece podéis leerlo tranquilamente.

Aquí nos vamos a centrar en la parte más práctica y, aprovechando que estoy en pleno aprendizaje de esta tecnología, iré escribiendo en una nueva sección de **tutoriales** lo que vaya consiguiendo aprender.

Esta entrada será muy cortita, así que vamos al grano.

## ¿Cómo instalar ReactJS en Windows?

Para instalar **React** en **Windows 10** usaremos el gestor de paquetes **npm**, que se incluye en la instalación de **NodeJS** (si bien no estamos supeditados a crear el **backend** de nuestra app con **NodeJS**, podemos usar el que más rabia nos de).

Nos vamos a la web de **Node** (https://nodejs.org/es/download/) y descargamos la versión que nos apetezca. En mi caso la de **64 bits**.
Una vez descargado simplemente lo instalamos (siguiente - siguiente - siguiente) y al finalizar solo nos quedará comprobar si la instalación se ha llevado a cabo correctamente.

Abrimos la consola de comandos y escribimos este comando para que nos devuelva la versión actual de **Node**

```bash
node --version
```

Y lo mismo para comprobar si está instalado **npm**

```bash
npm --version
```

Si ha ido todo bien, veremos algo como lo siguiente

```bash
> node --version
v10.15.3

> npm --version
6.4.1
```

¿Tenemos todo ok? Perfecto. ¿No tenemos algo similar a la imagen? Eso se ha producido debido a que no se han agregado esos **comandos** a las variables de entorno. Podemos solucionarlo siguiendo los pasos que especifican en ésta pregunta de Stackoverflow.

Una vez que esa parte nos funciona, lo siguiente será hacer la instalación de todos los paquetes necesarios para **ReactJS**.

Escribiremos el siguiente comando

```bash
npm install -g create-react-app
```

Con este comando lo que hacemos es instalar **ReactJS** en nuestro ordenador de forma global. Si no agregásemos el parámetro -g sólo podríamos usar **ReactJS** en la carpeta donde hemos ejecutado el código. También podemos comprobar si se ha ejecutado correctamente con el comando

```bash
create-react-app --version
```

De esta manera lo podremos emplear donde gustemos. Veremos algo tal que así

```bash
> create-react-app --version
+ create-react-app@2.1.8
added 63 packages from 20 contributors in 4.068s

> create-react-app --version
2.1.8
```

¡Conseguido! Estamos listos para el último paso, crear un nuevo proyecto de **ReactJS**

## ¿Cómo crear un proyecto ReactJS en Windows?

Es harto sencillo y lo vamos a hacer desde la misma consola de **comandos**. Nos iremos al directorio donde queremos que se almacene el nuevo proyecto y escribimos el siguiente comando

```shell
create-react-app my-app
```

Este comando generará todo lo necesario para poder empezar a usar la nueva aplicación de **ReactJS**.

Al final podemos ver que nos dan las instrucciones necesarias para arrancar nuestra aplicación de ReactJS, así comprobamos que todo está funcionando como debiera.
Ejecutamos los siguientes comandos

```shell
cd my-app
npm start
```

Y en nuestro navegador por defecto se abrirá la siguiente web

![tqdm implementation](/assets/pictures/posts/reactjs_localhost.png)

Eso sería todo de momento, en futuras entregar iremos ampliando con más cositas.

**¡Salud y coding!**
