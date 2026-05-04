---
title: Principios SOLID. cinco ideas para no pelearte con tu propio código
description: Aprende qué son los principios SOLID y cómo aplicarlos en Java con ejemplos sencillos sobre responsabilidad única, abierto/cerrado, sustitución de Liskov, segregación de interfaces e inversión de dependencias.
author: Inazio Claver
date: 2026-05-04 17:49:00 +0200
categories: [Java]
tags: [java, solid, programacion-orientada-a-objetos, oop, patrones, buenas-practicas, clean-code]
pin: false
featured: true
math: false
mermaid: false
#image:
#  path: /commons/devices-mockup.png
#  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
#  alt: Responsive rendering of Chirpy theme on multiple devices.
---

# Principios SOLID: cinco ideas para no pelearte con tu propio código

![Cabecera sobre principios SOLID](/img/posts/20260504_1.png)

Hay temas que cuando empiezas a programar te suenan a teoría pura. A algo que está bien saber, pero que tampoco parece urgente. Con SOLID me pasó un poco eso.

Al principio bastante tenemos con sacar el ejercicio, hacer que compile y conseguir que no explote nada por sitios raros. Pero en cuanto empiezas a tocar proyectos algo más grandes, o simplemente vuelves a tu código de hace unos meses, te das cuenta de que no todo consiste en que funcione. También importa que se entienda, que se pueda cambiar sin miedo y que no te obligue a romper tres cosas cada vez que quieres añadir una cuarta.

Ahí es donde entran los principios SOLID.

No son magia, ni una receta universal, ni mucho menos algo que haya que meter con calzador en cualquier clase de veinte líneas. Pero sí vienen muy bien como guía para diseñar mejor las clases y evitar algunos errores bastante típicos cuando trabajamos con orientación a objetos.

## Entonces, ¿qué es SOLID?

SOLID es el nombre que se le da a cinco principios de diseño orientado a objetos pensados para que el código sea más fácil de mantener, más flexible y menos acoplado [1][2]. El blog ha publicado durante años contenido práctico sobre clases, objetos, paquetes y patrones en Java y Python, así que este tema encaja muy bien con esa línea de explicaciones paso a paso [1][3][2].

Las siglas corresponden a esto:

- **S**: Single Responsibility Principle.
- **O**: Open/Closed Principle.
- **L**: Liskov Substitution Principle.
- **I**: Interface Segregation Principle.
- **D**: Dependency Inversion Principle.

Visto así parece el típico listado que uno memoriza para un examen y luego olvida. Pero si lo bajas a ejemplos del día a día, tiene bastante más sentido del que parece.

## S: una clase, una responsabilidad

Este es seguramente el más fácil de entender. La idea es que una clase debería tener un único motivo para cambiar. O dicho de forma menos solemne: mejor que cada clase se dedique a una cosa y no a siete a la vez.

Por ejemplo, imaginemos una clase `Usuario` que valida datos, guarda información en base de datos, genera informes y además manda correos. ¿Se puede hacer? Sí. ¿Es buena idea? Más bien no.

Cuando mezclamos responsabilidades, el código se vuelve más difícil de mantener. Un cambio en la validación puede afectar al guardado, una modificación en base de datos puede romper otra parte y al final todo queda demasiado atado.

```java
class Usuario {
    private String nombre;
    private String email;
}

class ValidadorUsuario {
    public boolean validar(Usuario usuario) {
        return usuario != null && usuario.getEmail() != null;
    }
}

class UsuarioRepository {
    public void guardar(Usuario usuario) {
        // guardar usuario
    }
}

class EmailService {
    public void enviarBienvenida(Usuario usuario) {
        // enviar correo
    }
}
```

Aquí no hay nada especialmente sofisticado, pero sí una idea clara: separar tareas suele hacer la vida bastante más fácil.

## O: abierto a crecer, cerrado a tocar lo que ya funciona

El principio abierto/cerrado dice que una clase debería estar abierta a extensión, pero cerrada a modificación. Es decir, deberíamos poder añadir comportamiento nuevo sin andar reescribiendo una clase estable cada dos por tres.

