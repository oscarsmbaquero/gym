import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioComponent }  from './calendar.component';

describe('PaddleComponent', () => {
  let component: CalendarioComponent;
  let fixture: ComponentFixture<CalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
