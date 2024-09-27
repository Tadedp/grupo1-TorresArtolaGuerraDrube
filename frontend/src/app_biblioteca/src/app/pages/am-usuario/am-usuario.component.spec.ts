import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmUsuarioComponent } from './am-usuario.component';

describe('AmUsuarioComponent', () => {
  let component: AmUsuarioComponent;
  let fixture: ComponentFixture<AmUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
