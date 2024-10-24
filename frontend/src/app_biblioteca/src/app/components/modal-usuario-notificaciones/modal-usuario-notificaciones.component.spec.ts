import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioNotificacionesComponent } from './modal-usuario-notificaciones.component';

describe('ModalUsuarioNotificacionesComponent', () => {
  let component: ModalUsuarioNotificacionesComponent;
  let fixture: ComponentFixture<ModalUsuarioNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUsuarioNotificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUsuarioNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
