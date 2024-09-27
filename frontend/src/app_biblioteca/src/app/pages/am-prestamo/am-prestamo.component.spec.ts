import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmPrestamoComponent } from './am-prestamo.component';

describe('AmPrestamoComponent', () => {
  let component: AmPrestamoComponent;
  let fixture: ComponentFixture<AmPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
