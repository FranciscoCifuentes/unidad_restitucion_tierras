import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { VocacionCumpliminetoComponent } from './vocacion-cumplimineto.component';

describe('VocacionCumpliminetoComponent', () => {
  let component: VocacionCumpliminetoComponent;
  let fixture: ComponentFixture<VocacionCumpliminetoComponent>;

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VocacionCumpliminetoComponent, HttpClientTestingModule]
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
