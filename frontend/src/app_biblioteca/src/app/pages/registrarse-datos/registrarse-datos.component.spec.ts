import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarseDatosComponent } from './registrarse-datos.component';

describe('RegistrarseDatosComponent', () => {
  let component: RegistrarseDatosComponent;
  let fixture: ComponentFixture<RegistrarseDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarseDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarseDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
