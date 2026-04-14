---
title: "Acceso a datos. Introducción a los JavaBeans"
description: Introducción a los componentes JavaBeans en Java, sus características, tipos de propiedades, eventos, y cómo crear y empaquetar beans con NetBeans.
date: 2015-11-03 15:00:00 +0800
categories: [Java]
tags: [java, javabeans, componentes, propiedades, eventos, acceso-a-datos, serializable]
pin: false
math: false
mermaid: false
---

## ¿Qué son los componentes software?

Al igual que en la industria electrónica se utilizan componentes para construir placas, en el desarrollo de software se crean interfaces mediante componentes: paneles, botones, etiquetas, listas desplegables, barras de desplazamiento, diálogos, menús, etc.

Los primeros componentes exitosos fueron los **VBX** (Visual Basic Extension), seguidos por los **OCX** (OLE Custom Controls). La principal ventaja de los **JavaBeans** frente a sus predecesores es su independencia de la plataforma.

## Definición de JavaBean

Un **JavaBean** o *bean* es un componente de software reutilizable que puede manipularse visualmente mediante herramientas de programación Java. Las librerías gráficas AWT son ejemplos de componentes de este tipo.

**Características compartidas por todos los beans:**

- **Introspection**: permite a las herramientas conocer las propiedades y eventos del bean.
- **Customization**: el comportamiento del bean puede personalizarse.
- **Events**: mecanismo de comunicación entre beans.
- **Properties**: atributos que afectan a su apariencia o comportamiento.
- **Persistence**: el estado del bean puede guardarse y recuperarse.

**Reglas que debe cumplir un bean:**

- Constructor por defecto sin argumentos.
- Implementar la interfaz `Serializable`.
- Tener introspección mediante patrones de diseño reconocibles (getters/setters).

## Propiedades

Una propiedad es un atributo del JavaBean que afecta a su apariencia o conducta. Se acceden mediante:

- **Getter**: lee el valor de la propiedad.
- **Setter**: cambia el valor de la propiedad.

**Convenciones de nombres:**

```java
public void setNombrePropiedad(TipoPropiedad valor)
public TipoPropiedad getNombrePropiedad()
```

### Propiedades simples

Representan un único valor:

```java
private String nombre;

public void setNombre(String nuevoNombre) {
    nombre = nuevoNombre;
}

public String getNombre() {
    return nombre;
}
```

Para propiedades booleanas se usa `is` en lugar de `get`:

```java
private boolean conectado = false;

public void setConectado(Boolean nuevoValor) {
    conectado = nuevoValor;
}

public boolean isConectado() {
    return conectado;
}
```

### Propiedades indexadas

Representan un array de valores y exponen métodos para acceso individual y en bloque:

```java
private int[] numeros = {1, 2, 3, 4};

public void setNumeros(int[] nuevoValor) {
    numeros = nuevoValor;
}

public int[] getNumeros() {
    return numeros;
}

public void setNumeros(int indice, int nuevoValor) {
    numeros[indice] = nuevoValor;
}

public int getNumeros(int indice) {
    return numeros[indice];
}
```

### Propiedades ligadas (bound)

Notifican a otros objetos cuando su valor cambia, permitiendo que esos objetos reaccionen al cambio.

### Propiedades restringidas (constrained)

Similar a las ligadas, pero los listeners pueden **vetar** el cambio propuesto, impidiendo que se produzca.

## Eventos

Los beans se comunican entre sí mediante eventos. Una fuente de eventos notifica a sus listeners cuando se produce un cambio. Los listeners implementan la interfaz correspondiente para reaccionar.

## Ejemplo completo: Asalariado y Hacienda

### Asalariado.java

Bean con una propiedad ligada que notifica a `Hacienda` cada vez que cambia el sueldo:

```java
package proyectoxhacienda;

import java.beans.*;
import java.io.Serializable;

public class Asalariado implements Serializable {
    private PropertyChangeSupport propertySupport;
    private int sueldo;

    public Asalariado() {
        propertySupport = new PropertyChangeSupport(this);
        sueldo = 20;
    }

    public void addPropertyChangeListener(PropertyChangeListener listener) {
        propertySupport.addPropertyChangeListener(listener);
    }

    public void removePropertyChangeListener(PropertyChangeListener listener) {
        propertySupport.removePropertyChangeListener(listener);
    }

    public void setSueldo(int nuevoSueldo) {
        int anteSueldo = sueldo;
        sueldo = nuevoSueldo;
        if (anteSueldo != nuevoSueldo) {
            propertySupport.firePropertyChange("sueldo", anteSueldo, sueldo);
        }
    }

    public int getSalario() {
        return sueldo;
    }
}
```

### Hacienda.java

Listener que reacciona a los cambios de sueldo:

```java
package proyectoxhacienda;

import java.beans.*;
import java.io.Serializable;

public class Hacienda implements Serializable, PropertyChangeListener {
    public Hacienda() {}

    public void propertyChange(PropertyChangeEvent evt) {
        System.out.println("Hacienda: nuevo sueldo " + evt.getNewValue());
        System.out.println("Hacienda: sueldo anterior " + evt.getOldValue());
    }
}
```

### ProyectoxHacienda.java

Programa principal que conecta el bean con el listener:

```java
package proyectoxhacienda;

public class ProyectoxHacienda {
    public static void main(String[] args) {
        Hacienda funcionario1 = new Hacienda();
        Asalariado empleado = new Asalariado();
        System.out.println("---------------------------");
        empleado.addPropertyChangeListener(funcionario1);
        empleado.setSueldo(50);
    }
}
```

## Crear JavaBeans con NetBeans

1. Arrancar NetBeans.
2. Menú **Archivo → Proyecto nuevo → Java → Java ClassLibrary**.
3. Clic derecho sobre el proyecto → **Nuevo → Componente JavaBeans**.
4. Escribir el nombre del bean y del paquete.
5. Eliminar el atributo `sampleProperty` y sus métodos.
6. Añadir los atributos necesarios.
7. Generar getters y setters: clic derecho → **Insertar código**.
8. Generar el JAR: clic derecho sobre el proyecto → **Generar**.

## Empaquetamiento con Manifest

El fichero `MANIFEST.MF` describe el contenido del JAR e indica qué clases son beans:

```
Manifest-Version: 1.0

Name: ejemploBeans/miBean.class
Java-Bean: True

Name: ejemploBeans/auxiliar.class
Java-Bean: False

Name: ejemploBeans/imagen.png
Java-Bean: False
```

**Comando para crear el JAR desde la línea de comandos:**

```
jar cfm archivogenerado.jar META-INF/MANIFEST.MF carpetadeclases/*.class
```

Opciones:
- `c` — crear fichero nuevo
- `f` — salida a fichero (en lugar de stdout)
- `m` — añadir líneas del manifiesto

## Ventajas de los JavaBeans

- Reutilización de software
- Reducción de la complejidad
- Mejoras en el mantenimiento
- Incremento de la calidad del software
