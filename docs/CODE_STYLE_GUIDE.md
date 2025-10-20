# Guía de Estilo de Código

## TypeScript & Angular

### Nomenclatura

#### Clases y Interfaces
```typescript
// PascalCase para clases e interfaces
export class SentenciasService { }
export interface Sentencia { }
export interface DetalleErrorResponse { }
```

#### Variables y Métodos
```typescript
// camelCase para variables y métodos
private readonly destroy$ = new Subject<void>();
private cargarSentencias(): void { }
public onDelete(sentencia: Sentencia): void { }
```

#### Constantes
```typescript
// UPPER_SNAKE_CASE para constantes exportadas
export const ESTADOS_SENTENCIA = {
  NO_ENCONTRADO: 'No encontrado',
  RECIBIDO: 'Recibido'
} as const;
```

#### Archivos
```typescript
// kebab-case para nombres de archivos
sentencias.service.ts
sentencias-table.component.ts
date.utils.ts
sentencias.constants.ts
```

### Modificadores de Acceso

```typescript
// Siempre especificar explícitamente
export class ExampleComponent {
  // Público: accesible desde el template
  public publicMethod(): void { }
  
  // Privado: solo dentro de la clase
  private privateMethod(): void { }
  
  // Protected: para herencia
  protected protectedMethod(): void { }
}
```

### Uso de readonly

```typescript
// Para propiedades que no deben modificarse
export class SentenciasTableComponent {
  private readonly destroy$ = new Subject<void>();
  readonly MENSAJES = MENSAJES;
  
  constructor(
    private readonly sentenciasService: SentenciasService,
    private readonly messageService: MessageService
  ) {}
}
```

### Tipado Estricto

```typescript
// ❌ Evitar any
function process(data: any) { }

// ✅ Usar tipos específicos o unknown
function process(data: Sentencia) { }
function processUnknown(data: unknown) { }

// ✅ Usar tipos de retorno explícitos
private cargarSentencias(): void { }
private mapearSentencias(data: SentenciaApiResponse[]): Sentencia[] { }
```

### Gestión de Subscripciones

```typescript
// ✅ Patrón takeUntil recomendado
export class ExampleComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // procesar datos
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Documentación JSDoc

```typescript
/**
 * Servicio para la gestión de sentencias
 * Maneja todas las operaciones CRUD relacionadas con sentencias
 */
@Injectable({
  providedIn: 'root'
})
export class SentenciasService {
  /**
   * Obtiene todas las sentencias
   * @param headers - Headers HTTP opcionales
   * @returns Observable con el array de sentencias
   */
  getAll(headers?: HttpHeaders): Observable<Sentencia[]> {
    return this.http.get<Sentencia[]>(this.apiUrl, { headers });
  }
}
```

### Organización de Métodos

```typescript
export class ExampleComponent implements OnInit, OnDestroy {
  // 1. Propiedades públicas
  public sentencias: Sentencia[] = [];
  
  // 2. Propiedades privadas
  private readonly destroy$ = new Subject<void>();
  
  // 3. Constructor
  constructor(private readonly service: Service) {}
  
  // 4. Lifecycle hooks
  ngOnInit(): void { }
  ngOnDestroy(): void { }
  
  // 5. Métodos públicos (llamados desde el template)
  public onDelete(item: Sentencia): void { }
  public onSave(): void { }
  
  // 6. Métodos privados (lógica interna)
  private cargarDatos(): void { }
  private procesarDatos(data: any): void { }
}
```

## HTML Templates

### Estructura Semántica

```html
<!-- ✅ Usar elementos semánticos HTML5 -->
<header>
  <h1>Título Principal</h1>
</header>

<section aria-label="Descripción de la sección">
  <h2>Subtítulo</h2>
  <article>Contenido</article>
</section>

<!-- ❌ Evitar divs genéricos sin significado -->
<div>
  <div>Título</div>
  <div>Contenido</div>
</div>
```

### Accesibilidad

```html
<!-- Atributos ARIA -->
<button 
  type="button"
  [attr.aria-label]="'Eliminar sentencia ' + sentencia.radicado"
  (click)="onDelete(sentencia)">
  <i class="pi pi-trash"></i>
</button>

