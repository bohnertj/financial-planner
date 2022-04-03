import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIncomingDataComponent } from './display-incoming-data.component';

describe('DisplayIncomingDataComponent', () => {
  let component: DisplayIncomingDataComponent;
  let fixture: ComponentFixture<DisplayIncomingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayIncomingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayIncomingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
