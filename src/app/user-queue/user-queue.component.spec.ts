import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQueueComponent } from './user-queue.component';

describe('UserQueueComponent', () => {
  let component: UserQueueComponent;
  let fixture: ComponentFixture<UserQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
