# Arquitectura y Mejores Prácticas

Este documento describe la arquitectura y las mejores prácticas implementadas en el proyecto de la Unidad de Restitución de Tierras.

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Módulo principal con servicios y modelos compartidos
│   │   ├── constants/           # Constantes de la aplicación
│   │   ├── models/              # Interfaces y tipos de datos
│   │   ├── services/            # Servicios compartidos
│   │   └── utils/               # Utilidades y funciones auxiliares
│   └── features/                # Módulos de características
│       └── sentencias/          # Módulo de gestión de sentencias
│           ├── components/      # Componentes de la característica
│           ├── pages/           # Páginas de la característica
│           └── pipes/           # Pipes personalizados
└── environments/                # Configuración de entornos
```

## Principios SOLID Implementados

### 1. Single Responsibility Principle (SRP)
- Cada componente tiene una única responsabilidad
- Los servicios manejan la lógica de negocio
- Las utilidades (`DateUtils`) centralizan funcionalidades específicas
- Las constantes están separadas en archivos dedicados

### 2. Open/Closed Principle (OCP)
- Los componentes están abiertos para extensión pero cerrados para modificación
- Uso de interfaces para definir contratos

### 3. Liskov Substitution Principle (LSP)
- Las interfaces `Sentencia` y `SentenciaApiResponse` mantienen compatibilidad
- El principio se aplica en la herencia de interfaces

### 4. Interface Segregation Principle (ISP)
- Interfaces específicas para cada caso de uso
- `Sentencia`, `SentenciaApiResponse`, `DetalleErrorResponse` son interfaces segregadas

### 5. Dependency Inversion Principle (DIP)
- Los componentes dependen de abstracciones (servicios inyectados)
- No hay dependencias directas de implementaciones concretas

## Mejores Prácticas de Angular

### Gestión de Subscripciones
Se implementa el patrón `takeUntil` para prevenir memory leaks:

```typescript
private readonly destroy$ = new Subject<void>();

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}

// En las subscripciones
this.service.getData()
  .pipe(takeUntil(this.destroy$))
  .subscribe(...);
```

### Inmutabilidad
- Uso de `readonly` para propiedades que no deben modificarse
- Constantes definidas con `as const` para type safety

### TypeScript Estricto
- Evitar el tipo `any`, usar `unknown` cuando sea necesario
- Tipado fuerte en todas las interfaces y métodos
- JSDoc comments para documentación

## Arquitectura de Componentes

### SentenciasTableComponent
Refactorizado siguiendo principios SOLID:

#### Métodos Públicos
- Métodos de interacción del usuario
- Manejadores de eventos

#### Métodos Privados
- Lógica de negocio interna
- Procesamiento de datos
- Manejo de errores

#### Separación de Responsabilidades
```typescript
// Carga de datos
private cargarSentencias(): void { }

// Mapeo de datos
private mapearSentencias(data: any[]): Sentencia[] { }

// Validación
private validarFormulario(): boolean { }

// Procesamiento
private procesarSentenciaAgregada(sentencia: any): void { }
```

## SEO y Accesibilidad

### Meta Tags Implementados
- `<meta name="description">` - Descripción del sitio
- `<meta name="keywords">` - Palabras clave
- `<meta name="robots">` - Control de indexación
- Open Graph tags para redes sociales
- Theme color para navegadores móviles

### Accesibilidad (WCAG 2.1)
- ARIA labels en todos los elementos interactivos
- `role` attributes para elementos dinámicos
- `aria-live` para contenido dinámico
- `aria-describedby` para mensajes de error
- Estructura semántica HTML5 (`<header>`, `<section>`, `<h1>`)
- Atributo `lang="es"` en el HTML

## Gestión de Constantes

Todas las cadenas de texto y valores constantes están centralizados en:
- `sentencias.constants.ts`

Beneficios:
- Fácil mantenimiento
- Prevención de errores tipográficos
- Facilita la internacionalización futura
- Type safety con TypeScript

## Utilidades

### DateUtils
Centraliza la lógica de parseo de fechas:
```typescript
DateUtils.parseFechaDDMMYYYY(fecha: string | Date): Date | string
```

Beneficios:
- Reutilizable en toda la aplicación
- Fácil de testear
- Lógica centralizada

## Manejo de Errores

### Patrón Implementado
1. Captura de errores en subscripciones
2. Transformación de errores a mensajes de usuario
3. Uso de constantes para mensajes
4. Feedback visual con PrimeNG Toast

```typescript
private manejarErrorAgregar(): void {
  this.mensajeAgregar = MENSAJES.ERROR_AGREGAR_SENTENCIA;
  this.messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: MENSAJES.ERROR_AGREGAR_SENTENCIA,
    life: 5000
  });
}
```

## Documentación del Código

### JSDoc Comments
Todos los métodos, clases e interfaces están documentados:

```typescript
/**
 * Carga la lista de sentencias desde el servicio
 */
private cargarSentencias(): void { }
```

### Beneficios
- IntelliSense mejorado en el IDE
- Generación automática de documentación
- Mejor comprensión del código

## Variables de Entorno

```typescript
export const environment = {
  apiDomain: process.env['NG_APP_API_DOMAIN'] || 'http://localhost:3000',
  apiPath: '/api/v1/ia/extracciones-sentencias',
  get apiUrl(): string {
    return this.apiDomain + this.apiPath;
  }
};
```

## Recomendaciones Futuras

1. **Testing**
   - Implementar tests unitarios con Jasmine/Karma
   - Tests E2E con Cypress o Playwright

2. **Internacionalización (i18n)**
   - Implementar @angular/localize
   - Mover constantes a archivos de traducción

3. **Lazy Loading**
   - Implementar carga perezosa de módulos

4. **State Management**
   - Considerar NgRx o Akita para estado global

5. **Progressive Web App (PWA)**
   - Implementar Service Workers
   - Caché de recursos

6. **Performance**
   - OnPush change detection strategy
   - Virtual scrolling para tablas grandes
   - Optimización de bundles

7. **Seguridad**
   - Implementar autenticación y autorización
   - HTTPS en producción
   - Sanitización de inputs

## Conclusión

Este proyecto implementa las mejores prácticas de desarrollo Angular, siguiendo los principios SOLID, con enfoque en mantenibilidad, escalabilidad y accesibilidad. La estructura facilita la colaboración en equipo y el crecimiento sostenible del proyecto.
