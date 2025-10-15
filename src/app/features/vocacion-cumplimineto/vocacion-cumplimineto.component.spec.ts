import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocacionCumpliminetoComponent } from './vocacion-cumplimineto.component';

describe('VocacionCumpliminetoComponent', () => {
  let component: VocacionCumpliminetoComponent;
  let fixture: ComponentFixture<VocacionCumpliminetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocacionCumpliminetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocacionCumpliminetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
