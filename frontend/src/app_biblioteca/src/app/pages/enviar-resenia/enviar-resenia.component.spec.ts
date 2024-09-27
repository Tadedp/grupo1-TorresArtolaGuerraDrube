import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarReseniaComponent } from './enviar-resenia.component';

describe('EnviarReseniaComponent', () => {
  let component: EnviarReseniaComponent;
  let fixture: ComponentFixture<EnviarReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnviarReseniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
