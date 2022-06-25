import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivreReservationComponent } from './suivre-reservation.component';

describe('SuivreReservationComponent', () => {
  let component: SuivreReservationComponent;
  let fixture: ComponentFixture<SuivreReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuivreReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivreReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
