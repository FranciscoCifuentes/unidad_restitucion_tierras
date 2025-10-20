# 🏛️ Unidad de Restitución de Tierras

## 📋 Descripción del Proyecto

Sistema web desarrollado con Angular para la gestión y visualización de sentencias judiciales de la Unidad de Restitución de Tierras. Esta aplicación permite a los usuarios cargar, monitorear y gestionar providencias judiciales, facilitando el seguimiento del proceso de extracción y procesamiento de información mediante inteligencia artificial.

La aplicación proporciona una interfaz intuitiva para:
- 📤 **Cargar sentencias judiciales** mediante archivos PDF con su número de radicado
- 📊 **Visualizar el estado** de procesamiento de cada sentencia en tiempo real
- 🔍 **Consultar detalles** de errores cuando una sentencia no se procesa correctamente
- 🗑️ **Eliminar registros** de sentencias cuando sea necesario
- ⏱️ **Monitorear tiempos** de procesamiento transcurridos

## ✨ Características Principales

- **Gestión Completa de Sentencias**: Carga, visualización, consulta y eliminación de providencias judiciales
- **Estados en Tiempo Real**: Seguimiento del ciclo de vida de cada sentencia desde su recepción hasta su finalización
- **Detalle de Errores**: Visualización detallada de errores en el procesamiento con sugerencias de solución
- **Tabla Interactiva**: Búsqueda, filtrado y paginación de sentencias con PrimeNG
- **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños de pantalla
- **Localización en Español**: Toda la interfaz configurada en idioma español
- **Integración con API REST**: Consumo de servicios backend para operaciones CRUD

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular 17.3** - Framework principal
- **TypeScript 5.4** - Lenguaje de programación
- **PrimeNG 17.18** - Biblioteca de componentes UI
  - Tema: saga-blue
  - Iconos: PrimeIcons 6.0
  - Layout: PrimeFlex 3.3
- **RxJS 7.8** - Programación reactiva
- **Angular Router** - Navegación
- **Angular Forms** - Gestión de formularios reactivos

### Backend Integration
- **HttpClient** - Cliente HTTP para consumo de API REST
- **Express** - Servidor SSR (Server-Side Rendering)
- **Angular SSR** - Renderizado del lado del servidor

### Desarrollo y Testing
- **Angular CLI 20.3** - Herramientas de línea de comandos
- **Karma & Jasmine** - Testing unitario
- **TypeScript Compiler** - Compilación y verificación de tipos

### Herramientas de Desarrollo
- **Mockoon** - Simulación de API para desarrollo (ver `docs/Mockoon.json`)
- **Docker** - Listo para contenedorización

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.x o superior)
- **npm** (versión 9.x o superior)
- **Angular CLI** (versión 20.x)

```bash
# Verificar versiones instaladas
node --version
npm --version
ng version
```

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/FranciscoCifuentes/unidad_restitucion_tierras.git
   cd unidad_restitucion_tierras
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   El archivo `src/environments/environment.ts` contiene la configuración de la API:
   
   ```typescript
   export const environment = {
     apiDomain: 'http://localhost:3000',
     apiPath: '/api/v1/ia/extracciones-sentencias',
     get apiUrl() {
       return this.apiDomain + this.apiPath;
     }
   };
   ```
   
   Para cambiar el dominio de la API, puedes:
   - Modificar directamente `apiDomain` en el archivo
   - Usar la variable de entorno `NG_APP_API_DOMAIN` (especialmente útil en Docker)

## 🎮 Uso

### Servidor de Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Los cambios en el código se recargarán automáticamente.

### Compilación para Producción

Para compilar el proyecto:

```bash
npm run build
# o
ng build
```

Los artefactos de compilación se almacenarán en el directorio `dist/`.

### Compilación en Modo Desarrollo

Para compilar y observar cambios:

```bash
npm run watch
```

### Ejecutar Tests

Para ejecutar las pruebas unitarias:

```bash
npm test
# o
ng test
```

### Servidor SSR

Para ejecutar el servidor con renderizado del lado del servidor:

```bash
npm run serve:ssr:unidad_restitucion_tierras
```

## 📁 Estructura del Proyecto

