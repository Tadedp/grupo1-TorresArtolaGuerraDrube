import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarNotificacionComponent } from './enviar-notificacion.component';

describe('EnviarNotificacionComponent', () => {
  let component: EnviarNotificacionComponent;
  let fixture: ComponentFixture<EnviarNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnviarNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