<!-- Roles para contenido dinámico -->
<div role="alert" aria-live="polite">
  {{ mensajeError }}
</div>

<!-- IDs para asociar labels y controles -->
<label for="radicadoInput">Radicado</label>
<input 
  id="radicadoInput" 
  type="text"
  aria-required="true"
  aria-describedby="radicado-error" />
<div id="radicado-error" role="alert">
  El radicado es obligatorio
</div>
```

### Directivas Estructurales

```html
<!-- ✅ Un asterisco por elemento -->
<div *ngIf="loading">Cargando...</div>
<div *ngFor="let item of items">{{ item }}</div>

<!-- ✅ ng-container para múltiples directivas -->
<ng-container *ngIf="data">
  <div *ngFor="let item of data">{{ item }}</div>
</ng-container>
```

### Binding

```html
<!-- Property binding -->
<input [value]="radicado" />
<button [disabled]="loading" />

<!-- Event binding -->
<button (click)="onSave()" />
<input (input)="onChange($event)" />

<!-- Two-way binding -->
<input [(ngModel)]="radicado" />

<!-- Attribute binding -->
<button [attr.aria-label]="ariaLabel" />
<div [attr.data-id]="itemId" />
```

## CSS/SCSS

### Nomenclatura BEM (Block Element Modifier)

```css
/* Block */
.sentencia-form { }

/* Element */
.sentencia-form-group { }
.sentencia-form-btn { }

/* Modifier */
.sentencia-mensaje--error { }
.sentencia-mensaje--exito { }
```

### Organización

```scss
// 1. Variables
$primary-color: #2196F3;
$danger-color: #f44336;

// 2. Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 3. Base styles
.component {
  @include flex-center;
  
  // 4. Estados
  &:hover { }
  &:focus { }
  &.active { }
  
  // 5. Elementos anidados
  &-title { }
  &-content { }
}
```

## RxJS

### Operadores Comunes

```typescript
import { map, filter, catchError, takeUntil, tap } from 'rxjs/operators';

// Transformar datos
this.service.getData().pipe(
  map(data => this.transform(data)),
  catchError(error => this.handleError(error)),
  takeUntil(this.destroy$)
).subscribe();

// Filtrar resultados
this.observable$.pipe(
  filter(value => value !== null),
  tap(value => console.log('Debug:', value))
).subscribe();
```

## Principios Generales

### DRY (Don't Repeat Yourself)
```typescript
// ❌ Repetición
if (estado === 'Recibido') { }
if (estado === 'En procesamiento') { }
if (estado === 'Procesado con éxito') { }

// ✅ Usar constantes
import { ESTADOS_SENTENCIA } from './constants';
if (estado === ESTADOS_SENTENCIA.RECIBIDO) { }
```

### KISS (Keep It Simple, Stupid)
```typescript
// ❌ Complejo
const isValid = (data !== null && data !== undefined && typeof data === 'object') ? true : false;

// ✅ Simple
const isValid = Boolean(data && typeof data === 'object');
```

### YAGNI (You Aren't Gonna Need It)
- No implementar funcionalidades que podrían necesitarse en el futuro
- Enfocarse en los requisitos actuales
- Refactorizar cuando sea necesario

## Seguridad

### Sanitización
```typescript
// Angular sanitiza automáticamente en templates
<div>{{ userInput }}</div> <!-- Safe -->
<div [innerHTML]="userInput"></div> <!-- Dangerous, usar DomSanitizer -->
```

### Variables de Entorno
```typescript
// ✅ No hardcodear valores sensibles
export const environment = {
  apiUrl: process.env['API_URL']
};

// ❌ Evitar
const apiKey = 'abc123xyz';
```

## Testing (Recomendaciones)

```typescript
describe('SentenciasService', () => {
  let service: SentenciasService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SentenciasService]
    });
    
    service = TestBed.inject(SentenciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should retrieve all sentencias', () => {
    const mockData: Sentencia[] = [...];
    
    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

## Herramientas Recomendadas

1. **ESLint** - Linting de código TypeScript
2. **Prettier** - Formateo automático
3. **Husky** - Git hooks para validación pre-commit
4. **Angular CLI** - Generación de código

## Referencias

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [RxJS Best Practices](https://rxjs.dev/guide/overview)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
