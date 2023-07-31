import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpFieldInputComponent } from './otp-field-input.component';

describe('OtpFieldInputComponent', () => {
  let component: OtpFieldInputComponent;
  let fixture: ComponentFixture<OtpFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpFieldInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
