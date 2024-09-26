import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesAzulesComponent } from './botones-azules.component';

describe('BotonesAzulesComponent', () => {
  let component: BotonesAzulesComponent;
  let fixture: ComponentFixture<BotonesAzulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonesAzulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesAzulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
