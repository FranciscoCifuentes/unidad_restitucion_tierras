import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenciasTableComponent } from './sentencias-table.component';

describe('SentenciasTableComponent', () => {
  let component: SentenciasTableComponent;
  let fixture: ComponentFixture<SentenciasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenciasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenciasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
