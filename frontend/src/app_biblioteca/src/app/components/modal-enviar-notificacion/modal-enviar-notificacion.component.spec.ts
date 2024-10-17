import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnviarNotificacionComponent } from './modal-enviar-notificacion.component';

describe('ModalEnviarNotificacionComponent', () => {
  let component: ModalEnviarNotificacionComponent;
  let fixture: ComponentFixture<ModalEnviarNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEnviarNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEnviarNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
