import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJugadoresComponent } from './modal-jugadores.component';

describe('ModalJugadoresComponent', () => {
  let component: ModalJugadoresComponent;
  let fixture: ComponentFixture<ModalJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalJugadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
