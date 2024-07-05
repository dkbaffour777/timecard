import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationComponent } from './workstation.component';

describe('WorkstationComponent', () => {
  let component: WorkstationComponent;
  let fixture: ComponentFixture<WorkstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkstationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
