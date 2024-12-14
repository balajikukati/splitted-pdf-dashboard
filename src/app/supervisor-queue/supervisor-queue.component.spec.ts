import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorQueueComponent } from './supervisor-queue.component';

describe('SupervisorQueueComponent', () => {
  let component: SupervisorQueueComponent;
  let fixture: ComponentFixture<SupervisorQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
