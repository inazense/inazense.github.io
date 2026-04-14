---
title: "Programación multimedia. Intents implícitos"
description: Tutorial de Android para implementar intents implícitos y acceder a funcionalidades del sistema operativo como el navegador, el teléfono, la cámara, Google Maps y el correo electrónico.
date: 2016-01-19 12:00:00 +0800
categories: [Android]
tags: [android, intents, programacion-multimedia, java, action-view, action-call]
pin: false
math: false
mermaid: false
---

En esta entrada se explica cómo usar **intents implícitos** en Android para acceder a funcionalidades del sistema operativo desde una aplicación propia.

## Ejercicio

El objetivo es crear una aplicación con 8 botones que ejecuten diferentes acciones del sistema:

1. Abrir navegador web (web del instituto)
2. Abrir la aplicación de teléfono sin número predefinido
3. Llamar a un número específico (teléfono del instituto)
4. Abrir Google Maps con las coordenadas del instituto
5. Acceder a la cámara de fotos
6. Enviar un correo electrónico preconfigurado
7. Mostrar los contactos del dispositivo
8. Buscar una ubicación en Google Maps

## Layout XML

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context=".ItemsImplicitos">

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Mostrar web del instituto"
        android:id="@+id/btnWebInstituto"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:onClick="verInstituto" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Llamar por telefono a otro emulador"
        android:id="@+id/btnLlamarTelefono"
        android:layout_below="@+id/btnWebInstituto"
        android:layout_centerHorizontal="true"
        android:onClick="llamarTelefono" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Marcar teléfono del instituto"
        android:id="@+id/btnMarcarTelefono"
        android:layout_below="@+id/btnLlamarTelefono"
        android:layout_centerHorizontal="true"
        android:onClick="llamarInstituto" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Google Maps del instituto"
        android:id="@+id/btnMaps"
        android:layout_below="@+id/btnMarcarTelefono"
        android:layout_centerHorizontal="true"
        android:onClick="mapaInstituto" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hacer foto"
        android:id="@+id/btnFoto"
        android:layout_below="@+id/btnMaps"
        android:layout_centerHorizontal="true"
        android:onClick="hacerFoto" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Enviar email al instituto"
        android:id="@+id/btnMail"
        android:layout_below="@+id/btnFoto"
        android:layout_centerHorizontal="true"
        android:onClick="enviarMail" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Mostrar contactos"
        android:id="@+id/btnContactos"
        android:layout_below="@+id/btnMail"
        android:layout_centerHorizontal="true"
        android:onClick="verContactos" />

    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/btnMapsBuscar"
        android:layout_below="@+id/btnContactos"
        android:layout_centerHorizontal="true"
        android:text="Buscar Huesca en Google Maps"
        android:onClick="buscarHuesca" />

</RelativeLayout>
```

## Código Java

### Variables y onCreate()

```java
Button btnWebInstituto;
Button btnLlamarTelefono;
Button btnMarcarTelefono;
Button btnMaps;
Button btnFoto;
Button btnMail;
Button btnContactos;
Button btnMapsBuscar;
Intent intent;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_items_implicitos);
    btnWebInstituto = (Button)findViewById(R.id.btnWebInstituto);
    btnLlamarTelefono = (Button)findViewById(R.id.btnLlamarTelefono);
    btnMarcarTelefono = (Button)findViewById(R.id.btnMarcarTelefono);
    btnMaps = (Button)findViewById(R.id.btnMaps);
    btnFoto = (Button)findViewById(R.id.btnFoto);
    btnMail = (Button)findViewById(R.id.btnMail);
    btnContactos = (Button)findViewById(R.id.btnContactos);
    btnMapsBuscar = (Button)findViewById(R.id.btnMapsBuscar);
}
```

### ACTION_VIEW — Navegador, Maps y contactos

```java
public void verInstituto(View v){
    intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.iessierradeguara.com/site/"));
    startActivity(intent);
}

public void mapaInstituto(View v){
    intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:42.1345931,-0.4053455"));
    startActivity(intent);
}

public void verContactos(View v){
    intent = new Intent(Intent.ACTION_VIEW, ContactsContract.Contacts.CONTENT_URI);
    startActivity(intent);
}

public void buscarHuesca(View v){
    intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:0.0?=Huesca"));
}
```

### ACTION_CALL — Llamada a número específico

```java
public void llamarInstituto(View v){
    intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:974243477"));
    startActivity(intent);
}
```

### ACTION_DIAL — Abrir el teléfono sin número

```java
public void llamarTelefono(View v){
    intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:"));
}
```

### IMAGE_CAPTURE — Acceso a la cámara

```java
public void hacerFoto(View v){
    intent = new Intent("android.media.action.IMAGE_CAPTURE");
    startActivity(intent);
}
```

### ACTION_SEND — Enviar correo electrónico

```java
public void enviarMail(View v){
    intent = new Intent(Intent.ACTION_SEND);
    intent.setType("text/plain");
    intent.putExtra(Intent.EXTRA_SUBJECT, "Reciclaje tecnologico");
    intent.putExtra(Intent.EXTRA_TEXT, "Información sobre el proyecto de Educacion 2015");
    intent.putExtra(Intent.EXTRA_EMAIL, "iessguhuesca@educa.aragon.es");
    startActivity(intent);
}
```

## Permisos en AndroidManifest.xml

Para acceder a funcionalidades como el teléfono, la cámara o la ubicación, es necesario declarar los permisos correspondientes en el fichero `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```
