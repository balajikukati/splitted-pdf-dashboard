import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOcrDataComponent } from './view-ocr-data.component';

describe('ViewOcrDataComponent', () => {
  let component: ViewOcrDataComponent;
  let fixture: ComponentFixture<ViewOcrDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOcrDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOcrDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
