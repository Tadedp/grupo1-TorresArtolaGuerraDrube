import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosFavoritosComponent } from './ingresos-favoritos.component';

describe('IngresosFavoritosComponent', () => {
  let component: IngresosFavoritosComponent;
  let fixture: ComponentFixture<IngresosFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresosFavoritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
