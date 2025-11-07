import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProvidenciasComponent } from './listado-providencias.component';

describe('ListadoProvidenciasComponent', () => {
  let component: ListadoProvidenciasComponent;
  let fixture: ComponentFixture<ListadoProvidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoProvidenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoProvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
