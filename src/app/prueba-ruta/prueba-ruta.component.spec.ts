import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaRutaComponent } from './prueba-ruta.component';

describe('PruebaRutaComponent', () => {
  let component: PruebaRutaComponent;
  let fixture: ComponentFixture<PruebaRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
