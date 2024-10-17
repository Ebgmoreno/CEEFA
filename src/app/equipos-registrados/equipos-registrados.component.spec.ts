import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposRegistradosComponent } from './equipos-registrados.component';

describe('EquiposRegistradosComponent', () => {
  let component: EquiposRegistradosComponent;
  let fixture: ComponentFixture<EquiposRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposRegistradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
