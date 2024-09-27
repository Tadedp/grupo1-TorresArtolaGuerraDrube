import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosLibroComponent } from './datos-libro.component';

describe('DatosLibroComponent', () => {
  let component: DatosLibroComponent;
  let fixture: ComponentFixture<DatosLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
