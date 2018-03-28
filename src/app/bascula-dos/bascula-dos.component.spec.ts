import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasculaDosComponent } from './bascula-dos.component';

describe('BasculaDosComponent', () => {
  let component: BasculaDosComponent;
  let fixture: ComponentFixture<BasculaDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasculaDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasculaDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
