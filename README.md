# UnidadRestitucionTierras

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.15.

## Documentación

- [Arquitectura y Mejores Prácticas](./docs/ARCHITECTURE.md) - Descripción de la arquitectura del proyecto, principios SOLID y mejores prácticas implementadas
- [Guía de Estilo de Código](./docs/CODE_STYLE_GUIDE.md) - Convenciones de código y estándares del proyecto

## Servidor de Desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté ejecutándose, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques cualquiera de los archivos fuente.

## Scaffolding de Código

Angular CLI incluye potentes herramientas de scaffolding. Para generar un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para obtener una lista completa de schematics disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Construcción

Para construir el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y almacenará los artefactos de construcción en el directorio `dist/`. Por defecto, la construcción de producción optimiza tu aplicación para rendimiento y velocidad.

## Ejecutar Pruebas Unitarias

Para ejecutar pruebas unitarias con el test runner [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Ejecutar Pruebas End-to-End

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no viene con un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Características del Proyecto

### Gestión de Sentencias
- Carga y visualización de sentencias judiciales
- Upload de documentos asociados
- Seguimiento de estados de procesamiento
- Gestión de errores con retroalimentación detallada

### Tecnologías Utilizadas
- Angular 17
- PrimeNG - Librería de componentes UI
- RxJS - Programación reactiva
- TypeScript - Tipado estático

### Mejores Prácticas Implementadas
- Principios SOLID
- Gestión adecuada de subscripciones (takeUntil pattern)
- Tipado fuerte de TypeScript
- Documentación JSDoc
- Accesibilidad (WCAG 2.1)
- SEO optimizado
- Arquitectura escalable

## Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página de [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
