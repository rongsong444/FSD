import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayComponent } from './addplay.component';

describe('PlaylistComponent', () => {
  let component: AddPlayComponent;
  let fixture: ComponentFixture<AddPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
