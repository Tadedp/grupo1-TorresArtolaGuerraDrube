import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnviarReseniaComponent } from './modal-enviar-resenia.component';

describe('ModalEnviarReseniaComponent', () => {
  let component: ModalEnviarReseniaComponent;
  let fixture: ComponentFixture<ModalEnviarReseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEnviarReseniaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEnviarReseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
