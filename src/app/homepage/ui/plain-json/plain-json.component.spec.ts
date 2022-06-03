import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainJsonComponent } from './plain-json.component';

describe('PlainJsonComponent', () => {
  let component: PlainJsonComponent;
  let fixture: ComponentFixture<PlainJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
