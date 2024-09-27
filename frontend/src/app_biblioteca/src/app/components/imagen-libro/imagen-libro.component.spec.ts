import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenLibroComponent } from './imagen-libro.component';

describe('ImagenLibroComponent', () => {
  let component: ImagenLibroComponent;
  let fixture: ComponentFixture<ImagenLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
