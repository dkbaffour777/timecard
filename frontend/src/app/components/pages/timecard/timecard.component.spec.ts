import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimecardComponent } from './timecard.component';

describe('TimecardComponent', () => {
  let component: TimecardComponent;
  let fixture: ComponentFixture<TimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimecardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
