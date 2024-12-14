import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentsPopupComponent } from './view-documents-popup.component';

describe('ViewDocumentsPopupComponent', () => {
  let component: ViewDocumentsPopupComponent;
  let fixture: ComponentFixture<ViewDocumentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocumentsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDocumentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
