import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSentenciasComponent } from './listado-sentencias.component';

describe('ListadoSentenciasComponent', () => {
  let component: ListadoSentenciasComponent;
  let fixture: ComponentFixture<ListadoSentenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSentenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoSentenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
