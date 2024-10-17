import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatosLibroComponent } from './modal-datos-libro.component';

describe('ModalDatosLibroComponent', () => {
  let component: ModalDatosLibroComponent;
  let fixture: ComponentFixture<ModalDatosLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDatosLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDatosLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
