import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirReservaComponent } from './anadir-reserva.component';

describe('AnadirReservaComponent', () => {
  let component: AnadirReservaComponent;
  let fixture: ComponentFixture<AnadirReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirReservaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnadirReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
