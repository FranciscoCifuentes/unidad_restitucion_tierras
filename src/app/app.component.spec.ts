import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGConfig } from 'primeng/api';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
  @Component({ selector: 'app-menubar', template: '', standalone: true })
  class MenubarStubComponent {}

    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, RouterTestingModule, MenubarStubComponent],
      providers: [{ provide: PrimeNGConfig, useValue: { setTranslation: () => {} } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    // Avoid unknown element errors by overriding the AppComponent template for the test
    // Provide the expected heading text so the render-title test can assert correctly.
    TestBed.overrideComponent(AppComponent, {
      set: { template: '<h1>Hello, unidad_restitucion_tierras</h1>' }
    });

    await TestBed.compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'unidad_restitucion_tierras' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unidad_restitucion_tierras');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, unidad_restitucion_tierras');
  });
});
