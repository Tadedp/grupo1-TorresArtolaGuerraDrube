import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoFormularioComponent } from './campo-formulario.component';

describe('CampoFormularioComponent', () => {
  let component: CampoFormularioComponent;
  let fixture: ComponentFixture<CampoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
