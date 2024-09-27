import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReseniasComponent } from './ver-resenias.component';

describe('VerReseniasComponent', () => {
  let component: VerReseniasComponent;
  let fixture: ComponentFixture<VerReseniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerReseniasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerReseniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
