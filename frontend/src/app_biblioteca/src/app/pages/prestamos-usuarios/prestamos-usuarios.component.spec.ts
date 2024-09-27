import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosUsuariosComponent } from './prestamos-usuarios.component';

describe('PrestamosUsuariosComponent', () => {
  let component: PrestamosUsuariosComponent;
  let fixture: ComponentFixture<PrestamosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrestamosUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
