import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';

import { SentenciasTableComponent } from './sentencias-table.component';

describe('SentenciasTableComponent', () => {
  let component: SentenciasTableComponent;
  let fixture: ComponentFixture<SentenciasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SentenciasTableComponent],
  imports: [HttpClientTestingModule, ReactiveFormsModule, ToastModule, ConfirmDialogModule, BrowserAnimationsModule, TableModule, ButtonModule, DialogModule, BadgeModule],
      providers: [MessageService, ConfirmationService]
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
