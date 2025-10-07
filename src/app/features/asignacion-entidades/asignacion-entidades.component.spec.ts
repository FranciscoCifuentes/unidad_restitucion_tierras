import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionEntidadesComponent } from './asignacion-entidades.component';

describe('AsignacionEntidadesComponent', () => {
  let component: AsignacionEntidadesComponent;
  let fixture: ComponentFixture<AsignacionEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionEntidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