```
unidad_restitucion_tierras/
├── src/
│   ├── app/
│   │   ├── core/                          # Módulos y servicios core
│   │   │   ├── models/                    # Modelos de datos
│   │   │   │   ├── sentencia.ts           # Interface Sentencia
│   │   │   │   └── sentencia-api.ts       # Tipos de respuesta API
│   │   │   └── services/                  # Servicios
│   │   │       └── sentencias.service.ts  # Servicio de sentencias
│   │   ├── features/                      # Módulos de características
│   │   │   └── sentencias/                # Módulo de sentencias
│   │   │       ├── components/            # Componentes
│   │   │       │   ├── sentencias-table/  # Tabla principal
│   │   │       │   └── upload-form/       # Formulario de carga
│   │   │       ├── pages/                 # Páginas
│   │   │       │   └── listado-sentencias/
│   │   │       ├── pipes/                 # Pipes personalizados
│   │   │       │   └── badge-estado.pipe.ts
│   │   │       └── sentencias.module.ts
│   │   ├── app.component.ts               # Componente raíz
│   │   ├── app.module.ts                  # Módulo raíz
│   │   ├── app.routes.ts                  # Configuración de rutas
│   │   └── app.config.ts                  # Configuración de la app
│   ├── environments/                      # Configuración de entornos
│   │   └── environment.ts                 # Variables de entorno
│   ├── primeng-locale.es.ts               # Localización PrimeNG español
│   ├── index.html                         # HTML principal
│   ├── main.ts                            # Punto de entrada
│   ├── server.ts                          # Servidor SSR
│   └── styles.css                         # Estilos globales
├── docs/                                  # Documentación
│   ├── project-doc.json                   # Documentación del proyecto
│   └── Mockoon.json                       # Configuración API mock
├── public/                                # Recursos estáticos
├── angular.json                           # Configuración de Angular
├── package.json                           # Dependencias del proyecto
├── tsconfig.json                          # Configuración de TypeScript
└── README.md                              # Este archivo
```

## 🔌 API Endpoints

La aplicación consume los siguientes endpoints de la API REST:

### Listar Sentencias
```
GET /api/v1/ia/extracciones-sentencias
```
Retorna la lista completa de sentencias con su estado actual.

**Respuesta:**
```json
[
  {
    "radicado_providencia": "11001310300120240012300",
    "fecha_envio": "15/08/2025",
    "estado": "Procesado con éxito",
    "tiempo_transcurrido": "1 hora 15 minutos",
    "acciones": ["Descargar", "Gestionar"]
  }
]
```

### Cargar Nueva Sentencia
```
POST /api/v1/ia/extracciones-sentencias
```
Carga un nuevo archivo de providencia judicial.

**Body:** FormData con:
- `radicado_providencia`: String - Número de radicado
- `archivo`: File - Archivo PDF de la sentencia

### Eliminar Sentencia
```
DELETE /api/v1/ia/extracciones-sentencias/{radicado}
```
Elimina una sentencia y su archivo asociado.

### Obtener Detalle de Error
```
GET /api/v1/ia/extracciones-sentencias/{radicado}/error
```
Obtiene información detallada sobre errores de procesamiento.

**Respuesta:**
```json
{
  "radicado_providencia": "76001400300220240045601",
  "estado": "Procesado con error",
  "error_timestamp": "2025-08-14T10:30:00Z",
  "codigo_error": "ERR_EXTRACTION_001",
  "mensaje_error": "No se pudo extraer la información del documento",
  "sugerencia_solucion": "Verificar que el PDF sea legible",
  "log_tecnico": "..."
}
```

## 🎨 Estados de Sentencias

El sistema maneja los siguientes estados para cada sentencia:

| Estado | Descripción | Badge |
|--------|-------------|-------|
| **No encontrado** | La sentencia no existe en el sistema | Gris |
| **Recibido** | El archivo ha sido recibido y está en cola | Azul |
| **En procesamiento** | La IA está procesando el documento | Naranja |
| **Procesado con éxito** | La extracción se completó correctamente | Verde |
| **Procesado con error** | Hubo un error durante el procesamiento | Rojo |
| **En retroalimentación** | Requiere revisión manual | Amarillo |
| **Finalizada y cargada en SRTDAF** | Completada y cargada en el sistema final | Verde oscuro |

## 🐳 Docker

El proyecto está preparado para ejecutarse en contenedores Docker. Para cambiar el dominio de la API en entornos Docker, utiliza la variable de entorno:

```dockerfile
ENV NG_APP_API_DOMAIN=http://api-produccion.dominio.com
```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run watch` | Compila y observa cambios |
| `npm test` | Ejecuta tests unitarios |
| `npm run serve:ssr:unidad_restitucion_tierras` | Ejecuta servidor SSR |

## 🛠️ Desarrollo

### Generar Componente Nuevo

Angular CLI incluye herramientas de scaffolding. Para generar un nuevo componente:

```bash
ng generate component nombre-componente
# o forma corta
ng g c nombre-componente
```

Para ver todos los esquemáticos disponibles:

```bash
ng generate --help
```

### Configuración de PrimeNG

El proyecto utiliza PrimeNG con configuración en español. La localización se configura en `src/primeng-locale.es.ts` y se aplica en el componente raíz (`app.component.ts`).

### Herramientas de Desarrollo

Para simular la API durante el desarrollo, se proporciona una configuración de Mockoon en `docs/Mockoon.json`. Importa este archivo en [Mockoon](https://mockoon.com/) para tener un servidor mock funcional.

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es parte de la Unidad de Restitución de Tierras.

## 📞 Recursos Adicionales

- [Documentación de Angular](https://angular.dev)
- [Documentación de PrimeNG](https://primeng.org)
- [Angular CLI - Referencia de Comandos](https://angular.dev/tools/cli)

---

**Desarrollado para la Unidad de Restitución de Tierras** 🇨🇴
