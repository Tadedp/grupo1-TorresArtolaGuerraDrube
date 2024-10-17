import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitarPrestamoComponent } from './modal-solicitar-prestamo.component';

describe('ModalSolicitarPrestamoComponent', () => {
  let component: ModalSolicitarPrestamoComponent;
  let fixture: ComponentFixture<ModalSolicitarPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSolicitarPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSolicitarPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