Esto se nota mucho cuando empiezan a aparecer condicionales por todos lados. El típico caso: una clase que procesa pagos, y según si el pago es con tarjeta, PayPal, transferencia o lo que toque, metemos otro `if` más. Hoy son dos casos, mañana cinco, pasado mañana nueve.

Una alternativa bastante mejor es apoyarse en abstracciones.

```java
interface MetodoPago {
    void pagar(double importe);
}

class PagoTarjeta implements MetodoPago {
    public void pagar(double importe) {
        // lógica de tarjeta
    }
}

class PagoPaypal implements MetodoPago {
    public void pagar(double importe) {
        // lógica de paypal
    }
}
```

De esta forma, si mañana aparece otro método de pago, se añade una nueva implementación y listo. Menos riesgo de cargarse lo que ya estaba funcionando.

## L: si hereda, que se comporte como se espera

El principio de sustitución de Liskov es de esos que suenan más aparatosos de lo que realmente son. Viene a decir que si una clase hereda de otra, deberíamos poder usar la hija en lugar de la padre sin que el programa empiece a hacer cosas raras.

Parece de sentido común, pero no siempre se respeta. A veces se hereda solo por reutilizar código, aunque la relación no tenga demasiado sentido. Y ahí empiezan los problemas.

El ejemplo clásico suele ser el de una clase `Ave` con un método `volar()`, y luego aparece `Pinguino` heredando de `Ave`. Claro, el pingüino ave es, pero volar, lo que se dice volar, no vuela demasiado.

Cuando pasa algo así, normalmente no falla solo el diseño: también nos está avisando de que quizá la jerarquía no está bien planteada.

## I: interfaces pequeñas, mejor que monstruos de veinte métodos

Este principio dice que una clase no debería verse obligada a implementar métodos que no necesita. O, dicho de otra forma, mejor varias interfaces pequeñas y concretas que una gigantesca para todo.

Es algo bastante habitual cuando uno intenta “dejarlo todo preparado” y acaba creando una interfaz enorme con métodos para imprimir, exportar, validar, serializar, conectar, enviar y cocinar croquetas. Luego llega una clase que solo necesita dos de esos métodos y toca implementar el resto porque sí.

```java
interface Imprimible {
    void imprimir();
}

interface Exportable {
    void exportar();
}
```

No tiene mucho misterio: si algo solo necesita imprimir, que implemente `Imprimible`. Si además exporta, que implemente también `Exportable`. Y si no, mejor no inventarse obligaciones.

## D: depender de abstracciones da bastante aire

La D corresponde a inversión de dependencias. Aquí la idea es que el código importante de la aplicación no dependa directamente de implementaciones concretas, sino de abstracciones.

Dicho así parece una frase de libro, pero en realidad se ve rápido con un ejemplo. Si una clase depende directamente de `EmailService`, queda atada a esa forma de notificar. Si mañana queremos mandar avisos por SMS o por Telegram, ya toca modificar esa clase.

```java
interface Notificador {
    void enviar(String mensaje);
}

class EmailNotificador implements Notificador {
    public void enviar(String mensaje) {
        // enviar email
    }
}

class ServicioPedidos {
    private final Notificador notificador;

    public ServicioPedidos(Notificador notificador) {
        this.notificador = notificador;
    }

    public void confirmar() {
        notificador.enviar("Pedido confirmado");
    }
}
```

La diferencia está en que `ServicioPedidos` no necesita saber cómo se envía el mensaje. Solo necesita que exista alguien capaz de enviarlo.

## Lo importante de verdad

Con SOLID pasa como con muchas buenas prácticas: entendido con sentido común, ayuda. Aplicado de forma rígida a cualquier cosa, puede acabar complicando más de la cuenta.

No hace falta convertir una utilidad pequeña en una arquitectura espacial. Pero tampoco está de más acostumbrarse a detectar ciertas señales: clases que hacen demasiadas cosas, dependencias demasiado fuertes, interfaces infladas o herencias que chirrían.

Al final, lo bueno de estos principios no es que tengan nombre en inglés ni que queden elegantes en una entrevista. Lo útil es que te obligan a parar un momento y pensar si el código que estás escribiendo hoy te lo vas a agradecer mañana o te vas a acordar de toda tu ascendencia cuando tengas que tocarlo dentro de seis meses.

**¡Salud y coding!**