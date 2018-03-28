import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasculaUnoComponent } from './bascula-uno.component';

describe('BasculaUnoComponent', () => {
  let component: BasculaUnoComponent;
  let fixture: ComponentFixture<BasculaUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasculaUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasculaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
