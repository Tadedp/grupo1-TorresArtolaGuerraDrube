import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmLibroComponent } from './am-libro.component';

describe('AmLibroComponent', () => {
  let component: AmLibroComponent;
  let fixture: ComponentFixture<AmLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
