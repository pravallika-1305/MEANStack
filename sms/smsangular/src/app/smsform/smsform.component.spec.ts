import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsformComponent } from './smsform.component';

describe('SmsformComponent', () => {
  let component: SmsformComponent;
  let fixture: ComponentFixture<SmsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
